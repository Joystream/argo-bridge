/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Big number integer */
  BigInt: { input: string; output: string; }
  /** A date-time string in simplified extended ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  DateTime: { input: string; output: string; }
};

export type BridgeTransfer = {
  __typename?: 'BridgeTransfer';
  amount: Scalars['BigInt']['output'];
  completedAtBlock?: Maybe<Scalars['Int']['output']>;
  completedAtTimestamp?: Maybe<Scalars['DateTime']['output']>;
  completedTxHash?: Maybe<Scalars['String']['output']>;
  createdAtBlock: Scalars['Int']['output'];
  createdAtTimestamp: Scalars['DateTime']['output'];
  createdTxHash: Scalars['String']['output'];
  destAccount: Scalars['String']['output'];
  destChainId: Scalars['BigInt']['output'];
  feePaid: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  sourceAccount: Scalars['String']['output'];
  sourceChainId: Scalars['BigInt']['output'];
  sourceTransferId: Scalars['BigInt']['output'];
  status: BridgeTransferStatus;
};

export type BridgeTransferEdge = {
  __typename?: 'BridgeTransferEdge';
  cursor: Scalars['String']['output'];
  node: BridgeTransfer;
};

export enum BridgeTransferOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  CompletedAtBlockAsc = 'completedAtBlock_ASC',
  CompletedAtBlockAscNullsFirst = 'completedAtBlock_ASC_NULLS_FIRST',
  CompletedAtBlockAscNullsLast = 'completedAtBlock_ASC_NULLS_LAST',
  CompletedAtBlockDesc = 'completedAtBlock_DESC',
  CompletedAtBlockDescNullsFirst = 'completedAtBlock_DESC_NULLS_FIRST',
  CompletedAtBlockDescNullsLast = 'completedAtBlock_DESC_NULLS_LAST',
  CompletedAtTimestampAsc = 'completedAtTimestamp_ASC',
  CompletedAtTimestampAscNullsFirst = 'completedAtTimestamp_ASC_NULLS_FIRST',
  CompletedAtTimestampAscNullsLast = 'completedAtTimestamp_ASC_NULLS_LAST',
  CompletedAtTimestampDesc = 'completedAtTimestamp_DESC',
  CompletedAtTimestampDescNullsFirst = 'completedAtTimestamp_DESC_NULLS_FIRST',
  CompletedAtTimestampDescNullsLast = 'completedAtTimestamp_DESC_NULLS_LAST',
  CompletedTxHashAsc = 'completedTxHash_ASC',
  CompletedTxHashAscNullsFirst = 'completedTxHash_ASC_NULLS_FIRST',
  CompletedTxHashAscNullsLast = 'completedTxHash_ASC_NULLS_LAST',
  CompletedTxHashDesc = 'completedTxHash_DESC',
  CompletedTxHashDescNullsFirst = 'completedTxHash_DESC_NULLS_FIRST',
  CompletedTxHashDescNullsLast = 'completedTxHash_DESC_NULLS_LAST',
  CreatedAtBlockAsc = 'createdAtBlock_ASC',
  CreatedAtBlockAscNullsFirst = 'createdAtBlock_ASC_NULLS_FIRST',
  CreatedAtBlockAscNullsLast = 'createdAtBlock_ASC_NULLS_LAST',
  CreatedAtBlockDesc = 'createdAtBlock_DESC',
  CreatedAtBlockDescNullsFirst = 'createdAtBlock_DESC_NULLS_FIRST',
  CreatedAtBlockDescNullsLast = 'createdAtBlock_DESC_NULLS_LAST',
  CreatedAtTimestampAsc = 'createdAtTimestamp_ASC',
  CreatedAtTimestampAscNullsFirst = 'createdAtTimestamp_ASC_NULLS_FIRST',
  CreatedAtTimestampAscNullsLast = 'createdAtTimestamp_ASC_NULLS_LAST',
  CreatedAtTimestampDesc = 'createdAtTimestamp_DESC',
  CreatedAtTimestampDescNullsFirst = 'createdAtTimestamp_DESC_NULLS_FIRST',
  CreatedAtTimestampDescNullsLast = 'createdAtTimestamp_DESC_NULLS_LAST',
  CreatedTxHashAsc = 'createdTxHash_ASC',
  CreatedTxHashAscNullsFirst = 'createdTxHash_ASC_NULLS_FIRST',
  CreatedTxHashAscNullsLast = 'createdTxHash_ASC_NULLS_LAST',
  CreatedTxHashDesc = 'createdTxHash_DESC',
  CreatedTxHashDescNullsFirst = 'createdTxHash_DESC_NULLS_FIRST',
  CreatedTxHashDescNullsLast = 'createdTxHash_DESC_NULLS_LAST',
  DestAccountAsc = 'destAccount_ASC',
  DestAccountAscNullsFirst = 'destAccount_ASC_NULLS_FIRST',
  DestAccountAscNullsLast = 'destAccount_ASC_NULLS_LAST',
  DestAccountDesc = 'destAccount_DESC',
  DestAccountDescNullsFirst = 'destAccount_DESC_NULLS_FIRST',
  DestAccountDescNullsLast = 'destAccount_DESC_NULLS_LAST',
  DestChainIdAsc = 'destChainId_ASC',
  DestChainIdAscNullsFirst = 'destChainId_ASC_NULLS_FIRST',
  DestChainIdAscNullsLast = 'destChainId_ASC_NULLS_LAST',
  DestChainIdDesc = 'destChainId_DESC',
  DestChainIdDescNullsFirst = 'destChainId_DESC_NULLS_FIRST',
  DestChainIdDescNullsLast = 'destChainId_DESC_NULLS_LAST',
  FeePaidAsc = 'feePaid_ASC',
  FeePaidAscNullsFirst = 'feePaid_ASC_NULLS_FIRST',
  FeePaidAscNullsLast = 'feePaid_ASC_NULLS_LAST',
  FeePaidDesc = 'feePaid_DESC',
  FeePaidDescNullsFirst = 'feePaid_DESC_NULLS_FIRST',
  FeePaidDescNullsLast = 'feePaid_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  SourceAccountAsc = 'sourceAccount_ASC',
  SourceAccountAscNullsFirst = 'sourceAccount_ASC_NULLS_FIRST',
  SourceAccountAscNullsLast = 'sourceAccount_ASC_NULLS_LAST',
  SourceAccountDesc = 'sourceAccount_DESC',
  SourceAccountDescNullsFirst = 'sourceAccount_DESC_NULLS_FIRST',
  SourceAccountDescNullsLast = 'sourceAccount_DESC_NULLS_LAST',
  SourceChainIdAsc = 'sourceChainId_ASC',
  SourceChainIdAscNullsFirst = 'sourceChainId_ASC_NULLS_FIRST',
  SourceChainIdAscNullsLast = 'sourceChainId_ASC_NULLS_LAST',
  SourceChainIdDesc = 'sourceChainId_DESC',
  SourceChainIdDescNullsFirst = 'sourceChainId_DESC_NULLS_FIRST',
  SourceChainIdDescNullsLast = 'sourceChainId_DESC_NULLS_LAST',
  SourceTransferIdAsc = 'sourceTransferId_ASC',
  SourceTransferIdAscNullsFirst = 'sourceTransferId_ASC_NULLS_FIRST',
  SourceTransferIdAscNullsLast = 'sourceTransferId_ASC_NULLS_LAST',
  SourceTransferIdDesc = 'sourceTransferId_DESC',
  SourceTransferIdDescNullsFirst = 'sourceTransferId_DESC_NULLS_FIRST',
  SourceTransferIdDescNullsLast = 'sourceTransferId_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST'
}

export enum BridgeTransferStatus {
  Completed = 'COMPLETED',
  MaybeCompleted = 'MAYBE_COMPLETED',
  Requested = 'REQUESTED'
}

export type BridgeTransferWhereInput = {
  AND?: InputMaybe<Array<BridgeTransferWhereInput>>;
  OR?: InputMaybe<Array<BridgeTransferWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  completedAtBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  completedAtBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  completedAtBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  completedAtBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  completedAtBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  completedAtBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  completedAtBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  completedAtBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  completedAtBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  completedAtTimestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  completedAtTimestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  completedAtTimestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  completedAtTimestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  completedAtTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  completedAtTimestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  completedAtTimestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  completedAtTimestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  completedAtTimestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  completedTxHash_contains?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_eq?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_gt?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_gte?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  completedTxHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  completedTxHash_lt?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_lte?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  completedTxHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  completedTxHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  createdAtBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAtBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAtBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAtTimestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdAtTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdTxHash_contains?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_eq?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_gt?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_gte?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  createdTxHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdTxHash_lt?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_lte?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  createdTxHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  destAccount_contains?: InputMaybe<Scalars['String']['input']>;
  destAccount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  destAccount_endsWith?: InputMaybe<Scalars['String']['input']>;
  destAccount_eq?: InputMaybe<Scalars['String']['input']>;
  destAccount_gt?: InputMaybe<Scalars['String']['input']>;
  destAccount_gte?: InputMaybe<Scalars['String']['input']>;
  destAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  destAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  destAccount_lt?: InputMaybe<Scalars['String']['input']>;
  destAccount_lte?: InputMaybe<Scalars['String']['input']>;
  destAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  destAccount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  destAccount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  destAccount_not_eq?: InputMaybe<Scalars['String']['input']>;
  destAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  destAccount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  destAccount_startsWith?: InputMaybe<Scalars['String']['input']>;
  destChainId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  destChainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  destChainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  destChainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  destChainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  destChainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  destChainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  destChainId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  destChainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feePaid_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feePaid_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feePaid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_contains?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_endsWith?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_eq?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_gt?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_gte?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sourceAccount_lt?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_lte?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_not_eq?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceAccount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  sourceAccount_startsWith?: InputMaybe<Scalars['String']['input']>;
  sourceChainId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  sourceChainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sourceChainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sourceChainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sourceChainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sourceChainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sourceChainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sourceChainId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  sourceChainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sourceTransferId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  sourceTransferId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sourceTransferId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sourceTransferId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sourceTransferId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sourceTransferId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sourceTransferId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sourceTransferId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  sourceTransferId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status_eq?: InputMaybe<BridgeTransferStatus>;
  status_in?: InputMaybe<Array<BridgeTransferStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<BridgeTransferStatus>;
  status_not_in?: InputMaybe<Array<BridgeTransferStatus>>;
};

export type BridgeTransfersConnection = {
  __typename?: 'BridgeTransfersConnection';
  edges: Array<BridgeTransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Event = {
  block: Scalars['Int']['output'];
  chainId: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeConfig = {
  __typename?: 'EvmBridgeConfig';
  bridgingFee: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  mintingLimits: EvmBridgeMintingLimits;
  status: EvmBridgeStatus;
  totalBurned: Scalars['BigInt']['output'];
  totalMinted: Scalars['BigInt']['output'];
};

export type EvmBridgeConfigEdge = {
  __typename?: 'EvmBridgeConfigEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeConfig;
};

export enum EvmBridgeConfigOrderByInput {
  BridgingFeeAsc = 'bridgingFee_ASC',
  BridgingFeeAscNullsFirst = 'bridgingFee_ASC_NULLS_FIRST',
  BridgingFeeAscNullsLast = 'bridgingFee_ASC_NULLS_LAST',
  BridgingFeeDesc = 'bridgingFee_DESC',
  BridgingFeeDescNullsFirst = 'bridgingFee_DESC_NULLS_FIRST',
  BridgingFeeDescNullsLast = 'bridgingFee_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MintingLimitsCurrentPeriodEndBlockAsc = 'mintingLimits_currentPeriodEndBlock_ASC',
  MintingLimitsCurrentPeriodEndBlockAscNullsFirst = 'mintingLimits_currentPeriodEndBlock_ASC_NULLS_FIRST',
  MintingLimitsCurrentPeriodEndBlockAscNullsLast = 'mintingLimits_currentPeriodEndBlock_ASC_NULLS_LAST',
  MintingLimitsCurrentPeriodEndBlockDesc = 'mintingLimits_currentPeriodEndBlock_DESC',
  MintingLimitsCurrentPeriodEndBlockDescNullsFirst = 'mintingLimits_currentPeriodEndBlock_DESC_NULLS_FIRST',
  MintingLimitsCurrentPeriodEndBlockDescNullsLast = 'mintingLimits_currentPeriodEndBlock_DESC_NULLS_LAST',
  MintingLimitsCurrentPeriodMintedAsc = 'mintingLimits_currentPeriodMinted_ASC',
  MintingLimitsCurrentPeriodMintedAscNullsFirst = 'mintingLimits_currentPeriodMinted_ASC_NULLS_FIRST',
  MintingLimitsCurrentPeriodMintedAscNullsLast = 'mintingLimits_currentPeriodMinted_ASC_NULLS_LAST',
  MintingLimitsCurrentPeriodMintedDesc = 'mintingLimits_currentPeriodMinted_DESC',
  MintingLimitsCurrentPeriodMintedDescNullsFirst = 'mintingLimits_currentPeriodMinted_DESC_NULLS_FIRST',
  MintingLimitsCurrentPeriodMintedDescNullsLast = 'mintingLimits_currentPeriodMinted_DESC_NULLS_LAST',
  MintingLimitsPeriodLengthAsc = 'mintingLimits_periodLength_ASC',
  MintingLimitsPeriodLengthAscNullsFirst = 'mintingLimits_periodLength_ASC_NULLS_FIRST',
  MintingLimitsPeriodLengthAscNullsLast = 'mintingLimits_periodLength_ASC_NULLS_LAST',
  MintingLimitsPeriodLengthDesc = 'mintingLimits_periodLength_DESC',
  MintingLimitsPeriodLengthDescNullsFirst = 'mintingLimits_periodLength_DESC_NULLS_FIRST',
  MintingLimitsPeriodLengthDescNullsLast = 'mintingLimits_periodLength_DESC_NULLS_LAST',
  MintingLimitsPeriodLimitAsc = 'mintingLimits_periodLimit_ASC',
  MintingLimitsPeriodLimitAscNullsFirst = 'mintingLimits_periodLimit_ASC_NULLS_FIRST',
  MintingLimitsPeriodLimitAscNullsLast = 'mintingLimits_periodLimit_ASC_NULLS_LAST',
  MintingLimitsPeriodLimitDesc = 'mintingLimits_periodLimit_DESC',
  MintingLimitsPeriodLimitDescNullsFirst = 'mintingLimits_periodLimit_DESC_NULLS_FIRST',
  MintingLimitsPeriodLimitDescNullsLast = 'mintingLimits_periodLimit_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TotalBurnedAsc = 'totalBurned_ASC',
  TotalBurnedAscNullsFirst = 'totalBurned_ASC_NULLS_FIRST',
  TotalBurnedAscNullsLast = 'totalBurned_ASC_NULLS_LAST',
  TotalBurnedDesc = 'totalBurned_DESC',
  TotalBurnedDescNullsFirst = 'totalBurned_DESC_NULLS_FIRST',
  TotalBurnedDescNullsLast = 'totalBurned_DESC_NULLS_LAST',
  TotalMintedAsc = 'totalMinted_ASC',
  TotalMintedAscNullsFirst = 'totalMinted_ASC_NULLS_FIRST',
  TotalMintedAscNullsLast = 'totalMinted_ASC_NULLS_LAST',
  TotalMintedDesc = 'totalMinted_DESC',
  TotalMintedDescNullsFirst = 'totalMinted_DESC_NULLS_FIRST',
  TotalMintedDescNullsLast = 'totalMinted_DESC_NULLS_LAST'
}

export type EvmBridgeConfigWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeConfigWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeConfigWhereInput>>;
  bridgingFee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bridgingFee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  bridgingFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  mintingLimits?: InputMaybe<EvmBridgeMintingLimitsWhereInput>;
  mintingLimits_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_eq?: InputMaybe<EvmBridgeStatus>;
  status_in?: InputMaybe<Array<EvmBridgeStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<EvmBridgeStatus>;
  status_not_in?: InputMaybe<Array<EvmBridgeStatus>>;
  totalBurned_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalBurned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBurned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBurned_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBurned_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalBurned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBurned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBurned_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalBurned_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMinted_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalMinted_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMinted_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMinted_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMinted_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalMinted_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMinted_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMinted_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalMinted_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type EvmBridgeConfigsConnection = {
  __typename?: 'EvmBridgeConfigsConnection';
  edges: Array<EvmBridgeConfigEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmBridgeFeeChangedEvent = Event & {
  __typename?: 'EvmBridgeFeeChangedEvent';
  block: Scalars['Int']['output'];
  chainId: Scalars['BigInt']['output'];
  fee: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeFeeChangedEventEdge = {
  __typename?: 'EvmBridgeFeeChangedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeFeeChangedEvent;
};

export enum EvmBridgeFeeChangedEventOrderByInput {
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockAscNullsLast = 'block_ASC_NULLS_LAST',
  BlockDesc = 'block_DESC',
  BlockDescNullsFirst = 'block_DESC_NULLS_FIRST',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  FeeAsc = 'fee_ASC',
  FeeAscNullsFirst = 'fee_ASC_NULLS_FIRST',
  FeeAscNullsLast = 'fee_ASC_NULLS_LAST',
  FeeDesc = 'fee_DESC',
  FeeDescNullsFirst = 'fee_DESC_NULLS_FIRST',
  FeeDescNullsLast = 'fee_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EvmBridgeFeeChangedEventWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeFeeChangedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeFeeChangedEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type EvmBridgeFeeChangedEventsConnection = {
  __typename?: 'EvmBridgeFeeChangedEventsConnection';
  edges: Array<EvmBridgeFeeChangedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmBridgeFeesWithdrawnEvent = Event & {
  __typename?: 'EvmBridgeFeesWithdrawnEvent';
  amount: Scalars['BigInt']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['BigInt']['output'];
  destination: Scalars['String']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeFeesWithdrawnEventEdge = {
  __typename?: 'EvmBridgeFeesWithdrawnEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeFeesWithdrawnEvent;
};

export enum EvmBridgeFeesWithdrawnEventOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockAscNullsLast = 'block_ASC_NULLS_LAST',
  BlockDesc = 'block_DESC',
  BlockDescNullsFirst = 'block_DESC_NULLS_FIRST',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  DestinationAsc = 'destination_ASC',
  DestinationAscNullsFirst = 'destination_ASC_NULLS_FIRST',
  DestinationAscNullsLast = 'destination_ASC_NULLS_LAST',
  DestinationDesc = 'destination_DESC',
  DestinationDescNullsFirst = 'destination_DESC_NULLS_FIRST',
  DestinationDescNullsLast = 'destination_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EvmBridgeFeesWithdrawnEventWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeFeesWithdrawnEventWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeFeesWithdrawnEventWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  destination_contains?: InputMaybe<Scalars['String']['input']>;
  destination_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  destination_endsWith?: InputMaybe<Scalars['String']['input']>;
  destination_eq?: InputMaybe<Scalars['String']['input']>;
  destination_gt?: InputMaybe<Scalars['String']['input']>;
  destination_gte?: InputMaybe<Scalars['String']['input']>;
  destination_in?: InputMaybe<Array<Scalars['String']['input']>>;
  destination_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  destination_lt?: InputMaybe<Scalars['String']['input']>;
  destination_lte?: InputMaybe<Scalars['String']['input']>;
  destination_not_contains?: InputMaybe<Scalars['String']['input']>;
  destination_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  destination_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  destination_not_eq?: InputMaybe<Scalars['String']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  destination_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  destination_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type EvmBridgeFeesWithdrawnEventsConnection = {
  __typename?: 'EvmBridgeFeesWithdrawnEventsConnection';
  edges: Array<EvmBridgeFeesWithdrawnEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmBridgeMintingLimits = {
  __typename?: 'EvmBridgeMintingLimits';
  currentPeriodEndBlock: Scalars['Int']['output'];
  currentPeriodMinted: Scalars['BigInt']['output'];
  periodLength: Scalars['Int']['output'];
  periodLimit: Scalars['BigInt']['output'];
};

export type EvmBridgeMintingLimitsUpdatedEvent = Event & {
  __typename?: 'EvmBridgeMintingLimitsUpdatedEvent';
  block: Scalars['Int']['output'];
  chainId: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  periodLength: Scalars['Int']['output'];
  periodLimit: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeMintingLimitsUpdatedEventEdge = {
  __typename?: 'EvmBridgeMintingLimitsUpdatedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeMintingLimitsUpdatedEvent;
};

export enum EvmBridgeMintingLimitsUpdatedEventOrderByInput {
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockAscNullsLast = 'block_ASC_NULLS_LAST',
  BlockDesc = 'block_DESC',
  BlockDescNullsFirst = 'block_DESC_NULLS_FIRST',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PeriodLengthAsc = 'periodLength_ASC',
  PeriodLengthAscNullsFirst = 'periodLength_ASC_NULLS_FIRST',
  PeriodLengthAscNullsLast = 'periodLength_ASC_NULLS_LAST',
  PeriodLengthDesc = 'periodLength_DESC',
  PeriodLengthDescNullsFirst = 'periodLength_DESC_NULLS_FIRST',
  PeriodLengthDescNullsLast = 'periodLength_DESC_NULLS_LAST',
  PeriodLimitAsc = 'periodLimit_ASC',
  PeriodLimitAscNullsFirst = 'periodLimit_ASC_NULLS_FIRST',
  PeriodLimitAscNullsLast = 'periodLimit_ASC_NULLS_LAST',
  PeriodLimitDesc = 'periodLimit_DESC',
  PeriodLimitDescNullsFirst = 'periodLimit_DESC_NULLS_FIRST',
  PeriodLimitDescNullsLast = 'periodLimit_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EvmBridgeMintingLimitsUpdatedEventWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeMintingLimitsUpdatedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeMintingLimitsUpdatedEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  periodLength_eq?: InputMaybe<Scalars['Int']['input']>;
  periodLength_gt?: InputMaybe<Scalars['Int']['input']>;
  periodLength_gte?: InputMaybe<Scalars['Int']['input']>;
  periodLength_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodLength_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  periodLength_lt?: InputMaybe<Scalars['Int']['input']>;
  periodLength_lte?: InputMaybe<Scalars['Int']['input']>;
  periodLength_not_eq?: InputMaybe<Scalars['Int']['input']>;
  periodLength_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodLimit_eq?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  periodLimit_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  periodLimit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type EvmBridgeMintingLimitsUpdatedEventsConnection = {
  __typename?: 'EvmBridgeMintingLimitsUpdatedEventsConnection';
  edges: Array<EvmBridgeMintingLimitsUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmBridgeMintingLimitsWhereInput = {
  currentPeriodEndBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  currentPeriodEndBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  currentPeriodEndBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  currentPeriodEndBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentPeriodEndBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currentPeriodEndBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  currentPeriodEndBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  currentPeriodEndBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  currentPeriodEndBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentPeriodMinted_eq?: InputMaybe<Scalars['BigInt']['input']>;
  currentPeriodMinted_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentPeriodMinted_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentPeriodMinted_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentPeriodMinted_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currentPeriodMinted_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentPeriodMinted_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentPeriodMinted_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  currentPeriodMinted_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  periodLength_eq?: InputMaybe<Scalars['Int']['input']>;
  periodLength_gt?: InputMaybe<Scalars['Int']['input']>;
  periodLength_gte?: InputMaybe<Scalars['Int']['input']>;
  periodLength_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodLength_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  periodLength_lt?: InputMaybe<Scalars['Int']['input']>;
  periodLength_lte?: InputMaybe<Scalars['Int']['input']>;
  periodLength_not_eq?: InputMaybe<Scalars['Int']['input']>;
  periodLength_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  periodLimit_eq?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  periodLimit_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  periodLimit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  periodLimit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum EvmBridgeStatus {
  Active = 'ACTIVE',
  Paused = 'PAUSED'
}

export type EvmBridgeStatusChangedEvent = Event & {
  __typename?: 'EvmBridgeStatusChangedEvent';
  block: Scalars['Int']['output'];
  chainId: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  status: EvmBridgeStatus;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeStatusChangedEventEdge = {
  __typename?: 'EvmBridgeStatusChangedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeStatusChangedEvent;
};

export enum EvmBridgeStatusChangedEventOrderByInput {
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockAscNullsLast = 'block_ASC_NULLS_LAST',
  BlockDesc = 'block_DESC',
  BlockDescNullsFirst = 'block_DESC_NULLS_FIRST',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EvmBridgeStatusChangedEventWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeStatusChangedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeStatusChangedEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  status_eq?: InputMaybe<EvmBridgeStatus>;
  status_in?: InputMaybe<Array<EvmBridgeStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<EvmBridgeStatus>;
  status_not_in?: InputMaybe<Array<EvmBridgeStatus>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type EvmBridgeStatusChangedEventsConnection = {
  __typename?: 'EvmBridgeStatusChangedEventsConnection';
  edges: Array<EvmBridgeStatusChangedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmBridgeTransferToEthCompletedEvent = Event & {
  __typename?: 'EvmBridgeTransferToEthCompletedEvent';
  amount: Scalars['BigInt']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['BigInt']['output'];
  ethDestAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  joyTransferId: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeTransferToEthCompletedEventEdge = {
  __typename?: 'EvmBridgeTransferToEthCompletedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeTransferToEthCompletedEvent;
};

export enum EvmBridgeTransferToEthCompletedEventOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockAscNullsLast = 'block_ASC_NULLS_LAST',
  BlockDesc = 'block_DESC',
  BlockDescNullsFirst = 'block_DESC_NULLS_FIRST',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  EthDestAddressAsc = 'ethDestAddress_ASC',
  EthDestAddressAscNullsFirst = 'ethDestAddress_ASC_NULLS_FIRST',
  EthDestAddressAscNullsLast = 'ethDestAddress_ASC_NULLS_LAST',
  EthDestAddressDesc = 'ethDestAddress_DESC',
  EthDestAddressDescNullsFirst = 'ethDestAddress_DESC_NULLS_FIRST',
  EthDestAddressDescNullsLast = 'ethDestAddress_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  JoyTransferIdAsc = 'joyTransferId_ASC',
  JoyTransferIdAscNullsFirst = 'joyTransferId_ASC_NULLS_FIRST',
  JoyTransferIdAscNullsLast = 'joyTransferId_ASC_NULLS_LAST',
  JoyTransferIdDesc = 'joyTransferId_DESC',
  JoyTransferIdDescNullsFirst = 'joyTransferId_DESC_NULLS_FIRST',
  JoyTransferIdDescNullsLast = 'joyTransferId_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EvmBridgeTransferToEthCompletedEventWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeTransferToEthCompletedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeTransferToEthCompletedEventWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethDestAddress_contains?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_endsWith?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_eq?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_gt?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_gte?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ethDestAddress_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  ethDestAddress_lt?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_lte?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_not_eq?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ethDestAddress_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  ethDestAddress_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  joyTransferId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  joyTransferId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  joyTransferId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  joyTransferId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  joyTransferId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  joyTransferId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  joyTransferId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  joyTransferId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  joyTransferId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type EvmBridgeTransferToEthCompletedEventsConnection = {
  __typename?: 'EvmBridgeTransferToEthCompletedEventsConnection';
  edges: Array<EvmBridgeTransferToEthCompletedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmBridgeTransferToJoystreamRequestedEvent = Event & {
  __typename?: 'EvmBridgeTransferToJoystreamRequestedEvent';
  amount: Scalars['BigInt']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['BigInt']['output'];
  ethRequester: Scalars['String']['output'];
  ethTransferId: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  joyDestAccount: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeTransferToJoystreamRequestedEventEdge = {
  __typename?: 'EvmBridgeTransferToJoystreamRequestedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeTransferToJoystreamRequestedEvent;
};

export enum EvmBridgeTransferToJoystreamRequestedEventOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockAscNullsLast = 'block_ASC_NULLS_LAST',
  BlockDesc = 'block_DESC',
  BlockDescNullsFirst = 'block_DESC_NULLS_FIRST',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  EthRequesterAsc = 'ethRequester_ASC',
  EthRequesterAscNullsFirst = 'ethRequester_ASC_NULLS_FIRST',
  EthRequesterAscNullsLast = 'ethRequester_ASC_NULLS_LAST',
  EthRequesterDesc = 'ethRequester_DESC',
  EthRequesterDescNullsFirst = 'ethRequester_DESC_NULLS_FIRST',
  EthRequesterDescNullsLast = 'ethRequester_DESC_NULLS_LAST',
  EthTransferIdAsc = 'ethTransferId_ASC',
  EthTransferIdAscNullsFirst = 'ethTransferId_ASC_NULLS_FIRST',
  EthTransferIdAscNullsLast = 'ethTransferId_ASC_NULLS_LAST',
  EthTransferIdDesc = 'ethTransferId_DESC',
  EthTransferIdDescNullsFirst = 'ethTransferId_DESC_NULLS_FIRST',
  EthTransferIdDescNullsLast = 'ethTransferId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  JoyDestAccountAsc = 'joyDestAccount_ASC',
  JoyDestAccountAscNullsFirst = 'joyDestAccount_ASC_NULLS_FIRST',
  JoyDestAccountAscNullsLast = 'joyDestAccount_ASC_NULLS_LAST',
  JoyDestAccountDesc = 'joyDestAccount_DESC',
  JoyDestAccountDescNullsFirst = 'joyDestAccount_DESC_NULLS_FIRST',
  JoyDestAccountDescNullsLast = 'joyDestAccount_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EvmBridgeTransferToJoystreamRequestedEventWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeTransferToJoystreamRequestedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeTransferToJoystreamRequestedEventWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethRequester_contains?: InputMaybe<Scalars['String']['input']>;
  ethRequester_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  ethRequester_endsWith?: InputMaybe<Scalars['String']['input']>;
  ethRequester_eq?: InputMaybe<Scalars['String']['input']>;
  ethRequester_gt?: InputMaybe<Scalars['String']['input']>;
  ethRequester_gte?: InputMaybe<Scalars['String']['input']>;
  ethRequester_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ethRequester_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  ethRequester_lt?: InputMaybe<Scalars['String']['input']>;
  ethRequester_lte?: InputMaybe<Scalars['String']['input']>;
  ethRequester_not_contains?: InputMaybe<Scalars['String']['input']>;
  ethRequester_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  ethRequester_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  ethRequester_not_eq?: InputMaybe<Scalars['String']['input']>;
  ethRequester_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ethRequester_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  ethRequester_startsWith?: InputMaybe<Scalars['String']['input']>;
  ethTransferId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  ethTransferId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ethTransferId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ethTransferId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethTransferId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  ethTransferId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ethTransferId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ethTransferId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  ethTransferId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_contains?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_endsWith?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_eq?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_gt?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_gte?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  joyDestAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  joyDestAccount_lt?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_lte?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_not_eq?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  joyDestAccount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  joyDestAccount_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type EvmBridgeTransferToJoystreamRequestedEventsConnection = {
  __typename?: 'EvmBridgeTransferToJoystreamRequestedEventsConnection';
  edges: Array<EvmBridgeTransferToJoystreamRequestedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmTimelockCall = {
  __typename?: 'EvmTimelockCall';
  callArgs?: Maybe<Scalars['String']['output']>;
  callData: Scalars['String']['output'];
  callId: Scalars['String']['output'];
  callSignature?: Maybe<Scalars['String']['output']>;
  callTarget: Scalars['String']['output'];
  callValue: Scalars['BigInt']['output'];
  cancelledAtBlock?: Maybe<Scalars['Int']['output']>;
  cancelledAtTimestamp?: Maybe<Scalars['DateTime']['output']>;
  cancelledTxHash?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['BigInt']['output'];
  createdAtBlock: Scalars['Int']['output'];
  createdAtTimestamp: Scalars['DateTime']['output'];
  createdTxHash: Scalars['String']['output'];
  delayDoneTimestamp: Scalars['DateTime']['output'];
  executedAtBlock?: Maybe<Scalars['Int']['output']>;
  executedAtTimestamp?: Maybe<Scalars['DateTime']['output']>;
  executedTxHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  predecessor?: Maybe<Scalars['String']['output']>;
  salt?: Maybe<Scalars['String']['output']>;
  status: EvmTimelockCallStatus;
};

export type EvmTimelockCallEdge = {
  __typename?: 'EvmTimelockCallEdge';
  cursor: Scalars['String']['output'];
  node: EvmTimelockCall;
};

export enum EvmTimelockCallOrderByInput {
  CallArgsAsc = 'callArgs_ASC',
  CallArgsAscNullsFirst = 'callArgs_ASC_NULLS_FIRST',
  CallArgsAscNullsLast = 'callArgs_ASC_NULLS_LAST',
  CallArgsDesc = 'callArgs_DESC',
  CallArgsDescNullsFirst = 'callArgs_DESC_NULLS_FIRST',
  CallArgsDescNullsLast = 'callArgs_DESC_NULLS_LAST',
  CallDataAsc = 'callData_ASC',
  CallDataAscNullsFirst = 'callData_ASC_NULLS_FIRST',
  CallDataAscNullsLast = 'callData_ASC_NULLS_LAST',
  CallDataDesc = 'callData_DESC',
  CallDataDescNullsFirst = 'callData_DESC_NULLS_FIRST',
  CallDataDescNullsLast = 'callData_DESC_NULLS_LAST',
  CallIdAsc = 'callId_ASC',
  CallIdAscNullsFirst = 'callId_ASC_NULLS_FIRST',
  CallIdAscNullsLast = 'callId_ASC_NULLS_LAST',
  CallIdDesc = 'callId_DESC',
  CallIdDescNullsFirst = 'callId_DESC_NULLS_FIRST',
  CallIdDescNullsLast = 'callId_DESC_NULLS_LAST',
  CallSignatureAsc = 'callSignature_ASC',
  CallSignatureAscNullsFirst = 'callSignature_ASC_NULLS_FIRST',
  CallSignatureAscNullsLast = 'callSignature_ASC_NULLS_LAST',
  CallSignatureDesc = 'callSignature_DESC',
  CallSignatureDescNullsFirst = 'callSignature_DESC_NULLS_FIRST',
  CallSignatureDescNullsLast = 'callSignature_DESC_NULLS_LAST',
  CallTargetAsc = 'callTarget_ASC',
  CallTargetAscNullsFirst = 'callTarget_ASC_NULLS_FIRST',
  CallTargetAscNullsLast = 'callTarget_ASC_NULLS_LAST',
  CallTargetDesc = 'callTarget_DESC',
  CallTargetDescNullsFirst = 'callTarget_DESC_NULLS_FIRST',
  CallTargetDescNullsLast = 'callTarget_DESC_NULLS_LAST',
  CallValueAsc = 'callValue_ASC',
  CallValueAscNullsFirst = 'callValue_ASC_NULLS_FIRST',
  CallValueAscNullsLast = 'callValue_ASC_NULLS_LAST',
  CallValueDesc = 'callValue_DESC',
  CallValueDescNullsFirst = 'callValue_DESC_NULLS_FIRST',
  CallValueDescNullsLast = 'callValue_DESC_NULLS_LAST',
  CancelledAtBlockAsc = 'cancelledAtBlock_ASC',
  CancelledAtBlockAscNullsFirst = 'cancelledAtBlock_ASC_NULLS_FIRST',
  CancelledAtBlockAscNullsLast = 'cancelledAtBlock_ASC_NULLS_LAST',
  CancelledAtBlockDesc = 'cancelledAtBlock_DESC',
  CancelledAtBlockDescNullsFirst = 'cancelledAtBlock_DESC_NULLS_FIRST',
  CancelledAtBlockDescNullsLast = 'cancelledAtBlock_DESC_NULLS_LAST',
  CancelledAtTimestampAsc = 'cancelledAtTimestamp_ASC',
  CancelledAtTimestampAscNullsFirst = 'cancelledAtTimestamp_ASC_NULLS_FIRST',
  CancelledAtTimestampAscNullsLast = 'cancelledAtTimestamp_ASC_NULLS_LAST',
  CancelledAtTimestampDesc = 'cancelledAtTimestamp_DESC',
  CancelledAtTimestampDescNullsFirst = 'cancelledAtTimestamp_DESC_NULLS_FIRST',
  CancelledAtTimestampDescNullsLast = 'cancelledAtTimestamp_DESC_NULLS_LAST',
  CancelledTxHashAsc = 'cancelledTxHash_ASC',
  CancelledTxHashAscNullsFirst = 'cancelledTxHash_ASC_NULLS_FIRST',
  CancelledTxHashAscNullsLast = 'cancelledTxHash_ASC_NULLS_LAST',
  CancelledTxHashDesc = 'cancelledTxHash_DESC',
  CancelledTxHashDescNullsFirst = 'cancelledTxHash_DESC_NULLS_FIRST',
  CancelledTxHashDescNullsLast = 'cancelledTxHash_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  CreatedAtBlockAsc = 'createdAtBlock_ASC',
  CreatedAtBlockAscNullsFirst = 'createdAtBlock_ASC_NULLS_FIRST',
  CreatedAtBlockAscNullsLast = 'createdAtBlock_ASC_NULLS_LAST',
  CreatedAtBlockDesc = 'createdAtBlock_DESC',
  CreatedAtBlockDescNullsFirst = 'createdAtBlock_DESC_NULLS_FIRST',
  CreatedAtBlockDescNullsLast = 'createdAtBlock_DESC_NULLS_LAST',
  CreatedAtTimestampAsc = 'createdAtTimestamp_ASC',
  CreatedAtTimestampAscNullsFirst = 'createdAtTimestamp_ASC_NULLS_FIRST',
  CreatedAtTimestampAscNullsLast = 'createdAtTimestamp_ASC_NULLS_LAST',
  CreatedAtTimestampDesc = 'createdAtTimestamp_DESC',
  CreatedAtTimestampDescNullsFirst = 'createdAtTimestamp_DESC_NULLS_FIRST',
  CreatedAtTimestampDescNullsLast = 'createdAtTimestamp_DESC_NULLS_LAST',
  CreatedTxHashAsc = 'createdTxHash_ASC',
  CreatedTxHashAscNullsFirst = 'createdTxHash_ASC_NULLS_FIRST',
  CreatedTxHashAscNullsLast = 'createdTxHash_ASC_NULLS_LAST',
  CreatedTxHashDesc = 'createdTxHash_DESC',
  CreatedTxHashDescNullsFirst = 'createdTxHash_DESC_NULLS_FIRST',
  CreatedTxHashDescNullsLast = 'createdTxHash_DESC_NULLS_LAST',
  DelayDoneTimestampAsc = 'delayDoneTimestamp_ASC',
  DelayDoneTimestampAscNullsFirst = 'delayDoneTimestamp_ASC_NULLS_FIRST',
  DelayDoneTimestampAscNullsLast = 'delayDoneTimestamp_ASC_NULLS_LAST',
  DelayDoneTimestampDesc = 'delayDoneTimestamp_DESC',
  DelayDoneTimestampDescNullsFirst = 'delayDoneTimestamp_DESC_NULLS_FIRST',
  DelayDoneTimestampDescNullsLast = 'delayDoneTimestamp_DESC_NULLS_LAST',
  ExecutedAtBlockAsc = 'executedAtBlock_ASC',
  ExecutedAtBlockAscNullsFirst = 'executedAtBlock_ASC_NULLS_FIRST',
  ExecutedAtBlockAscNullsLast = 'executedAtBlock_ASC_NULLS_LAST',
  ExecutedAtBlockDesc = 'executedAtBlock_DESC',
  ExecutedAtBlockDescNullsFirst = 'executedAtBlock_DESC_NULLS_FIRST',
  ExecutedAtBlockDescNullsLast = 'executedAtBlock_DESC_NULLS_LAST',
  ExecutedAtTimestampAsc = 'executedAtTimestamp_ASC',
  ExecutedAtTimestampAscNullsFirst = 'executedAtTimestamp_ASC_NULLS_FIRST',
  ExecutedAtTimestampAscNullsLast = 'executedAtTimestamp_ASC_NULLS_LAST',
  ExecutedAtTimestampDesc = 'executedAtTimestamp_DESC',
  ExecutedAtTimestampDescNullsFirst = 'executedAtTimestamp_DESC_NULLS_FIRST',
  ExecutedAtTimestampDescNullsLast = 'executedAtTimestamp_DESC_NULLS_LAST',
  ExecutedTxHashAsc = 'executedTxHash_ASC',
  ExecutedTxHashAscNullsFirst = 'executedTxHash_ASC_NULLS_FIRST',
  ExecutedTxHashAscNullsLast = 'executedTxHash_ASC_NULLS_LAST',
  ExecutedTxHashDesc = 'executedTxHash_DESC',
  ExecutedTxHashDescNullsFirst = 'executedTxHash_DESC_NULLS_FIRST',
  ExecutedTxHashDescNullsLast = 'executedTxHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PredecessorAsc = 'predecessor_ASC',
  PredecessorAscNullsFirst = 'predecessor_ASC_NULLS_FIRST',
  PredecessorAscNullsLast = 'predecessor_ASC_NULLS_LAST',
  PredecessorDesc = 'predecessor_DESC',
  PredecessorDescNullsFirst = 'predecessor_DESC_NULLS_FIRST',
  PredecessorDescNullsLast = 'predecessor_DESC_NULLS_LAST',
  SaltAsc = 'salt_ASC',
  SaltAscNullsFirst = 'salt_ASC_NULLS_FIRST',
  SaltAscNullsLast = 'salt_ASC_NULLS_LAST',
  SaltDesc = 'salt_DESC',
  SaltDescNullsFirst = 'salt_DESC_NULLS_FIRST',
  SaltDescNullsLast = 'salt_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST'
}

export enum EvmTimelockCallStatus {
  Cancelled = 'CANCELLED',
  Executed = 'EXECUTED',
  Pending = 'PENDING'
}

export type EvmTimelockCallWhereInput = {
  AND?: InputMaybe<Array<EvmTimelockCallWhereInput>>;
  OR?: InputMaybe<Array<EvmTimelockCallWhereInput>>;
  callArgs_contains?: InputMaybe<Scalars['String']['input']>;
  callArgs_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callArgs_endsWith?: InputMaybe<Scalars['String']['input']>;
  callArgs_eq?: InputMaybe<Scalars['String']['input']>;
  callArgs_gt?: InputMaybe<Scalars['String']['input']>;
  callArgs_gte?: InputMaybe<Scalars['String']['input']>;
  callArgs_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callArgs_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callArgs_lt?: InputMaybe<Scalars['String']['input']>;
  callArgs_lte?: InputMaybe<Scalars['String']['input']>;
  callArgs_not_contains?: InputMaybe<Scalars['String']['input']>;
  callArgs_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callArgs_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  callArgs_not_eq?: InputMaybe<Scalars['String']['input']>;
  callArgs_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callArgs_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  callArgs_startsWith?: InputMaybe<Scalars['String']['input']>;
  callData_contains?: InputMaybe<Scalars['String']['input']>;
  callData_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callData_endsWith?: InputMaybe<Scalars['String']['input']>;
  callData_eq?: InputMaybe<Scalars['String']['input']>;
  callData_gt?: InputMaybe<Scalars['String']['input']>;
  callData_gte?: InputMaybe<Scalars['String']['input']>;
  callData_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callData_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callData_lt?: InputMaybe<Scalars['String']['input']>;
  callData_lte?: InputMaybe<Scalars['String']['input']>;
  callData_not_contains?: InputMaybe<Scalars['String']['input']>;
  callData_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callData_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  callData_not_eq?: InputMaybe<Scalars['String']['input']>;
  callData_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callData_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  callData_startsWith?: InputMaybe<Scalars['String']['input']>;
  callId_contains?: InputMaybe<Scalars['String']['input']>;
  callId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callId_endsWith?: InputMaybe<Scalars['String']['input']>;
  callId_eq?: InputMaybe<Scalars['String']['input']>;
  callId_gt?: InputMaybe<Scalars['String']['input']>;
  callId_gte?: InputMaybe<Scalars['String']['input']>;
  callId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callId_lt?: InputMaybe<Scalars['String']['input']>;
  callId_lte?: InputMaybe<Scalars['String']['input']>;
  callId_not_contains?: InputMaybe<Scalars['String']['input']>;
  callId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  callId_not_eq?: InputMaybe<Scalars['String']['input']>;
  callId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  callId_startsWith?: InputMaybe<Scalars['String']['input']>;
  callSignature_contains?: InputMaybe<Scalars['String']['input']>;
  callSignature_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callSignature_endsWith?: InputMaybe<Scalars['String']['input']>;
  callSignature_eq?: InputMaybe<Scalars['String']['input']>;
  callSignature_gt?: InputMaybe<Scalars['String']['input']>;
  callSignature_gte?: InputMaybe<Scalars['String']['input']>;
  callSignature_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callSignature_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callSignature_lt?: InputMaybe<Scalars['String']['input']>;
  callSignature_lte?: InputMaybe<Scalars['String']['input']>;
  callSignature_not_contains?: InputMaybe<Scalars['String']['input']>;
  callSignature_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callSignature_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  callSignature_not_eq?: InputMaybe<Scalars['String']['input']>;
  callSignature_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callSignature_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  callSignature_startsWith?: InputMaybe<Scalars['String']['input']>;
  callTarget_contains?: InputMaybe<Scalars['String']['input']>;
  callTarget_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callTarget_endsWith?: InputMaybe<Scalars['String']['input']>;
  callTarget_eq?: InputMaybe<Scalars['String']['input']>;
  callTarget_gt?: InputMaybe<Scalars['String']['input']>;
  callTarget_gte?: InputMaybe<Scalars['String']['input']>;
  callTarget_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callTarget_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callTarget_lt?: InputMaybe<Scalars['String']['input']>;
  callTarget_lte?: InputMaybe<Scalars['String']['input']>;
  callTarget_not_contains?: InputMaybe<Scalars['String']['input']>;
  callTarget_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callTarget_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  callTarget_not_eq?: InputMaybe<Scalars['String']['input']>;
  callTarget_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callTarget_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  callTarget_startsWith?: InputMaybe<Scalars['String']['input']>;
  callValue_eq?: InputMaybe<Scalars['BigInt']['input']>;
  callValue_gt?: InputMaybe<Scalars['BigInt']['input']>;
  callValue_gte?: InputMaybe<Scalars['BigInt']['input']>;
  callValue_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  callValue_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callValue_lt?: InputMaybe<Scalars['BigInt']['input']>;
  callValue_lte?: InputMaybe<Scalars['BigInt']['input']>;
  callValue_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  callValue_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  cancelledAtBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  cancelledAtBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  cancelledAtBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  cancelledAtBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  cancelledAtBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  cancelledAtBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  cancelledAtBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  cancelledAtBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  cancelledAtBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  cancelledAtTimestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  cancelledAtTimestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  cancelledAtTimestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  cancelledAtTimestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  cancelledAtTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  cancelledAtTimestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  cancelledAtTimestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  cancelledAtTimestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  cancelledAtTimestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  cancelledTxHash_contains?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_eq?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_gt?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_gte?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  cancelledTxHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  cancelledTxHash_lt?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_lte?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  cancelledTxHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  cancelledTxHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  chainId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAtBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAtBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdAtTimestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdAtTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdTxHash_contains?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_eq?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_gt?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_gte?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  createdTxHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdTxHash_lt?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_lte?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  createdTxHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  createdTxHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  delayDoneTimestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  delayDoneTimestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  delayDoneTimestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  delayDoneTimestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  delayDoneTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delayDoneTimestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  delayDoneTimestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  delayDoneTimestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  delayDoneTimestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  executedAtBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  executedAtBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  executedAtBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  executedAtBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  executedAtBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  executedAtBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  executedAtBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  executedAtBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  executedAtBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  executedAtTimestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  executedAtTimestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  executedAtTimestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  executedAtTimestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  executedAtTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  executedAtTimestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  executedAtTimestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  executedAtTimestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  executedAtTimestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  executedTxHash_contains?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_eq?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_gt?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_gte?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  executedTxHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  executedTxHash_lt?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_lte?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  executedTxHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  executedTxHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  predecessor_contains?: InputMaybe<Scalars['String']['input']>;
  predecessor_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  predecessor_endsWith?: InputMaybe<Scalars['String']['input']>;
  predecessor_eq?: InputMaybe<Scalars['String']['input']>;
  predecessor_gt?: InputMaybe<Scalars['String']['input']>;
  predecessor_gte?: InputMaybe<Scalars['String']['input']>;
  predecessor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  predecessor_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  predecessor_lt?: InputMaybe<Scalars['String']['input']>;
  predecessor_lte?: InputMaybe<Scalars['String']['input']>;
  predecessor_not_contains?: InputMaybe<Scalars['String']['input']>;
  predecessor_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  predecessor_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  predecessor_not_eq?: InputMaybe<Scalars['String']['input']>;
  predecessor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  predecessor_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  predecessor_startsWith?: InputMaybe<Scalars['String']['input']>;
  salt_contains?: InputMaybe<Scalars['String']['input']>;
  salt_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  salt_endsWith?: InputMaybe<Scalars['String']['input']>;
  salt_eq?: InputMaybe<Scalars['String']['input']>;
  salt_gt?: InputMaybe<Scalars['String']['input']>;
  salt_gte?: InputMaybe<Scalars['String']['input']>;
  salt_in?: InputMaybe<Array<Scalars['String']['input']>>;
  salt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  salt_lt?: InputMaybe<Scalars['String']['input']>;
  salt_lte?: InputMaybe<Scalars['String']['input']>;
  salt_not_contains?: InputMaybe<Scalars['String']['input']>;
  salt_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  salt_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  salt_not_eq?: InputMaybe<Scalars['String']['input']>;
  salt_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  salt_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  salt_startsWith?: InputMaybe<Scalars['String']['input']>;
  status_eq?: InputMaybe<EvmTimelockCallStatus>;
  status_in?: InputMaybe<Array<EvmTimelockCallStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<EvmTimelockCallStatus>;
  status_not_in?: InputMaybe<Array<EvmTimelockCallStatus>>;
};

export type EvmTimelockCallsConnection = {
  __typename?: 'EvmTimelockCallsConnection';
  edges: Array<EvmTimelockCallEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  bridgeTransferById?: Maybe<BridgeTransfer>;
  /** @deprecated Use bridgeTransferById */
  bridgeTransferByUniqueInput?: Maybe<BridgeTransfer>;
  bridgeTransfers: Array<BridgeTransfer>;
  bridgeTransfersConnection: BridgeTransfersConnection;
  evmBridgeConfigById?: Maybe<EvmBridgeConfig>;
  /** @deprecated Use evmBridgeConfigById */
  evmBridgeConfigByUniqueInput?: Maybe<EvmBridgeConfig>;
  evmBridgeConfigs: Array<EvmBridgeConfig>;
  evmBridgeConfigsConnection: EvmBridgeConfigsConnection;
  evmBridgeFeeChangedEventById?: Maybe<EvmBridgeFeeChangedEvent>;
  /** @deprecated Use evmBridgeFeeChangedEventById */
  evmBridgeFeeChangedEventByUniqueInput?: Maybe<EvmBridgeFeeChangedEvent>;
  evmBridgeFeeChangedEvents: Array<EvmBridgeFeeChangedEvent>;
  evmBridgeFeeChangedEventsConnection: EvmBridgeFeeChangedEventsConnection;
  evmBridgeFeesWithdrawnEventById?: Maybe<EvmBridgeFeesWithdrawnEvent>;
  /** @deprecated Use evmBridgeFeesWithdrawnEventById */
  evmBridgeFeesWithdrawnEventByUniqueInput?: Maybe<EvmBridgeFeesWithdrawnEvent>;
  evmBridgeFeesWithdrawnEvents: Array<EvmBridgeFeesWithdrawnEvent>;
  evmBridgeFeesWithdrawnEventsConnection: EvmBridgeFeesWithdrawnEventsConnection;
  evmBridgeMintingLimitsUpdatedEventById?: Maybe<EvmBridgeMintingLimitsUpdatedEvent>;
  /** @deprecated Use evmBridgeMintingLimitsUpdatedEventById */
  evmBridgeMintingLimitsUpdatedEventByUniqueInput?: Maybe<EvmBridgeMintingLimitsUpdatedEvent>;
  evmBridgeMintingLimitsUpdatedEvents: Array<EvmBridgeMintingLimitsUpdatedEvent>;
  evmBridgeMintingLimitsUpdatedEventsConnection: EvmBridgeMintingLimitsUpdatedEventsConnection;
  evmBridgeStatusChangedEventById?: Maybe<EvmBridgeStatusChangedEvent>;
  /** @deprecated Use evmBridgeStatusChangedEventById */
  evmBridgeStatusChangedEventByUniqueInput?: Maybe<EvmBridgeStatusChangedEvent>;
  evmBridgeStatusChangedEvents: Array<EvmBridgeStatusChangedEvent>;
  evmBridgeStatusChangedEventsConnection: EvmBridgeStatusChangedEventsConnection;
  evmBridgeTransferToEthCompletedEventById?: Maybe<EvmBridgeTransferToEthCompletedEvent>;
  /** @deprecated Use evmBridgeTransferToEthCompletedEventById */
  evmBridgeTransferToEthCompletedEventByUniqueInput?: Maybe<EvmBridgeTransferToEthCompletedEvent>;
  evmBridgeTransferToEthCompletedEvents: Array<EvmBridgeTransferToEthCompletedEvent>;
  evmBridgeTransferToEthCompletedEventsConnection: EvmBridgeTransferToEthCompletedEventsConnection;
  evmBridgeTransferToJoystreamRequestedEventById?: Maybe<EvmBridgeTransferToJoystreamRequestedEvent>;
  /** @deprecated Use evmBridgeTransferToJoystreamRequestedEventById */
  evmBridgeTransferToJoystreamRequestedEventByUniqueInput?: Maybe<EvmBridgeTransferToJoystreamRequestedEvent>;
  evmBridgeTransferToJoystreamRequestedEvents: Array<EvmBridgeTransferToJoystreamRequestedEvent>;
  evmBridgeTransferToJoystreamRequestedEventsConnection: EvmBridgeTransferToJoystreamRequestedEventsConnection;
  evmTimelockCallById?: Maybe<EvmTimelockCall>;
  /** @deprecated Use evmTimelockCallById */
  evmTimelockCallByUniqueInput?: Maybe<EvmTimelockCall>;
  evmTimelockCalls: Array<EvmTimelockCall>;
  evmTimelockCallsConnection: EvmTimelockCallsConnection;
  squidStatus?: Maybe<SquidStatus>;
};


