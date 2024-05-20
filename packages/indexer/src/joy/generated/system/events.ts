import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v2003 from '../v2003'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     * An extrinsic completed successfully.
     */
    v2003: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v2003.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     * An extrinsic failed.
     */
    v2003: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v2003.DispatchError,
            dispatchInfo: v2003.DispatchInfo,
        })
    ),
}
