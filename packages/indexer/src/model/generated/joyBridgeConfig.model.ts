import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"
import {JoyBridgeStatus} from "./_joyBridgeStatus"

@Entity_()
export class JoyBridgeConfig {
    constructor(props?: Partial<JoyBridgeConfig>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("varchar", {length: 6, nullable: false})
    status!: JoyBridgeStatus

    @IntColumn_({nullable: true})
    thawnEndsAtBlock!: number | undefined | null

    @BigIntColumn_({nullable: false})
    bridgingFee!: bigint

    @IntColumn_({nullable: false})
    thawnDurationBlocks!: number

    @BigIntColumn_({nullable: false})
    mintAllowance!: bigint

    @StringColumn_({nullable: false})
    operatorAccount!: string

    @StringColumn_({array: true, nullable: false})
    pauserAccounts!: (string)[]

    @BigIntColumn_({nullable: false})
    totalMinted!: bigint

    @BigIntColumn_({nullable: false})
    totalBurned!: bigint

    @BigIntColumn_({nullable: false})
    feesBurned!: bigint

    @IntColumn_({array: true, nullable: false})
    supportedRemoteChainIds!: (number)[]
}