export type QueryBridgeTransferByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBridgeTransferByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBridgeTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BridgeTransferOrderByInput>>;
  where?: InputMaybe<BridgeTransferWhereInput>;
};


export type QueryBridgeTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BridgeTransferOrderByInput>;
  where?: InputMaybe<BridgeTransferWhereInput>;
};


export type QueryEvmBridgeConfigByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeConfigByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeConfigsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeConfigOrderByInput>>;
  where?: InputMaybe<EvmBridgeConfigWhereInput>;
};


export type QueryEvmBridgeConfigsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeConfigOrderByInput>;
  where?: InputMaybe<EvmBridgeConfigWhereInput>;
};


export type QueryEvmBridgeFeeChangedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeFeeChangedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeFeeChangedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeFeeChangedEventOrderByInput>>;
  where?: InputMaybe<EvmBridgeFeeChangedEventWhereInput>;
};


export type QueryEvmBridgeFeeChangedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeFeeChangedEventOrderByInput>;
  where?: InputMaybe<EvmBridgeFeeChangedEventWhereInput>;
};


export type QueryEvmBridgeFeesWithdrawnEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeFeesWithdrawnEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeFeesWithdrawnEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeFeesWithdrawnEventOrderByInput>>;
  where?: InputMaybe<EvmBridgeFeesWithdrawnEventWhereInput>;
};


