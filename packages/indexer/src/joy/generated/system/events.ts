import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v2004 from '../v2004'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     * An extrinsic completed successfully.
     */
    v2004: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v2004.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     * An extrinsic failed.
     */
    v2004: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v2004.DispatchError,
            dispatchInfo: v2004.DispatchInfo,
        })
    ),
}
