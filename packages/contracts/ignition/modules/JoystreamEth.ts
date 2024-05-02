import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

// 7 days
const MIN_DELAY = 20

const JoystreamEthModule = buildModule("JoystreamEth", (m) => {
  // const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030)
  // const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI)
  const minDelay = m.getParameter("minDelay", MIN_DELAY)
  const adminMultisig = m.getParameter(
    "adminMultisig",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  )

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

  const proposers = [adminMultisig]
  const executors = [ZERO_ADDRESS] // allow anyone to execute
  const admin = ZERO_ADDRESS // skip admin

  const timelockController = m.contract(
    "JoyTimelockController",
    [minDelay, proposers, executors, admin],
    {},
  )

  const joystreamErc20 = m.contract("JoystreamERC20", [timelockController], {
    after: [timelockController],
  })

  return { timelockController, joystreamErc20 }
})

export default JoystreamEthModule
