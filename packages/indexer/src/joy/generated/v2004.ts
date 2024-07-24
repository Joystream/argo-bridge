import {sts, Result, Option, Bytes, BitSequence} from './support'

export const BridgeConstraints: sts.Type<BridgeConstraints> = sts.struct(() => {
    return  {
        operatorAccount: sts.option(() => AccountId32),
        pauserAccounts: sts.option(() => sts.array(() => AccountId32)),
        bridgingFee: sts.option(() => sts.bigint()),
        thawnDuration: sts.option(() => sts.number()),
        remoteChains: sts.option(() => sts.array(() => sts.number())),
    }
})

export interface BridgeConstraints {
    operatorAccount?: (AccountId32 | undefined)
    pauserAccounts?: (AccountId32[] | undefined)
    bridgingFee?: (bigint | undefined)
    thawnDuration?: (number | undefined)
    remoteChains?: (number[] | undefined)
}

export type AccountId32 = Bytes

export const BoundedVec = sts.bytes()

export const RemoteTransfer: sts.Type<RemoteTransfer> = sts.struct(() => {
    return  {
        id: sts.bigint(),
        chainId: sts.number(),
    }
})

export interface RemoteTransfer {
    id: bigint
    chainId: number
}

export const RemoteAccount: sts.Type<RemoteAccount> = sts.struct(() => {
    return  {
        account: sts.bytes(),
        chainId: sts.number(),
    }
})

export interface RemoteAccount {
    account: Bytes
    chainId: number
}

export const AccountId32 = sts.bytes()
