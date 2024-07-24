import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1000 from '../v1000'
import * as v2002 from '../v2002'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     * An extrinsic completed successfully.
     */
    v1000: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v1000.DispatchInfo,
        })
    ),
    /**
     * An extrinsic completed successfully.
     */
    v2002: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v2002.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     * An extrinsic failed.
     */
    v1000: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v1000.DispatchError,
            dispatchInfo: v1000.DispatchInfo,
        })
    ),
    /**
     * An extrinsic failed.
     */
    v2002: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v2002.DispatchError,
            dispatchInfo: v2002.DispatchInfo,
        })
    ),
}
