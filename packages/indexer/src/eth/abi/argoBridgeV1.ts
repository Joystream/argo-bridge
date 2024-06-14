import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    ArgoBridgeFeeChanged: event("0x9d699f862acc3d76830ba2f9d1efc23c25190e4309f64c091cffc65230fe568f", {"newFee": p.uint256}),
    ArgoBridgeFeesWithdrawn: event("0x120c23ad9d3d7272a0d20dd6b7a2822584daf524e67963daa6a7d47b7576a816", {"destination": p.address, "amount": p.uint256}),
    ArgoBridgeMintingLimitsUpdated: event("0xc01acf06a73b9c6b1e27941f05c5a9e8f8132593e96d257da8869304c6236f69", {"newMintingLimitPeriodLengthBlocks": p.uint256, "newMintingLimitPerPeriod": p.uint256}),
    ArgoBridgeStatusChanged: event("0x674a79b744f31247a99ff1ed4a383c0c77299efbdb099b5f69a75077aa3872ae", {"newStatus": p.uint8}),
    ArgoTransferToEthCompleted: event("0x7e23ecf974046609d9a1de48d379cfca42f21df5a2a1a061dc97468705e44ec2", {"joyTransferId": indexed(p.uint256), "ethDestAddress": indexed(p.address), "amount": p.uint256}),
    ArgoTransferToJoystreamRequested: event("0x82faa25a69607faadf0963495313e5c2b60799b5c3a65e35d850b77e73b79f6d", {"ethTransferId": indexed(p.uint256), "ethRequester": indexed(p.address), "joyDestAccount": p.bytes32, "amount": p.uint256}),
    ArgoTransferToJoystreamReverted: event("0xa25b21b9fa597e02e957bf452497316423b937661dfa0b53f2c89d5e43725d43", {"ethTransferId": indexed(p.uint256), "revertAddress": indexed(p.address), "revertAmount": p.uint256, "rationale": p.string}),
    RoleAdminChanged: event("0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff", {"role": indexed(p.bytes32), "previousAdminRole": indexed(p.bytes32), "newAdminRole": indexed(p.bytes32)}),
    RoleGranted: event("0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    RoleRevoked: event("0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
}

export const functions = {
    DEFAULT_ADMIN_ROLE: viewFun("0xa217fddf", {}, p.bytes32),
    OPERATOR_ROLE: viewFun("0xf5b541a6", {}, p.bytes32),
    PAUSER_ROLE: viewFun("0xe63ab1e9", {}, p.bytes32),
    bridgeFee: viewFun("0x82b12dd7", {}, p.uint256),
    bridgeStatus: viewFun("0x865f87ac", {}, p.uint8),
    completeTransferToEth: fun("0xc194116f", {"joyTransferId": p.uint256, "ethDestAddress": p.address, "amount": p.uint256}, ),
    currentMintingPeriodEndBlock: viewFun("0x447117b4", {}, p.uint256),
    currentMintingPeriodMinted: viewFun("0x120da508", {}, p.uint256),
    getRoleAdmin: viewFun("0x248a9ca3", {"role": p.bytes32}, p.bytes32),
    grantRole: fun("0x2f2ff15d", {"role": p.bytes32, "account": p.address}, ),
    hasRole: viewFun("0x91d14854", {"role": p.bytes32, "account": p.address}, p.bool),
    joystreamErc20: viewFun("0x890ef592", {}, p.address),
    mintingLimitPerPeriod: viewFun("0x82ac7008", {}, p.uint256),
    mintingLimitPeriodLengthBlocks: viewFun("0x5cfb2ad2", {}, p.uint256),
    pauseBridge: fun("0x7dd0480f", {}, ),
    renounceRole: fun("0x36568abe", {"role": p.bytes32, "callerConfirmation": p.address}, ),
    requestTransferToJoystream: fun("0xff926998", {"joyDestAccount": p.bytes32, "amount": p.uint256}, ),
    revertTransferToJoystream: fun("0x22e4ca23", {"ethTransferId": p.uint256, "revertAddress": p.address, "revertAmount": p.uint256, "rationale": p.string}, ),
    revokeRole: fun("0xd547741f", {"role": p.bytes32, "account": p.address}, ),
    setBridgeFee: fun("0x998cdf83", {"newBridgeFee": p.uint256}, ),
    setMintingLimits: fun("0x84f302f1", {"newMintingLimitPeriodLengthBlocks": p.uint256, "newMintingLimitPerPeriod": p.uint256}, ),
    supportsInterface: viewFun("0x01ffc9a7", {"interfaceId": p.bytes4}, p.bool),
    unpauseBridge: fun("0xa82f143c", {}, ),
    withdrawBridgeFees: fun("0xb4ed7145", {}, ),
}

