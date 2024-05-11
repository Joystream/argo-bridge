import {
  BridgeAbi,
  EVM_CONTRACTS_ADDRESSES,
  TimelockAbi,
} from "@joystream/argo-core/src/config"
import { FC } from "react"
import { encodeFunctionData, zeroHash } from "viem"
import { useAccount, useReadContract, useWriteContract } from "wagmi"

const addresses = EVM_CONTRACTS_ADDRESSES.sepolia

export const GovernanceView: FC = () => {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()
  const { data: timelockMinDelay } = useReadContract({
    abi: TimelockAbi,
    address: addresses.timelock,
    functionName: "getMinDelay",
  })

  // erc20Address,
  //   0n,
  //   grantRoleCallData,
  //   predecessorHash,
  //   salt,
  //   INITIAL_MIN_DELAY,
  const proposeBridgeUnpause = async () => {
    console.log("TimelockMinDelay:", timelockMinDelay)
    if (timelockMinDelay === undefined) {
      return
    }

    const calldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: "unpauseBridge",
    })

    // const saltBytes = crypto.getRandomValues(new Uint8Array(32))
    writeContract(
      {
        abi: TimelockAbi,
        address: addresses.timelock,
        functionName: "schedule",
        args: [
          addresses.bridge,
          0n,
          calldata,
          zeroHash,
          // bytesToHex(saltBytes),
          zeroHash,
          timelockMinDelay,
        ],
      },
      {
        onSettled: (data, error) => {
          if (error) {
            console.error("Error:", error)
          } else {
            console.log("Data:", data)
          }
        },
      },
    )
  }

  const executeBridgeUnpause = async () => {
    const calldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: "unpauseBridge",
    })

    writeContract(
      {
        abi: TimelockAbi,
        address: addresses.timelock,
        functionName: "execute",
        args: [addresses.bridge, 0n, calldata, zeroHash, zeroHash],
      },
      {
        onSettled: (data, error) => {
          if (error) {
            console.error("Error:", error)
          } else {
            console.log("Data:", data)
          }
        },
      },
    )
  }

  if (!address) {
    return <div>Connect wallet</div>
  }

  return (
    <div>
      <h1>Governance</h1>
      <button onClick={proposeBridgeUnpause}>Propose Bridge Unpause</button>
      <button onClick={executeBridgeUnpause}>Execute Bridge Unpause</button>
    </div>
  )
}
