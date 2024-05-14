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
  BigInt: { input: any; output: any; }
  /** A date-time string in simplified extended ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  DateTime: { input: any; output: any; }
};

export type EthereumCompletedTransfer = {
  __typename?: 'EthereumCompletedTransfer';
  amount: Scalars['BigInt']['output'];
  block: Scalars['Int']['output'];
  ethDestAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  joyId: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EthereumCompletedTransferEdge = {
  __typename?: 'EthereumCompletedTransferEdge';
  cursor: Scalars['String']['output'];
  node: EthereumCompletedTransfer;
};

export enum EthereumCompletedTransferOrderByInput {
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
  JoyIdAsc = 'joyId_ASC',
  JoyIdAscNullsFirst = 'joyId_ASC_NULLS_FIRST',
  JoyIdAscNullsLast = 'joyId_ASC_NULLS_LAST',
  JoyIdDesc = 'joyId_DESC',
  JoyIdDescNullsFirst = 'joyId_DESC_NULLS_FIRST',
  JoyIdDescNullsLast = 'joyId_DESC_NULLS_LAST',
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

export type EthereumCompletedTransferWhereInput = {
  AND?: InputMaybe<Array<EthereumCompletedTransferWhereInput>>;
  OR?: InputMaybe<Array<EthereumCompletedTransferWhereInput>>;
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
  joyId_contains?: InputMaybe<Scalars['String']['input']>;
  joyId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  joyId_endsWith?: InputMaybe<Scalars['String']['input']>;
  joyId_eq?: InputMaybe<Scalars['String']['input']>;
  joyId_gt?: InputMaybe<Scalars['String']['input']>;
  joyId_gte?: InputMaybe<Scalars['String']['input']>;
  joyId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  joyId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  joyId_lt?: InputMaybe<Scalars['String']['input']>;
  joyId_lte?: InputMaybe<Scalars['String']['input']>;
  joyId_not_contains?: InputMaybe<Scalars['String']['input']>;
  joyId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  joyId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  joyId_not_eq?: InputMaybe<Scalars['String']['input']>;
  joyId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  joyId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  joyId_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EthereumCompletedTransfersConnection = {
  __typename?: 'EthereumCompletedTransfersConnection';
  edges: Array<EthereumCompletedTransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EthereumRequestedTransfer = {
  __typename?: 'EthereumRequestedTransfer';
  amount: Scalars['BigInt']['output'];
  block: Scalars['Int']['output'];
  feePaid: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  joyDestAccount: Scalars['String']['output'];
  requestBlock: Scalars['Int']['output'];
  requester: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EthereumRequestedTransferEdge = {
  __typename?: 'EthereumRequestedTransferEdge';
  cursor: Scalars['String']['output'];
  node: EthereumRequestedTransfer;
};

export enum EthereumRequestedTransferOrderByInput {
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
  JoyDestAccountAsc = 'joyDestAccount_ASC',
  JoyDestAccountAscNullsFirst = 'joyDestAccount_ASC_NULLS_FIRST',
  JoyDestAccountAscNullsLast = 'joyDestAccount_ASC_NULLS_LAST',
  JoyDestAccountDesc = 'joyDestAccount_DESC',
  JoyDestAccountDescNullsFirst = 'joyDestAccount_DESC_NULLS_FIRST',
  JoyDestAccountDescNullsLast = 'joyDestAccount_DESC_NULLS_LAST',
  RequestBlockAsc = 'requestBlock_ASC',
  RequestBlockAscNullsFirst = 'requestBlock_ASC_NULLS_FIRST',
  RequestBlockAscNullsLast = 'requestBlock_ASC_NULLS_LAST',
  RequestBlockDesc = 'requestBlock_DESC',
  RequestBlockDescNullsFirst = 'requestBlock_DESC_NULLS_FIRST',
  RequestBlockDescNullsLast = 'requestBlock_DESC_NULLS_LAST',
  RequesterAsc = 'requester_ASC',
  RequesterAscNullsFirst = 'requester_ASC_NULLS_FIRST',
  RequesterAscNullsLast = 'requester_ASC_NULLS_LAST',
  RequesterDesc = 'requester_DESC',
  RequesterDescNullsFirst = 'requester_DESC_NULLS_FIRST',
  RequesterDescNullsLast = 'requester_DESC_NULLS_LAST',
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

export type EthereumRequestedTransferWhereInput = {
  AND?: InputMaybe<Array<EthereumRequestedTransferWhereInput>>;
  OR?: InputMaybe<Array<EthereumRequestedTransferWhereInput>>;
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
  requestBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  requestBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  requestBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  requestBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  requestBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  requestBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  requestBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  requestBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  requestBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  requester_contains?: InputMaybe<Scalars['String']['input']>;
  requester_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  requester_endsWith?: InputMaybe<Scalars['String']['input']>;
  requester_eq?: InputMaybe<Scalars['String']['input']>;
  requester_gt?: InputMaybe<Scalars['String']['input']>;
  requester_gte?: InputMaybe<Scalars['String']['input']>;
  requester_in?: InputMaybe<Array<Scalars['String']['input']>>;
  requester_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  requester_lt?: InputMaybe<Scalars['String']['input']>;
  requester_lte?: InputMaybe<Scalars['String']['input']>;
  requester_not_contains?: InputMaybe<Scalars['String']['input']>;
  requester_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  requester_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  requester_not_eq?: InputMaybe<Scalars['String']['input']>;
  requester_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  requester_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  requester_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EthereumRequestedTransfersConnection = {
  __typename?: 'EthereumRequestedTransfersConnection';
  edges: Array<EthereumRequestedTransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmBridgeConfig = {
  __typename?: 'EvmBridgeConfig';
  bridgingFee: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  mintingLimits: EvmMintingLimits;
  status: EvmBridgeStatus;
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
  StatusDescNullsLast = 'status_DESC_NULLS_LAST'
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
  mintingLimits?: InputMaybe<EvmMintingLimitsWhereInput>;
  mintingLimits_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_eq?: InputMaybe<EvmBridgeStatus>;
  status_in?: InputMaybe<Array<EvmBridgeStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<EvmBridgeStatus>;
  status_not_in?: InputMaybe<Array<EvmBridgeStatus>>;
};

export type EvmBridgeConfigsConnection = {
  __typename?: 'EvmBridgeConfigsConnection';
  edges: Array<EvmBridgeConfigEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmBridgeFeesWithdrawn = {
  __typename?: 'EvmBridgeFeesWithdrawn';
  amount: Scalars['BigInt']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['String']['output'];
  destination: Scalars['String']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeFeesWithdrawnEdge = {
  __typename?: 'EvmBridgeFeesWithdrawnEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeFeesWithdrawn;
};

export enum EvmBridgeFeesWithdrawnOrderByInput {
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

export type EvmBridgeFeesWithdrawnWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeFeesWithdrawnWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeFeesWithdrawnWhereInput>>;
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
  chainId_contains?: InputMaybe<Scalars['String']['input']>;
  chainId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  chainId_endsWith?: InputMaybe<Scalars['String']['input']>;
  chainId_eq?: InputMaybe<Scalars['String']['input']>;
  chainId_gt?: InputMaybe<Scalars['String']['input']>;
  chainId_gte?: InputMaybe<Scalars['String']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['String']['input']>;
  chainId_lte?: InputMaybe<Scalars['String']['input']>;
  chainId_not_contains?: InputMaybe<Scalars['String']['input']>;
  chainId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  chainId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['String']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  chainId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  chainId_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EvmBridgeFeesWithdrawnsConnection = {
  __typename?: 'EvmBridgeFeesWithdrawnsConnection';
  edges: Array<EvmBridgeFeesWithdrawnEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum EvmBridgeStatus {
  Active = 'ACTIVE',
  Paused = 'PAUSED'
}

export type EvmMintingLimits = {
  __typename?: 'EvmMintingLimits';
  currentPeriodMinted: Scalars['BigInt']['output'];
  periodLength: Scalars['Int']['output'];
  periodLimit: Scalars['BigInt']['output'];
};

export type EvmMintingLimitsWhereInput = {
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

export type EvmTimelockCall = {
  __typename?: 'EvmTimelockCall';
  callArgs?: Maybe<Scalars['String']['output']>;
  callData: Scalars['String']['output'];
  callSignature?: Maybe<Scalars['String']['output']>;
  callTarget: Scalars['String']['output'];
  callValue: Scalars['BigInt']['output'];
  cancelledAtBlock?: Maybe<Scalars['Int']['output']>;
  cancelledAtTimestamp?: Maybe<Scalars['DateTime']['output']>;
  cancelledTxHash?: Maybe<Scalars['String']['output']>;
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
  ethereumCompletedTransferById?: Maybe<EthereumCompletedTransfer>;
  /** @deprecated Use ethereumCompletedTransferById */
  ethereumCompletedTransferByUniqueInput?: Maybe<EthereumCompletedTransfer>;
  ethereumCompletedTransfers: Array<EthereumCompletedTransfer>;
  ethereumCompletedTransfersConnection: EthereumCompletedTransfersConnection;
  ethereumRequestedTransferById?: Maybe<EthereumRequestedTransfer>;
  /** @deprecated Use ethereumRequestedTransferById */
  ethereumRequestedTransferByUniqueInput?: Maybe<EthereumRequestedTransfer>;
  ethereumRequestedTransfers: Array<EthereumRequestedTransfer>;
  ethereumRequestedTransfersConnection: EthereumRequestedTransfersConnection;
  evmBridgeConfigById?: Maybe<EvmBridgeConfig>;
  /** @deprecated Use evmBridgeConfigById */
  evmBridgeConfigByUniqueInput?: Maybe<EvmBridgeConfig>;
  evmBridgeConfigs: Array<EvmBridgeConfig>;
  evmBridgeConfigsConnection: EvmBridgeConfigsConnection;
  evmBridgeFeesWithdrawnById?: Maybe<EvmBridgeFeesWithdrawn>;
  /** @deprecated Use evmBridgeFeesWithdrawnById */
  evmBridgeFeesWithdrawnByUniqueInput?: Maybe<EvmBridgeFeesWithdrawn>;
  evmBridgeFeesWithdrawns: Array<EvmBridgeFeesWithdrawn>;
  evmBridgeFeesWithdrawnsConnection: EvmBridgeFeesWithdrawnsConnection;
  evmTimelockCallById?: Maybe<EvmTimelockCall>;
  /** @deprecated Use evmTimelockCallById */
  evmTimelockCallByUniqueInput?: Maybe<EvmTimelockCall>;
  evmTimelockCalls: Array<EvmTimelockCall>;
  evmTimelockCallsConnection: EvmTimelockCallsConnection;
  squidStatus?: Maybe<SquidStatus>;
};


export type QueryEthereumCompletedTransferByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEthereumCompletedTransferByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEthereumCompletedTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EthereumCompletedTransferOrderByInput>>;
  where?: InputMaybe<EthereumCompletedTransferWhereInput>;
};


export type QueryEthereumCompletedTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EthereumCompletedTransferOrderByInput>;
  where?: InputMaybe<EthereumCompletedTransferWhereInput>;
};


export type QueryEthereumRequestedTransferByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEthereumRequestedTransferByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEthereumRequestedTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EthereumRequestedTransferOrderByInput>>;
  where?: InputMaybe<EthereumRequestedTransferWhereInput>;
};


export type QueryEthereumRequestedTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EthereumRequestedTransferOrderByInput>;
  where?: InputMaybe<EthereumRequestedTransferWhereInput>;
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


export type QueryEvmBridgeFeesWithdrawnByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeFeesWithdrawnByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeFeesWithdrawnsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeFeesWithdrawnOrderByInput>>;
  where?: InputMaybe<EvmBridgeFeesWithdrawnWhereInput>;
};


export type QueryEvmBridgeFeesWithdrawnsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeFeesWithdrawnOrderByInput>;
  where?: InputMaybe<EvmBridgeFeesWithdrawnWhereInput>;
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
  orderBy?: InputMaybe<Array<EvmTimelockCallOrderByInput> | EvmTimelockCallOrderByInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTimelockCallsQuery = { __typename?: 'Query', evmTimelockCalls: Array<{ __typename?: 'EvmTimelockCall', id: string, callArgs?: string | null, callData: string, callSignature?: string | null, callTarget: string, callValue: any, cancelledAtBlock?: number | null, cancelledAtTimestamp?: any | null, cancelledTxHash?: string | null, createdAtBlock: number, createdAtTimestamp: any, createdTxHash: string, delayDoneTimestamp: any, executedAtBlock?: number | null, executedAtTimestamp?: any | null, executedTxHash?: string | null, predecessor?: string | null, salt?: string | null, status: EvmTimelockCallStatus }> };


export const GetTimelockCallsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTimelockCalls"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EvmTimelockCallWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EvmTimelockCallOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"evmTimelockCalls"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"callArgs"}},{"kind":"Field","name":{"kind":"Name","value":"callData"}},{"kind":"Field","name":{"kind":"Name","value":"callSignature"}},{"kind":"Field","name":{"kind":"Name","value":"callTarget"}},{"kind":"Field","name":{"kind":"Name","value":"callValue"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"delayDoneTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"executedAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"executedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"executedTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"predecessor"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetTimelockCallsQuery, GetTimelockCallsQueryVariables>;