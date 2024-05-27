import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class JoyBridgeOutboundTransferRequestedEvent {
    constructor(props?: Partial<JoyBridgeOutboundTransferRequestedEvent>) {
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

    @StringColumn_({nullable: false})
    joyRequester!: string

    @BigIntColumn_({nullable: false})
    joyTransferId!: bigint

    @StringColumn_({nullable: false})
    destAccount!: string

    @IntColumn_({nullable: false})
    destChainId!: number

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @BigIntColumn_({nullable: false})
    feePaid!: bigint
}
