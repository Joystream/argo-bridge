import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, Index as Index_, IntColumn as IntColumn_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {BridgeTransferStatus} from "./_bridgeTransferStatus"
import {BridgeTransferType} from "./_bridgeTransferType"

@Entity_()
export class BridgeTransfer {
    constructor(props?: Partial<BridgeTransfer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @Index_()
    @Column_("varchar", {length: 15, nullable: false})
    status!: BridgeTransferStatus

    @Column_("varchar", {length: 10, nullable: false})
    type!: BridgeTransferType

    @BigIntColumn_({nullable: false})
    feePaid!: bigint

    @Index_()
    @IntColumn_({nullable: false})
    sourceChainId!: number

    @Index_()
    @BigIntColumn_({nullable: false})
    sourceTransferId!: bigint

    @Index_()
    @StringColumn_({nullable: false})
    sourceAccount!: string

    @Index_()
    @IntColumn_({nullable: false})
    destChainId!: number

    @Index_()
    @StringColumn_({nullable: false})
    destAccount!: string

    @IntColumn_({nullable: false})
    createdAtBlock!: number

    @DateTimeColumn_({nullable: false})
    createdAtTimestamp!: Date

    @StringColumn_({nullable: false})
    createdTxHash!: string

    @IntColumn_({nullable: true})
    completedAtBlock!: number | undefined | null

    @DateTimeColumn_({nullable: true})
    completedAtTimestamp!: Date | undefined | null

    @StringColumn_({nullable: true})
    completedTxHash!: string | undefined | null

    @IntColumn_({nullable: true})
    revertedAtBlock!: number | undefined | null

    @DateTimeColumn_({nullable: true})
    revertedAtTimestamp!: Date | undefined | null

    @StringColumn_({nullable: true})
    revertedTxHash!: string | undefined | null

    @StringColumn_({nullable: true})
    revertReason!: string | undefined | null

    @StringColumn_({nullable: true})
    revertAccount!: string | undefined | null

    @BigIntColumn_({nullable: true})
    revertAmount!: bigint | undefined | null
}
