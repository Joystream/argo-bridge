import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    CallExecuted: event("0xc2617efa69bab66782fa219543714338489c4e9e178271560a91b82c3f612b58", {"id": indexed(p.bytes32), "index": indexed(p.uint256), "target": p.address, "value": p.uint256, "data": p.bytes}),
    CallSalt: event("0x20fda5fd27a1ea7bf5b9567f143ac5470bb059374a27e8f67cb44f946f6d0387", {"id": indexed(p.bytes32), "salt": p.bytes32}),
    CallScheduled: event("0x4cf4410cc57040e44862ef0f45f3dd5a5e02db8eb8add648d4b0e236f1d07dca", {"id": indexed(p.bytes32), "index": indexed(p.uint256), "target": p.address, "value": p.uint256, "data": p.bytes, "predecessor": p.bytes32, "delay": p.uint256}),
    Cancelled: event("0xbaa1eb22f2a492ba1a5fea61b8df4d27c6c8b5f3971e63bb58fa14ff72eedb70", {"id": indexed(p.bytes32)}),
    MinDelayChange: event("0x11c24f4ead16507c69ac467fbd5e4eed5fb5c699626d2cc6d66421df253886d5", {"oldDuration": p.uint256, "newDuration": p.uint256}),
    RoleAdminChanged: event("0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff", {"role": indexed(p.bytes32), "previousAdminRole": indexed(p.bytes32), "newAdminRole": indexed(p.bytes32)}),
    RoleGranted: event("0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    RoleRevoked: event("0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
}

export const functions = {
    CANCELLER_ROLE: viewFun("0xb08e51c0", {}, p.bytes32),
    DEFAULT_ADMIN_ROLE: viewFun("0xa217fddf", {}, p.bytes32),
    EXECUTOR_ROLE: viewFun("0x07bd0265", {}, p.bytes32),
    PROPOSER_ROLE: viewFun("0x8f61f4f5", {}, p.bytes32),
    cancel: fun("0xc4d252f5", {"id": p.bytes32}, ),
    execute: fun("0x134008d3", {"target": p.address, "value": p.uint256, "payload": p.bytes, "predecessor": p.bytes32, "salt": p.bytes32}, ),
    executeBatch: fun("0xe38335e5", {"targets": p.array(p.address), "values": p.array(p.uint256), "payloads": p.array(p.bytes), "predecessor": p.bytes32, "salt": p.bytes32}, ),
    getMinDelay: viewFun("0xf27a0c92", {}, p.uint256),
    getOperationState: viewFun("0x7958004c", {"id": p.bytes32}, p.uint8),
    getRoleAdmin: viewFun("0x248a9ca3", {"role": p.bytes32}, p.bytes32),
    getTimestamp: viewFun("0xd45c4435", {"id": p.bytes32}, p.uint256),
    grantRole: fun("0x2f2ff15d", {"role": p.bytes32, "account": p.address}, ),
    hasRole: viewFun("0x91d14854", {"role": p.bytes32, "account": p.address}, p.bool),
    hashOperation: viewFun("0x8065657f", {"target": p.address, "value": p.uint256, "data": p.bytes, "predecessor": p.bytes32, "salt": p.bytes32}, p.bytes32),
    hashOperationBatch: viewFun("0xb1c5f427", {"targets": p.array(p.address), "values": p.array(p.uint256), "payloads": p.array(p.bytes), "predecessor": p.bytes32, "salt": p.bytes32}, p.bytes32),
    isOperation: viewFun("0x31d50750", {"id": p.bytes32}, p.bool),
    isOperationDone: viewFun("0x2ab0f529", {"id": p.bytes32}, p.bool),
    isOperationPending: viewFun("0x584b153e", {"id": p.bytes32}, p.bool),
    isOperationReady: viewFun("0x13bc9f20", {"id": p.bytes32}, p.bool),
    onERC1155BatchReceived: fun("0xbc197c81", {"_0": p.address, "_1": p.address, "_2": p.array(p.uint256), "_3": p.array(p.uint256), "_4": p.bytes}, p.bytes4),
    onERC1155Received: fun("0xf23a6e61", {"_0": p.address, "_1": p.address, "_2": p.uint256, "_3": p.uint256, "_4": p.bytes}, p.bytes4),
    onERC721Received: fun("0x150b7a02", {"_0": p.address, "_1": p.address, "_2": p.uint256, "_3": p.bytes}, p.bytes4),
    renounceRole: fun("0x36568abe", {"role": p.bytes32, "callerConfirmation": p.address}, ),
    revokeRole: fun("0xd547741f", {"role": p.bytes32, "account": p.address}, ),
    schedule: fun("0x01d5062a", {"target": p.address, "value": p.uint256, "data": p.bytes, "predecessor": p.bytes32, "salt": p.bytes32, "delay": p.uint256}, ),
    scheduleBatch: fun("0x8f2a0bb0", {"targets": p.array(p.address), "values": p.array(p.uint256), "payloads": p.array(p.bytes), "predecessor": p.bytes32, "salt": p.bytes32, "delay": p.uint256}, ),
    supportsInterface: viewFun("0x01ffc9a7", {"interfaceId": p.bytes4}, p.bool),
    updateDelay: fun("0x64d62353", {"newDelay": p.uint256}, ),
}