export type QueryEvmBridgeFeesWithdrawnEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeFeesWithdrawnEventOrderByInput>;
  where?: InputMaybe<EvmBridgeFeesWithdrawnEventWhereInput>;
};


export type QueryEvmBridgeMintingLimitsUpdatedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeMintingLimitsUpdatedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeMintingLimitsUpdatedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeMintingLimitsUpdatedEventOrderByInput>>;
  where?: InputMaybe<EvmBridgeMintingLimitsUpdatedEventWhereInput>;
};


export type QueryEvmBridgeMintingLimitsUpdatedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeMintingLimitsUpdatedEventOrderByInput>;
  where?: InputMaybe<EvmBridgeMintingLimitsUpdatedEventWhereInput>;
};


export type QueryEvmBridgeStatusChangedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeStatusChangedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeStatusChangedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeStatusChangedEventOrderByInput>>;
  where?: InputMaybe<EvmBridgeStatusChangedEventWhereInput>;
};


export type QueryEvmBridgeStatusChangedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeStatusChangedEventOrderByInput>;
  where?: InputMaybe<EvmBridgeStatusChangedEventWhereInput>;
};


export type QueryEvmBridgeTransferToEthCompletedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeTransferToEthCompletedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeTransferToEthCompletedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeTransferToEthCompletedEventOrderByInput>>;
  where?: InputMaybe<EvmBridgeTransferToEthCompletedEventWhereInput>;
};


