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
  destChainId: Scalars['Int']['output'];
  feePaid: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  revertAccount?: Maybe<Scalars['String']['output']>;
  revertAmount?: Maybe<Scalars['BigInt']['output']>;
  revertReason?: Maybe<Scalars['String']['output']>;
  revertedAtBlock?: Maybe<Scalars['Int']['output']>;
  revertedAtTimestamp?: Maybe<Scalars['DateTime']['output']>;
  revertedTxHash?: Maybe<Scalars['String']['output']>;
  sourceAccount: Scalars['String']['output'];
  sourceChainId: Scalars['Int']['output'];
  sourceTransferId: Scalars['BigInt']['output'];
  status: BridgeTransferStatus;
  type: BridgeTransferType;
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
  RevertAccountAsc = 'revertAccount_ASC',
  RevertAccountAscNullsFirst = 'revertAccount_ASC_NULLS_FIRST',
  RevertAccountAscNullsLast = 'revertAccount_ASC_NULLS_LAST',
  RevertAccountDesc = 'revertAccount_DESC',
  RevertAccountDescNullsFirst = 'revertAccount_DESC_NULLS_FIRST',
  RevertAccountDescNullsLast = 'revertAccount_DESC_NULLS_LAST',
  RevertAmountAsc = 'revertAmount_ASC',
  RevertAmountAscNullsFirst = 'revertAmount_ASC_NULLS_FIRST',
  RevertAmountAscNullsLast = 'revertAmount_ASC_NULLS_LAST',
  RevertAmountDesc = 'revertAmount_DESC',
  RevertAmountDescNullsFirst = 'revertAmount_DESC_NULLS_FIRST',
  RevertAmountDescNullsLast = 'revertAmount_DESC_NULLS_LAST',
  RevertReasonAsc = 'revertReason_ASC',
  RevertReasonAscNullsFirst = 'revertReason_ASC_NULLS_FIRST',
  RevertReasonAscNullsLast = 'revertReason_ASC_NULLS_LAST',
  RevertReasonDesc = 'revertReason_DESC',
  RevertReasonDescNullsFirst = 'revertReason_DESC_NULLS_FIRST',
  RevertReasonDescNullsLast = 'revertReason_DESC_NULLS_LAST',
  RevertedAtBlockAsc = 'revertedAtBlock_ASC',
  RevertedAtBlockAscNullsFirst = 'revertedAtBlock_ASC_NULLS_FIRST',
  RevertedAtBlockAscNullsLast = 'revertedAtBlock_ASC_NULLS_LAST',
  RevertedAtBlockDesc = 'revertedAtBlock_DESC',
  RevertedAtBlockDescNullsFirst = 'revertedAtBlock_DESC_NULLS_FIRST',
  RevertedAtBlockDescNullsLast = 'revertedAtBlock_DESC_NULLS_LAST',
  RevertedAtTimestampAsc = 'revertedAtTimestamp_ASC',
  RevertedAtTimestampAscNullsFirst = 'revertedAtTimestamp_ASC_NULLS_FIRST',
  RevertedAtTimestampAscNullsLast = 'revertedAtTimestamp_ASC_NULLS_LAST',
  RevertedAtTimestampDesc = 'revertedAtTimestamp_DESC',
  RevertedAtTimestampDescNullsFirst = 'revertedAtTimestamp_DESC_NULLS_FIRST',
  RevertedAtTimestampDescNullsLast = 'revertedAtTimestamp_DESC_NULLS_LAST',
  RevertedTxHashAsc = 'revertedTxHash_ASC',
  RevertedTxHashAscNullsFirst = 'revertedTxHash_ASC_NULLS_FIRST',
  RevertedTxHashAscNullsLast = 'revertedTxHash_ASC_NULLS_LAST',
  RevertedTxHashDesc = 'revertedTxHash_DESC',
  RevertedTxHashDescNullsFirst = 'revertedTxHash_DESC_NULLS_FIRST',
  RevertedTxHashDescNullsLast = 'revertedTxHash_DESC_NULLS_LAST',
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
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST'
}

export enum BridgeTransferStatus {
  Completed = 'COMPLETED',
  MaybeCompleted = 'MAYBE_COMPLETED',
  Requested = 'REQUESTED',
  Reverted = 'REVERTED'
}

export enum BridgeTransferType {
  EvmToJoy = 'EVM_TO_JOY',
  JoyToEvm = 'JOY_TO_EVM'
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
  destChainId_eq?: InputMaybe<Scalars['Int']['input']>;
  destChainId_gt?: InputMaybe<Scalars['Int']['input']>;
  destChainId_gte?: InputMaybe<Scalars['Int']['input']>;
  destChainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  destChainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  destChainId_lt?: InputMaybe<Scalars['Int']['input']>;
  destChainId_lte?: InputMaybe<Scalars['Int']['input']>;
  destChainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  destChainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  revertAccount_contains?: InputMaybe<Scalars['String']['input']>;
  revertAccount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  revertAccount_endsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_eq?: InputMaybe<Scalars['String']['input']>;
  revertAccount_gt?: InputMaybe<Scalars['String']['input']>;
  revertAccount_gte?: InputMaybe<Scalars['String']['input']>;
  revertAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  revertAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revertAccount_lt?: InputMaybe<Scalars['String']['input']>;
  revertAccount_lte?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_eq?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  revertAccount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revertAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revertAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revertReason_contains?: InputMaybe<Scalars['String']['input']>;
  revertReason_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  revertReason_endsWith?: InputMaybe<Scalars['String']['input']>;
  revertReason_eq?: InputMaybe<Scalars['String']['input']>;
  revertReason_gt?: InputMaybe<Scalars['String']['input']>;
  revertReason_gte?: InputMaybe<Scalars['String']['input']>;
  revertReason_in?: InputMaybe<Array<Scalars['String']['input']>>;
  revertReason_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revertReason_lt?: InputMaybe<Scalars['String']['input']>;
  revertReason_lte?: InputMaybe<Scalars['String']['input']>;
  revertReason_not_contains?: InputMaybe<Scalars['String']['input']>;
  revertReason_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  revertReason_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  revertReason_not_eq?: InputMaybe<Scalars['String']['input']>;
  revertReason_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  revertReason_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertReason_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertedAtBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  revertedAtBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  revertedAtBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  revertedAtBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  revertedAtBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revertedAtBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  revertedAtBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  revertedAtBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  revertedAtBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  revertedAtTimestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  revertedAtTimestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  revertedAtTimestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  revertedAtTimestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  revertedAtTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revertedAtTimestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  revertedAtTimestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  revertedAtTimestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  revertedAtTimestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  revertedTxHash_contains?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_eq?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_gt?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_gte?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  revertedTxHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revertedTxHash_lt?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_lte?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  revertedTxHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertedTxHash_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  sourceChainId_eq?: InputMaybe<Scalars['Int']['input']>;
  sourceChainId_gt?: InputMaybe<Scalars['Int']['input']>;
  sourceChainId_gte?: InputMaybe<Scalars['Int']['input']>;
  sourceChainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sourceChainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sourceChainId_lt?: InputMaybe<Scalars['Int']['input']>;
  sourceChainId_lte?: InputMaybe<Scalars['Int']['input']>;
  sourceChainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  sourceChainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  type_eq?: InputMaybe<BridgeTransferType>;
  type_in?: InputMaybe<Array<BridgeTransferType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<BridgeTransferType>;
  type_not_in?: InputMaybe<Array<BridgeTransferType>>;
};

