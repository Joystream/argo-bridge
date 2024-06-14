import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class JoyBridgeOutboundTransferRevertedEvent {
    constructor(props?: Partial<JoyBridgeOutboundTransferRevertedEvent>) {
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
    joyTransferId!: bigint

    @StringColumn_({nullable: false})
    revertAccount!: string

    @BigIntColumn_({nullable: false})
    revertAmount!: bigint

    @StringColumn_({nullable: false})
    rationale!: string
}
