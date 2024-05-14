import { graphql } from "../gql"

export const getTimelockCallsQueryDocument = graphql(/* GraphQL */ `
  query GetTimelockCalls(
    $where: EvmTimelockCallWhereInput
    $orderBy: [EvmTimelockCallOrderByInput!]
    $limit: Int
    $offset: Int
  ) {
    evmTimelockCalls(
      where: $where
      orderBy: $orderBy
      limit: $limit
      offset: $offset
    ) {
      id
      callArgs
      callData
      callSignature
      callTarget
      callValue
      cancelledAtBlock
      cancelledAtTimestamp
      cancelledTxHash
      createdAtBlock
      createdAtTimestamp
      createdTxHash
      delayDoneTimestamp
      executedAtBlock
      executedAtTimestamp
      executedTxHash
      predecessor
      salt
      status
    }
  }
`)
