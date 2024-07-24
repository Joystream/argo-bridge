import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"
import { ethers } from "ethers"

// Hardhat Ignition module for production deployment of Joystream EVM stack.
// A successful deployment should produce this final state:
// 1. TimelockController deployed with:
//   a. no admin,
//   b. [timelockProposer] as the sole proposer and canceller,
//   c. anybody being able to execute graced calls,
//   d. delay set to [timelockDelay].
// 2. JoystreamERC20 deployed with:
//   a. Deployed TimelockController as the sole admin,
//   b. no other privileged roles.
// 3. ArgoBridgeV1 deployed with:
//   a. TimelockController as the sole admin,
//   b. no other privileged roles,
//   c. fee set to [bridgeFee],
//   d. initial minting limits set to [mintingLimitPeriodLengthBlocks] and [mintingLimitPerPeriod].

const JoystreamProductionEthModule = buildModule("JoystreamProductionEth", (m) => {
  // === Prepare configuration ===
  // Final timelock delay - delay between proposing and executing a call, in seconds
  const timelockDelay = m.getParameter("timelockDelay")
  // Timelock proposer/admin - address that can propose and cancel calls, governance admin multisig
  const timelockProposer = m.getParameter("timelockProposer")
  // Initial bridging fee - fee charged on outgoing transfer, in wei
  const bridgeFee = m.getParameter("bridgeFee")
  // Initial length of minting period - length of the period in blocks
  const mintingLimitPeriodLengthBlocks = m.getParameter("mintingLimitPeriodLengthBlocks")
  // Initial minting limit per period - amount of tokens that can be minted in a period, in HAPI
  const mintingLimitPerPeriod = m.getParameter("mintingLimitPerPeriod")

  const timelockController = m.contract("TimelockController", [
    timelockDelay,
    [timelockProposer], // list of proposers/cancellers
    [ethers.ZeroAddress], // add zero address as executor to allow anyone to execute after grace period
    ethers.ZeroAddress, // no admin
  ])

  const joystreamErc20 = m.contract("JoystreamERC20", [timelockController])

  const argoBridge = m.contract("ArgoBridgeV1", [
    timelockController,
    joystreamErc20,
    bridgeFee,
    mintingLimitPeriodLengthBlocks,
    mintingLimitPerPeriod,
  ])

  return { timelockController, joystreamErc20, argoBridge }
})

export default JoystreamProductionEthModule
