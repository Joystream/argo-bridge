import { contracts } from "./config"
import { EvmTimelockCallStatus, GetTimelockCallsQuery } from "./gql/graphql"
import { BridgeAbi, TimelockAbi } from "@joystream/argo-core"
import { FC } from "react"
import { encodeFunctionData, zeroHash } from "viem"
import { useWriteContract } from "wagmi"

type TimelockCall = GetTimelockCallsQuery["evmTimelockCalls"][number]

export type TimelockCallProps = {
  call: TimelockCall
}

export const TimelockCall: FC<TimelockCallProps> = ({ call }) => {
  const { writeContract } = useWriteContract()

  const execute = async () => {
    writeContract(
      {
        abi: TimelockAbi,
        address: contracts.timelock,
        functionName: "execute",
        args: [
          call.callTarget as `0x{string}`,
          call.callValue,
          call.callData as `0x{string}`,
          call.predecessor ? (call.predecessor as `0x{string}`) : zeroHash,
          call.salt ? (call.salt as `0x{string}`) : zeroHash,
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

  const executedNode =
    call.status === EvmTimelockCallStatus.Executed ? (
      <div>
        Executed: {call.executedAtTimestamp} #{call.executedAtBlock}{" "}
        {call.executedTxHash}
      </div>
    ) : null
  const cancelledNode =
    call.status === EvmTimelockCallStatus.Cancelled ? (
      <div>
        Cancelled: {call.cancelledAtTimestamp} #{call.cancelledAtBlock}{" "}
        {call.cancelledTxHash}
      </div>
    ) : null

  const prettyStatus =
    call.status === EvmTimelockCallStatus.Executed
      ? "Executed"
      : call.status === EvmTimelockCallStatus.Cancelled
        ? "Cancelled"
        : call.delayDoneTimestamp < Date.now() / 1000
          ? "Ready"
          : "Pending"

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        marginBottom: "10px",
      }}
    >
      <div>Id: {call.id}</div>
      <div>Status: {prettyStatus}</div>
      <div>
        Created: {call.createdAtTimestamp} #{call.createdAtBlock}{" "}
        {call.createdTxHash}
      </div>
      {executedNode}
      {cancelledNode}
      <div>Target: {call.callTarget}</div>
      <div>Value: {call.callValue}</div>
      {call.callSignature ? (
        <div>
          Function: {call.callSignature} {call.callArgs}
        </div>
      ) : (
        <div>Data: {call.callData}</div>
      )}
      {call.predecessor ? <div>Predecessor: {call.predecessor}</div> : null}
      {call.salt ? <div>Salt: {call.salt}</div> : null}
      <div>Delay done at: {call.delayDoneTimestamp}</div>
      <button onClick={execute}>Execute</button>
    </div>
  )
}
