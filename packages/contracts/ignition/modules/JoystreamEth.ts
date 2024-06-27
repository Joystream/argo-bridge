import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"
import { ethers } from "ethers"

export const HARDCODED_TIMELOCK_DELAY = 120n

const JoystreamEthModule = buildModule("JoystreamEth", (m) => {
  const deployer = m.getAccount(0)

  // const timelockDelay = m.getParameter("timelockDelay")
  const timelockProposer = m.getParameter("timelockProposer")
  const bridgeOperator = m.getParameter("bridgeOperator")
  const bridgeFee = m.getParameter("bridgeFee")
  const mintingLimitPeriodLengthBlocks = m.getParameter("mintingLimitPeriodLengthBlocks")
  const mintingLimitPerPeriod = m.getParameter("mintingLimitPerPeriod")

  // set deployer as the initial timelock proposer for the initial setup
  const joystreamErc20 = m.contract("JoystreamERC20", [deployer])
  const argoBridge = m.contract(
    "ArgoBridgeV1",
    [deployer, joystreamErc20, bridgeFee, mintingLimitPeriodLengthBlocks, mintingLimitPerPeriod],
    {
      after: [joystreamErc20],
    },
  )
  const erc20MinterRole = m.staticCall(joystreamErc20, "MINTER_ROLE")
  const erc20AdminRole = m.staticCall(joystreamErc20, "DEFAULT_ADMIN_ROLE")
  const bridgeOperatorRole = m.staticCall(argoBridge, "OPERATOR_ROLE")
  const bridgeAdminRole = m.staticCall(argoBridge, "DEFAULT_ADMIN_ROLE")

  const grantMinterCall = m.call(joystreamErc20, "grantRole", [erc20MinterRole, argoBridge], { after: [argoBridge] })
  const grantOperatorCall = m.call(argoBridge, "grantRole", [bridgeOperatorRole, bridgeOperator])

  const timelockProposers = [deployer, timelockProposer] // temporarily allow timelockProposer to propose for the initial setup
  const timelockExecutors = [ethers.ZeroAddress] // allow anyone to execute
  const timelockAdmin = deployer // set deployer as temporary admin for the initial setup

  // use 0 for initial timelock delay to allow immediate execution for the initial setup
  const timelockController = m.contract(
    "TimelockController",
    [0, timelockProposers, timelockExecutors, timelockAdmin],
    {
      after: [grantMinterCall, grantOperatorCall],
    },
  )
  const timelockAdminRole = m.staticCall(timelockController, "DEFAULT_ADMIN_ROLE")
  const timelockProposerRole = m.staticCall(timelockController, "PROPOSER_ROLE")
  const timelockCancellerRole = m.staticCall(timelockController, "CANCELLER_ROLE")

  // set timelock as admin of the ERC20 and the bridge
  const setErc20AdminCall = m.call(joystreamErc20, "grantRole", [erc20AdminRole, timelockController], {
    after: [timelockController],
    id: "setErc20AdminCall",
  })
  const setBridgeAdminCall = m.call(argoBridge, "grantRole", [bridgeAdminRole, timelockController], {
    after: [timelockController],
    id: "setBridgeAdminCall",
  })

  // revoke temporary deployer admin role
  const revokeErc20AdminCall = m.call(joystreamErc20, "revokeRole", [erc20AdminRole, deployer], {
    after: [setErc20AdminCall],
  })
  const revokeBridgeAdminCall = m.call(argoBridge, "revokeRole", [bridgeAdminRole, deployer], {
    after: [setBridgeAdminCall],
  })

  // set final timelock delay
  const timelockAbi = ["function updateDelay(uint256 newDelay) external"]
  const timelockInterface = new ethers.Interface(timelockAbi)
  // TODO: use ignition parameter instead of the hardcoded value
  const updateDelayCallData = timelockInterface.encodeFunctionData("updateDelay", [HARDCODED_TIMELOCK_DELAY])

  const proposeUpdateDelayCall = m.call(timelockController, "schedule", [
    timelockController,
    0n,
    updateDelayCallData,
    ethers.ZeroHash,
    ethers.ZeroHash,
    0n,
  ])
  m.call(
    timelockController,
    "execute",
    [timelockController, 0n, updateDelayCallData, ethers.ZeroHash, ethers.ZeroHash],
    {
      after: [proposeUpdateDelayCall, revokeErc20AdminCall, revokeBridgeAdminCall],
    },
  )

  // revoke deployer timelock proposer and canceller roles
  const revokeTimelockProposerCall = m.call(timelockController, "revokeRole", [timelockProposerRole, deployer], {
    after: [proposeUpdateDelayCall],
    id: "revokeTimelockProposerCall",
  })
  const revokeTimelockCancellerCall = m.call(timelockController, "revokeRole", [timelockCancellerRole, deployer], {
    after: [proposeUpdateDelayCall],
    id: "revokeTimelockCancellerCall",
  })

  // revoke deployer timelock admin role
  m.call(timelockController, "revokeRole", [timelockAdminRole, deployer], {
    after: [revokeTimelockProposerCall, revokeTimelockCancellerCall],
    id: "revokeTimelockAdminCall",
  })

  return { timelockController, joystreamErc20, argoBridge }
})

export default JoystreamEthModule