export class Contract extends ContractBase {

    CANCELLER_ROLE() {
        return this.eth_call(functions.CANCELLER_ROLE, {})
    }

    DEFAULT_ADMIN_ROLE() {
        return this.eth_call(functions.DEFAULT_ADMIN_ROLE, {})
    }

    EXECUTOR_ROLE() {
        return this.eth_call(functions.EXECUTOR_ROLE, {})
    }

    PROPOSER_ROLE() {
        return this.eth_call(functions.PROPOSER_ROLE, {})
    }

    getMinDelay() {
        return this.eth_call(functions.getMinDelay, {})
    }

    getOperationState(id: GetOperationStateParams["id"]) {
        return this.eth_call(functions.getOperationState, {id})
    }

    getRoleAdmin(role: GetRoleAdminParams["role"]) {
        return this.eth_call(functions.getRoleAdmin, {role})
    }

    getTimestamp(id: GetTimestampParams["id"]) {
        return this.eth_call(functions.getTimestamp, {id})
    }

    hasRole(role: HasRoleParams["role"], account: HasRoleParams["account"]) {
        return this.eth_call(functions.hasRole, {role, account})
    }

    hashOperation(target: HashOperationParams["target"], value: HashOperationParams["value"], data: HashOperationParams["data"], predecessor: HashOperationParams["predecessor"], salt: HashOperationParams["salt"]) {
        return this.eth_call(functions.hashOperation, {target, value, data, predecessor, salt})
    }

    hashOperationBatch(targets: HashOperationBatchParams["targets"], values: HashOperationBatchParams["values"], payloads: HashOperationBatchParams["payloads"], predecessor: HashOperationBatchParams["predecessor"], salt: HashOperationBatchParams["salt"]) {
        return this.eth_call(functions.hashOperationBatch, {targets, values, payloads, predecessor, salt})
    }

    isOperation(id: IsOperationParams["id"]) {
        return this.eth_call(functions.isOperation, {id})
    }

    isOperationDone(id: IsOperationDoneParams["id"]) {
        return this.eth_call(functions.isOperationDone, {id})
    }

    isOperationPending(id: IsOperationPendingParams["id"]) {
        return this.eth_call(functions.isOperationPending, {id})
    }

    isOperationReady(id: IsOperationReadyParams["id"]) {
        return this.eth_call(functions.isOperationReady, {id})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }
}

/// Event types
export type CallExecutedEventArgs = EParams<typeof events.CallExecuted>
export type CallSaltEventArgs = EParams<typeof events.CallSalt>
export type CallScheduledEventArgs = EParams<typeof events.CallScheduled>
export type CancelledEventArgs = EParams<typeof events.Cancelled>
export type MinDelayChangeEventArgs = EParams<typeof events.MinDelayChange>
export type RoleAdminChangedEventArgs = EParams<typeof events.RoleAdminChanged>
export type RoleGrantedEventArgs = EParams<typeof events.RoleGranted>
export type RoleRevokedEventArgs = EParams<typeof events.RoleRevoked>

/// Function types
export type CANCELLER_ROLEParams = FunctionArguments<typeof functions.CANCELLER_ROLE>
export type CANCELLER_ROLEReturn = FunctionReturn<typeof functions.CANCELLER_ROLE>

export type DEFAULT_ADMIN_ROLEParams = FunctionArguments<typeof functions.DEFAULT_ADMIN_ROLE>
export type DEFAULT_ADMIN_ROLEReturn = FunctionReturn<typeof functions.DEFAULT_ADMIN_ROLE>

