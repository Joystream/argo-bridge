import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class EvmTimelockCallScheduledEvent {
    constructor(props?: Partial<EvmTimelockCallScheduledEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @IntColumn_({nullable: false})
    chainId!: number

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    block!: number

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @StringColumn_({nullable: false})
    operationId!: string

    @IntColumn_({nullable: false})
    callIndex!: number

    @StringColumn_({nullable: false})
    callTarget!: string

    @BigIntColumn_({nullable: false})
    callValue!: bigint

    @StringColumn_({nullable: false})
    callData!: string

    @StringColumn_({nullable: true})
    predecessor!: string | undefined | null

    @BigIntColumn_({nullable: false})
    delay!: bigint
}
