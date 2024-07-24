import { printDone, printTask, run } from "./shared"
import {
  createPublicClient,
  createTestClient,
  createWalletClient,
  http,
} from "viem"
import { hardhat } from "viem/chains"

export async function getEvmConfig() {
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

export function getEvmDeploymentParams(
  adminAccount: string,
  operatorAccount: string,
) {
  return {
    JoystreamDevelopmentEth: {
      timelockDelay: 120,
      timelockProposer: adminAccount,
      bridgeOperator: operatorAccount,
      bridgeFee: 100,
      mintingLimitPeriodLengthBlocks: 20,
      mintingLimitPerPeriod: 1000,
    },
  }
}

export async function deployEvm() {
  // start hardhat node
  printTask("Starting EVM node")
  await run(["npx", "hardhat", "node"], {
    cwd: "../contracts",
    background: true,
  })

  // let it spin up
  await new Promise((resolve) => setTimeout(resolve, 1000))
  printDone()

  const { adminAccount, operatorAccount } = await getEvmConfig()

  printTask("Deploying EVM contracts")

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
      "ignition/modules/JoystreamDevelopmentEth.ts",
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
