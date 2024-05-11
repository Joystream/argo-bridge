import assert from "assert"
import * as marshal from "./marshal"

export class EvmMintingLimits {
    private _periodLength!: number
    private _periodLimit!: bigint
    private _currentPeriodMinted!: bigint

    constructor(props?: Partial<Omit<EvmMintingLimits, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._periodLength = marshal.int.fromJSON(json.periodLength)
            this._periodLimit = marshal.bigint.fromJSON(json.periodLimit)
            this._currentPeriodMinted = marshal.bigint.fromJSON(json.currentPeriodMinted)
        }
    }

    get periodLength(): number {
        assert(this._periodLength != null, 'uninitialized access')
        return this._periodLength
    }

    set periodLength(value: number) {
        this._periodLength = value
    }

    get periodLimit(): bigint {
        assert(this._periodLimit != null, 'uninitialized access')
        return this._periodLimit
    }

    set periodLimit(value: bigint) {
        this._periodLimit = value
    }

    get currentPeriodMinted(): bigint {
        assert(this._currentPeriodMinted != null, 'uninitialized access')
        return this._currentPeriodMinted
    }

    set currentPeriodMinted(value: bigint) {
        this._currentPeriodMinted = value
    }

    toJSON(): object {
        return {
            periodLength: this.periodLength,
            periodLimit: marshal.bigint.toJSON(this.periodLimit),
            currentPeriodMinted: marshal.bigint.toJSON(this.currentPeriodMinted),
        }
    }
}
