import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v2004 from '../v2004'

export const requestOutboundTransfer =  {
    name: 'ArgoBridge.request_outbound_transfer',
    v2004: new CallType(
        'ArgoBridge.request_outbound_transfer',
        sts.struct({
            destAccount: v2004.RemoteAccount,
            amount: sts.bigint(),
            expectedFee: sts.bigint(),
        })
    ),
}

export const finalizeInboundTransfer =  {
    name: 'ArgoBridge.finalize_inbound_transfer',
    v2004: new CallType(
        'ArgoBridge.finalize_inbound_transfer',
        sts.struct({
            remoteTransfer: v2004.RemoteTransfer,
            destAccount: v2004.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const pauseBridge =  {
    name: 'ArgoBridge.pause_bridge',
    v2004: new CallType(
        'ArgoBridge.pause_bridge',
        sts.unit()
    ),
}

export const initUnpauseBridge =  {
    name: 'ArgoBridge.init_unpause_bridge',
    v2004: new CallType(
        'ArgoBridge.init_unpause_bridge',
        sts.unit()
    ),
}

export const finishUnpauseBridge =  {
    name: 'ArgoBridge.finish_unpause_bridge',
    v2004: new CallType(
        'ArgoBridge.finish_unpause_bridge',
        sts.unit()
    ),
}

export const updateBridgeConstrains =  {
    name: 'ArgoBridge.update_bridge_constrains',
    /**
     * Allow Governance to Set constraints
     * Preconditions:
     * - origin is signed by `root`
     * PostConditions:
     * - governance parameters storage value set to the provided values
     * <weight>
     * 
     * ## Weight
     * `O (1)`
     * # </weight>
     */
    v2004: new CallType(
        'ArgoBridge.update_bridge_constrains',
        sts.struct({
            parameters: v2004.BridgeConstraints,
        })
    ),
}
