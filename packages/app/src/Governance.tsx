import { TimelockCall } from "./TimelockCall"
import { INDEXER_URL, contracts } from "./config"
import { EvmTimelockCallOrderByInput } from "./gql/graphql"
import { getTimelockCallsQueryDocument } from "./queries/timelockCalls"
import { BridgeAbi, TimelockAbi } from "@joystream/argo-core"
import { useQuery } from "@tanstack/react-query"
import request from "graphql-request"
import { FC } from "react"
import { bytesToHex, encodeFunctionData, zeroHash } from "viem"
import { useAccount, useReadContract, useWriteContract } from "wagmi"

export const GovernanceView: FC = () => {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()
  const { data: timelockMinDelay } = useReadContract({
    abi: TimelockAbi,
    address: contracts.timelock,
    functionName: "getMinDelay",
  })

  const { data } = useQuery({
    queryKey: ["timelockCalls"],
    queryFn: async () =>
      request(INDEXER_URL, getTimelockCallsQueryDocument, {
        orderBy: EvmTimelockCallOrderByInput.CreatedAtBlockDesc,
      }),
  })

  const proposeBridgeUnpause = async () => {
    console.log("TimelockMinDelay:", timelockMinDelay)
    if (timelockMinDelay === undefined) {
      return
    }

    const calldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: "unpauseBridge",
    })

    const saltBytes = crypto.getRandomValues(new Uint8Array(32))
    writeContract(
      {
        abi: TimelockAbi,
        address: contracts.timelock,
        functionName: "schedule",
        args: [
          contracts.bridge,
          0n,
          calldata,
          zeroHash,
          bytesToHex(saltBytes),
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

  if (!address) {
    return <div>Connect wallet</div>
  }

  return (
    <div>
      <h1>Governance</h1>
      <button onClick={proposeBridgeUnpause}>Propose Bridge Unpause</button>
      <h2>Timelock Calls</h2>
      {(data ? data.evmTimelockCalls : []).map((call) => (
        <TimelockCall key={call.id} call={call} />
      ))}
    </div>
  )
}
