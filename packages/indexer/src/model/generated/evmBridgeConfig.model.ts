import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import * as marshal from "./marshal"
import {EvmBridgeStatus} from "./_evmBridgeStatus"
import {EvmBridgeMintingLimits} from "./_evmBridgeMintingLimits"

@Entity_()
export class EvmBridgeConfig {
    constructor(props?: Partial<EvmBridgeConfig>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("varchar", {length: 6, nullable: false})
    status!: EvmBridgeStatus

    @BigIntColumn_({nullable: false})
    bridgingFee!: bigint

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new EvmBridgeMintingLimits(undefined, obj)}, nullable: false})
    mintingLimits!: EvmBridgeMintingLimits

    @BigIntColumn_({nullable: false})
    totalMinted!: bigint

    @BigIntColumn_({nullable: false})
    totalBurned!: bigint
}