export type EXECUTOR_ROLEParams = FunctionArguments<typeof functions.EXECUTOR_ROLE>
export type EXECUTOR_ROLEReturn = FunctionReturn<typeof functions.EXECUTOR_ROLE>

export type PROPOSER_ROLEParams = FunctionArguments<typeof functions.PROPOSER_ROLE>
export type PROPOSER_ROLEReturn = FunctionReturn<typeof functions.PROPOSER_ROLE>

export type CancelParams = FunctionArguments<typeof functions.cancel>
export type CancelReturn = FunctionReturn<typeof functions.cancel>

export type ExecuteParams = FunctionArguments<typeof functions.execute>
export type ExecuteReturn = FunctionReturn<typeof functions.execute>

export type ExecuteBatchParams = FunctionArguments<typeof functions.executeBatch>
export type ExecuteBatchReturn = FunctionReturn<typeof functions.executeBatch>

export type GetMinDelayParams = FunctionArguments<typeof functions.getMinDelay>
export type GetMinDelayReturn = FunctionReturn<typeof functions.getMinDelay>

export type GetOperationStateParams = FunctionArguments<typeof functions.getOperationState>
export type GetOperationStateReturn = FunctionReturn<typeof functions.getOperationState>

export type GetRoleAdminParams = FunctionArguments<typeof functions.getRoleAdmin>
export type GetRoleAdminReturn = FunctionReturn<typeof functions.getRoleAdmin>

export type GetTimestampParams = FunctionArguments<typeof functions.getTimestamp>
export type GetTimestampReturn = FunctionReturn<typeof functions.getTimestamp>

export type GrantRoleParams = FunctionArguments<typeof functions.grantRole>
export type GrantRoleReturn = FunctionReturn<typeof functions.grantRole>

export type HasRoleParams = FunctionArguments<typeof functions.hasRole>
export type HasRoleReturn = FunctionReturn<typeof functions.hasRole>

export type HashOperationParams = FunctionArguments<typeof functions.hashOperation>
export type HashOperationReturn = FunctionReturn<typeof functions.hashOperation>

export type HashOperationBatchParams = FunctionArguments<typeof functions.hashOperationBatch>
export type HashOperationBatchReturn = FunctionReturn<typeof functions.hashOperationBatch>

export type IsOperationParams = FunctionArguments<typeof functions.isOperation>
export type IsOperationReturn = FunctionReturn<typeof functions.isOperation>

export type IsOperationDoneParams = FunctionArguments<typeof functions.isOperationDone>
export type IsOperationDoneReturn = FunctionReturn<typeof functions.isOperationDone>

export type IsOperationPendingParams = FunctionArguments<typeof functions.isOperationPending>
export type IsOperationPendingReturn = FunctionReturn<typeof functions.isOperationPending>

export type IsOperationReadyParams = FunctionArguments<typeof functions.isOperationReady>
export type IsOperationReadyReturn = FunctionReturn<typeof functions.isOperationReady>

export type OnERC1155BatchReceivedParams = FunctionArguments<typeof functions.onERC1155BatchReceived>
export type OnERC1155BatchReceivedReturn = FunctionReturn<typeof functions.onERC1155BatchReceived>

export type OnERC1155ReceivedParams = FunctionArguments<typeof functions.onERC1155Received>
export type OnERC1155ReceivedReturn = FunctionReturn<typeof functions.onERC1155Received>

export type OnERC721ReceivedParams = FunctionArguments<typeof functions.onERC721Received>
export type OnERC721ReceivedReturn = FunctionReturn<typeof functions.onERC721Received>

export type RenounceRoleParams = FunctionArguments<typeof functions.renounceRole>
export type RenounceRoleReturn = FunctionReturn<typeof functions.renounceRole>

export type RevokeRoleParams = FunctionArguments<typeof functions.revokeRole>
export type RevokeRoleReturn = FunctionReturn<typeof functions.revokeRole>

export type ScheduleParams = FunctionArguments<typeof functions.schedule>
export type ScheduleReturn = FunctionReturn<typeof functions.schedule>

export type ScheduleBatchParams = FunctionArguments<typeof functions.scheduleBatch>
export type ScheduleBatchReturn = FunctionReturn<typeof functions.scheduleBatch>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type UpdateDelayParams = FunctionArguments<typeof functions.updateDelay>
export type UpdateDelayReturn = FunctionReturn<typeof functions.updateDelay>

