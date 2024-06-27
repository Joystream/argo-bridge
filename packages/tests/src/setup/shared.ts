import { cleanup, cleanupCalled } from "./index"
import type { Subprocess } from "bun"

export const printTask = (txt: string) => process.stdout.write(`    ${txt}...`)
export const printDone = () => process.stdout.write(" Done.\n")

export const startedProcesses: { proc: Subprocess; cmd: string }[] = []
type RunOptions = {
  cwd?: string
  background?: boolean
  env?: Record<string, string>
}
export async function run(args: string[], opts?: RunOptions) {
  const proc = Bun.spawn(args, {
    cwd: opts?.cwd,
    stderr: "pipe",
    env: {
      ...process.env,
      ...opts?.env,
    },
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

export async function fail(message: string) {
  console.error(message)
  await cleanup()
  process.exit(1)
}
