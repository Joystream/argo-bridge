import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class EvmBridgeTransferToJoystreamRevertedEvent {
    constructor(props?: Partial<EvmBridgeTransferToJoystreamRevertedEvent>) {
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

    @BigIntColumn_({nullable: false})
    ethTransferId!: bigint

    @StringColumn_({nullable: false})
    revertAccount!: string

    @BigIntColumn_({nullable: false})
    revertAmount!: bigint

    @StringColumn_({nullable: false})
    rationale!: string
}
