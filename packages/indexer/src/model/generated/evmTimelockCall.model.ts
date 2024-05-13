import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import {EvmTimelockCallStatus} from "./_evmTimelockCallStatus"

@Entity_()
export class EvmTimelockCall {
    constructor(props?: Partial<EvmTimelockCall>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("varchar", {length: 9, nullable: false})
    status!: EvmTimelockCallStatus

    @IntColumn_({nullable: false})
    createdAtBlock!: number

    @DateTimeColumn_({nullable: false})
    createdAtTimestamp!: Date

    @StringColumn_({nullable: false})
    createdTxHash!: string

    @IntColumn_({nullable: true})
    executedAtBlock!: number | undefined | null

    @DateTimeColumn_({nullable: true})
    executedAtTimestamp!: Date | undefined | null

    @StringColumn_({nullable: true})
    executedTxHash!: string | undefined | null

    @IntColumn_({nullable: true})
    cancelledAtBlock!: number | undefined | null

    @DateTimeColumn_({nullable: true})
    cancelledAtTimestamp!: Date | undefined | null

    @StringColumn_({nullable: true})
    cancelledTxHash!: string | undefined | null

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

    @StringColumn_({nullable: true})
    predecessor!: string | undefined | null

    @StringColumn_({nullable: true})
    salt!: string | undefined | null

    @DateTimeColumn_({nullable: false})
    delayDoneTimestamp!: Date
}
