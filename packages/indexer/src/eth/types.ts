import { Log } from "@subsquid/evm-processor"

export type EvmLog = Log<{ log: { transactionHash: true } }>
