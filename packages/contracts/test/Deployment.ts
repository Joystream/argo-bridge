import JoystreamDevelopmentEthModule, { HARDCODED_TIMELOCK_DELAY } from "../ignition/modules/JoystreamDevelopmentEth"
import JoystreamProductionEthModule from "../ignition/modules/JoystreamProductionEth"
import { ArgoBridgeV1, JoystreamERC20, TimelockController } from "../typechain-types"
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"
import hre from "hardhat"

const TIMELOCK_DELAY = 10n
const BRIDGE_FEE = 100n
const MINTING_LIMIT_PERIOD_LENGTH_BLOCKS = 200n
const MINTING_LIMIT_PER_PERIOD = 300n

describe("Deployment", function () {
  describe("Production deployment", function () {
    async function deployArgoBridge() {
      const [deployer, proposer, bridgeOperator] = await hre.ethers.getSigners()

      const deployed = await hre.ignition.deploy(JoystreamProductionEthModule, {
        parameters: {
          JoystreamProductionEth: {
            timelockProposer: proposer.address,
            timelockDelay: TIMELOCK_DELAY,
            bridgeFee: BRIDGE_FEE,
            mintingLimitPeriodLengthBlocks: MINTING_LIMIT_PERIOD_LENGTH_BLOCKS,
            mintingLimitPerPeriod: MINTING_LIMIT_PER_PERIOD,
          },
        },
      })

      // @ts-ignore
      const argoBridge = deployed.argoBridge as ArgoBridgeV1
      // @ts-ignore
      const joystreamErc20 = deployed.joystreamErc20 as JoystreamERC20
      // @ts-ignore
      const timelockController = deployed.timelockController as TimelockController

      const erc20AdminRole = await joystreamErc20.DEFAULT_ADMIN_ROLE()
      const erc20MinterRole = await joystreamErc20.MINTER_ROLE()
      const bridgeAdminRole = await argoBridge.DEFAULT_ADMIN_ROLE()
      const bridgeOperatorRole = await argoBridge.OPERATOR_ROLE()
      const timelockAdminRole = await timelockController.DEFAULT_ADMIN_ROLE()
      const timelockProposerRole = await timelockController.PROPOSER_ROLE()
      const timelockCancellerRole = await timelockController.CANCELLER_ROLE()

      return {
        argoBridge,
        joystreamErc20,
        timelockController,
        deployer,
        proposer,
        bridgeOperator,
        erc20AdminRole,
        erc20MinterRole,
        bridgeAdminRole,
        bridgeOperatorRole,
        timelockAdminRole,
        timelockProposerRole,
        timelockCancellerRole,
      }
    }

    it("Should set proper bridge parameters", async function () {
      const { argoBridge, joystreamErc20 } = await loadFixture(deployArgoBridge)

      expect(await argoBridge.bridgeFee()).to.equal(BRIDGE_FEE)
      expect(await argoBridge.mintingLimitPeriodLengthBlocks()).to.equal(MINTING_LIMIT_PERIOD_LENGTH_BLOCKS)
      expect(await argoBridge.mintingLimitPerPeriod()).to.equal(MINTING_LIMIT_PER_PERIOD)
      expect(await argoBridge.joystreamErc20()).to.equal(await joystreamErc20.getAddress())
    })

    it("Should set proper timelock delay", async function () {
      const { timelockController } = await loadFixture(deployArgoBridge)

      expect(await timelockController.getMinDelay()).to.equal(TIMELOCK_DELAY)
    })

    it("Should set proper roles", async function () {
      const {
        argoBridge,
        joystreamErc20,
        timelockController,
        deployer,
        proposer,
        erc20AdminRole,
        bridgeAdminRole,
        timelockProposerRole,
        timelockCancellerRole,
      } = await loadFixture(deployArgoBridge)

      const timelockAddress = await timelockController.getAddress()

      expect(await joystreamErc20.hasRole(erc20AdminRole, timelockAddress)).to.be.true
      expect(await argoBridge.hasRole(bridgeAdminRole, timelockAddress)).to.be.true

      expect(await timelockController.hasRole(timelockProposerRole, proposer)).to.be.true
      expect(await timelockController.hasRole(timelockCancellerRole, proposer)).to.be.true

      expect(await joystreamErc20.hasRole(erc20AdminRole, deployer)).to.be.false
      expect(await argoBridge.hasRole(bridgeAdminRole, deployer)).to.be.false
      expect(await timelockController.hasRole(timelockProposerRole, deployer)).to.be.false
      expect(await timelockController.hasRole(timelockCancellerRole, deployer)).to.be.false
    })
  })

  describe("Development deployment", function () {
    async function deployArgoBridge() {
      const [deployer, bridgeAdmin, bridgeOperator] = await hre.ethers.getSigners()

      const deployed = await hre.ignition.deploy(JoystreamDevelopmentEthModule, {
        parameters: {
          JoystreamDevelopmentEth: {
            timelockProposer: bridgeAdmin.address,
            bridgeOperator: bridgeOperator.address,
            bridgeFee: BRIDGE_FEE,
            mintingLimitPeriodLengthBlocks: MINTING_LIMIT_PERIOD_LENGTH_BLOCKS,
            mintingLimitPerPeriod: MINTING_LIMIT_PER_PERIOD,
          },
        },
      })

      // @ts-ignore
      const argoBridge = deployed.argoBridge as ArgoBridgeV1
      // @ts-ignore
      const joystreamErc20 = deployed.joystreamErc20 as JoystreamERC20
      // @ts-ignore
      const timelockController = deployed.timelockController as TimelockController

      const erc20AdminRole = await joystreamErc20.DEFAULT_ADMIN_ROLE()
      const erc20MinterRole = await joystreamErc20.MINTER_ROLE()
      const bridgeAdminRole = await argoBridge.DEFAULT_ADMIN_ROLE()
      const bridgeOperatorRole = await argoBridge.OPERATOR_ROLE()
      const timelockAdminRole = await timelockController.DEFAULT_ADMIN_ROLE()
      const timelockProposerRole = await timelockController.PROPOSER_ROLE()
      const timelockCancellerRole = await timelockController.CANCELLER_ROLE()

      return {
        argoBridge,
        joystreamErc20,
        timelockController,
        deployer,
        bridgeAdmin,
        bridgeOperator,
        erc20AdminRole,
        erc20MinterRole,
        bridgeAdminRole,
        bridgeOperatorRole,
        timelockAdminRole,
        timelockProposerRole,
        timelockCancellerRole,
      }
    }

    it("Should set proper bridge parameters", async function () {
      const { argoBridge, joystreamErc20 } = await loadFixture(deployArgoBridge)

      expect(await argoBridge.bridgeFee()).to.equal(BRIDGE_FEE)
      expect(await argoBridge.mintingLimitPeriodLengthBlocks()).to.equal(MINTING_LIMIT_PERIOD_LENGTH_BLOCKS)
      expect(await argoBridge.mintingLimitPerPeriod()).to.equal(MINTING_LIMIT_PER_PERIOD)
      expect(await argoBridge.joystreamErc20()).to.equal(await joystreamErc20.getAddress())
    })

    it("Should set proper timelock delay", async function () {
      const { timelockController } = await loadFixture(deployArgoBridge)

      expect(await timelockController.getMinDelay()).to.equal(HARDCODED_TIMELOCK_DELAY)
    })

    it("Should set proper roles", async function () {
      const {
        argoBridge,
        joystreamErc20,
        timelockController,
        bridgeOperator,
        bridgeAdmin,
        erc20AdminRole,
        erc20MinterRole,
        bridgeAdminRole,
        bridgeOperatorRole,
        timelockProposerRole,
        timelockCancellerRole,
      } = await loadFixture(deployArgoBridge)

      const timelockAddress = await timelockController.getAddress()

      expect(await joystreamErc20.hasRole(erc20AdminRole, timelockAddress)).to.be.true
      expect(await joystreamErc20.hasRole(erc20MinterRole, await argoBridge.getAddress())).to.be.true
      expect(await argoBridge.hasRole(bridgeAdminRole, timelockAddress)).to.be.true
      expect(await argoBridge.hasRole(bridgeOperatorRole, bridgeOperator)).to.be.true
      expect(await timelockController.hasRole(timelockProposerRole, bridgeAdmin)).to.be.true
      expect(await timelockController.hasRole(timelockCancellerRole, bridgeAdmin)).to.be.true
    })

    it("Should revoke temporary deployer roles", async function () {
      const {
        argoBridge,
        joystreamErc20,
        timelockController,
        deployer,
        erc20AdminRole,
        bridgeAdminRole,
        timelockAdminRole,
        timelockProposerRole,
        timelockCancellerRole,
      } = await loadFixture(deployArgoBridge)

      expect(await joystreamErc20.hasRole(erc20AdminRole, deployer.address)).to.be.false
      expect(await argoBridge.hasRole(bridgeAdminRole, deployer.address)).to.be.false
      expect(await timelockController.hasRole(timelockAdminRole, deployer.address)).to.be.false
      expect(await timelockController.hasRole(timelockProposerRole, deployer.address)).to.be.false
      expect(await timelockController.hasRole(timelockCancellerRole, deployer.address)).to.be.false
    })
  })
})