export type QueryEvmBridgeTransferToEthCompletedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeTransferToEthCompletedEventOrderByInput>;
  where?: InputMaybe<EvmBridgeTransferToEthCompletedEventWhereInput>;
};


export type QueryEvmBridgeTransferToJoystreamRequestedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeTransferToJoystreamRequestedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeTransferToJoystreamRequestedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeTransferToJoystreamRequestedEventOrderByInput>>;
  where?: InputMaybe<EvmBridgeTransferToJoystreamRequestedEventWhereInput>;
};


export type QueryEvmBridgeTransferToJoystreamRequestedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeTransferToJoystreamRequestedEventOrderByInput>;
  where?: InputMaybe<EvmBridgeTransferToJoystreamRequestedEventWhereInput>;
};


export type QueryEvmTimelockCallByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmTimelockCallByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmTimelockCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmTimelockCallOrderByInput>>;
  where?: InputMaybe<EvmTimelockCallWhereInput>;
};


export type QueryEvmTimelockCallsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmTimelockCallOrderByInput>;
  where?: InputMaybe<EvmTimelockCallWhereInput>;
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

export type GetTimelockCallsQueryVariables = Exact<{
  where?: InputMaybe<EvmTimelockCallWhereInput>;
}>;


export type GetTimelockCallsQuery = { __typename?: 'Query', evmTimelockCalls: Array<{ __typename?: 'EvmTimelockCall', id: string, callArgs?: string | null, callData: string, callSignature?: string | null, callTarget: string, callValue: string, cancelledAtBlock?: number | null, cancelledAtTimestamp?: string | null, cancelledTxHash?: string | null, createdAtBlock: number, createdAtTimestamp: string, createdTxHash: string, delayDoneTimestamp: string, executedAtBlock?: number | null, executedAtTimestamp?: string | null, executedTxHash?: string | null, predecessor?: string | null, salt?: string | null, status: EvmTimelockCallStatus }> };

