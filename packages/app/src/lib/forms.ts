import { z } from 'zod'
import { isAddress } from 'viem'

export const rawAmountSchema = z
  .string()
  .min(1, 'Amount is required')
  .refine(
    (v) => {
      try {
        const n = parseFloat(v)
        if (isNaN(n)) return false
        return n > 0
      } catch {
        return false
      }
    },
    { message: 'Amount must be a positive number' }
  )

export const evmAddressSchema = z
  .string()
  .min(1, 'Address is required')
  .refine(isAddress, {
    message: 'This is not a valid Base address (must be checksummed)',
  })
