import { loadFixture, mine } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"
import hre from "hardhat"

const INITIAL_BRIDGE_FEE = 100n
const INITIAL_MINTING_LIMIT_PERIOD_LENGTH_BLOCKS = 200n
const INITIAL_MINTING_LIMIT_PER_PERIOD = 300n

describe("ArgoBridgeV1", function () {
  async function deployArgoBridge() {
    const [deployer, admin, operator, pauser, otherAccount] = await hre.ethers.getSigners()

    const erc20 = await hre.ethers.deployContract("JoystreamERC20", [admin.address])
    const erc20AsAdmin = erc20.connect(admin)

    const bridge = await hre.ethers.deployContract("ArgoBridgeV1", [
      admin.address,
      await erc20.getAddress(),
      INITIAL_BRIDGE_FEE,
      INITIAL_MINTING_LIMIT_PERIOD_LENGTH_BLOCKS,
      INITIAL_MINTING_LIMIT_PER_PERIOD,
    ])

    await erc20AsAdmin.grantRole(await erc20.MINTER_ROLE(), await bridge.getAddress())

    const pauserRole = await bridge.PAUSER_ROLE()
    const operatorRole = await bridge.OPERATOR_ROLE()

    const bridgeAsAdmin = bridge.connect(admin)
    const bridgeAsOperator = bridge.connect(operator)
    const bridgeAsPauser = bridge.connect(pauser)

    await bridgeAsAdmin.grantRole(operatorRole, operator.address)

    return {
      erc20,
      bridge,
      bridgeAsAdmin,
      bridgeAsOperator,
      bridgeAsPauser,
      deployer,
      admin,
      operator,
      pauser,
      otherAccount,
      pauserRole,
      operatorRole,
    }
  }

  async function deployArgoBridgeUnpausedWithPauser() {
    const basicFixture = await loadFixture(deployArgoBridge)
    await basicFixture.bridgeAsAdmin.unpauseBridge()
    await basicFixture.bridgeAsAdmin.grantRole(basicFixture.pauserRole, basicFixture.pauser.address)
    return basicFixture
  }

  async function deployArgoBridgeUnpausedWithOtherAccountBalance() {
    const basicFixture = await loadFixture(deployArgoBridge)
    await basicFixture.bridgeAsAdmin.unpauseBridge()
    await basicFixture.erc20
      .connect(basicFixture.admin)
      .grantRole(await basicFixture.erc20.MINTER_ROLE(), basicFixture.otherAccount.address)
    await basicFixture.erc20.connect(basicFixture.otherAccount).mint(basicFixture.otherAccount.address, 1000n)
    await basicFixture.erc20
      .connect(basicFixture.admin)
      .revokeRole(await basicFixture.erc20.MINTER_ROLE(), basicFixture.otherAccount.address)
    return basicFixture
  }

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      const { bridge, admin } = await loadFixture(deployArgoBridge)
      const adminRole = await bridge.DEFAULT_ADMIN_ROLE()

      expect(await bridge.hasRole(adminRole, admin.address)).to.be.true
    })

    it("Should have the correct ERC20 address", async function () {
      const { bridge, erc20 } = await loadFixture(deployArgoBridge)
      expect(await bridge.joystreamErc20()).to.equal(await erc20.getAddress())
    })

    it("Should be deployed in a paused state", async function () {
      const { bridge } = await loadFixture(deployArgoBridge)
      expect(await bridge.bridgeStatus()).to.equal(1n)
    })

    it("Should have the right initial bridge fee", async function () {
      const { bridge } = await loadFixture(deployArgoBridge)
      expect(await bridge.bridgeFee()).to.equal(INITIAL_BRIDGE_FEE)
    })

    it("Should have the right initial minting limits", async function () {
      const { bridge } = await loadFixture(deployArgoBridge)
      expect(await bridge.mintingLimitPeriodLengthBlocks()).to.equal(INITIAL_MINTING_LIMIT_PERIOD_LENGTH_BLOCKS)
      expect(await bridge.mintingLimitPerPeriod()).to.equal(INITIAL_MINTING_LIMIT_PER_PERIOD)
    })
  })

  describe("Role management", function () {
    it("Should not allow managing roles if not admin", async function () {
      const { bridge, otherAccount, pauserRole } = await loadFixture(deployArgoBridge)

      const erc20AsOtherAccount = bridge.connect(otherAccount)

      await expect(erc20AsOtherAccount.grantRole(pauserRole, otherAccount.address)).to.be.revertedWithCustomError(
        bridge,
        "AccessControlUnauthorizedAccount",
      )

      await expect(erc20AsOtherAccount.revokeRole(pauserRole, otherAccount.address)).to.be.revertedWithCustomError(
        bridge,
        "AccessControlUnauthorizedAccount",
      )
    })
  })

  describe("Pausing", function () {
    it("Should not allow pausing if not pauser", async function () {
      const { bridge, otherAccount } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      await expect(bridge.connect(otherAccount).pauseBridge()).to.be.revertedWithCustomError(
        bridge,
        "AccessControlUnauthorizedAccount",
      )
    })

    it("Should allow pausing if pauser", async function () {
      const { bridge, bridgeAsPauser } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      await expect(bridgeAsPauser.pauseBridge()).to.emit(bridge, "ArgoBridgeStatusChanged").withArgs(1n)
    })

    it("Should not allow unpausing if not admin", async function () {
      const { bridge, bridgeAsPauser } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      await bridgeAsPauser.pauseBridge()

      await expect(bridgeAsPauser.unpauseBridge()).to.be.revertedWithCustomError(
        bridge,
        "AccessControlUnauthorizedAccount",
      )
    })

    it("Should allow unpausing if admin", async function () {
      const { bridge, bridgeAsPauser, bridgeAsAdmin } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      await bridgeAsPauser.pauseBridge()
      await expect(bridgeAsAdmin.unpauseBridge()).to.emit(bridge, "ArgoBridgeStatusChanged").withArgs(0n)
    })
  })

  describe("Bridge fee", function () {
    it("Should not allow changing or withdrawing the bridge fee if not admin", async function () {
      const { bridge, otherAccount } = await loadFixture(deployArgoBridge)

      await expect(bridge.connect(otherAccount).setBridgeFee(1n)).to.be.revertedWithCustomError(
        bridge,
        "AccessControlUnauthorizedAccount",
      )

      await expect(bridge.connect(otherAccount).withdrawBridgeFees()).to.be.revertedWithCustomError(
        bridge,
        "AccessControlUnauthorizedAccount",
      )
    })

    it("Should allow changing and withdrawing the bridge fee if admin", async function () {
      const { bridge, bridgeAsAdmin, admin } = await loadFixture(deployArgoBridge)

      await expect(bridgeAsAdmin.setBridgeFee(1n)).to.emit(bridge, "ArgoBridgeFeeChanged").withArgs(1n)

      await expect(bridgeAsAdmin.withdrawBridgeFees())
        .to.emit(bridge, "ArgoBridgeFeesWithdrawn")
        .withArgs(admin.address, 0n)
    })
  })

  describe("Bridging to Joystream", function () {
    it("Should not allow outgoing transfer if bridge is paused", async function () {
      const { bridge, bridgeAsAdmin } = await loadFixture(deployArgoBridge)

      await expect(
        bridgeAsAdmin.requestTransferToJoystream(hre.ethers.randomBytes(32), 1n),
      ).to.be.revertedWithCustomError(bridge, "ArgoBridgeNotActive")
    })

    it("Should not allow outgoing transfer without a bridge fee", async function () {
      const { bridge, bridgeAsAdmin } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      const currentFee = await bridge.bridgeFee()

      await expect(bridgeAsAdmin.requestTransferToJoystream(hre.ethers.randomBytes(32), 1n))
        .to.be.revertedWithCustomError(bridge, "ArgoBridgeInvalidFee")
        .withArgs(currentFee)
    })

    it("Should not allow outgoing transfer of 0 tokens", async function () {
      const { bridge, bridgeAsAdmin } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      await bridgeAsAdmin.setBridgeFee(1n)

      await expect(
        bridgeAsAdmin.requestTransferToJoystream(hre.ethers.randomBytes(32), 0n, {
          value: 1n,
        }),
      ).to.be.revertedWithCustomError(bridge, "ArgoBridgeInvalidAmount")
    })

    it("Should not allow outgoing transfer without the allowance", async function () {
      const { bridge, bridgeAsAdmin, erc20, otherAccount } = await loadFixture(
        deployArgoBridgeUnpausedWithOtherAccountBalance,
      )

      await bridgeAsAdmin.setBridgeFee(1n)

      const bridgeAsOtherAccount = bridge.connect(otherAccount)

      await expect(
        bridgeAsOtherAccount.requestTransferToJoystream(hre.ethers.randomBytes(32), 1n, {
          value: 1n,
        }),
      ).to.be.revertedWithCustomError(erc20, "ERC20InsufficientAllowance")
    })

    it("Should not allow outgoing transfer without the balance", async function () {
      const { bridgeAsAdmin, erc20, admin } = await loadFixture(deployArgoBridgeUnpausedWithOtherAccountBalance)

      await bridgeAsAdmin.setBridgeFee(1n)

      await erc20.connect(admin).approve(await bridgeAsAdmin.getAddress(), 1n)

      await expect(
        bridgeAsAdmin.requestTransferToJoystream(hre.ethers.randomBytes(32), 1n, {
          value: 1n,
        }),
      ).to.be.revertedWithCustomError(erc20, "ERC20InsufficientBalance")
    })

    it("Should allow outgoing transfer with the correct arguments", async function () {
      const { bridge, bridgeAsAdmin, erc20, admin, otherAccount } = await loadFixture(
        deployArgoBridgeUnpausedWithOtherAccountBalance,
      )

      const fee = 3n
      const amount = 2n

      await bridgeAsAdmin.setBridgeFee(fee)

      await erc20.connect(otherAccount).approve(await bridge.getAddress(), amount * 2n) // 2 tests

      const targetAddress = hre.ethers.randomBytes(32)

      const bridgeAsOtherAccount = bridge.connect(otherAccount)

      const requestTransfer = async (expectedId: bigint) => {
        const totalSupplyBefore = await erc20.totalSupply()
        const requestTx = bridgeAsOtherAccount.requestTransferToJoystream(targetAddress, amount, {
          value: fee,
        })

        await expect(requestTx).to.changeEtherBalances([otherAccount, await bridge.getAddress()], [-fee, fee])
        await expect(requestTx).to.changeTokenBalance(erc20, otherAccount, -amount)
        await expect(requestTx)
          .to.emit(bridge, "ArgoTransferToJoystreamRequested")
          .withArgs(expectedId, otherAccount.address, targetAddress, amount)

        expect(await erc20.totalSupply()).to.equal(totalSupplyBefore - amount)

        const withdrawTx = bridgeAsAdmin.withdrawBridgeFees()
        await expect(withdrawTx).to.changeEtherBalances([await bridge.getAddress(), admin], [-fee, fee])
        await expect(withdrawTx).to.emit(bridge, "ArgoBridgeFeesWithdrawn").withArgs(admin.address, fee)
      }

      await requestTransfer(0n)
      await requestTransfer(1n)
    })
  })

  describe("Bridging from Joystream", function () {
    it("Should not allow incoming transfer by non-operator", async function () {
      const { bridge, otherAccount } = await loadFixture(deployArgoBridge)

      await expect(
        bridge.connect(otherAccount).completeTransferToEth(1n, otherAccount.address, 1n),
      ).to.be.revertedWithCustomError(bridge, "AccessControlUnauthorizedAccount")
    })

    it("Should not allow incoming transfer if bridge is paused", async function () {
      const { bridge, bridgeAsOperator, otherAccount } = await loadFixture(deployArgoBridge)

      await expect(bridgeAsOperator.completeTransferToEth(1n, otherAccount.address, 1n)).to.be.revertedWithCustomError(
        bridge,
        "ArgoBridgeNotActive",
      )
    })

    it("Should not allow incoming transfer of 0 tokens", async function () {
      const { bridge, bridgeAsOperator, otherAccount } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      await expect(bridgeAsOperator.completeTransferToEth(1n, otherAccount, 0n)).to.be.revertedWithCustomError(
        bridge,
        "ArgoBridgeInvalidAmount",
      )
    })

    it("Should allow incoming transfer with the correct arguments", async function () {
      const { bridge, erc20, bridgeAsOperator, otherAccount } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      const targetAddress = otherAccount.address

      const totalSupplyBefore = await erc20.totalSupply()

      const transferId = 5n
      const amount = 2n

      const requestTx = bridgeAsOperator.completeTransferToEth(transferId, targetAddress, amount)

      await expect(requestTx).to.changeTokenBalance(erc20, targetAddress, amount)
      await expect(requestTx).to.emit(bridge, "ArgoTransferToEthCompleted").withArgs(transferId, targetAddress, amount)

      expect(await erc20.totalSupply()).to.equal(totalSupplyBefore + amount)
    })
  })

  describe("Minting limits", async function () {
    it("Should allow minting up to the limit", async function () {
      const { bridgeAsOperator, otherAccount } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      await bridgeAsOperator.completeTransferToEth(5n, otherAccount.address, INITIAL_MINTING_LIMIT_PER_PERIOD)
    })

    it("Should not allow minting over the limit", async function () {
      const { bridgeAsOperator, otherAccount } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      await bridgeAsOperator.completeTransferToEth(5n, otherAccount.address, INITIAL_MINTING_LIMIT_PER_PERIOD)

      await expect(bridgeAsOperator.completeTransferToEth(6n, otherAccount.address, 1n)).to.be.revertedWithCustomError(
        bridgeAsOperator,
        "ArgoBridgeMintingLimitReached",
      )
    })

    it("Should allow minting after the period has passed", async function () {
      const { bridgeAsOperator, otherAccount } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      await bridgeAsOperator.completeTransferToEth(5n, otherAccount.address, INITIAL_MINTING_LIMIT_PER_PERIOD)

      await mine(INITIAL_MINTING_LIMIT_PERIOD_LENGTH_BLOCKS)

      await bridgeAsOperator.completeTransferToEth(6n, otherAccount.address, INITIAL_MINTING_LIMIT_PER_PERIOD)

      await expect(bridgeAsOperator.completeTransferToEth(6n, otherAccount.address, 1n)).to.be.revertedWithCustomError(
        bridgeAsOperator,
        "ArgoBridgeMintingLimitReached",
      )
    })

    it("Should allow admin to change minting limits", async function () {
      const { bridgeAsAdmin } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      const newPeriod = 200n
      const newLimit = 100n

      const setTx = bridgeAsAdmin.setMintingLimits(newPeriod, newLimit)

      await expect(setTx).to.emit(bridgeAsAdmin, "ArgoBridgeMintingLimitsUpdated").withArgs(newPeriod, newLimit)

      expect(await bridgeAsAdmin.mintingLimitPeriodLengthBlocks()).to.equal(newPeriod)
      expect(await bridgeAsAdmin.mintingLimitPerPeriod()).to.equal(newLimit)
    })

    it("Should not allow non-admin to change minting limits", async function () {
      const { bridge, otherAccount } = await loadFixture(deployArgoBridgeUnpausedWithPauser)

      await expect(bridge.connect(otherAccount).setMintingLimits(100n, 100n)).to.be.revertedWithCustomError(
        bridge,
        "AccessControlUnauthorizedAccount",
      )
    })
  })
})