export type GetEvmBridgeConfigQueryVariables = Exact<{
  chainId: Scalars['String']['input'];
}>;


export type GetEvmBridgeConfigQuery = { __typename?: 'Query', evmBridgeConfigs: Array<{ __typename?: 'EvmBridgeConfig', id: string, status: EvmBridgeStatus, bridgingFee: string, totalMinted: string, totalBurned: string, mintingLimits: { __typename?: 'EvmBridgeMintingLimits', periodLength: number, periodLimit: string, currentPeriodMinted: string, currentPeriodEndBlock: number } }> };

export type GetBridgeTransfersQueryVariables = Exact<{
  where?: InputMaybe<BridgeTransferWhereInput>;
}>;


export type GetBridgeTransfersQuery = { __typename?: 'Query', bridgeTransfers: Array<{ __typename?: 'BridgeTransfer', id: string, amount: string, status: BridgeTransferStatus, feePaid: string, sourceChainId: string, sourceTransferId: string, sourceAccount: string, destChainId: string, destAccount: string, createdAtBlock: number, createdAtTimestamp: string, createdTxHash: string, completedTxHash?: string | null, completedAtTimestamp?: string | null, completedAtBlock?: number | null }> };


export const GetTimelockCallsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTimelockCalls"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EvmTimelockCallWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"evmTimelockCalls"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"createdAtBlock_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"callArgs"}},{"kind":"Field","name":{"kind":"Name","value":"callData"}},{"kind":"Field","name":{"kind":"Name","value":"callSignature"}},{"kind":"Field","name":{"kind":"Name","value":"callTarget"}},{"kind":"Field","name":{"kind":"Name","value":"callValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"delayDoneTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"executedAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"executedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"executedTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"predecessor"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetTimelockCallsQuery, GetTimelockCallsQueryVariables>;
export const GetEvmBridgeConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvmBridgeConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"evmBridgeConfigs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"bridgingFee"}},{"kind":"Field","name":{"kind":"Name","value":"mintingLimits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"periodLength"}},{"kind":"Field","name":{"kind":"Name","value":"periodLimit"}},{"kind":"Field","name":{"kind":"Name","value":"currentPeriodMinted"}},{"kind":"Field","name":{"kind":"Name","value":"currentPeriodEndBlock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalMinted"}},{"kind":"Field","name":{"kind":"Name","value":"totalBurned"}}]}}]}}]} as unknown as DocumentNode<GetEvmBridgeConfigQuery, GetEvmBridgeConfigQueryVariables>;
export const GetBridgeTransfersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBridgeTransfers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BridgeTransferWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bridgeTransfers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"createdAtBlock_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"feePaid"}},{"kind":"Field","name":{"kind":"Name","value":"sourceChainId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceTransferId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceAccount"}},{"kind":"Field","name":{"kind":"Name","value":"destChainId"}},{"kind":"Field","name":{"kind":"Name","value":"destAccount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"completedTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"completedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"completedAtBlock"}}]}}]}}]} as unknown as DocumentNode<GetBridgeTransfersQuery, GetBridgeTransfersQueryVariables>;