/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetConfigs($evmChainId: String!, $joyChainId: String!) {\n    evmBridgeConfigs(where: { id_eq: $evmChainId }) {\n      id\n      status\n      bridgeOperatorAccounts\n      bridgeAdminAccounts\n      timelockAdminAccounts\n      pauserAccounts\n      mintingLimits {\n        periodLength\n        periodLimit\n        currentPeriodMinted\n        currentPeriodEndBlock\n      }\n      bridgingFee\n      totalBurned\n      totalMinted\n    }\n    joyBridgeConfigs(where: { id_eq: $joyChainId }) {\n      id\n      status\n      operatorAccount\n      pauserAccounts\n      mintAllowance\n      feesBurned\n      bridgingFee\n      supportedRemoteChainIds\n      thawnDurationBlocks\n      thawnEndsAtBlock\n      totalBurned\n      totalMinted\n    }\n  }\n": types.GetConfigsDocument,
    "\n  query GetProcessorStatus {\n    joyProcessorStatus {\n      finalizedHeight\n      height\n    }\n    baseProcessorStatus {\n      finalizedHeight\n      height\n    }\n  }\n": types.GetProcessorStatusDocument,
    "\n  query GetTimelockOperations(\n    $where: EvmTimelockOperationWhereInput\n    $orderBy: [EvmTimelockOperationOrderByInput!]\n    $limit: Int\n    $offset: Int\n  ) {\n    evmTimelockOperations(\n      where: $where\n      orderBy: $orderBy\n      limit: $limit\n      offset: $offset\n    ) {\n      id\n      operationId\n      cancelledAtBlock\n      cancelledAtTimestamp\n      cancelledTxHash\n      createdAtBlock\n      createdAtTimestamp\n      createdTxHash\n      delayDoneTimestamp\n      executedAtBlock\n      executedAtTimestamp\n      executedTxHash\n      predecessor\n      salt\n      status\n      calls {\n        callIndex\n        callArgs\n        callData\n        callSignature\n        callTarget\n        callValue\n      }\n    }\n  }\n": types.GetTimelockOperationsDocument,
    "\n  query GetTransfers(\n    $where: BridgeTransferWhereInput\n    $orderBy: [BridgeTransferOrderByInput!] = [createdAtTimestamp_DESC]\n  ) {\n    bridgeTransfers(where: $where, orderBy: $orderBy) {\n      id\n      status\n      type\n      sourceAccount\n      sourceChainId\n      sourceTransferId\n      destAccount\n      destChainId\n      createdTxHash\n      createdAtTimestamp\n      createdAtBlock\n      completedTxHash\n      completedAtTimestamp\n      completedAtBlock\n      amount\n      feePaid\n    }\n  }\n": types.GetTransfersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConfigs($evmChainId: String!, $joyChainId: String!) {\n    evmBridgeConfigs(where: { id_eq: $evmChainId }) {\n      id\n      status\n      bridgeOperatorAccounts\n      bridgeAdminAccounts\n      timelockAdminAccounts\n      pauserAccounts\n      mintingLimits {\n        periodLength\n        periodLimit\n        currentPeriodMinted\n        currentPeriodEndBlock\n      }\n      bridgingFee\n      totalBurned\n      totalMinted\n    }\n    joyBridgeConfigs(where: { id_eq: $joyChainId }) {\n      id\n      status\n      operatorAccount\n      pauserAccounts\n      mintAllowance\n      feesBurned\n      bridgingFee\n      supportedRemoteChainIds\n      thawnDurationBlocks\n      thawnEndsAtBlock\n      totalBurned\n      totalMinted\n    }\n  }\n"): (typeof documents)["\n  query GetConfigs($evmChainId: String!, $joyChainId: String!) {\n    evmBridgeConfigs(where: { id_eq: $evmChainId }) {\n      id\n      status\n      bridgeOperatorAccounts\n      bridgeAdminAccounts\n      timelockAdminAccounts\n      pauserAccounts\n      mintingLimits {\n        periodLength\n        periodLimit\n        currentPeriodMinted\n        currentPeriodEndBlock\n      }\n      bridgingFee\n      totalBurned\n      totalMinted\n    }\n    joyBridgeConfigs(where: { id_eq: $joyChainId }) {\n      id\n      status\n      operatorAccount\n      pauserAccounts\n      mintAllowance\n      feesBurned\n      bridgingFee\n      supportedRemoteChainIds\n      thawnDurationBlocks\n      thawnEndsAtBlock\n      totalBurned\n      totalMinted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProcessorStatus {\n    joyProcessorStatus {\n      finalizedHeight\n      height\n    }\n    baseProcessorStatus {\n      finalizedHeight\n      height\n    }\n  }\n"): (typeof documents)["\n  query GetProcessorStatus {\n    joyProcessorStatus {\n      finalizedHeight\n      height\n    }\n    baseProcessorStatus {\n      finalizedHeight\n      height\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTimelockOperations(\n    $where: EvmTimelockOperationWhereInput\n    $orderBy: [EvmTimelockOperationOrderByInput!]\n    $limit: Int\n    $offset: Int\n  ) {\n    evmTimelockOperations(\n      where: $where\n      orderBy: $orderBy\n      limit: $limit\n      offset: $offset\n    ) {\n      id\n      operationId\n      cancelledAtBlock\n      cancelledAtTimestamp\n      cancelledTxHash\n      createdAtBlock\n      createdAtTimestamp\n      createdTxHash\n      delayDoneTimestamp\n      executedAtBlock\n      executedAtTimestamp\n      executedTxHash\n      predecessor\n      salt\n      status\n      calls {\n        callIndex\n        callArgs\n        callData\n        callSignature\n        callTarget\n        callValue\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTimelockOperations(\n    $where: EvmTimelockOperationWhereInput\n    $orderBy: [EvmTimelockOperationOrderByInput!]\n    $limit: Int\n    $offset: Int\n  ) {\n    evmTimelockOperations(\n      where: $where\n      orderBy: $orderBy\n      limit: $limit\n      offset: $offset\n    ) {\n      id\n      operationId\n      cancelledAtBlock\n      cancelledAtTimestamp\n      cancelledTxHash\n      createdAtBlock\n      createdAtTimestamp\n      createdTxHash\n      delayDoneTimestamp\n      executedAtBlock\n      executedAtTimestamp\n      executedTxHash\n      predecessor\n      salt\n      status\n      calls {\n        callIndex\n        callArgs\n        callData\n        callSignature\n        callTarget\n        callValue\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTransfers(\n    $where: BridgeTransferWhereInput\n    $orderBy: [BridgeTransferOrderByInput!] = [createdAtTimestamp_DESC]\n  ) {\n    bridgeTransfers(where: $where, orderBy: $orderBy) {\n      id\n      status\n      type\n      sourceAccount\n      sourceChainId\n      sourceTransferId\n      destAccount\n      destChainId\n      createdTxHash\n      createdAtTimestamp\n      createdAtBlock\n      completedTxHash\n      completedAtTimestamp\n      completedAtBlock\n      amount\n      feePaid\n    }\n  }\n"): (typeof documents)["\n  query GetTransfers(\n    $where: BridgeTransferWhereInput\n    $orderBy: [BridgeTransferOrderByInput!] = [createdAtTimestamp_DESC]\n  ) {\n    bridgeTransfers(where: $where, orderBy: $orderBy) {\n      id\n      status\n      type\n      sourceAccount\n      sourceChainId\n      sourceTransferId\n      destAccount\n      destChainId\n      createdTxHash\n      createdAtTimestamp\n      createdAtBlock\n      completedTxHash\n      completedAtTimestamp\n      completedAtBlock\n      amount\n      feePaid\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;