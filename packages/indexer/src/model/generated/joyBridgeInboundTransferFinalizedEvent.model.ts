import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class JoyBridgeInboundTransferFinalizedEvent {
    constructor(props?: Partial<JoyBridgeInboundTransferFinalizedEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    chainId!: number

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    block!: number

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @BigIntColumn_({nullable: false})
    remoteTransferId!: bigint

    @IntColumn_({nullable: false})
    remoteChainId!: number

    @StringColumn_({nullable: false})
    joyDestAccount!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint
}
