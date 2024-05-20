import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class JoyBridgeOutboundTransferRequestedEvent {
    constructor(props?: Partial<JoyBridgeOutboundTransferRequestedEvent>) {
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

    @StringColumn_({nullable: false})
    joyRequester!: string

    @BigIntColumn_({nullable: false})
    joyTransferId!: bigint

    @StringColumn_({nullable: false})
    destAccount!: string

    @BigIntColumn_({nullable: false})
    destChainId!: bigint

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @BigIntColumn_({nullable: false})
    feePaid!: bigint
}
