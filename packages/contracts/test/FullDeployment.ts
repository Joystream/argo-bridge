import JoystreamEthModule from "../ignition/modules/JoystreamEth"
import { ArgoBridgeV1, JoystreamERC20, TimelockController } from "../typechain-types"
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"
import hre from "hardhat"

const BRIDGE_FEE = 100n
const MINTING_LIMIT_PERIOD_LENGTH_BLOCKS = 200n
const MINTING_LIMIT_PER_PERIOD = 300n

describe("ArgoBridgeV1", function () {
  async function deployArgoBridge() {
    const [deployer, bridgeAdmin, bridgeOperator] = await hre.ethers.getSigners()

    const deployed = await hre.ignition.deploy(JoystreamEthModule, {
      parameters: {
        JoystreamEth: {
          bridgeAdmin: bridgeAdmin.address,
          bridgeOperator: bridgeOperator.address,
          bridgeFee: BRIDGE_FEE,
          mintingLimitPeriodLengthBlocks: MINTING_LIMIT_PERIOD_LENGTH_BLOCKS,
          mintingLimitPerPeriod: MINTING_LIMIT_PER_PERIOD,
        },
      },
    })

    return {
      // @ts-ignore
      argoBridge: deployed.argoBridge as ArgoBridgeV1,
      // @ts-ignore
      joystreamErc20: deployed.joystreamErc20 as JoystreamERC20,
      // @ts-ignore
      timelockController: deployed.timelockController as TimelockController,
      deployer,
      bridgeAdmin,
      bridgeOperator,
    }
  }

  describe("Full deployment", () => {
    it("Should set proper bridge parameters", async function () {
      const { argoBridge, joystreamErc20 } = await loadFixture(deployArgoBridge)

      expect(await argoBridge.bridgeFee()).to.equal(BRIDGE_FEE)
      expect(await argoBridge.mintingLimitPeriodLengthBlocks()).to.equal(MINTING_LIMIT_PERIOD_LENGTH_BLOCKS)
      expect(await argoBridge.mintingLimitPerPeriod()).to.equal(MINTING_LIMIT_PER_PERIOD)
      expect(await argoBridge.joystreamErc20()).to.equal(await joystreamErc20.getAddress())
    })

    // TODO: test min delay gets set properly

    it("Should set proper roles", async function () {
      const { argoBridge, joystreamErc20, timelockController, deployer, bridgeOperator, bridgeAdmin } =
        await loadFixture(deployArgoBridge)

      const erc20AdminRole = await joystreamErc20.DEFAULT_ADMIN_ROLE()
      const minterRole = await joystreamErc20.MINTER_ROLE()
      const bridgeAdminRole = await argoBridge.DEFAULT_ADMIN_ROLE()
      const operatorRole = await argoBridge.OPERATOR_ROLE()
      const proposerRole = await timelockController.PROPOSER_ROLE()
      const cancellerRole = await timelockController.CANCELLER_ROLE()

      const timelockAddress = await timelockController.getAddress()

      expect(await joystreamErc20.hasRole(erc20AdminRole, timelockAddress)).to.be.true
      expect(await joystreamErc20.hasRole(minterRole, await argoBridge.getAddress())).to.be.true
      expect(await argoBridge.hasRole(bridgeAdminRole, timelockAddress)).to.be.true
      expect(await argoBridge.hasRole(operatorRole, bridgeOperator)).to.be.true
      expect(await timelockController.hasRole(proposerRole, bridgeAdmin)).to.be.true
      expect(await timelockController.hasRole(cancellerRole, bridgeAdmin)).to.be.true
    })

    it("Should revoke temporary deployer roles", async function () {
      const { argoBridge, joystreamErc20, timelockController, deployer, bridgeOperator, bridgeAdmin } =
        await loadFixture(deployArgoBridge)

      const erc20AdminRole = await joystreamErc20.DEFAULT_ADMIN_ROLE()
      const bridgeAdminRole = await argoBridge.DEFAULT_ADMIN_ROLE()
      const timelockAdminRole = await timelockController.DEFAULT_ADMIN_ROLE()
      const proposerRole = await timelockController.PROPOSER_ROLE()
      const cancellerRole = await timelockController.CANCELLER_ROLE()

      expect(await joystreamErc20.hasRole(erc20AdminRole, deployer.address)).to.be.false
      expect(await argoBridge.hasRole(bridgeAdminRole, deployer.address)).to.be.false
      expect(await timelockController.hasRole(timelockAdminRole, deployer.address)).to.be.false
      expect(await timelockController.hasRole(proposerRole, deployer.address)).to.be.false
      expect(await timelockController.hasRole(cancellerRole, deployer.address)).to.be.false
    })
  })
})