export type BridgeTransfersConnection = {
  __typename?: 'BridgeTransfersConnection';
  edges: Array<BridgeTransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Event = {
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash?: Maybe<Scalars['String']['output']>;
};

export type EvmBridgeConfig = {
  __typename?: 'EvmBridgeConfig';
  bridgeAdminAccounts: Array<Scalars['String']['output']>;
  bridgeOperatorAccounts: Array<Scalars['String']['output']>;
  bridgingFee: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  mintingLimits: EvmBridgeMintingLimits;
  pauserAccounts: Array<Scalars['String']['output']>;
  status: EvmBridgeStatus;
  timelockAdminAccounts: Array<Scalars['String']['output']>;
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
  bridgeAdminAccounts_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  bridgeAdminAccounts_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  bridgeAdminAccounts_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  bridgeAdminAccounts_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  bridgeOperatorAccounts_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  bridgeOperatorAccounts_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  bridgeOperatorAccounts_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  bridgeOperatorAccounts_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  pauserAccounts_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  pauserAccounts_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  pauserAccounts_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  pauserAccounts_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_eq?: InputMaybe<EvmBridgeStatus>;
  status_in?: InputMaybe<Array<EvmBridgeStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<EvmBridgeStatus>;
  status_not_in?: InputMaybe<Array<EvmBridgeStatus>>;
  timelockAdminAccounts_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  timelockAdminAccounts_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  timelockAdminAccounts_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  timelockAdminAccounts_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  chainId: Scalars['Int']['output'];
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  chainId: Scalars['Int']['output'];
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  chainId: Scalars['Int']['output'];
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type EvmBridgeRoleGrantedEvent = Event & {
  __typename?: 'EvmBridgeRoleGrantedEvent';
  account: Scalars['String']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  role: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeRoleGrantedEventEdge = {
  __typename?: 'EvmBridgeRoleGrantedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeRoleGrantedEvent;
};

export enum EvmBridgeRoleGrantedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
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
  RoleAsc = 'role_ASC',
  RoleAscNullsFirst = 'role_ASC_NULLS_FIRST',
  RoleAscNullsLast = 'role_ASC_NULLS_LAST',
  RoleDesc = 'role_DESC',
  RoleDescNullsFirst = 'role_DESC_NULLS_FIRST',
  RoleDescNullsLast = 'role_DESC_NULLS_LAST',
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

export type EvmBridgeRoleGrantedEventWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeRoleGrantedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeRoleGrantedEventWhereInput>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_eq?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_not_eq?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  account_startsWith?: InputMaybe<Scalars['String']['input']>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  role_contains?: InputMaybe<Scalars['String']['input']>;
  role_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  role_endsWith?: InputMaybe<Scalars['String']['input']>;
  role_eq?: InputMaybe<Scalars['String']['input']>;
  role_gt?: InputMaybe<Scalars['String']['input']>;
  role_gte?: InputMaybe<Scalars['String']['input']>;
  role_in?: InputMaybe<Array<Scalars['String']['input']>>;
  role_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  role_lt?: InputMaybe<Scalars['String']['input']>;
  role_lte?: InputMaybe<Scalars['String']['input']>;
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  role_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  role_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  role_not_eq?: InputMaybe<Scalars['String']['input']>;
  role_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  role_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  role_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EvmBridgeRoleGrantedEventsConnection = {
  __typename?: 'EvmBridgeRoleGrantedEventsConnection';
  edges: Array<EvmBridgeRoleGrantedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmBridgeRoleRevokedEvent = Event & {
  __typename?: 'EvmBridgeRoleRevokedEvent';
  account: Scalars['String']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  role: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeRoleRevokedEventEdge = {
  __typename?: 'EvmBridgeRoleRevokedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeRoleRevokedEvent;
};

export enum EvmBridgeRoleRevokedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
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
  RoleAsc = 'role_ASC',
  RoleAscNullsFirst = 'role_ASC_NULLS_FIRST',
  RoleAscNullsLast = 'role_ASC_NULLS_LAST',
  RoleDesc = 'role_DESC',
  RoleDescNullsFirst = 'role_DESC_NULLS_FIRST',
  RoleDescNullsLast = 'role_DESC_NULLS_LAST',
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

export type EvmBridgeRoleRevokedEventWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeRoleRevokedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeRoleRevokedEventWhereInput>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_eq?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_not_eq?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  account_startsWith?: InputMaybe<Scalars['String']['input']>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  role_contains?: InputMaybe<Scalars['String']['input']>;
  role_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  role_endsWith?: InputMaybe<Scalars['String']['input']>;
  role_eq?: InputMaybe<Scalars['String']['input']>;
  role_gt?: InputMaybe<Scalars['String']['input']>;
  role_gte?: InputMaybe<Scalars['String']['input']>;
  role_in?: InputMaybe<Array<Scalars['String']['input']>>;
  role_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  role_lt?: InputMaybe<Scalars['String']['input']>;
  role_lte?: InputMaybe<Scalars['String']['input']>;
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  role_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  role_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  role_not_eq?: InputMaybe<Scalars['String']['input']>;
  role_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  role_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  role_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EvmBridgeRoleRevokedEventsConnection = {
  __typename?: 'EvmBridgeRoleRevokedEventsConnection';
  edges: Array<EvmBridgeRoleRevokedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum EvmBridgeStatus {
  Active = 'ACTIVE',
  Paused = 'PAUSED'
}

export type EvmBridgeStatusChangedEvent = Event & {
  __typename?: 'EvmBridgeStatusChangedEvent';
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  chainId: Scalars['Int']['output'];
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  chainId: Scalars['Int']['output'];
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type EvmBridgeTransferToJoystreamRevertedEvent = Event & {
  __typename?: 'EvmBridgeTransferToJoystreamRevertedEvent';
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  ethTransferId: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  rationale: Scalars['String']['output'];
  revertAccount: Scalars['String']['output'];
  revertAmount: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmBridgeTransferToJoystreamRevertedEventEdge = {
  __typename?: 'EvmBridgeTransferToJoystreamRevertedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmBridgeTransferToJoystreamRevertedEvent;
};

export enum EvmBridgeTransferToJoystreamRevertedEventOrderByInput {
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
  RationaleAsc = 'rationale_ASC',
  RationaleAscNullsFirst = 'rationale_ASC_NULLS_FIRST',
  RationaleAscNullsLast = 'rationale_ASC_NULLS_LAST',
  RationaleDesc = 'rationale_DESC',
  RationaleDescNullsFirst = 'rationale_DESC_NULLS_FIRST',
  RationaleDescNullsLast = 'rationale_DESC_NULLS_LAST',
  RevertAccountAsc = 'revertAccount_ASC',
  RevertAccountAscNullsFirst = 'revertAccount_ASC_NULLS_FIRST',
  RevertAccountAscNullsLast = 'revertAccount_ASC_NULLS_LAST',
  RevertAccountDesc = 'revertAccount_DESC',
  RevertAccountDescNullsFirst = 'revertAccount_DESC_NULLS_FIRST',
  RevertAccountDescNullsLast = 'revertAccount_DESC_NULLS_LAST',
  RevertAmountAsc = 'revertAmount_ASC',
  RevertAmountAscNullsFirst = 'revertAmount_ASC_NULLS_FIRST',
  RevertAmountAscNullsLast = 'revertAmount_ASC_NULLS_LAST',
  RevertAmountDesc = 'revertAmount_DESC',
  RevertAmountDescNullsFirst = 'revertAmount_DESC_NULLS_FIRST',
  RevertAmountDescNullsLast = 'revertAmount_DESC_NULLS_LAST',
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

export type EvmBridgeTransferToJoystreamRevertedEventWhereInput = {
  AND?: InputMaybe<Array<EvmBridgeTransferToJoystreamRevertedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmBridgeTransferToJoystreamRevertedEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  rationale_contains?: InputMaybe<Scalars['String']['input']>;
  rationale_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rationale_endsWith?: InputMaybe<Scalars['String']['input']>;
  rationale_eq?: InputMaybe<Scalars['String']['input']>;
  rationale_gt?: InputMaybe<Scalars['String']['input']>;
  rationale_gte?: InputMaybe<Scalars['String']['input']>;
  rationale_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rationale_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rationale_lt?: InputMaybe<Scalars['String']['input']>;
  rationale_lte?: InputMaybe<Scalars['String']['input']>;
  rationale_not_contains?: InputMaybe<Scalars['String']['input']>;
  rationale_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rationale_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  rationale_not_eq?: InputMaybe<Scalars['String']['input']>;
  rationale_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rationale_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  rationale_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_contains?: InputMaybe<Scalars['String']['input']>;
  revertAccount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  revertAccount_endsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_eq?: InputMaybe<Scalars['String']['input']>;
  revertAccount_gt?: InputMaybe<Scalars['String']['input']>;
  revertAccount_gte?: InputMaybe<Scalars['String']['input']>;
  revertAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  revertAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revertAccount_lt?: InputMaybe<Scalars['String']['input']>;
  revertAccount_lte?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_eq?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  revertAccount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revertAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revertAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type EvmBridgeTransferToJoystreamRevertedEventsConnection = {
  __typename?: 'EvmBridgeTransferToJoystreamRevertedEventsConnection';
  edges: Array<EvmBridgeTransferToJoystreamRevertedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmTimelockCall = {
  __typename?: 'EvmTimelockCall';
  callArgs?: Maybe<Scalars['String']['output']>;
  callData: Scalars['String']['output'];
  callIndex: Scalars['Int']['output'];
  callSignature?: Maybe<Scalars['String']['output']>;
  callTarget: Scalars['String']['output'];
  callValue: Scalars['BigInt']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  operation: EvmTimelockOperation;
};

export type EvmTimelockCallEdge = {
  __typename?: 'EvmTimelockCallEdge';
  cursor: Scalars['String']['output'];
  node: EvmTimelockCall;
};

export type EvmTimelockCallExecutedEvent = Event & {
  __typename?: 'EvmTimelockCallExecutedEvent';
  block: Scalars['Int']['output'];
  callIndex: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  operationId: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmTimelockCallExecutedEventEdge = {
  __typename?: 'EvmTimelockCallExecutedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmTimelockCallExecutedEvent;
};

export enum EvmTimelockCallExecutedEventOrderByInput {
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockAscNullsLast = 'block_ASC_NULLS_LAST',
  BlockDesc = 'block_DESC',
  BlockDescNullsFirst = 'block_DESC_NULLS_FIRST',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  CallIndexAsc = 'callIndex_ASC',
  CallIndexAscNullsFirst = 'callIndex_ASC_NULLS_FIRST',
  CallIndexAscNullsLast = 'callIndex_ASC_NULLS_LAST',
  CallIndexDesc = 'callIndex_DESC',
  CallIndexDescNullsFirst = 'callIndex_DESC_NULLS_FIRST',
  CallIndexDescNullsLast = 'callIndex_DESC_NULLS_LAST',
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
  OperationIdAsc = 'operationId_ASC',
  OperationIdAscNullsFirst = 'operationId_ASC_NULLS_FIRST',
  OperationIdAscNullsLast = 'operationId_ASC_NULLS_LAST',
  OperationIdDesc = 'operationId_DESC',
  OperationIdDescNullsFirst = 'operationId_DESC_NULLS_FIRST',
  OperationIdDescNullsLast = 'operationId_DESC_NULLS_LAST',
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

export type EvmTimelockCallExecutedEventWhereInput = {
  AND?: InputMaybe<Array<EvmTimelockCallExecutedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmTimelockCallExecutedEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  callIndex_eq?: InputMaybe<Scalars['Int']['input']>;
  callIndex_gt?: InputMaybe<Scalars['Int']['input']>;
  callIndex_gte?: InputMaybe<Scalars['Int']['input']>;
  callIndex_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  callIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callIndex_lt?: InputMaybe<Scalars['Int']['input']>;
  callIndex_lte?: InputMaybe<Scalars['Int']['input']>;
  callIndex_not_eq?: InputMaybe<Scalars['Int']['input']>;
  callIndex_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  operationId_contains?: InputMaybe<Scalars['String']['input']>;
  operationId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operationId_endsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_eq?: InputMaybe<Scalars['String']['input']>;
  operationId_gt?: InputMaybe<Scalars['String']['input']>;
  operationId_gte?: InputMaybe<Scalars['String']['input']>;
  operationId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operationId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operationId_lt?: InputMaybe<Scalars['String']['input']>;
  operationId_lte?: InputMaybe<Scalars['String']['input']>;
  operationId_not_contains?: InputMaybe<Scalars['String']['input']>;
  operationId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operationId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_not_eq?: InputMaybe<Scalars['String']['input']>;
  operationId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operationId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EvmTimelockCallExecutedEventsConnection = {
  __typename?: 'EvmTimelockCallExecutedEventsConnection';
  edges: Array<EvmTimelockCallExecutedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
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
  CallIndexAsc = 'callIndex_ASC',
  CallIndexAscNullsFirst = 'callIndex_ASC_NULLS_FIRST',
  CallIndexAscNullsLast = 'callIndex_ASC_NULLS_LAST',
  CallIndexDesc = 'callIndex_DESC',
  CallIndexDescNullsFirst = 'callIndex_DESC_NULLS_FIRST',
  CallIndexDescNullsLast = 'callIndex_DESC_NULLS_LAST',
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
  OperationCancelledAtBlockAsc = 'operation_cancelledAtBlock_ASC',
  OperationCancelledAtBlockAscNullsFirst = 'operation_cancelledAtBlock_ASC_NULLS_FIRST',
  OperationCancelledAtBlockAscNullsLast = 'operation_cancelledAtBlock_ASC_NULLS_LAST',
  OperationCancelledAtBlockDesc = 'operation_cancelledAtBlock_DESC',
  OperationCancelledAtBlockDescNullsFirst = 'operation_cancelledAtBlock_DESC_NULLS_FIRST',
  OperationCancelledAtBlockDescNullsLast = 'operation_cancelledAtBlock_DESC_NULLS_LAST',
  OperationCancelledAtTimestampAsc = 'operation_cancelledAtTimestamp_ASC',
  OperationCancelledAtTimestampAscNullsFirst = 'operation_cancelledAtTimestamp_ASC_NULLS_FIRST',
  OperationCancelledAtTimestampAscNullsLast = 'operation_cancelledAtTimestamp_ASC_NULLS_LAST',
  OperationCancelledAtTimestampDesc = 'operation_cancelledAtTimestamp_DESC',
  OperationCancelledAtTimestampDescNullsFirst = 'operation_cancelledAtTimestamp_DESC_NULLS_FIRST',
  OperationCancelledAtTimestampDescNullsLast = 'operation_cancelledAtTimestamp_DESC_NULLS_LAST',
  OperationCancelledTxHashAsc = 'operation_cancelledTxHash_ASC',
  OperationCancelledTxHashAscNullsFirst = 'operation_cancelledTxHash_ASC_NULLS_FIRST',
  OperationCancelledTxHashAscNullsLast = 'operation_cancelledTxHash_ASC_NULLS_LAST',
  OperationCancelledTxHashDesc = 'operation_cancelledTxHash_DESC',
  OperationCancelledTxHashDescNullsFirst = 'operation_cancelledTxHash_DESC_NULLS_FIRST',
  OperationCancelledTxHashDescNullsLast = 'operation_cancelledTxHash_DESC_NULLS_LAST',
  OperationChainIdAsc = 'operation_chainId_ASC',
  OperationChainIdAscNullsFirst = 'operation_chainId_ASC_NULLS_FIRST',
  OperationChainIdAscNullsLast = 'operation_chainId_ASC_NULLS_LAST',
  OperationChainIdDesc = 'operation_chainId_DESC',
  OperationChainIdDescNullsFirst = 'operation_chainId_DESC_NULLS_FIRST',
  OperationChainIdDescNullsLast = 'operation_chainId_DESC_NULLS_LAST',
  OperationCreatedAtBlockAsc = 'operation_createdAtBlock_ASC',
  OperationCreatedAtBlockAscNullsFirst = 'operation_createdAtBlock_ASC_NULLS_FIRST',
  OperationCreatedAtBlockAscNullsLast = 'operation_createdAtBlock_ASC_NULLS_LAST',
  OperationCreatedAtBlockDesc = 'operation_createdAtBlock_DESC',
  OperationCreatedAtBlockDescNullsFirst = 'operation_createdAtBlock_DESC_NULLS_FIRST',
  OperationCreatedAtBlockDescNullsLast = 'operation_createdAtBlock_DESC_NULLS_LAST',
  OperationCreatedAtTimestampAsc = 'operation_createdAtTimestamp_ASC',
  OperationCreatedAtTimestampAscNullsFirst = 'operation_createdAtTimestamp_ASC_NULLS_FIRST',
  OperationCreatedAtTimestampAscNullsLast = 'operation_createdAtTimestamp_ASC_NULLS_LAST',
  OperationCreatedAtTimestampDesc = 'operation_createdAtTimestamp_DESC',
  OperationCreatedAtTimestampDescNullsFirst = 'operation_createdAtTimestamp_DESC_NULLS_FIRST',
  OperationCreatedAtTimestampDescNullsLast = 'operation_createdAtTimestamp_DESC_NULLS_LAST',
  OperationCreatedTxHashAsc = 'operation_createdTxHash_ASC',
  OperationCreatedTxHashAscNullsFirst = 'operation_createdTxHash_ASC_NULLS_FIRST',
  OperationCreatedTxHashAscNullsLast = 'operation_createdTxHash_ASC_NULLS_LAST',
  OperationCreatedTxHashDesc = 'operation_createdTxHash_DESC',
  OperationCreatedTxHashDescNullsFirst = 'operation_createdTxHash_DESC_NULLS_FIRST',
  OperationCreatedTxHashDescNullsLast = 'operation_createdTxHash_DESC_NULLS_LAST',
  OperationDelayDoneTimestampAsc = 'operation_delayDoneTimestamp_ASC',
  OperationDelayDoneTimestampAscNullsFirst = 'operation_delayDoneTimestamp_ASC_NULLS_FIRST',
  OperationDelayDoneTimestampAscNullsLast = 'operation_delayDoneTimestamp_ASC_NULLS_LAST',
  OperationDelayDoneTimestampDesc = 'operation_delayDoneTimestamp_DESC',
  OperationDelayDoneTimestampDescNullsFirst = 'operation_delayDoneTimestamp_DESC_NULLS_FIRST',
  OperationDelayDoneTimestampDescNullsLast = 'operation_delayDoneTimestamp_DESC_NULLS_LAST',
  OperationExecutedAtBlockAsc = 'operation_executedAtBlock_ASC',
  OperationExecutedAtBlockAscNullsFirst = 'operation_executedAtBlock_ASC_NULLS_FIRST',
  OperationExecutedAtBlockAscNullsLast = 'operation_executedAtBlock_ASC_NULLS_LAST',
  OperationExecutedAtBlockDesc = 'operation_executedAtBlock_DESC',
  OperationExecutedAtBlockDescNullsFirst = 'operation_executedAtBlock_DESC_NULLS_FIRST',
  OperationExecutedAtBlockDescNullsLast = 'operation_executedAtBlock_DESC_NULLS_LAST',
  OperationExecutedAtTimestampAsc = 'operation_executedAtTimestamp_ASC',
  OperationExecutedAtTimestampAscNullsFirst = 'operation_executedAtTimestamp_ASC_NULLS_FIRST',
  OperationExecutedAtTimestampAscNullsLast = 'operation_executedAtTimestamp_ASC_NULLS_LAST',
  OperationExecutedAtTimestampDesc = 'operation_executedAtTimestamp_DESC',
  OperationExecutedAtTimestampDescNullsFirst = 'operation_executedAtTimestamp_DESC_NULLS_FIRST',
  OperationExecutedAtTimestampDescNullsLast = 'operation_executedAtTimestamp_DESC_NULLS_LAST',
  OperationExecutedTxHashAsc = 'operation_executedTxHash_ASC',
  OperationExecutedTxHashAscNullsFirst = 'operation_executedTxHash_ASC_NULLS_FIRST',
  OperationExecutedTxHashAscNullsLast = 'operation_executedTxHash_ASC_NULLS_LAST',
  OperationExecutedTxHashDesc = 'operation_executedTxHash_DESC',
  OperationExecutedTxHashDescNullsFirst = 'operation_executedTxHash_DESC_NULLS_FIRST',
  OperationExecutedTxHashDescNullsLast = 'operation_executedTxHash_DESC_NULLS_LAST',
  OperationIdAsc = 'operation_id_ASC',
  OperationIdAscNullsFirst = 'operation_id_ASC_NULLS_FIRST',
  OperationIdAscNullsLast = 'operation_id_ASC_NULLS_LAST',
  OperationIdDesc = 'operation_id_DESC',
  OperationIdDescNullsFirst = 'operation_id_DESC_NULLS_FIRST',
  OperationIdDescNullsLast = 'operation_id_DESC_NULLS_LAST',
  OperationOperationIdAsc = 'operation_operationId_ASC',
  OperationOperationIdAscNullsFirst = 'operation_operationId_ASC_NULLS_FIRST',
  OperationOperationIdAscNullsLast = 'operation_operationId_ASC_NULLS_LAST',
  OperationOperationIdDesc = 'operation_operationId_DESC',
  OperationOperationIdDescNullsFirst = 'operation_operationId_DESC_NULLS_FIRST',
  OperationOperationIdDescNullsLast = 'operation_operationId_DESC_NULLS_LAST',
  OperationPredecessorAsc = 'operation_predecessor_ASC',
  OperationPredecessorAscNullsFirst = 'operation_predecessor_ASC_NULLS_FIRST',
  OperationPredecessorAscNullsLast = 'operation_predecessor_ASC_NULLS_LAST',
  OperationPredecessorDesc = 'operation_predecessor_DESC',
  OperationPredecessorDescNullsFirst = 'operation_predecessor_DESC_NULLS_FIRST',
  OperationPredecessorDescNullsLast = 'operation_predecessor_DESC_NULLS_LAST',
  OperationSaltAsc = 'operation_salt_ASC',
  OperationSaltAscNullsFirst = 'operation_salt_ASC_NULLS_FIRST',
  OperationSaltAscNullsLast = 'operation_salt_ASC_NULLS_LAST',
  OperationSaltDesc = 'operation_salt_DESC',
  OperationSaltDescNullsFirst = 'operation_salt_DESC_NULLS_FIRST',
  OperationSaltDescNullsLast = 'operation_salt_DESC_NULLS_LAST',
  OperationStatusAsc = 'operation_status_ASC',
  OperationStatusAscNullsFirst = 'operation_status_ASC_NULLS_FIRST',
  OperationStatusAscNullsLast = 'operation_status_ASC_NULLS_LAST',
  OperationStatusDesc = 'operation_status_DESC',
  OperationStatusDescNullsFirst = 'operation_status_DESC_NULLS_FIRST',
  OperationStatusDescNullsLast = 'operation_status_DESC_NULLS_LAST'
}

export type EvmTimelockCallSaltEvent = Event & {
  __typename?: 'EvmTimelockCallSaltEvent';
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  operationId: Scalars['String']['output'];
  salt: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmTimelockCallSaltEventEdge = {
  __typename?: 'EvmTimelockCallSaltEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmTimelockCallSaltEvent;
};

export enum EvmTimelockCallSaltEventOrderByInput {
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
  OperationIdAsc = 'operationId_ASC',
  OperationIdAscNullsFirst = 'operationId_ASC_NULLS_FIRST',
  OperationIdAscNullsLast = 'operationId_ASC_NULLS_LAST',
  OperationIdDesc = 'operationId_DESC',
  OperationIdDescNullsFirst = 'operationId_DESC_NULLS_FIRST',
  OperationIdDescNullsLast = 'operationId_DESC_NULLS_LAST',
  SaltAsc = 'salt_ASC',
  SaltAscNullsFirst = 'salt_ASC_NULLS_FIRST',
  SaltAscNullsLast = 'salt_ASC_NULLS_LAST',
  SaltDesc = 'salt_DESC',
  SaltDescNullsFirst = 'salt_DESC_NULLS_FIRST',
  SaltDescNullsLast = 'salt_DESC_NULLS_LAST',
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

export type EvmTimelockCallSaltEventWhereInput = {
  AND?: InputMaybe<Array<EvmTimelockCallSaltEventWhereInput>>;
  OR?: InputMaybe<Array<EvmTimelockCallSaltEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  operationId_contains?: InputMaybe<Scalars['String']['input']>;
  operationId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operationId_endsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_eq?: InputMaybe<Scalars['String']['input']>;
  operationId_gt?: InputMaybe<Scalars['String']['input']>;
  operationId_gte?: InputMaybe<Scalars['String']['input']>;
  operationId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operationId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operationId_lt?: InputMaybe<Scalars['String']['input']>;
  operationId_lte?: InputMaybe<Scalars['String']['input']>;
  operationId_not_contains?: InputMaybe<Scalars['String']['input']>;
  operationId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operationId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_not_eq?: InputMaybe<Scalars['String']['input']>;
  operationId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operationId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EvmTimelockCallSaltEventsConnection = {
  __typename?: 'EvmTimelockCallSaltEventsConnection';
  edges: Array<EvmTimelockCallSaltEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmTimelockCallScheduledEvent = Event & {
  __typename?: 'EvmTimelockCallScheduledEvent';
  block: Scalars['Int']['output'];
  callData: Scalars['String']['output'];
  callIndex: Scalars['Int']['output'];
  callTarget: Scalars['String']['output'];
  callValue: Scalars['BigInt']['output'];
  chainId: Scalars['Int']['output'];
  delay: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  operationId: Scalars['String']['output'];
  predecessor?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmTimelockCallScheduledEventEdge = {
  __typename?: 'EvmTimelockCallScheduledEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmTimelockCallScheduledEvent;
};

export enum EvmTimelockCallScheduledEventOrderByInput {
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockAscNullsLast = 'block_ASC_NULLS_LAST',
  BlockDesc = 'block_DESC',
  BlockDescNullsFirst = 'block_DESC_NULLS_FIRST',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  CallDataAsc = 'callData_ASC',
  CallDataAscNullsFirst = 'callData_ASC_NULLS_FIRST',
  CallDataAscNullsLast = 'callData_ASC_NULLS_LAST',
  CallDataDesc = 'callData_DESC',
  CallDataDescNullsFirst = 'callData_DESC_NULLS_FIRST',
  CallDataDescNullsLast = 'callData_DESC_NULLS_LAST',
  CallIndexAsc = 'callIndex_ASC',
  CallIndexAscNullsFirst = 'callIndex_ASC_NULLS_FIRST',
  CallIndexAscNullsLast = 'callIndex_ASC_NULLS_LAST',
  CallIndexDesc = 'callIndex_DESC',
  CallIndexDescNullsFirst = 'callIndex_DESC_NULLS_FIRST',
  CallIndexDescNullsLast = 'callIndex_DESC_NULLS_LAST',
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
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  DelayAsc = 'delay_ASC',
  DelayAscNullsFirst = 'delay_ASC_NULLS_FIRST',
  DelayAscNullsLast = 'delay_ASC_NULLS_LAST',
  DelayDesc = 'delay_DESC',
  DelayDescNullsFirst = 'delay_DESC_NULLS_FIRST',
  DelayDescNullsLast = 'delay_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OperationIdAsc = 'operationId_ASC',
  OperationIdAscNullsFirst = 'operationId_ASC_NULLS_FIRST',
  OperationIdAscNullsLast = 'operationId_ASC_NULLS_LAST',
  OperationIdDesc = 'operationId_DESC',
  OperationIdDescNullsFirst = 'operationId_DESC_NULLS_FIRST',
  OperationIdDescNullsLast = 'operationId_DESC_NULLS_LAST',
  PredecessorAsc = 'predecessor_ASC',
  PredecessorAscNullsFirst = 'predecessor_ASC_NULLS_FIRST',
  PredecessorAscNullsLast = 'predecessor_ASC_NULLS_LAST',
  PredecessorDesc = 'predecessor_DESC',
  PredecessorDescNullsFirst = 'predecessor_DESC_NULLS_FIRST',
  PredecessorDescNullsLast = 'predecessor_DESC_NULLS_LAST',
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

export type EvmTimelockCallScheduledEventWhereInput = {
  AND?: InputMaybe<Array<EvmTimelockCallScheduledEventWhereInput>>;
  OR?: InputMaybe<Array<EvmTimelockCallScheduledEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  callIndex_eq?: InputMaybe<Scalars['Int']['input']>;
  callIndex_gt?: InputMaybe<Scalars['Int']['input']>;
  callIndex_gte?: InputMaybe<Scalars['Int']['input']>;
  callIndex_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  callIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callIndex_lt?: InputMaybe<Scalars['Int']['input']>;
  callIndex_lte?: InputMaybe<Scalars['Int']['input']>;
  callIndex_not_eq?: InputMaybe<Scalars['Int']['input']>;
  callIndex_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delay_eq?: InputMaybe<Scalars['BigInt']['input']>;
  delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delay_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delay_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delay_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  delay_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  operationId_contains?: InputMaybe<Scalars['String']['input']>;
  operationId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operationId_endsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_eq?: InputMaybe<Scalars['String']['input']>;
  operationId_gt?: InputMaybe<Scalars['String']['input']>;
  operationId_gte?: InputMaybe<Scalars['String']['input']>;
  operationId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operationId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operationId_lt?: InputMaybe<Scalars['String']['input']>;
  operationId_lte?: InputMaybe<Scalars['String']['input']>;
  operationId_not_contains?: InputMaybe<Scalars['String']['input']>;
  operationId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operationId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_not_eq?: InputMaybe<Scalars['String']['input']>;
  operationId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operationId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EvmTimelockCallScheduledEventsConnection = {
  __typename?: 'EvmTimelockCallScheduledEventsConnection';
  edges: Array<EvmTimelockCallScheduledEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

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
  callIndex_eq?: InputMaybe<Scalars['Int']['input']>;
  callIndex_gt?: InputMaybe<Scalars['Int']['input']>;
  callIndex_gte?: InputMaybe<Scalars['Int']['input']>;
  callIndex_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  callIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callIndex_lt?: InputMaybe<Scalars['Int']['input']>;
  callIndex_lte?: InputMaybe<Scalars['Int']['input']>;
  callIndex_not_eq?: InputMaybe<Scalars['Int']['input']>;
  callIndex_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  operation?: InputMaybe<EvmTimelockOperationWhereInput>;
  operation_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EvmTimelockCallsConnection = {
  __typename?: 'EvmTimelockCallsConnection';
  edges: Array<EvmTimelockCallEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmTimelockOperation = {
  __typename?: 'EvmTimelockOperation';
  calls: Array<EvmTimelockCall>;
  cancelledAtBlock?: Maybe<Scalars['Int']['output']>;
  cancelledAtTimestamp?: Maybe<Scalars['DateTime']['output']>;
  cancelledTxHash?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  createdAtBlock: Scalars['Int']['output'];
  createdAtTimestamp: Scalars['DateTime']['output'];
  createdTxHash: Scalars['String']['output'];
  delayDoneTimestamp: Scalars['DateTime']['output'];
  executedAtBlock?: Maybe<Scalars['Int']['output']>;
  executedAtTimestamp?: Maybe<Scalars['DateTime']['output']>;
  executedTxHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  operationId: Scalars['String']['output'];
  predecessor?: Maybe<Scalars['String']['output']>;
  salt?: Maybe<Scalars['String']['output']>;
  status: EvmTimelockOperationStatus;
};


export type EvmTimelockOperationCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmTimelockCallOrderByInput>>;
  where?: InputMaybe<EvmTimelockCallWhereInput>;
};

export type EvmTimelockOperationCancelledEvent = Event & {
  __typename?: 'EvmTimelockOperationCancelledEvent';
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  operationId: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmTimelockOperationCancelledEventEdge = {
  __typename?: 'EvmTimelockOperationCancelledEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmTimelockOperationCancelledEvent;
};

export enum EvmTimelockOperationCancelledEventOrderByInput {
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
  OperationIdAsc = 'operationId_ASC',
  OperationIdAscNullsFirst = 'operationId_ASC_NULLS_FIRST',
  OperationIdAscNullsLast = 'operationId_ASC_NULLS_LAST',
  OperationIdDesc = 'operationId_DESC',
  OperationIdDescNullsFirst = 'operationId_DESC_NULLS_FIRST',
  OperationIdDescNullsLast = 'operationId_DESC_NULLS_LAST',
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

export type EvmTimelockOperationCancelledEventWhereInput = {
  AND?: InputMaybe<Array<EvmTimelockOperationCancelledEventWhereInput>>;
  OR?: InputMaybe<Array<EvmTimelockOperationCancelledEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  operationId_contains?: InputMaybe<Scalars['String']['input']>;
  operationId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operationId_endsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_eq?: InputMaybe<Scalars['String']['input']>;
  operationId_gt?: InputMaybe<Scalars['String']['input']>;
  operationId_gte?: InputMaybe<Scalars['String']['input']>;
  operationId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operationId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operationId_lt?: InputMaybe<Scalars['String']['input']>;
  operationId_lte?: InputMaybe<Scalars['String']['input']>;
  operationId_not_contains?: InputMaybe<Scalars['String']['input']>;
  operationId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operationId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_not_eq?: InputMaybe<Scalars['String']['input']>;
  operationId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operationId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EvmTimelockOperationCancelledEventsConnection = {
  __typename?: 'EvmTimelockOperationCancelledEventsConnection';
  edges: Array<EvmTimelockOperationCancelledEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmTimelockOperationEdge = {
  __typename?: 'EvmTimelockOperationEdge';
  cursor: Scalars['String']['output'];
  node: EvmTimelockOperation;
};

export enum EvmTimelockOperationOrderByInput {
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
  OperationIdAsc = 'operationId_ASC',
  OperationIdAscNullsFirst = 'operationId_ASC_NULLS_FIRST',
  OperationIdAscNullsLast = 'operationId_ASC_NULLS_LAST',
  OperationIdDesc = 'operationId_DESC',
  OperationIdDescNullsFirst = 'operationId_DESC_NULLS_FIRST',
  OperationIdDescNullsLast = 'operationId_DESC_NULLS_LAST',
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

export enum EvmTimelockOperationStatus {
  Cancelled = 'CANCELLED',
  Executed = 'EXECUTED',
  Pending = 'PENDING'
}

export type EvmTimelockOperationWhereInput = {
  AND?: InputMaybe<Array<EvmTimelockOperationWhereInput>>;
  OR?: InputMaybe<Array<EvmTimelockOperationWhereInput>>;
  calls_every?: InputMaybe<EvmTimelockCallWhereInput>;
  calls_none?: InputMaybe<EvmTimelockCallWhereInput>;
  calls_some?: InputMaybe<EvmTimelockCallWhereInput>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  operationId_contains?: InputMaybe<Scalars['String']['input']>;
  operationId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operationId_endsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_eq?: InputMaybe<Scalars['String']['input']>;
  operationId_gt?: InputMaybe<Scalars['String']['input']>;
  operationId_gte?: InputMaybe<Scalars['String']['input']>;
  operationId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operationId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operationId_lt?: InputMaybe<Scalars['String']['input']>;
  operationId_lte?: InputMaybe<Scalars['String']['input']>;
  operationId_not_contains?: InputMaybe<Scalars['String']['input']>;
  operationId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operationId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_not_eq?: InputMaybe<Scalars['String']['input']>;
  operationId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operationId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  operationId_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  status_eq?: InputMaybe<EvmTimelockOperationStatus>;
  status_in?: InputMaybe<Array<EvmTimelockOperationStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<EvmTimelockOperationStatus>;
  status_not_in?: InputMaybe<Array<EvmTimelockOperationStatus>>;
};

export type EvmTimelockOperationsConnection = {
  __typename?: 'EvmTimelockOperationsConnection';
  edges: Array<EvmTimelockOperationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmTimelockRoleGrantedEvent = Event & {
  __typename?: 'EvmTimelockRoleGrantedEvent';
  account: Scalars['String']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  role: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmTimelockRoleGrantedEventEdge = {
  __typename?: 'EvmTimelockRoleGrantedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmTimelockRoleGrantedEvent;
};

export enum EvmTimelockRoleGrantedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
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
  RoleAsc = 'role_ASC',
  RoleAscNullsFirst = 'role_ASC_NULLS_FIRST',
  RoleAscNullsLast = 'role_ASC_NULLS_LAST',
  RoleDesc = 'role_DESC',
  RoleDescNullsFirst = 'role_DESC_NULLS_FIRST',
  RoleDescNullsLast = 'role_DESC_NULLS_LAST',
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

export type EvmTimelockRoleGrantedEventWhereInput = {
  AND?: InputMaybe<Array<EvmTimelockRoleGrantedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmTimelockRoleGrantedEventWhereInput>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_eq?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_not_eq?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  account_startsWith?: InputMaybe<Scalars['String']['input']>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  role_contains?: InputMaybe<Scalars['String']['input']>;
  role_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  role_endsWith?: InputMaybe<Scalars['String']['input']>;
  role_eq?: InputMaybe<Scalars['String']['input']>;
  role_gt?: InputMaybe<Scalars['String']['input']>;
  role_gte?: InputMaybe<Scalars['String']['input']>;
  role_in?: InputMaybe<Array<Scalars['String']['input']>>;
  role_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  role_lt?: InputMaybe<Scalars['String']['input']>;
  role_lte?: InputMaybe<Scalars['String']['input']>;
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  role_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  role_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  role_not_eq?: InputMaybe<Scalars['String']['input']>;
  role_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  role_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  role_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EvmTimelockRoleGrantedEventsConnection = {
  __typename?: 'EvmTimelockRoleGrantedEventsConnection';
  edges: Array<EvmTimelockRoleGrantedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EvmTimelockRoleRevokedEvent = Event & {
  __typename?: 'EvmTimelockRoleRevokedEvent';
  account: Scalars['String']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  role: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EvmTimelockRoleRevokedEventEdge = {
  __typename?: 'EvmTimelockRoleRevokedEventEdge';
  cursor: Scalars['String']['output'];
  node: EvmTimelockRoleRevokedEvent;
};

export enum EvmTimelockRoleRevokedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
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
  RoleAsc = 'role_ASC',
  RoleAscNullsFirst = 'role_ASC_NULLS_FIRST',
  RoleAscNullsLast = 'role_ASC_NULLS_LAST',
  RoleDesc = 'role_DESC',
  RoleDescNullsFirst = 'role_DESC_NULLS_FIRST',
  RoleDescNullsLast = 'role_DESC_NULLS_LAST',
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

export type EvmTimelockRoleRevokedEventWhereInput = {
  AND?: InputMaybe<Array<EvmTimelockRoleRevokedEventWhereInput>>;
  OR?: InputMaybe<Array<EvmTimelockRoleRevokedEventWhereInput>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_eq?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_not_eq?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  account_startsWith?: InputMaybe<Scalars['String']['input']>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  role_contains?: InputMaybe<Scalars['String']['input']>;
  role_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  role_endsWith?: InputMaybe<Scalars['String']['input']>;
  role_eq?: InputMaybe<Scalars['String']['input']>;
  role_gt?: InputMaybe<Scalars['String']['input']>;
  role_gte?: InputMaybe<Scalars['String']['input']>;
  role_in?: InputMaybe<Array<Scalars['String']['input']>>;
  role_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  role_lt?: InputMaybe<Scalars['String']['input']>;
  role_lte?: InputMaybe<Scalars['String']['input']>;
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  role_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  role_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  role_not_eq?: InputMaybe<Scalars['String']['input']>;
  role_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  role_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  role_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EvmTimelockRoleRevokedEventsConnection = {
  __typename?: 'EvmTimelockRoleRevokedEventsConnection';
  edges: Array<EvmTimelockRoleRevokedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type JoyBridgeConfig = {
  __typename?: 'JoyBridgeConfig';
  bridgingFee: Scalars['BigInt']['output'];
  feesBurned: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  mintAllowance: Scalars['BigInt']['output'];
  operatorAccount: Scalars['String']['output'];
  pauserAccounts: Array<Scalars['String']['output']>;
  status: JoyBridgeStatus;
  supportedRemoteChainIds: Array<Scalars['Int']['output']>;
  thawnDurationBlocks: Scalars['Int']['output'];
  thawnEndsAtBlock?: Maybe<Scalars['Int']['output']>;
  totalBurned: Scalars['BigInt']['output'];
  totalMinted: Scalars['BigInt']['output'];
};

export type JoyBridgeConfigEdge = {
  __typename?: 'JoyBridgeConfigEdge';
  cursor: Scalars['String']['output'];
  node: JoyBridgeConfig;
};

export enum JoyBridgeConfigOrderByInput {
  BridgingFeeAsc = 'bridgingFee_ASC',
  BridgingFeeAscNullsFirst = 'bridgingFee_ASC_NULLS_FIRST',
  BridgingFeeAscNullsLast = 'bridgingFee_ASC_NULLS_LAST',
  BridgingFeeDesc = 'bridgingFee_DESC',
  BridgingFeeDescNullsFirst = 'bridgingFee_DESC_NULLS_FIRST',
  BridgingFeeDescNullsLast = 'bridgingFee_DESC_NULLS_LAST',
  FeesBurnedAsc = 'feesBurned_ASC',
  FeesBurnedAscNullsFirst = 'feesBurned_ASC_NULLS_FIRST',
  FeesBurnedAscNullsLast = 'feesBurned_ASC_NULLS_LAST',
  FeesBurnedDesc = 'feesBurned_DESC',
  FeesBurnedDescNullsFirst = 'feesBurned_DESC_NULLS_FIRST',
  FeesBurnedDescNullsLast = 'feesBurned_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MintAllowanceAsc = 'mintAllowance_ASC',
  MintAllowanceAscNullsFirst = 'mintAllowance_ASC_NULLS_FIRST',
  MintAllowanceAscNullsLast = 'mintAllowance_ASC_NULLS_LAST',
  MintAllowanceDesc = 'mintAllowance_DESC',
  MintAllowanceDescNullsFirst = 'mintAllowance_DESC_NULLS_FIRST',
  MintAllowanceDescNullsLast = 'mintAllowance_DESC_NULLS_LAST',
  OperatorAccountAsc = 'operatorAccount_ASC',
  OperatorAccountAscNullsFirst = 'operatorAccount_ASC_NULLS_FIRST',
  OperatorAccountAscNullsLast = 'operatorAccount_ASC_NULLS_LAST',
  OperatorAccountDesc = 'operatorAccount_DESC',
  OperatorAccountDescNullsFirst = 'operatorAccount_DESC_NULLS_FIRST',
  OperatorAccountDescNullsLast = 'operatorAccount_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  ThawnDurationBlocksAsc = 'thawnDurationBlocks_ASC',
  ThawnDurationBlocksAscNullsFirst = 'thawnDurationBlocks_ASC_NULLS_FIRST',
  ThawnDurationBlocksAscNullsLast = 'thawnDurationBlocks_ASC_NULLS_LAST',
  ThawnDurationBlocksDesc = 'thawnDurationBlocks_DESC',
  ThawnDurationBlocksDescNullsFirst = 'thawnDurationBlocks_DESC_NULLS_FIRST',
  ThawnDurationBlocksDescNullsLast = 'thawnDurationBlocks_DESC_NULLS_LAST',
  ThawnEndsAtBlockAsc = 'thawnEndsAtBlock_ASC',
  ThawnEndsAtBlockAscNullsFirst = 'thawnEndsAtBlock_ASC_NULLS_FIRST',
  ThawnEndsAtBlockAscNullsLast = 'thawnEndsAtBlock_ASC_NULLS_LAST',
  ThawnEndsAtBlockDesc = 'thawnEndsAtBlock_DESC',
  ThawnEndsAtBlockDescNullsFirst = 'thawnEndsAtBlock_DESC_NULLS_FIRST',
  ThawnEndsAtBlockDescNullsLast = 'thawnEndsAtBlock_DESC_NULLS_LAST',
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

export type JoyBridgeConfigUpdatedEvent = Event & {
  __typename?: 'JoyBridgeConfigUpdatedEvent';
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  newBridgingFee?: Maybe<Scalars['BigInt']['output']>;
  newOperatorAccount?: Maybe<Scalars['String']['output']>;
  newPauserAccounts?: Maybe<Array<Scalars['String']['output']>>;
  newRemoteChains?: Maybe<Array<Scalars['Int']['output']>>;
  newThawnDuration?: Maybe<Scalars['Int']['output']>;
  timestamp: Scalars['DateTime']['output'];
  txHash?: Maybe<Scalars['String']['output']>;
};

export type JoyBridgeConfigUpdatedEventEdge = {
  __typename?: 'JoyBridgeConfigUpdatedEventEdge';
  cursor: Scalars['String']['output'];
  node: JoyBridgeConfigUpdatedEvent;
};

export enum JoyBridgeConfigUpdatedEventOrderByInput {
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
  NewBridgingFeeAsc = 'newBridgingFee_ASC',
  NewBridgingFeeAscNullsFirst = 'newBridgingFee_ASC_NULLS_FIRST',
  NewBridgingFeeAscNullsLast = 'newBridgingFee_ASC_NULLS_LAST',
  NewBridgingFeeDesc = 'newBridgingFee_DESC',
  NewBridgingFeeDescNullsFirst = 'newBridgingFee_DESC_NULLS_FIRST',
  NewBridgingFeeDescNullsLast = 'newBridgingFee_DESC_NULLS_LAST',
  NewOperatorAccountAsc = 'newOperatorAccount_ASC',
  NewOperatorAccountAscNullsFirst = 'newOperatorAccount_ASC_NULLS_FIRST',
  NewOperatorAccountAscNullsLast = 'newOperatorAccount_ASC_NULLS_LAST',
  NewOperatorAccountDesc = 'newOperatorAccount_DESC',
  NewOperatorAccountDescNullsFirst = 'newOperatorAccount_DESC_NULLS_FIRST',
  NewOperatorAccountDescNullsLast = 'newOperatorAccount_DESC_NULLS_LAST',
  NewThawnDurationAsc = 'newThawnDuration_ASC',
  NewThawnDurationAscNullsFirst = 'newThawnDuration_ASC_NULLS_FIRST',
  NewThawnDurationAscNullsLast = 'newThawnDuration_ASC_NULLS_LAST',
  NewThawnDurationDesc = 'newThawnDuration_DESC',
  NewThawnDurationDescNullsFirst = 'newThawnDuration_DESC_NULLS_FIRST',
  NewThawnDurationDescNullsLast = 'newThawnDuration_DESC_NULLS_LAST',
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

export type JoyBridgeConfigUpdatedEventWhereInput = {
  AND?: InputMaybe<Array<JoyBridgeConfigUpdatedEventWhereInput>>;
  OR?: InputMaybe<Array<JoyBridgeConfigUpdatedEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  newBridgingFee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  newBridgingFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  newBridgingFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  newBridgingFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newBridgingFee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  newBridgingFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  newBridgingFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  newBridgingFee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  newBridgingFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newOperatorAccount_contains?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_endsWith?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_eq?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_gt?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_gte?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newOperatorAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  newOperatorAccount_lt?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_lte?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_not_eq?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newOperatorAccount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  newOperatorAccount_startsWith?: InputMaybe<Scalars['String']['input']>;
  newPauserAccounts_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  newPauserAccounts_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  newPauserAccounts_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  newPauserAccounts_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  newRemoteChains_containsAll?: InputMaybe<Array<Scalars['Int']['input']>>;
  newRemoteChains_containsAny?: InputMaybe<Array<Scalars['Int']['input']>>;
  newRemoteChains_containsNone?: InputMaybe<Array<Scalars['Int']['input']>>;
  newRemoteChains_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  newThawnDuration_eq?: InputMaybe<Scalars['Int']['input']>;
  newThawnDuration_gt?: InputMaybe<Scalars['Int']['input']>;
  newThawnDuration_gte?: InputMaybe<Scalars['Int']['input']>;
  newThawnDuration_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  newThawnDuration_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  newThawnDuration_lt?: InputMaybe<Scalars['Int']['input']>;
  newThawnDuration_lte?: InputMaybe<Scalars['Int']['input']>;
  newThawnDuration_not_eq?: InputMaybe<Scalars['Int']['input']>;
  newThawnDuration_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type JoyBridgeConfigUpdatedEventsConnection = {
  __typename?: 'JoyBridgeConfigUpdatedEventsConnection';
  edges: Array<JoyBridgeConfigUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type JoyBridgeConfigWhereInput = {
  AND?: InputMaybe<Array<JoyBridgeConfigWhereInput>>;
  OR?: InputMaybe<Array<JoyBridgeConfigWhereInput>>;
  bridgingFee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bridgingFee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  bridgingFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  bridgingFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesBurned_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesBurned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesBurned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesBurned_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesBurned_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesBurned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesBurned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesBurned_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesBurned_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  mintAllowance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  mintAllowance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  mintAllowance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  mintAllowance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintAllowance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  mintAllowance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  mintAllowance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  mintAllowance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  mintAllowance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  operatorAccount_contains?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_endsWith?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_eq?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_gt?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_gte?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operatorAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operatorAccount_lt?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_lte?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_not_eq?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operatorAccount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  operatorAccount_startsWith?: InputMaybe<Scalars['String']['input']>;
  pauserAccounts_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  pauserAccounts_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  pauserAccounts_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  pauserAccounts_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_eq?: InputMaybe<JoyBridgeStatus>;
  status_in?: InputMaybe<Array<JoyBridgeStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<JoyBridgeStatus>;
  status_not_in?: InputMaybe<Array<JoyBridgeStatus>>;
  supportedRemoteChainIds_containsAll?: InputMaybe<Array<Scalars['Int']['input']>>;
  supportedRemoteChainIds_containsAny?: InputMaybe<Array<Scalars['Int']['input']>>;
  supportedRemoteChainIds_containsNone?: InputMaybe<Array<Scalars['Int']['input']>>;
  supportedRemoteChainIds_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  thawnDurationBlocks_eq?: InputMaybe<Scalars['Int']['input']>;
  thawnDurationBlocks_gt?: InputMaybe<Scalars['Int']['input']>;
  thawnDurationBlocks_gte?: InputMaybe<Scalars['Int']['input']>;
  thawnDurationBlocks_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  thawnDurationBlocks_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  thawnDurationBlocks_lt?: InputMaybe<Scalars['Int']['input']>;
  thawnDurationBlocks_lte?: InputMaybe<Scalars['Int']['input']>;
  thawnDurationBlocks_not_eq?: InputMaybe<Scalars['Int']['input']>;
  thawnDurationBlocks_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  thawnEndsAtBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  thawnEndsAtBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  thawnEndsAtBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type JoyBridgeConfigsConnection = {
  __typename?: 'JoyBridgeConfigsConnection';
  edges: Array<JoyBridgeConfigEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type JoyBridgeInboundTransferFinalizedEvent = Event & {
  __typename?: 'JoyBridgeInboundTransferFinalizedEvent';
  amount: Scalars['BigInt']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  joyDestAccount: Scalars['String']['output'];
  remoteChainId: Scalars['Int']['output'];
  remoteTransferId: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type JoyBridgeInboundTransferFinalizedEventEdge = {
  __typename?: 'JoyBridgeInboundTransferFinalizedEventEdge';
  cursor: Scalars['String']['output'];
  node: JoyBridgeInboundTransferFinalizedEvent;
};

export enum JoyBridgeInboundTransferFinalizedEventOrderByInput {
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
  RemoteChainIdAsc = 'remoteChainId_ASC',
  RemoteChainIdAscNullsFirst = 'remoteChainId_ASC_NULLS_FIRST',
  RemoteChainIdAscNullsLast = 'remoteChainId_ASC_NULLS_LAST',
  RemoteChainIdDesc = 'remoteChainId_DESC',
  RemoteChainIdDescNullsFirst = 'remoteChainId_DESC_NULLS_FIRST',
  RemoteChainIdDescNullsLast = 'remoteChainId_DESC_NULLS_LAST',
  RemoteTransferIdAsc = 'remoteTransferId_ASC',
  RemoteTransferIdAscNullsFirst = 'remoteTransferId_ASC_NULLS_FIRST',
  RemoteTransferIdAscNullsLast = 'remoteTransferId_ASC_NULLS_LAST',
  RemoteTransferIdDesc = 'remoteTransferId_DESC',
  RemoteTransferIdDescNullsFirst = 'remoteTransferId_DESC_NULLS_FIRST',
  RemoteTransferIdDescNullsLast = 'remoteTransferId_DESC_NULLS_LAST',
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

export type JoyBridgeInboundTransferFinalizedEventWhereInput = {
  AND?: InputMaybe<Array<JoyBridgeInboundTransferFinalizedEventWhereInput>>;
  OR?: InputMaybe<Array<JoyBridgeInboundTransferFinalizedEventWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  remoteChainId_eq?: InputMaybe<Scalars['Int']['input']>;
  remoteChainId_gt?: InputMaybe<Scalars['Int']['input']>;
  remoteChainId_gte?: InputMaybe<Scalars['Int']['input']>;
  remoteChainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  remoteChainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  remoteChainId_lt?: InputMaybe<Scalars['Int']['input']>;
  remoteChainId_lte?: InputMaybe<Scalars['Int']['input']>;
  remoteChainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  remoteChainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  remoteTransferId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  remoteTransferId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  remoteTransferId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  remoteTransferId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  remoteTransferId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  remoteTransferId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  remoteTransferId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  remoteTransferId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  remoteTransferId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type JoyBridgeInboundTransferFinalizedEventsConnection = {
  __typename?: 'JoyBridgeInboundTransferFinalizedEventsConnection';
  edges: Array<JoyBridgeInboundTransferFinalizedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type JoyBridgeOutboundTransferRequestedEvent = Event & {
  __typename?: 'JoyBridgeOutboundTransferRequestedEvent';
  amount: Scalars['BigInt']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  destAccount: Scalars['String']['output'];
  destChainId: Scalars['Int']['output'];
  feePaid: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  joyRequester: Scalars['String']['output'];
  joyTransferId: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type JoyBridgeOutboundTransferRequestedEventEdge = {
  __typename?: 'JoyBridgeOutboundTransferRequestedEventEdge';
  cursor: Scalars['String']['output'];
  node: JoyBridgeOutboundTransferRequestedEvent;
};

export enum JoyBridgeOutboundTransferRequestedEventOrderByInput {
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
  JoyRequesterAsc = 'joyRequester_ASC',
  JoyRequesterAscNullsFirst = 'joyRequester_ASC_NULLS_FIRST',
  JoyRequesterAscNullsLast = 'joyRequester_ASC_NULLS_LAST',
  JoyRequesterDesc = 'joyRequester_DESC',
  JoyRequesterDescNullsFirst = 'joyRequester_DESC_NULLS_FIRST',
  JoyRequesterDescNullsLast = 'joyRequester_DESC_NULLS_LAST',
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

export type JoyBridgeOutboundTransferRequestedEventWhereInput = {
  AND?: InputMaybe<Array<JoyBridgeOutboundTransferRequestedEventWhereInput>>;
  OR?: InputMaybe<Array<JoyBridgeOutboundTransferRequestedEventWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  destChainId_eq?: InputMaybe<Scalars['Int']['input']>;
  destChainId_gt?: InputMaybe<Scalars['Int']['input']>;
  destChainId_gte?: InputMaybe<Scalars['Int']['input']>;
  destChainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  destChainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  destChainId_lt?: InputMaybe<Scalars['Int']['input']>;
  destChainId_lte?: InputMaybe<Scalars['Int']['input']>;
  destChainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  destChainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  joyRequester_contains?: InputMaybe<Scalars['String']['input']>;
  joyRequester_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  joyRequester_endsWith?: InputMaybe<Scalars['String']['input']>;
  joyRequester_eq?: InputMaybe<Scalars['String']['input']>;
  joyRequester_gt?: InputMaybe<Scalars['String']['input']>;
  joyRequester_gte?: InputMaybe<Scalars['String']['input']>;
  joyRequester_in?: InputMaybe<Array<Scalars['String']['input']>>;
  joyRequester_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  joyRequester_lt?: InputMaybe<Scalars['String']['input']>;
  joyRequester_lte?: InputMaybe<Scalars['String']['input']>;
  joyRequester_not_contains?: InputMaybe<Scalars['String']['input']>;
  joyRequester_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  joyRequester_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  joyRequester_not_eq?: InputMaybe<Scalars['String']['input']>;
  joyRequester_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  joyRequester_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  joyRequester_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type JoyBridgeOutboundTransferRequestedEventsConnection = {
  __typename?: 'JoyBridgeOutboundTransferRequestedEventsConnection';
  edges: Array<JoyBridgeOutboundTransferRequestedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type JoyBridgeOutboundTransferRevertedEvent = Event & {
  __typename?: 'JoyBridgeOutboundTransferRevertedEvent';
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  joyTransferId: Scalars['BigInt']['output'];
  rationale: Scalars['String']['output'];
  revertAccount: Scalars['String']['output'];
  revertAmount: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type JoyBridgeOutboundTransferRevertedEventEdge = {
  __typename?: 'JoyBridgeOutboundTransferRevertedEventEdge';
  cursor: Scalars['String']['output'];
  node: JoyBridgeOutboundTransferRevertedEvent;
};

export enum JoyBridgeOutboundTransferRevertedEventOrderByInput {
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
  JoyTransferIdAsc = 'joyTransferId_ASC',
  JoyTransferIdAscNullsFirst = 'joyTransferId_ASC_NULLS_FIRST',
  JoyTransferIdAscNullsLast = 'joyTransferId_ASC_NULLS_LAST',
  JoyTransferIdDesc = 'joyTransferId_DESC',
  JoyTransferIdDescNullsFirst = 'joyTransferId_DESC_NULLS_FIRST',
  JoyTransferIdDescNullsLast = 'joyTransferId_DESC_NULLS_LAST',
  RationaleAsc = 'rationale_ASC',
  RationaleAscNullsFirst = 'rationale_ASC_NULLS_FIRST',
  RationaleAscNullsLast = 'rationale_ASC_NULLS_LAST',
  RationaleDesc = 'rationale_DESC',
  RationaleDescNullsFirst = 'rationale_DESC_NULLS_FIRST',
  RationaleDescNullsLast = 'rationale_DESC_NULLS_LAST',
  RevertAccountAsc = 'revertAccount_ASC',
  RevertAccountAscNullsFirst = 'revertAccount_ASC_NULLS_FIRST',
  RevertAccountAscNullsLast = 'revertAccount_ASC_NULLS_LAST',
  RevertAccountDesc = 'revertAccount_DESC',
  RevertAccountDescNullsFirst = 'revertAccount_DESC_NULLS_FIRST',
  RevertAccountDescNullsLast = 'revertAccount_DESC_NULLS_LAST',
  RevertAmountAsc = 'revertAmount_ASC',
  RevertAmountAscNullsFirst = 'revertAmount_ASC_NULLS_FIRST',
  RevertAmountAscNullsLast = 'revertAmount_ASC_NULLS_LAST',
  RevertAmountDesc = 'revertAmount_DESC',
  RevertAmountDescNullsFirst = 'revertAmount_DESC_NULLS_FIRST',
  RevertAmountDescNullsLast = 'revertAmount_DESC_NULLS_LAST',
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

export type JoyBridgeOutboundTransferRevertedEventWhereInput = {
  AND?: InputMaybe<Array<JoyBridgeOutboundTransferRevertedEventWhereInput>>;
  OR?: InputMaybe<Array<JoyBridgeOutboundTransferRevertedEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  rationale_contains?: InputMaybe<Scalars['String']['input']>;
  rationale_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rationale_endsWith?: InputMaybe<Scalars['String']['input']>;
  rationale_eq?: InputMaybe<Scalars['String']['input']>;
  rationale_gt?: InputMaybe<Scalars['String']['input']>;
  rationale_gte?: InputMaybe<Scalars['String']['input']>;
  rationale_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rationale_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rationale_lt?: InputMaybe<Scalars['String']['input']>;
  rationale_lte?: InputMaybe<Scalars['String']['input']>;
  rationale_not_contains?: InputMaybe<Scalars['String']['input']>;
  rationale_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rationale_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  rationale_not_eq?: InputMaybe<Scalars['String']['input']>;
  rationale_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rationale_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  rationale_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_contains?: InputMaybe<Scalars['String']['input']>;
  revertAccount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  revertAccount_endsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_eq?: InputMaybe<Scalars['String']['input']>;
  revertAccount_gt?: InputMaybe<Scalars['String']['input']>;
  revertAccount_gte?: InputMaybe<Scalars['String']['input']>;
  revertAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  revertAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revertAccount_lt?: InputMaybe<Scalars['String']['input']>;
  revertAccount_lte?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_eq?: InputMaybe<Scalars['String']['input']>;
  revertAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  revertAccount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertAccount_startsWith?: InputMaybe<Scalars['String']['input']>;
  revertAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revertAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revertAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revertAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type JoyBridgeOutboundTransferRevertedEventsConnection = {
  __typename?: 'JoyBridgeOutboundTransferRevertedEventsConnection';
  edges: Array<JoyBridgeOutboundTransferRevertedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type JoyBridgePausedEvent = Event & {
  __typename?: 'JoyBridgePausedEvent';
  account: Scalars['String']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type JoyBridgePausedEventEdge = {
  __typename?: 'JoyBridgePausedEventEdge';
  cursor: Scalars['String']['output'];
  node: JoyBridgePausedEvent;
};

export enum JoyBridgePausedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
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

export type JoyBridgePausedEventWhereInput = {
  AND?: InputMaybe<Array<JoyBridgePausedEventWhereInput>>;
  OR?: InputMaybe<Array<JoyBridgePausedEventWhereInput>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_eq?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_not_eq?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  account_startsWith?: InputMaybe<Scalars['String']['input']>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type JoyBridgePausedEventsConnection = {
  __typename?: 'JoyBridgePausedEventsConnection';
  edges: Array<JoyBridgePausedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum JoyBridgeStatus {
  Active = 'ACTIVE',
  Paused = 'PAUSED',
  Thawn = 'THAWN'
}

export type JoyBridgeThawnFinishedEvent = Event & {
  __typename?: 'JoyBridgeThawnFinishedEvent';
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type JoyBridgeThawnFinishedEventEdge = {
  __typename?: 'JoyBridgeThawnFinishedEventEdge';
  cursor: Scalars['String']['output'];
  node: JoyBridgeThawnFinishedEvent;
};

export enum JoyBridgeThawnFinishedEventOrderByInput {
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

export type JoyBridgeThawnFinishedEventWhereInput = {
  AND?: InputMaybe<Array<JoyBridgeThawnFinishedEventWhereInput>>;
  OR?: InputMaybe<Array<JoyBridgeThawnFinishedEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type JoyBridgeThawnFinishedEventsConnection = {
  __typename?: 'JoyBridgeThawnFinishedEventsConnection';
  edges: Array<JoyBridgeThawnFinishedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type JoyBridgeThawnStartedEvent = Event & {
  __typename?: 'JoyBridgeThawnStartedEvent';
  account: Scalars['String']['output'];
  block: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  thawnEndsAtBlock: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type JoyBridgeThawnStartedEventEdge = {
  __typename?: 'JoyBridgeThawnStartedEventEdge';
  cursor: Scalars['String']['output'];
  node: JoyBridgeThawnStartedEvent;
};

export enum JoyBridgeThawnStartedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
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
  ThawnEndsAtBlockAsc = 'thawnEndsAtBlock_ASC',
  ThawnEndsAtBlockAscNullsFirst = 'thawnEndsAtBlock_ASC_NULLS_FIRST',
  ThawnEndsAtBlockAscNullsLast = 'thawnEndsAtBlock_ASC_NULLS_LAST',
  ThawnEndsAtBlockDesc = 'thawnEndsAtBlock_DESC',
  ThawnEndsAtBlockDescNullsFirst = 'thawnEndsAtBlock_DESC_NULLS_FIRST',
  ThawnEndsAtBlockDescNullsLast = 'thawnEndsAtBlock_DESC_NULLS_LAST',
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

export type JoyBridgeThawnStartedEventWhereInput = {
  AND?: InputMaybe<Array<JoyBridgeThawnStartedEventWhereInput>>;
  OR?: InputMaybe<Array<JoyBridgeThawnStartedEventWhereInput>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_eq?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_not_eq?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  account_startsWith?: InputMaybe<Scalars['String']['input']>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  thawnEndsAtBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  thawnEndsAtBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  thawnEndsAtBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  thawnEndsAtBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type JoyBridgeThawnStartedEventsConnection = {
  __typename?: 'JoyBridgeThawnStartedEventsConnection';
  edges: Array<JoyBridgeThawnStartedEventEdge>;
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
  evmBridgeRoleGrantedEventById?: Maybe<EvmBridgeRoleGrantedEvent>;
  /** @deprecated Use evmBridgeRoleGrantedEventById */
  evmBridgeRoleGrantedEventByUniqueInput?: Maybe<EvmBridgeRoleGrantedEvent>;
  evmBridgeRoleGrantedEvents: Array<EvmBridgeRoleGrantedEvent>;
  evmBridgeRoleGrantedEventsConnection: EvmBridgeRoleGrantedEventsConnection;
  evmBridgeRoleRevokedEventById?: Maybe<EvmBridgeRoleRevokedEvent>;
  /** @deprecated Use evmBridgeRoleRevokedEventById */
  evmBridgeRoleRevokedEventByUniqueInput?: Maybe<EvmBridgeRoleRevokedEvent>;
  evmBridgeRoleRevokedEvents: Array<EvmBridgeRoleRevokedEvent>;
  evmBridgeRoleRevokedEventsConnection: EvmBridgeRoleRevokedEventsConnection;
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
  evmBridgeTransferToJoystreamRevertedEventById?: Maybe<EvmBridgeTransferToJoystreamRevertedEvent>;
  /** @deprecated Use evmBridgeTransferToJoystreamRevertedEventById */
  evmBridgeTransferToJoystreamRevertedEventByUniqueInput?: Maybe<EvmBridgeTransferToJoystreamRevertedEvent>;
  evmBridgeTransferToJoystreamRevertedEvents: Array<EvmBridgeTransferToJoystreamRevertedEvent>;
  evmBridgeTransferToJoystreamRevertedEventsConnection: EvmBridgeTransferToJoystreamRevertedEventsConnection;
  evmTimelockCallById?: Maybe<EvmTimelockCall>;
  /** @deprecated Use evmTimelockCallById */
  evmTimelockCallByUniqueInput?: Maybe<EvmTimelockCall>;
  evmTimelockCallExecutedEventById?: Maybe<EvmTimelockCallExecutedEvent>;
  /** @deprecated Use evmTimelockCallExecutedEventById */
  evmTimelockCallExecutedEventByUniqueInput?: Maybe<EvmTimelockCallExecutedEvent>;
  evmTimelockCallExecutedEvents: Array<EvmTimelockCallExecutedEvent>;
  evmTimelockCallExecutedEventsConnection: EvmTimelockCallExecutedEventsConnection;
  evmTimelockCallSaltEventById?: Maybe<EvmTimelockCallSaltEvent>;
  /** @deprecated Use evmTimelockCallSaltEventById */
  evmTimelockCallSaltEventByUniqueInput?: Maybe<EvmTimelockCallSaltEvent>;
  evmTimelockCallSaltEvents: Array<EvmTimelockCallSaltEvent>;
  evmTimelockCallSaltEventsConnection: EvmTimelockCallSaltEventsConnection;
  evmTimelockCallScheduledEventById?: Maybe<EvmTimelockCallScheduledEvent>;
  /** @deprecated Use evmTimelockCallScheduledEventById */
  evmTimelockCallScheduledEventByUniqueInput?: Maybe<EvmTimelockCallScheduledEvent>;
  evmTimelockCallScheduledEvents: Array<EvmTimelockCallScheduledEvent>;
  evmTimelockCallScheduledEventsConnection: EvmTimelockCallScheduledEventsConnection;
  evmTimelockCalls: Array<EvmTimelockCall>;
  evmTimelockCallsConnection: EvmTimelockCallsConnection;
  evmTimelockOperationById?: Maybe<EvmTimelockOperation>;
  /** @deprecated Use evmTimelockOperationById */
  evmTimelockOperationByUniqueInput?: Maybe<EvmTimelockOperation>;
  evmTimelockOperationCancelledEventById?: Maybe<EvmTimelockOperationCancelledEvent>;
  /** @deprecated Use evmTimelockOperationCancelledEventById */
  evmTimelockOperationCancelledEventByUniqueInput?: Maybe<EvmTimelockOperationCancelledEvent>;
  evmTimelockOperationCancelledEvents: Array<EvmTimelockOperationCancelledEvent>;
  evmTimelockOperationCancelledEventsConnection: EvmTimelockOperationCancelledEventsConnection;
  evmTimelockOperations: Array<EvmTimelockOperation>;
  evmTimelockOperationsConnection: EvmTimelockOperationsConnection;
  evmTimelockRoleGrantedEventById?: Maybe<EvmTimelockRoleGrantedEvent>;
  /** @deprecated Use evmTimelockRoleGrantedEventById */
  evmTimelockRoleGrantedEventByUniqueInput?: Maybe<EvmTimelockRoleGrantedEvent>;
  evmTimelockRoleGrantedEvents: Array<EvmTimelockRoleGrantedEvent>;
  evmTimelockRoleGrantedEventsConnection: EvmTimelockRoleGrantedEventsConnection;
  evmTimelockRoleRevokedEventById?: Maybe<EvmTimelockRoleRevokedEvent>;
  /** @deprecated Use evmTimelockRoleRevokedEventById */
  evmTimelockRoleRevokedEventByUniqueInput?: Maybe<EvmTimelockRoleRevokedEvent>;
  evmTimelockRoleRevokedEvents: Array<EvmTimelockRoleRevokedEvent>;
  evmTimelockRoleRevokedEventsConnection: EvmTimelockRoleRevokedEventsConnection;
  joyBridgeConfigById?: Maybe<JoyBridgeConfig>;
  /** @deprecated Use joyBridgeConfigById */
  joyBridgeConfigByUniqueInput?: Maybe<JoyBridgeConfig>;
  joyBridgeConfigUpdatedEventById?: Maybe<JoyBridgeConfigUpdatedEvent>;
  /** @deprecated Use joyBridgeConfigUpdatedEventById */
  joyBridgeConfigUpdatedEventByUniqueInput?: Maybe<JoyBridgeConfigUpdatedEvent>;
  joyBridgeConfigUpdatedEvents: Array<JoyBridgeConfigUpdatedEvent>;
  joyBridgeConfigUpdatedEventsConnection: JoyBridgeConfigUpdatedEventsConnection;
  joyBridgeConfigs: Array<JoyBridgeConfig>;
  joyBridgeConfigsConnection: JoyBridgeConfigsConnection;
  joyBridgeInboundTransferFinalizedEventById?: Maybe<JoyBridgeInboundTransferFinalizedEvent>;
  /** @deprecated Use joyBridgeInboundTransferFinalizedEventById */
  joyBridgeInboundTransferFinalizedEventByUniqueInput?: Maybe<JoyBridgeInboundTransferFinalizedEvent>;
  joyBridgeInboundTransferFinalizedEvents: Array<JoyBridgeInboundTransferFinalizedEvent>;
  joyBridgeInboundTransferFinalizedEventsConnection: JoyBridgeInboundTransferFinalizedEventsConnection;
  joyBridgeOutboundTransferRequestedEventById?: Maybe<JoyBridgeOutboundTransferRequestedEvent>;
  /** @deprecated Use joyBridgeOutboundTransferRequestedEventById */
  joyBridgeOutboundTransferRequestedEventByUniqueInput?: Maybe<JoyBridgeOutboundTransferRequestedEvent>;
  joyBridgeOutboundTransferRequestedEvents: Array<JoyBridgeOutboundTransferRequestedEvent>;
  joyBridgeOutboundTransferRequestedEventsConnection: JoyBridgeOutboundTransferRequestedEventsConnection;
  joyBridgeOutboundTransferRevertedEventById?: Maybe<JoyBridgeOutboundTransferRevertedEvent>;
  /** @deprecated Use joyBridgeOutboundTransferRevertedEventById */
  joyBridgeOutboundTransferRevertedEventByUniqueInput?: Maybe<JoyBridgeOutboundTransferRevertedEvent>;
  joyBridgeOutboundTransferRevertedEvents: Array<JoyBridgeOutboundTransferRevertedEvent>;
  joyBridgeOutboundTransferRevertedEventsConnection: JoyBridgeOutboundTransferRevertedEventsConnection;
  joyBridgePausedEventById?: Maybe<JoyBridgePausedEvent>;
  /** @deprecated Use joyBridgePausedEventById */
  joyBridgePausedEventByUniqueInput?: Maybe<JoyBridgePausedEvent>;
  joyBridgePausedEvents: Array<JoyBridgePausedEvent>;
  joyBridgePausedEventsConnection: JoyBridgePausedEventsConnection;
  joyBridgeThawnFinishedEventById?: Maybe<JoyBridgeThawnFinishedEvent>;
  /** @deprecated Use joyBridgeThawnFinishedEventById */
  joyBridgeThawnFinishedEventByUniqueInput?: Maybe<JoyBridgeThawnFinishedEvent>;
  joyBridgeThawnFinishedEvents: Array<JoyBridgeThawnFinishedEvent>;
  joyBridgeThawnFinishedEventsConnection: JoyBridgeThawnFinishedEventsConnection;
  joyBridgeThawnStartedEventById?: Maybe<JoyBridgeThawnStartedEvent>;
  /** @deprecated Use joyBridgeThawnStartedEventById */
  joyBridgeThawnStartedEventByUniqueInput?: Maybe<JoyBridgeThawnStartedEvent>;
  joyBridgeThawnStartedEvents: Array<JoyBridgeThawnStartedEvent>;
  joyBridgeThawnStartedEventsConnection: JoyBridgeThawnStartedEventsConnection;
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


export type QueryEvmBridgeRoleGrantedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeRoleGrantedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeRoleGrantedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeRoleGrantedEventOrderByInput>>;
  where?: InputMaybe<EvmBridgeRoleGrantedEventWhereInput>;
};


export type QueryEvmBridgeRoleGrantedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeRoleGrantedEventOrderByInput>;
  where?: InputMaybe<EvmBridgeRoleGrantedEventWhereInput>;
};


export type QueryEvmBridgeRoleRevokedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeRoleRevokedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeRoleRevokedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeRoleRevokedEventOrderByInput>>;
  where?: InputMaybe<EvmBridgeRoleRevokedEventWhereInput>;
};


export type QueryEvmBridgeRoleRevokedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeRoleRevokedEventOrderByInput>;
  where?: InputMaybe<EvmBridgeRoleRevokedEventWhereInput>;
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


export type QueryEvmBridgeTransferToJoystreamRevertedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmBridgeTransferToJoystreamRevertedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmBridgeTransferToJoystreamRevertedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmBridgeTransferToJoystreamRevertedEventOrderByInput>>;
  where?: InputMaybe<EvmBridgeTransferToJoystreamRevertedEventWhereInput>;
};


export type QueryEvmBridgeTransferToJoystreamRevertedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmBridgeTransferToJoystreamRevertedEventOrderByInput>;
  where?: InputMaybe<EvmBridgeTransferToJoystreamRevertedEventWhereInput>;
};


export type QueryEvmTimelockCallByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmTimelockCallByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmTimelockCallExecutedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmTimelockCallExecutedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmTimelockCallExecutedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmTimelockCallExecutedEventOrderByInput>>;
  where?: InputMaybe<EvmTimelockCallExecutedEventWhereInput>;
};


export type QueryEvmTimelockCallExecutedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmTimelockCallExecutedEventOrderByInput>;
  where?: InputMaybe<EvmTimelockCallExecutedEventWhereInput>;
};


export type QueryEvmTimelockCallSaltEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmTimelockCallSaltEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmTimelockCallSaltEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmTimelockCallSaltEventOrderByInput>>;
  where?: InputMaybe<EvmTimelockCallSaltEventWhereInput>;
};


export type QueryEvmTimelockCallSaltEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmTimelockCallSaltEventOrderByInput>;
  where?: InputMaybe<EvmTimelockCallSaltEventWhereInput>;
};


export type QueryEvmTimelockCallScheduledEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmTimelockCallScheduledEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmTimelockCallScheduledEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmTimelockCallScheduledEventOrderByInput>>;
  where?: InputMaybe<EvmTimelockCallScheduledEventWhereInput>;
};


export type QueryEvmTimelockCallScheduledEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmTimelockCallScheduledEventOrderByInput>;
  where?: InputMaybe<EvmTimelockCallScheduledEventWhereInput>;
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


export type QueryEvmTimelockOperationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmTimelockOperationByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmTimelockOperationCancelledEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmTimelockOperationCancelledEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmTimelockOperationCancelledEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmTimelockOperationCancelledEventOrderByInput>>;
  where?: InputMaybe<EvmTimelockOperationCancelledEventWhereInput>;
};


export type QueryEvmTimelockOperationCancelledEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmTimelockOperationCancelledEventOrderByInput>;
  where?: InputMaybe<EvmTimelockOperationCancelledEventWhereInput>;
};


export type QueryEvmTimelockOperationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmTimelockOperationOrderByInput>>;
  where?: InputMaybe<EvmTimelockOperationWhereInput>;
};


export type QueryEvmTimelockOperationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmTimelockOperationOrderByInput>;
  where?: InputMaybe<EvmTimelockOperationWhereInput>;
};


export type QueryEvmTimelockRoleGrantedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmTimelockRoleGrantedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmTimelockRoleGrantedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmTimelockRoleGrantedEventOrderByInput>>;
  where?: InputMaybe<EvmTimelockRoleGrantedEventWhereInput>;
};


export type QueryEvmTimelockRoleGrantedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmTimelockRoleGrantedEventOrderByInput>;
  where?: InputMaybe<EvmTimelockRoleGrantedEventWhereInput>;
};


export type QueryEvmTimelockRoleRevokedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEvmTimelockRoleRevokedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEvmTimelockRoleRevokedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EvmTimelockRoleRevokedEventOrderByInput>>;
  where?: InputMaybe<EvmTimelockRoleRevokedEventWhereInput>;
};


export type QueryEvmTimelockRoleRevokedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EvmTimelockRoleRevokedEventOrderByInput>;
  where?: InputMaybe<EvmTimelockRoleRevokedEventWhereInput>;
};


export type QueryJoyBridgeConfigByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryJoyBridgeConfigByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryJoyBridgeConfigUpdatedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryJoyBridgeConfigUpdatedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryJoyBridgeConfigUpdatedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JoyBridgeConfigUpdatedEventOrderByInput>>;
  where?: InputMaybe<JoyBridgeConfigUpdatedEventWhereInput>;
};


export type QueryJoyBridgeConfigUpdatedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<JoyBridgeConfigUpdatedEventOrderByInput>;
  where?: InputMaybe<JoyBridgeConfigUpdatedEventWhereInput>;
};


export type QueryJoyBridgeConfigsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JoyBridgeConfigOrderByInput>>;
  where?: InputMaybe<JoyBridgeConfigWhereInput>;
};


export type QueryJoyBridgeConfigsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<JoyBridgeConfigOrderByInput>;
  where?: InputMaybe<JoyBridgeConfigWhereInput>;
};


export type QueryJoyBridgeInboundTransferFinalizedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryJoyBridgeInboundTransferFinalizedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryJoyBridgeInboundTransferFinalizedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JoyBridgeInboundTransferFinalizedEventOrderByInput>>;
  where?: InputMaybe<JoyBridgeInboundTransferFinalizedEventWhereInput>;
};


export type QueryJoyBridgeInboundTransferFinalizedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<JoyBridgeInboundTransferFinalizedEventOrderByInput>;
  where?: InputMaybe<JoyBridgeInboundTransferFinalizedEventWhereInput>;
};


export type QueryJoyBridgeOutboundTransferRequestedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryJoyBridgeOutboundTransferRequestedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryJoyBridgeOutboundTransferRequestedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JoyBridgeOutboundTransferRequestedEventOrderByInput>>;
  where?: InputMaybe<JoyBridgeOutboundTransferRequestedEventWhereInput>;
};


export type QueryJoyBridgeOutboundTransferRequestedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<JoyBridgeOutboundTransferRequestedEventOrderByInput>;
  where?: InputMaybe<JoyBridgeOutboundTransferRequestedEventWhereInput>;
};


export type QueryJoyBridgeOutboundTransferRevertedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryJoyBridgeOutboundTransferRevertedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryJoyBridgeOutboundTransferRevertedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JoyBridgeOutboundTransferRevertedEventOrderByInput>>;
  where?: InputMaybe<JoyBridgeOutboundTransferRevertedEventWhereInput>;
};


export type QueryJoyBridgeOutboundTransferRevertedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<JoyBridgeOutboundTransferRevertedEventOrderByInput>;
  where?: InputMaybe<JoyBridgeOutboundTransferRevertedEventWhereInput>;
};


export type QueryJoyBridgePausedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryJoyBridgePausedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryJoyBridgePausedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JoyBridgePausedEventOrderByInput>>;
  where?: InputMaybe<JoyBridgePausedEventWhereInput>;
};


export type QueryJoyBridgePausedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<JoyBridgePausedEventOrderByInput>;
  where?: InputMaybe<JoyBridgePausedEventWhereInput>;
};


export type QueryJoyBridgeThawnFinishedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryJoyBridgeThawnFinishedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryJoyBridgeThawnFinishedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JoyBridgeThawnFinishedEventOrderByInput>>;
  where?: InputMaybe<JoyBridgeThawnFinishedEventWhereInput>;
};


export type QueryJoyBridgeThawnFinishedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<JoyBridgeThawnFinishedEventOrderByInput>;
  where?: InputMaybe<JoyBridgeThawnFinishedEventWhereInput>;
};


export type QueryJoyBridgeThawnStartedEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryJoyBridgeThawnStartedEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryJoyBridgeThawnStartedEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JoyBridgeThawnStartedEventOrderByInput>>;
  where?: InputMaybe<JoyBridgeThawnStartedEventWhereInput>;
};


export type QueryJoyBridgeThawnStartedEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<JoyBridgeThawnStartedEventOrderByInput>;
  where?: InputMaybe<JoyBridgeThawnStartedEventWhereInput>;
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

export type GetConfigsQueryVariables = Exact<{
  evmChainId: Scalars['String']['input'];
  joyChainId: Scalars['String']['input'];
}>;


export type GetConfigsQuery = { __typename?: 'Query', evmBridgeConfigs: Array<{ __typename?: 'EvmBridgeConfig', id: string, status: EvmBridgeStatus, bridgeOperatorAccounts: Array<string>, bridgeAdminAccounts: Array<string>, timelockAdminAccounts: Array<string>, pauserAccounts: Array<string>, bridgingFee: any, totalBurned: any, totalMinted: any, mintingLimits: { __typename?: 'EvmBridgeMintingLimits', periodLength: number, periodLimit: any, currentPeriodMinted: any, currentPeriodEndBlock: number } }>, joyBridgeConfigs: Array<{ __typename?: 'JoyBridgeConfig', id: string, status: JoyBridgeStatus, operatorAccount: string, pauserAccounts: Array<string>, mintAllowance: any, feesBurned: any, bridgingFee: any, supportedRemoteChainIds: Array<number>, thawnDurationBlocks: number, thawnEndsAtBlock?: number | null, totalBurned: any, totalMinted: any }> };

export type GetTimelockOperationsQueryVariables = Exact<{
  where?: InputMaybe<EvmTimelockOperationWhereInput>;
  orderBy?: InputMaybe<Array<EvmTimelockOperationOrderByInput> | EvmTimelockOperationOrderByInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTimelockOperationsQuery = { __typename?: 'Query', evmTimelockOperations: Array<{ __typename?: 'EvmTimelockOperation', id: string, operationId: string, cancelledAtBlock?: number | null, cancelledAtTimestamp?: any | null, cancelledTxHash?: string | null, createdAtBlock: number, createdAtTimestamp: any, createdTxHash: string, delayDoneTimestamp: any, executedAtBlock?: number | null, executedAtTimestamp?: any | null, executedTxHash?: string | null, predecessor?: string | null, salt?: string | null, status: EvmTimelockOperationStatus, calls: Array<{ __typename?: 'EvmTimelockCall', callIndex: number, callArgs?: string | null, callData: string, callSignature?: string | null, callTarget: string, callValue: any }> }> };

export type GetTransfersQueryVariables = Exact<{
  where?: InputMaybe<BridgeTransferWhereInput>;
  orderBy?: InputMaybe<Array<BridgeTransferOrderByInput> | BridgeTransferOrderByInput>;
}>;


export type GetTransfersQuery = { __typename?: 'Query', bridgeTransfers: Array<{ __typename?: 'BridgeTransfer', id: string, status: BridgeTransferStatus, type: BridgeTransferType, sourceAccount: string, sourceChainId: number, sourceTransferId: any, destAccount: string, destChainId: number, createdTxHash: string, createdAtTimestamp: any, createdAtBlock: number, completedTxHash?: string | null, completedAtTimestamp?: any | null, completedAtBlock?: number | null, amount: any, feePaid: any }> };


export const GetConfigsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConfigs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"evmChainId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joyChainId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"evmBridgeConfigs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"evmChainId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"bridgeOperatorAccounts"}},{"kind":"Field","name":{"kind":"Name","value":"bridgeAdminAccounts"}},{"kind":"Field","name":{"kind":"Name","value":"timelockAdminAccounts"}},{"kind":"Field","name":{"kind":"Name","value":"pauserAccounts"}},{"kind":"Field","name":{"kind":"Name","value":"mintingLimits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"periodLength"}},{"kind":"Field","name":{"kind":"Name","value":"periodLimit"}},{"kind":"Field","name":{"kind":"Name","value":"currentPeriodMinted"}},{"kind":"Field","name":{"kind":"Name","value":"currentPeriodEndBlock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bridgingFee"}},{"kind":"Field","name":{"kind":"Name","value":"totalBurned"}},{"kind":"Field","name":{"kind":"Name","value":"totalMinted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"joyBridgeConfigs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joyChainId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"operatorAccount"}},{"kind":"Field","name":{"kind":"Name","value":"pauserAccounts"}},{"kind":"Field","name":{"kind":"Name","value":"mintAllowance"}},{"kind":"Field","name":{"kind":"Name","value":"feesBurned"}},{"kind":"Field","name":{"kind":"Name","value":"bridgingFee"}},{"kind":"Field","name":{"kind":"Name","value":"supportedRemoteChainIds"}},{"kind":"Field","name":{"kind":"Name","value":"thawnDurationBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"thawnEndsAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"totalBurned"}},{"kind":"Field","name":{"kind":"Name","value":"totalMinted"}}]}}]}}]} as unknown as DocumentNode<GetConfigsQuery, GetConfigsQueryVariables>;
export const GetTimelockOperationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTimelockOperations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EvmTimelockOperationWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EvmTimelockOperationOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"evmTimelockOperations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"operationId"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"delayDoneTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"executedAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"executedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"executedTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"predecessor"}},{"kind":"Field","name":{"kind":"Name","value":"salt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"calls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callIndex"}},{"kind":"Field","name":{"kind":"Name","value":"callArgs"}},{"kind":"Field","name":{"kind":"Name","value":"callData"}},{"kind":"Field","name":{"kind":"Name","value":"callSignature"}},{"kind":"Field","name":{"kind":"Name","value":"callTarget"}},{"kind":"Field","name":{"kind":"Name","value":"callValue"}}]}}]}}]}}]} as unknown as DocumentNode<GetTimelockOperationsQuery, GetTimelockOperationsQueryVariables>;
export const GetTransfersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransfers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BridgeTransferWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BridgeTransferOrderByInput"}}}},"defaultValue":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"createdAtTimestamp_DESC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bridgeTransfers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sourceAccount"}},{"kind":"Field","name":{"kind":"Name","value":"sourceChainId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceTransferId"}},{"kind":"Field","name":{"kind":"Name","value":"destAccount"}},{"kind":"Field","name":{"kind":"Name","value":"destChainId"}},{"kind":"Field","name":{"kind":"Name","value":"createdTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"completedTxHash"}},{"kind":"Field","name":{"kind":"Name","value":"completedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"completedAtBlock"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"feePaid"}}]}}]}}]} as unknown as DocumentNode<GetTransfersQuery, GetTransfersQueryVariables>;