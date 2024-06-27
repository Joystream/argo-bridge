import { graphql } from "../gql"

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
      chainId
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

export const getEvmBridgeConfigDocument = graphql(/* GraphQL */ `
  query GetEvmBridgeConfig($chainId: String!) {
    evmBridgeConfigs(where: { id_eq: $chainId }) {
      id
      status
      bridgingFee
      bridgeOperatorAccounts
      bridgeAdminAccounts
      timelockAdminAccounts
      mintingLimits {
        periodLength
        periodLimit
        currentPeriodMinted
        currentPeriodEndBlock
      }
      totalMinted
      totalBurned
    }
  }
`)

export const getJoyBridgeConfigDocument = graphql(/* GraphQL */ `
  query GetJoyBridgeConfig($chainId: String!) {
    joyBridgeConfigs(where: { id_eq: $chainId }) {
      id
      status
      bridgingFee
      operatorAccount
      pauserAccounts
      mintAllowance
      feesBurned
      supportedRemoteChainIds
      thawnDurationBlocks
      thawnEndsAtBlock
      totalBurned
      totalMinted
    }
  }
`)

export const getBridgeTransfersDocument = graphql(/* GraphQL */ `
  query GetBridgeTransfers($where: BridgeTransferWhereInput) {
    bridgeTransfers(orderBy: createdAtBlock_DESC, where: $where) {
      id
      amount
      status
      feePaid
      sourceChainId
      sourceTransferId
      sourceAccount
      destChainId
      destAccount
      createdAtBlock
      createdAtTimestamp
      createdTxHash
      completedTxHash
      completedAtTimestamp
      completedAtBlock
      revertedTxHash
      revertedAtTimestamp
      revertedAtBlock
      revertReason
      revertAccount
      revertAmount
    }
  }
`)
