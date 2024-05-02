import hre from "hardhat"
import { decodeFunctionData, encodeFunctionData, toHex } from "viem"

async function main() {
  const TIMELOCK_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const ERC20_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

  const timelock = await hre.viem.getContractAt(
    "contracts/JoyTimelockController.sol:JoyTimelockController",
    TIMELOCK_ADDRESS,
  )

  const erc20 = await hre.viem.getContractAt("contracts/JoystreamERC20.sol:JoystreamERC20", ERC20_ADDRESS)

  const minterRole = await erc20.read.MINTER_ROLE()

  const data = encodeFunctionData({
    abi: erc20.abi,
    functionName: "grantRole",
    args: [minterRole, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"],
  })

  const t = decodeFunctionData({
    abi: erc20.abi,
    data,
  })

  t//   toHex(0, { size: 32 }), //   data, //   0n, //   ERC20_ADDRESS, // await timelock.write.schedule([
  //   toHex(0, { size: 32 }),
  //   30n,
  // ])

  .console
    .log(toHex(0, { size: 32 }))
  console.log(toHex("0x0", { size: 32 }))

  const operationHash = await timelock.read.hashOperation([
    ERC20_ADDRESS,
    0n,
    data,
    toHex(0, { size: 32 }),
    toHex(0, { size: 32 }),
  ])

  console.log(operationHash)

  // console.log(await timelock.read.getOperationState([operationHash]))

  await timelock.write.execute([ERC20_ADDRESS, 0n, data, toHex(0, { size: 32 }), toHex(0, { size: 32 })])

  // for (const account of accounts) {
  //   console.log(account.account.address)
  // }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
