import { graphql } from '../gql'

export const getTimelockOperationsQueryDocument = graphql(/* GraphQL */ `
  query GetTimelockOperations(
    $where: EvmTimelockOperationWhereInput
    $orderBy: [EvmTimelockOperationOrderByInput!]
    $limit: Int
    $offset: Int
  ) {
    evmTimelockOperations(
      where: $where
      orderBy: $orderBy
      limit: $limit
      offset: $offset
    ) {
      id
      operationId
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
      calls {
        callIndex
        callArgs
        callData
        callSignature
        callTarget
        callValue
      }
    }
  }
`)
