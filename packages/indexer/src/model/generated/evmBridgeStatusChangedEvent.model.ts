import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"
import {EvmBridgeStatus} from "./_evmBridgeStatus"

@Entity_()
export class EvmBridgeStatusChangedEvent {
    constructor(props?: Partial<EvmBridgeStatusChangedEvent>) {
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

    @Column_("varchar", {length: 6, nullable: false})
    status!: EvmBridgeStatus
}
