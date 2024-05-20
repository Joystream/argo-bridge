import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class JoyBridgeInboundTransferFinalizedEvent {
    constructor(props?: Partial<JoyBridgeInboundTransferFinalizedEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    chainId!: bigint

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    block!: number

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @BigIntColumn_({nullable: false})
    remoteTransferId!: bigint

    @BigIntColumn_({nullable: false})
    remoteChainId!: bigint

    @StringColumn_({nullable: false})
    joyDestAccount!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint
}
