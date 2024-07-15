import { z } from 'zod'

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
