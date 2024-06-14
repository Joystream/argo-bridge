import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v2004 from '../v2004'

export const outboundTransferRequested =  {
    name: 'ArgoBridge.OutboundTransferRequested',
    v2004: new EventType(
        'ArgoBridge.OutboundTransferRequested',
        sts.tuple([sts.bigint(), v2004.AccountId32, v2004.RemoteAccount, sts.bigint(), sts.bigint()])
    ),
}

export const inboundTransferFinalized =  {
    name: 'ArgoBridge.InboundTransferFinalized',
    v2004: new EventType(
        'ArgoBridge.InboundTransferFinalized',
        sts.tuple([v2004.RemoteTransfer, v2004.AccountId32, sts.bigint()])
    ),
}

export const outboundTransferReverted =  {
    name: 'ArgoBridge.OutboundTransferReverted',
    v2004: new EventType(
        'ArgoBridge.OutboundTransferReverted',
        sts.tuple([sts.bigint(), v2004.AccountId32, sts.bigint(), v2004.BoundedVec])
    ),
}

export const bridgePaused =  {
    name: 'ArgoBridge.BridgePaused',
    v2004: new EventType(
        'ArgoBridge.BridgePaused',
        v2004.AccountId32
    ),
}

export const bridgeThawnStarted =  {
    name: 'ArgoBridge.BridgeThawnStarted',
    v2004: new EventType(
        'ArgoBridge.BridgeThawnStarted',
        sts.tuple([v2004.AccountId32, sts.number()])
    ),
}

export const bridgeThawnFinished =  {
    name: 'ArgoBridge.BridgeThawnFinished',
    v2004: new EventType(
        'ArgoBridge.BridgeThawnFinished',
        sts.unit()
    ),
}

export const bridgeConfigUpdated =  {
    name: 'ArgoBridge.BridgeConfigUpdated',
    v2004: new EventType(
        'ArgoBridge.BridgeConfigUpdated',
        v2004.BridgeConstraints
    ),
}
