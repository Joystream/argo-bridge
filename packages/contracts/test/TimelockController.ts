import { loadFixture, time } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"
import hre from "hardhat"

const INITIAL_MIN_DELAY = 600
const BRIDGE_FEE = 1n
const BRIDGE_MINTING_LIMIT_PERIOD_LENGTH_BLOCKS = 100n
const BRIDGE_MINTING_LIMIT_PER_PERIOD = 10n

describe("TimelockController", function () {
  async function deployTimelockedContracts() {
    const [deployer, proposer, otherAccount] = await hre.ethers.getSigners()

    const proposers = [proposer.address]
    const executors = [hre.ethers.ZeroAddress] // allow anyone to execute
    const timelockAdmin = hre.ethers.ZeroAddress // skip admin

    const timelock = await hre.ethers.deployContract("TimelockController", [
      INITIAL_MIN_DELAY,
      proposers,
      executors,
      timelockAdmin,
    ])
    const timelockAsProposer = timelock.connect(proposer)
    const timelockAddress = await timelock.getAddress()

    const erc20 = await hre.ethers.deployContract("JoystreamERC20", [timelockAddress])
    const erc20Address = await erc20.getAddress()

    const bridge = await hre.ethers.deployContract("ArgoBridgeV1", [
      timelockAddress,
      await erc20.getAddress(),
      BRIDGE_FEE,
      BRIDGE_MINTING_LIMIT_PERIOD_LENGTH_BLOCKS,
      BRIDGE_MINTING_LIMIT_PER_PERIOD,
    ])
    const bridgeAddress = await bridge.getAddress()

    return {
      timelock,
      timelockAsProposer,
      timelockAddress,
      erc20,
      erc20Address,
      bridge,
      bridgeAddress,
      deployer,
      proposer,
      otherAccount,
    }
  }

  describe("Deployment", function () {
    it("Should set right timelock parameters", async function () {
      const { timelock } = await loadFixture(deployTimelockedContracts)

      expect(await timelock.getMinDelay()).to.equal(INITIAL_MIN_DELAY)
    })
  })

  describe("Operations scheduling", function () {
    it("Should not allow non-proposers to schedule operations", async function () {
      const { timelock, erc20, erc20Address, otherAccount } = await loadFixture(deployTimelockedContracts)

      const minterAddress = otherAccount.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const scheduleTx = timelock.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.be.revertedWithCustomError(timelock, "AccessControlUnauthorizedAccount")
    })

    it("Should not allow scheduling operations with too short delay", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, otherAccount } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = otherAccount.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY - 1
      )
      await expect(scheduleTx).to.be.revertedWithCustomError(timelock, "TimelockInsufficientDelay")
    })

    it("Should allow proposers to schedule operations", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = proposer.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.emit(timelock, "CallScheduled")
    })

    it("Should not allow scheduling the exact same operation twice", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = proposer.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.emit(timelock, "CallScheduled")

      const scheduleTx2 = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx2).to.be.revertedWithCustomError(timelock, "TimelockUnexpectedOperationState")
    })

    it("Should allow scheduling same operation with different salt", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = proposer.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const firstSalt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        firstSalt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.emit(timelock, "CallScheduled")

      const secondSalt = hre.ethers.keccak256(hre.ethers.toUtf8Bytes("salt"))
      const scheduleTx2 = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        secondSalt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx2).to.emit(timelock, "CallScheduled")
    })
  })

  describe("Operations execution", function () {
    it("Should not allow operations to be executed before delay", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = proposer.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.emit(timelock, "CallScheduled")

      const executeTx = timelock.execute(erc20Address, 0n, grantRoleCallData, predecessorHash, salt)
      await expect(executeTx).to.be.revertedWithCustomError(timelock, "TimelockUnexpectedOperationState")
    })

    it("Should allow operations to be executed after delay", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = proposer.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.emit(timelock, "CallScheduled")

      await time.increase(INITIAL_MIN_DELAY)

      const executeTx = timelock.execute(erc20Address, 0n, grantRoleCallData, predecessorHash, salt)
      await expect(executeTx).to.emit(timelock, "CallExecuted")

      expect(await erc20.hasRole(minterRole, minterAddress)).to.be.true
    })

    it("Should not allow unknown operations to be executed", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = proposer.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const executeTx = timelock.execute(erc20Address, 0n, grantRoleCallData, predecessorHash, salt)
      await expect(executeTx).to.be.revertedWithCustomError(timelock, "TimelockUnexpectedOperationState")
    })

    it("Should not allow operations to be executed twice", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = proposer.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.emit(timelock, "CallScheduled")

      await time.increase(INITIAL_MIN_DELAY)

      const executeTx = timelock.execute(erc20Address, 0n, grantRoleCallData, predecessorHash, salt)
      await expect(executeTx).to.emit(timelock, "CallExecuted")

      const executeTx2 = timelock.execute(erc20Address, 0n, grantRoleCallData, predecessorHash, salt)
      await expect(executeTx2).to.be.revertedWithCustomError(timelock, "TimelockUnexpectedOperationState")
    })

    it("Should not allow operations to be executed with pending predecessor", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = proposer.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const firstPredecessorHash = hre.ethers.ZeroHash
      const firstSalt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        firstPredecessorHash,
        firstSalt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.emit(timelock, "CallScheduled")

      const secondPredecessorHash = await timelock.hashOperation(
        erc20Address,
        0n,
        grantRoleCallData,
        firstPredecessorHash,
        firstSalt
      )
      const secondSalt = hre.ethers.keccak256(hre.ethers.toUtf8Bytes("salt"))
      const scheduleTx2 = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        secondPredecessorHash,
        secondSalt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx2).to.emit(timelock, "CallScheduled")

      await time.increase(INITIAL_MIN_DELAY)

      await expect(
        timelock.execute(erc20Address, 0n, grantRoleCallData, secondPredecessorHash, secondSalt)
      ).to.be.revertedWithCustomError(timelock, "TimelockUnexecutedPredecessor")

      await expect(timelock.execute(erc20Address, 0n, grantRoleCallData, firstPredecessorHash, firstSalt)).to.emit(
        timelock,
        "CallExecuted"
      )

      await expect(timelock.execute(erc20Address, 0n, grantRoleCallData, secondPredecessorHash, secondSalt)).to.emit(
        timelock,
        "CallExecuted"
      )
    })
  })

  describe("Operations cancellation", function () {
    it("Should not allow cancelling unknown operations", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const unknownOperationHash = hre.ethers.keccak256(hre.ethers.toUtf8Bytes("unknown"))

      const cancelTx = timelockAsProposer.cancel(unknownOperationHash)
      await expect(cancelTx).to.be.revertedWithCustomError(timelock, "TimelockUnexpectedOperationState")
    })

    it("Should not allow non-proposers to cancel operations", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, otherAccount } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = otherAccount.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.emit(timelock, "CallScheduled")

      const operationHash = await timelock.hashOperation(erc20Address, 0n, grantRoleCallData, predecessorHash, salt)

      const cancelTx = timelock.cancel(operationHash)
      await expect(cancelTx).to.be.revertedWithCustomError(timelock, "AccessControlUnauthorizedAccount")
    })

    it("Should allow proposers to cancel operations", async function () {
      const { timelock, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const minterAddress = proposer.address
      const minterRole = await erc20.MINTER_ROLE()

      const grantRoleCallData = erc20.interface.encodeFunctionData("grantRole", [minterRole, minterAddress])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        erc20Address,
        0n,
        grantRoleCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.emit(timelock, "CallScheduled")

      const operationHash = await timelock.hashOperation(erc20Address, 0n, grantRoleCallData, predecessorHash, salt)

      const cancelTx = timelockAsProposer.cancel(operationHash)
      await expect(cancelTx).to.emit(timelock, "Cancelled")
    })
  })

  describe("Timelock management", function () {
    it("Should allow proposers to change min delay with a timelock", async function () {
      const { timelock, timelockAddress, timelockAsProposer, erc20, erc20Address, proposer } = await loadFixture(
        deployTimelockedContracts
      )

      const newMinDelay = 300

      const setMinDelayCallData = timelock.interface.encodeFunctionData("updateDelay", [newMinDelay])
      const predecessorHash = hre.ethers.ZeroHash
      const salt = hre.ethers.ZeroHash

      const scheduleTx = timelockAsProposer.schedule(
        timelockAddress,
        0n,
        setMinDelayCallData,
        predecessorHash,
        salt,
        INITIAL_MIN_DELAY
      )
      await expect(scheduleTx).to.emit(timelock, "CallScheduled")

      await time.increase(INITIAL_MIN_DELAY)

      const executeTx = timelock.execute(timelockAddress, 0n, setMinDelayCallData, predecessorHash, salt)
      await expect(executeTx).to.emit(timelock, "CallExecuted")

      expect(await timelock.getMinDelay()).to.equal(newMinDelay)
    })
  })
})
