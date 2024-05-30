import { graphql } from '../gql'

export const getTransfersDocument = graphql(/* GraphQL */ `
  query GetTransfers(
    $where: BridgeTransferWhereInput
    $orderBy: [BridgeTransferOrderByInput!] = [createdAtTimestamp_DESC]
  ) {
    bridgeTransfers(where: $where, orderBy: $orderBy) {
      id
      status
      sourceAccount
      sourceChainId
      sourceTransferId
      destAccount
      destChainId
      createdTxHash
      createdAtTimestamp
      createdAtBlock
      completedTxHash
      completedAtTimestamp
      completedAtBlock
      amount
      feePaid
    }
  }
`)
