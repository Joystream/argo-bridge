import { EVM_NETWORKS } from "@joystream/argo-core"
import "@nomicfoundation/hardhat-chai-matchers"
import "@nomicfoundation/hardhat-ethers"
import "@nomicfoundation/hardhat-ledger"
import "@nomicfoundation/hardhat-toolbox"
import "@typechain/hardhat"
import "hardhat-dependency-compiler"
import { HardhatUserConfig, vars } from "hardhat/config"

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY")
const INFURA_API_KEY = vars.get("INFURA_API_KEY")
const DEPLOYER_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY")
const BASE_DEPLOYER = vars.get("BASE_DEPLOYER")

const UNIT_TESTS = process.env.UNIT_TESTS === "true"

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: true,
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // unit tests expect automine to be enabled
      // we use interval blocks for indexer in integration tests
      ...(UNIT_TESTS
        ? {}
        : {
            mining: {
              auto: false,
              interval: 1000,
            },
          }),
    },
    baseSepolia: {
      url: EVM_NETWORKS.baseSepolia.rpc.url,
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
    base: {
      url: "https://rpc.ankr.com/base/abc1ed712dcea03c2de5b71da89b9ad17341eea8d87a65dbff6cd668e7e65bf8",
      ledgerAccounts: [BASE_DEPLOYER],
    },
  },
  // dependencyCompiler: {
  //   paths: ["@openzeppelin/contracts/governance/TimelockController.sol"],
  // },
}

export default config
