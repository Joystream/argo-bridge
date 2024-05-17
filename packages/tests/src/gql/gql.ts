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
    "\n  query GetTimelockCalls($where: EvmTimelockCallWhereInput) {\n    evmTimelockCalls(where: $where, orderBy: createdAtBlock_DESC) {\n      id\n      callArgs\n      callData\n      callSignature\n      callTarget\n      callValue\n      cancelledAtBlock\n      cancelledAtTimestamp\n      cancelledTxHash\n      createdAtBlock\n      createdAtTimestamp\n      createdTxHash\n      delayDoneTimestamp\n      executedAtBlock\n      executedAtTimestamp\n      executedTxHash\n      predecessor\n      salt\n      status\n    }\n  }\n": types.GetTimelockCallsDocument,
    "\n  query GetEvmBridgeConfig($chainId: String!) {\n    evmBridgeConfigs(where: { id_eq: $chainId }) {\n      id\n      status\n      bridgingFee\n      mintingLimits {\n        periodLength\n        periodLimit\n        currentPeriodMinted\n        currentPeriodEndBlock\n      }\n      totalMinted\n      totalBurned\n    }\n  }\n": types.GetEvmBridgeConfigDocument,
    "\n  query GetBridgeTransfers($where: BridgeTransferWhereInput) {\n    bridgeTransfers(orderBy: createdAtBlock_DESC, where: $where) {\n      id\n      amount\n      status\n      feePaid\n      sourceChainId\n      sourceTransferId\n      sourceAccount\n      destChainId\n      destAccount\n      createdAtBlock\n      createdAtTimestamp\n      createdTxHash\n      completedTxHash\n      completedAtTimestamp\n      completedAtBlock\n    }\n  }\n": types.GetBridgeTransfersDocument,
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
export function graphql(source: "\n  query GetTimelockCalls($where: EvmTimelockCallWhereInput) {\n    evmTimelockCalls(where: $where, orderBy: createdAtBlock_DESC) {\n      id\n      callArgs\n      callData\n      callSignature\n      callTarget\n      callValue\n      cancelledAtBlock\n      cancelledAtTimestamp\n      cancelledTxHash\n      createdAtBlock\n      createdAtTimestamp\n      createdTxHash\n      delayDoneTimestamp\n      executedAtBlock\n      executedAtTimestamp\n      executedTxHash\n      predecessor\n      salt\n      status\n    }\n  }\n"): (typeof documents)["\n  query GetTimelockCalls($where: EvmTimelockCallWhereInput) {\n    evmTimelockCalls(where: $where, orderBy: createdAtBlock_DESC) {\n      id\n      callArgs\n      callData\n      callSignature\n      callTarget\n      callValue\n      cancelledAtBlock\n      cancelledAtTimestamp\n      cancelledTxHash\n      createdAtBlock\n      createdAtTimestamp\n      createdTxHash\n      delayDoneTimestamp\n      executedAtBlock\n      executedAtTimestamp\n      executedTxHash\n      predecessor\n      salt\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEvmBridgeConfig($chainId: String!) {\n    evmBridgeConfigs(where: { id_eq: $chainId }) {\n      id\n      status\n      bridgingFee\n      mintingLimits {\n        periodLength\n        periodLimit\n        currentPeriodMinted\n        currentPeriodEndBlock\n      }\n      totalMinted\n      totalBurned\n    }\n  }\n"): (typeof documents)["\n  query GetEvmBridgeConfig($chainId: String!) {\n    evmBridgeConfigs(where: { id_eq: $chainId }) {\n      id\n      status\n      bridgingFee\n      mintingLimits {\n        periodLength\n        periodLimit\n        currentPeriodMinted\n        currentPeriodEndBlock\n      }\n      totalMinted\n      totalBurned\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBridgeTransfers($where: BridgeTransferWhereInput) {\n    bridgeTransfers(orderBy: createdAtBlock_DESC, where: $where) {\n      id\n      amount\n      status\n      feePaid\n      sourceChainId\n      sourceTransferId\n      sourceAccount\n      destChainId\n      destAccount\n      createdAtBlock\n      createdAtTimestamp\n      createdTxHash\n      completedTxHash\n      completedAtTimestamp\n      completedAtBlock\n    }\n  }\n"): (typeof documents)["\n  query GetBridgeTransfers($where: BridgeTransferWhereInput) {\n    bridgeTransfers(orderBy: createdAtBlock_DESC, where: $where) {\n      id\n      amount\n      status\n      feePaid\n      sourceChainId\n      sourceTransferId\n      sourceAccount\n      destChainId\n      destAccount\n      createdAtBlock\n      createdAtTimestamp\n      createdTxHash\n      completedTxHash\n      completedAtTimestamp\n      completedAtBlock\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;