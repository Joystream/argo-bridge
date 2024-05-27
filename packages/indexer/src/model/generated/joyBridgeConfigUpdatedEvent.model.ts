import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class JoyBridgeConfigUpdatedEvent {
    constructor(props?: Partial<JoyBridgeConfigUpdatedEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    chainId!: number

    @StringColumn_({nullable: true})
    txHash!: string | undefined | null

    @IntColumn_({nullable: false})
    block!: number

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @StringColumn_({nullable: true})
    newOperatorAccount!: string | undefined | null

    @StringColumn_({array: true, nullable: true})
    newPauserAccounts!: (string)[] | undefined | null

    @BigIntColumn_({nullable: true})
    newBridgingFee!: bigint | undefined | null

    @IntColumn_({nullable: true})
    newThawnDuration!: number | undefined | null

    @IntColumn_({array: true, nullable: true})
    newRemoteChains!: (number)[] | undefined | null
}
