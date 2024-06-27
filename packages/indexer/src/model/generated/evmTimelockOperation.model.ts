import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, StringColumn as StringColumn_, OneToMany as OneToMany_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {EvmTimelockCall} from "./evmTimelockCall.model"
import {EvmTimelockOperationStatus} from "./_evmTimelockOperationStatus"

@Entity_()
export class EvmTimelockOperation {
    constructor(props?: Partial<EvmTimelockOperation>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @IntColumn_({nullable: false})
    chainId!: number

    @Index_()
    @StringColumn_({nullable: false})
    operationId!: string

    @OneToMany_(() => EvmTimelockCall, e => e.operation)
    calls!: EvmTimelockCall[]

    @Column_("varchar", {length: 9, nullable: false})
    status!: EvmTimelockOperationStatus

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

    @StringColumn_({nullable: true})
    predecessor!: string | undefined | null

    @StringColumn_({nullable: true})
    salt!: string | undefined | null

    @DateTimeColumn_({nullable: false})
    delayDoneTimestamp!: Date
}
