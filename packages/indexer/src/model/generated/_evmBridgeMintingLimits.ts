import assert from "assert"
import * as marshal from "./marshal"

export class EvmBridgeMintingLimits {
    private _periodLength!: number
    private _periodLimit!: bigint
    private _currentPeriodMinted!: bigint
    private _currentPeriodEndBlock!: number

    constructor(props?: Partial<Omit<EvmBridgeMintingLimits, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._periodLength = marshal.int.fromJSON(json.periodLength)
            this._periodLimit = marshal.bigint.fromJSON(json.periodLimit)
            this._currentPeriodMinted = marshal.bigint.fromJSON(json.currentPeriodMinted)
            this._currentPeriodEndBlock = marshal.int.fromJSON(json.currentPeriodEndBlock)
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

    get currentPeriodEndBlock(): number {
        assert(this._currentPeriodEndBlock != null, 'uninitialized access')
        return this._currentPeriodEndBlock
    }

    set currentPeriodEndBlock(value: number) {
        this._currentPeriodEndBlock = value
    }

    toJSON(): object {
        return {
            periodLength: this.periodLength,
            periodLimit: marshal.bigint.toJSON(this.periodLimit),
            currentPeriodMinted: marshal.bigint.toJSON(this.currentPeriodMinted),
            currentPeriodEndBlock: this.currentPeriodEndBlock,
        }
    }
}
