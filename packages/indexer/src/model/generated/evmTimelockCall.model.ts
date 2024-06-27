import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, ManyToOne as ManyToOne_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import {EvmTimelockOperation} from "./evmTimelockOperation.model"

@Entity_()
export class EvmTimelockCall {
    constructor(props?: Partial<EvmTimelockCall>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @IntColumn_({nullable: false})
    chainId!: number

    @Index_()
    @ManyToOne_(() => EvmTimelockOperation, {nullable: true})
    operation!: EvmTimelockOperation

    @IntColumn_({nullable: false})
    callIndex!: number

    @StringColumn_({nullable: false})
    callTarget!: string

    @BigIntColumn_({nullable: false})
    callValue!: bigint

    @StringColumn_({nullable: false})
    callData!: string

    @StringColumn_({nullable: true})
    callSignature!: string | undefined | null

    @StringColumn_({nullable: true})
    callArgs!: string | undefined | null
}