export class Contract extends ContractBase {

    DEFAULT_ADMIN_ROLE() {
        return this.eth_call(functions.DEFAULT_ADMIN_ROLE, {})
    }

    OPERATOR_ROLE() {
        return this.eth_call(functions.OPERATOR_ROLE, {})
    }

    PAUSER_ROLE() {
        return this.eth_call(functions.PAUSER_ROLE, {})
    }

    bridgeFee() {
        return this.eth_call(functions.bridgeFee, {})
    }

    bridgeStatus() {
        return this.eth_call(functions.bridgeStatus, {})
    }

    currentMintingPeriodEndBlock() {
        return this.eth_call(functions.currentMintingPeriodEndBlock, {})
    }

    currentMintingPeriodMinted() {
        return this.eth_call(functions.currentMintingPeriodMinted, {})
    }

    getRoleAdmin(role: GetRoleAdminParams["role"]) {
        return this.eth_call(functions.getRoleAdmin, {role})
    }

    hasRole(role: HasRoleParams["role"], account: HasRoleParams["account"]) {
        return this.eth_call(functions.hasRole, {role, account})
    }

    joystreamErc20() {
        return this.eth_call(functions.joystreamErc20, {})
    }

    mintingLimitPerPeriod() {
        return this.eth_call(functions.mintingLimitPerPeriod, {})
    }

    mintingLimitPeriodLengthBlocks() {
        return this.eth_call(functions.mintingLimitPeriodLengthBlocks, {})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }
}

/// Event types
export type ArgoBridgeFeeChangedEventArgs = EParams<typeof events.ArgoBridgeFeeChanged>
export type ArgoBridgeFeesWithdrawnEventArgs = EParams<typeof events.ArgoBridgeFeesWithdrawn>
export type ArgoBridgeMintingLimitsUpdatedEventArgs = EParams<typeof events.ArgoBridgeMintingLimitsUpdated>
export type ArgoBridgeStatusChangedEventArgs = EParams<typeof events.ArgoBridgeStatusChanged>
export type ArgoTransferToEthCompletedEventArgs = EParams<typeof events.ArgoTransferToEthCompleted>
export type ArgoTransferToJoystreamRequestedEventArgs = EParams<typeof events.ArgoTransferToJoystreamRequested>
export type ArgoTransferToJoystreamRevertedEventArgs = EParams<typeof events.ArgoTransferToJoystreamReverted>
export type RoleAdminChangedEventArgs = EParams<typeof events.RoleAdminChanged>
export type RoleGrantedEventArgs = EParams<typeof events.RoleGranted>
export type RoleRevokedEventArgs = EParams<typeof events.RoleRevoked>

/// Function types
export type DEFAULT_ADMIN_ROLEParams = FunctionArguments<typeof functions.DEFAULT_ADMIN_ROLE>
export type DEFAULT_ADMIN_ROLEReturn = FunctionReturn<typeof functions.DEFAULT_ADMIN_ROLE>

export type OPERATOR_ROLEParams = FunctionArguments<typeof functions.OPERATOR_ROLE>
export type OPERATOR_ROLEReturn = FunctionReturn<typeof functions.OPERATOR_ROLE>

export type PAUSER_ROLEParams = FunctionArguments<typeof functions.PAUSER_ROLE>
export type PAUSER_ROLEReturn = FunctionReturn<typeof functions.PAUSER_ROLE>

