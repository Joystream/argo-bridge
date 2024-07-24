import { deployEvm } from "./evm"
import { deployJoy, joyApi, startedJoyNode } from "./joy"
import { fail, printDone, printTask, run, startedProcesses } from "./shared"
import { $ } from "bun"

export const API_URL = "http://localhost:4350/graphql"

type RetryOptions = {
  retries: number
  timeout: number
}
export async function retry<T>(
  fn: () => Promise<T>,
  { retries, timeout }: RetryOptions,
): Promise<T> {
  try {
    return await fn()
  } catch (e) {
    if (retries === 0) throw e
    await new Promise((resolve) => setTimeout(resolve, timeout))
    return await retry(fn, { retries: retries - 1, timeout })
  }
}

let startedDb = false

export async function setup(): Promise<void> {
  try {
    console.log("Setting up...")

    // check if docker compose db is running
    const dockerPsResult = await run(
      ["docker", "compose", "ps", "--format", "'{{.Service}}'"],
      {
        cwd: "../indexer",
      },
    )
    if (dockerPsResult == null || dockerPsResult.includes("db")) {
      return await fail("Squid DB already running, aborting")
    }

    await deployJoy()
    await deployEvm()

    printTask("Starting squid DB")
    await run(
      ["docker", "compose", "-f", "docker-compose.dev.yml", "up", "-d", "db"],
      { cwd: "../indexer" },
    )
    startedDb = true
    printDone()

    printTask("Build squid processor")
    await run(["bunx", "sqd", "build"], { cwd: "../indexer" })
    printDone()

    printTask("Starting EVM squid processor")
    await run(["bunx", "sqd", "process:prod:eth"], {
      cwd: "../indexer",
      background: true,
      env: {
        EVM_NETWORK: "hardhat",
      },
    })
    printDone()

    printTask("Starting JOY squid processor")
    await run(["bunx", "sqd", "process:prod:joy"], {
      cwd: "../indexer",
      background: true,
      env: {
        JOY_NETWORK: "local",
      },
    })
    printDone()

    printTask("Starting squid API")
    await run(["bun", "run", "serve"], { cwd: "../indexer", background: true })
    printDone()

    printTask("Waiting for squid GraphQL to be up")
    await retry(
      async () => {
        const response = await fetch(API_URL)
        if (response.status !== 200) throw new Error("Not up yet")
      },
      { retries: 10, timeout: 1000 },
    )
    printDone()

    console.log("Setup done")
  } catch (e) {
    await fail((e as any)?.toString?.())
  }
}

export let cleanupCalled = false
export async function cleanup() {
  await joyApi?.disconnect?.()

  if (cleanupCalled) return
  cleanupCalled = true
  console.log("\nCleaning up...")

  startedProcesses.reverse()
  for (const { proc, cmd } of startedProcesses) {
    printTask(`Stopping "${cmd}", PID: ${proc.pid}`)
    proc.kill("SIGTERM")
    printDone()
  }

  if (startedJoyNode) {
    printTask("Stopping Joystream node")
    await run(["docker", "rm", "-f", "argo-tests-joystream-node"])
    printDone()
  }

  if (startedDb) {
    printTask("Stopping squid DB")
    await run(["docker", "compose", "down", "db"], { cwd: "../indexer" })
    printDone()
  }

  // make sure graphql process at port 4350 is killed, it seems proc.kill doesn't kill the subprocess
  console.log("Cleanup done, 👋")
  const portOccupied = (await $`lsof -t -i :4350`).text()
  if (portOccupied) {
    console.log(`Killing graphql process at port 4350, PID: ${portOccupied}`)
    await $`kill -9 ${portOccupied}`
  }
  process.exit(0)
}

export * from "./evm"
export * from "./joy"
export * from "./shared"
