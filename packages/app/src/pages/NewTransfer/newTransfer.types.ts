export type ParsedTransferFormData = {
  sourceAddress: string
  targetAddress: string
  hapiAmount: bigint
}

export type TransferFormSchema = {
  sourceAddress: string
  targetAddress: string
  amountRaw: string
}
