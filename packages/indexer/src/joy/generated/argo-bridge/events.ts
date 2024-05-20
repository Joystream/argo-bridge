import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v2003 from '../v2003'

export const outboundTransferRequested =  {
    name: 'ArgoBridge.OutboundTransferRequested',
    v2003: new EventType(
        'ArgoBridge.OutboundTransferRequested',
        sts.tuple([sts.bigint(), v2003.AccountId32, v2003.RemoteAccount, sts.bigint(), sts.bigint()])
    ),
}

export const inboundTransferFinalized =  {
    name: 'ArgoBridge.InboundTransferFinalized',
    v2003: new EventType(
        'ArgoBridge.InboundTransferFinalized',
        sts.tuple([v2003.RemoteTransfer, v2003.AccountId32, sts.bigint()])
    ),
}

export const bridgePaused =  {
    name: 'ArgoBridge.BridgePaused',
    v2003: new EventType(
        'ArgoBridge.BridgePaused',
        v2003.AccountId32
    ),
}

export const bridgeThawnStarted =  {
    name: 'ArgoBridge.BridgeThawnStarted',
    v2003: new EventType(
        'ArgoBridge.BridgeThawnStarted',
        v2003.AccountId32
    ),
}

export const bridgeThawnFinished =  {
    name: 'ArgoBridge.BridgeThawnFinished',
    v2003: new EventType(
        'ArgoBridge.BridgeThawnFinished',
        sts.unit()
    ),
}

export const bridgeConfigUpdated =  {
    name: 'ArgoBridge.BridgeConfigUpdated',
    v2003: new EventType(
        'ArgoBridge.BridgeConfigUpdated',
        sts.unit()
    ),
}
