import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, Index as Index_, StringColumn as StringColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class EvmBridgeRoleGrantedEvent {
    constructor(props?: Partial<EvmBridgeRoleGrantedEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @BigIntColumn_({nullable: false})
    chainId!: bigint

    @StringColumn_({nullable: false})
    txHash!: string

    @IntColumn_({nullable: false})
    block!: number

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @StringColumn_({nullable: false})
    role!: string

    @StringColumn_({nullable: false})
    account!: string
}
