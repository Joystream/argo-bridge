import { $, type Subprocess } from "bun"
import {
  type Hex,
  type PublicClient,
  type TestClient,
  type WalletClient,
  createPublicClient,
  createTestClient,
  createWalletClient,
  http,
} from "viem"
import { hardhat } from "viem/chains"

const printTask = (txt: string) => process.stdout.write(`    ${txt}...`)
const printDone = () => process.stdout.write(" Done.\n")

const startedProcesses: { proc: Subprocess; cmd: string }[] = []

export const API_URL = "http://localhost:4350/graphql"

type RunOptions = {
  cwd?: string
  background?: boolean
}
async function run(args: string[], opts?: RunOptions) {
  const proc = Bun.spawn(args, {
    cwd: opts?.cwd,
    stderr: "pipe",
  })
  const cmd = args.join(" ")

  const exitPromise = proc.exited.then(async (exitCode) => {
    if (exitCode !== 0 && !cleanupCalled) {
      const stderr = await new Response(proc.stderr).text()
      console.error(`\n${stderr}`)
      await fail(`${cmd} exited with code ${exitCode}`)
    }
  })

  if (!opts?.background) {
    await exitPromise
    return await new Response(proc.stdout).text()
  } else {
    startedProcesses.push({
      proc,
      cmd,
    })
    // wait for 3 second to see if the process exits
    const raceResult = await Promise.race([
      proc.exited,
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ])
    if (typeof raceResult === "number" && raceResult !== 0) {
      await exitPromise
      return ""
    }
  }
}

async function fail(message: string) {
  console.error(message)
  await cleanup()
  process.exit(1)
}

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

export type EvmConfig = {
  publicClient: PublicClient
  walletClient: WalletClient
  testClient: TestClient
  adminAccount: Hex
  operatorAccount: Hex
  otherAccount: Hex
}

let startedDb = false

export async function getEvmConfig(): Promise<EvmConfig> {
  const publicClient = createPublicClient({
    chain: hardhat,
    transport: http(),
  })
  const walletClient = createWalletClient({
    chain: hardhat,
    transport: http(),
  })
  const testClient = createTestClient({
    chain: hardhat,
    transport: http(),
    mode: "hardhat",
  })

  const accounts = await walletClient.getAddresses()
  // account 0 is the deployer
  const adminAccount = accounts[1]
  const operatorAccount = accounts[2]
  const otherAccount = accounts[3]
  return {
    publicClient,
    walletClient,
    testClient,
    adminAccount,
    operatorAccount,
    otherAccount,
  }
}

export async function setup(): Promise<void> {
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

  await deployEvm()

  printTask("Starting squid DB")
  await run(["docker", "compose", "up", "-d", "db"], { cwd: "../indexer" })
  startedDb = true
  printDone()

  printTask("Starting squid processor")
  await run(["bun", "run", "process:eth"], {
    cwd: "../indexer",
    background: true,
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
}

let cleanupCalled = false
export async function cleanup() {
  if (cleanupCalled) return
  cleanupCalled = true
  console.log("\nCleaning up...")

  startedProcesses.reverse()
  for (const { proc, cmd } of startedProcesses) {
    printTask(`Stopping "${cmd}", PID: ${proc.pid}`)
    proc.kill("SIGTERM")
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

export function getEvmDeploymentParams(
  adminAccount: string,
  operatorAccount: string,
) {
  return {
    JoystreamEth: {
      timelockDelay: 120,
      bridgeAdmin: adminAccount,
      bridgeOperator: operatorAccount,
      bridgeFee: 100,
      mintingLimitPeriodLengthBlocks: 1000,
      mintingLimitPerPeriod: 200,
    },
  }
}

async function deployEvm() {
  // start hardhat node
  printTask("Starting Hardhat node")
  await run(["npx", "hardhat", "node"], {
    cwd: "../contracts",
    background: true,
  })

  // let it spin up
  await new Promise((resolve) => setTimeout(resolve, 1000))
  printDone()

  const { adminAccount, operatorAccount } = await getEvmConfig()

  printTask("Deploying contracts")

  await Bun.write(
    "./tmp/test-params.json",
    JSON.stringify(getEvmDeploymentParams(adminAccount, operatorAccount)),
  )

  // deploy contracts
  await run(
    [
      "npx",
      "hardhat",
      "ignition",
      "deploy",
      "ignition/modules/JoystreamEth.ts",
      "--network",
      "localhost",
      "--parameters",
      "../tests/tmp/test-params.json",
    ],
    {
      cwd: "../contracts",
    },
  )
  printDone()
}
