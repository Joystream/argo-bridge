import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v2003 from '../v2003'

export const requestOutboundTransfer =  {
    name: 'ArgoBridge.request_outbound_transfer',
    v2003: new CallType(
        'ArgoBridge.request_outbound_transfer',
        sts.struct({
            destAccount: v2003.RemoteAccount,
            amount: sts.bigint(),
            expectedFee: sts.bigint(),
        })
    ),
}

export const finalizeInboundTransfer =  {
    name: 'ArgoBridge.finalize_inbound_transfer',
    v2003: new CallType(
        'ArgoBridge.finalize_inbound_transfer',
        sts.struct({
            remoteTransfer: v2003.RemoteTransfer,
            destAccount: v2003.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const pauseBridge =  {
    name: 'ArgoBridge.pause_bridge',
    v2003: new CallType(
        'ArgoBridge.pause_bridge',
        sts.unit()
    ),
}

export const initUnpauseBridge =  {
    name: 'ArgoBridge.init_unpause_bridge',
    v2003: new CallType(
        'ArgoBridge.init_unpause_bridge',
        sts.unit()
    ),
}

export const finishUnpauseBridge =  {
    name: 'ArgoBridge.finish_unpause_bridge',
    v2003: new CallType(
        'ArgoBridge.finish_unpause_bridge',
        sts.unit()
    ),
}

export const updateBridgeConstrains =  {
    name: 'ArgoBridge.update_bridge_constrains',
    v2003: new CallType(
        'ArgoBridge.update_bridge_constrains',
        sts.struct({
            parameters: v2003.BridgeConstraints,
        })
    ),
}