export type BridgeFeeParams = FunctionArguments<typeof functions.bridgeFee>
export type BridgeFeeReturn = FunctionReturn<typeof functions.bridgeFee>

export type BridgeStatusParams = FunctionArguments<typeof functions.bridgeStatus>
export type BridgeStatusReturn = FunctionReturn<typeof functions.bridgeStatus>

export type CompleteTransferToEthParams = FunctionArguments<typeof functions.completeTransferToEth>
export type CompleteTransferToEthReturn = FunctionReturn<typeof functions.completeTransferToEth>

export type CurrentMintingPeriodEndBlockParams = FunctionArguments<typeof functions.currentMintingPeriodEndBlock>
export type CurrentMintingPeriodEndBlockReturn = FunctionReturn<typeof functions.currentMintingPeriodEndBlock>

export type CurrentMintingPeriodMintedParams = FunctionArguments<typeof functions.currentMintingPeriodMinted>
export type CurrentMintingPeriodMintedReturn = FunctionReturn<typeof functions.currentMintingPeriodMinted>

export type GetRoleAdminParams = FunctionArguments<typeof functions.getRoleAdmin>
export type GetRoleAdminReturn = FunctionReturn<typeof functions.getRoleAdmin>

export type GrantRoleParams = FunctionArguments<typeof functions.grantRole>
export type GrantRoleReturn = FunctionReturn<typeof functions.grantRole>

export type HasRoleParams = FunctionArguments<typeof functions.hasRole>
export type HasRoleReturn = FunctionReturn<typeof functions.hasRole>

export type JoystreamErc20Params = FunctionArguments<typeof functions.joystreamErc20>
export type JoystreamErc20Return = FunctionReturn<typeof functions.joystreamErc20>

export type MintingLimitPerPeriodParams = FunctionArguments<typeof functions.mintingLimitPerPeriod>
export type MintingLimitPerPeriodReturn = FunctionReturn<typeof functions.mintingLimitPerPeriod>

export type MintingLimitPeriodLengthBlocksParams = FunctionArguments<typeof functions.mintingLimitPeriodLengthBlocks>
export type MintingLimitPeriodLengthBlocksReturn = FunctionReturn<typeof functions.mintingLimitPeriodLengthBlocks>

export type PauseBridgeParams = FunctionArguments<typeof functions.pauseBridge>
export type PauseBridgeReturn = FunctionReturn<typeof functions.pauseBridge>

export type RenounceRoleParams = FunctionArguments<typeof functions.renounceRole>
export type RenounceRoleReturn = FunctionReturn<typeof functions.renounceRole>

export type RequestTransferToJoystreamParams = FunctionArguments<typeof functions.requestTransferToJoystream>
export type RequestTransferToJoystreamReturn = FunctionReturn<typeof functions.requestTransferToJoystream>

export type RevertTransferToJoystreamParams = FunctionArguments<typeof functions.revertTransferToJoystream>
export type RevertTransferToJoystreamReturn = FunctionReturn<typeof functions.revertTransferToJoystream>

export type RevokeRoleParams = FunctionArguments<typeof functions.revokeRole>
export type RevokeRoleReturn = FunctionReturn<typeof functions.revokeRole>

export type SetBridgeFeeParams = FunctionArguments<typeof functions.setBridgeFee>
export type SetBridgeFeeReturn = FunctionReturn<typeof functions.setBridgeFee>

export type SetMintingLimitsParams = FunctionArguments<typeof functions.setMintingLimits>
export type SetMintingLimitsReturn = FunctionReturn<typeof functions.setMintingLimits>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type UnpauseBridgeParams = FunctionArguments<typeof functions.unpauseBridge>
export type UnpauseBridgeReturn = FunctionReturn<typeof functions.unpauseBridge>

export type WithdrawBridgeFeesParams = FunctionArguments<typeof functions.withdrawBridgeFees>
export type WithdrawBridgeFeesReturn = FunctionReturn<typeof functions.withdrawBridgeFees>

