import { FC } from 'react'
import { cn, truncateValue } from '@/lib/utils'
import { CopyIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'
import { getAddress, isAddress } from 'viem'

export const Truncated: FC<{
  value: string | number | bigint
  right?: boolean
}> = ({ value: rawValue, right = false }) => {
  if (!rawValue) return null
  const value = rawValue.toString()
  const formatted = isAddress(value, { strict: false })
    ? getAddress(value)
    : value

  const truncated = truncateValue(formatted, 10)

  const handleClick = () => {
    navigator.clipboard.writeText(formatted)
    toast.info('Copied to clipboard')
  }

  return (
    <Tooltip>
      <TooltipTrigger onClick={handleClick}>
        <span
          className={cn(
            'flex items-center',
            !right && 'justify-between min-w-[205px]',
            right && 'text-right'
          )}
        >
          {truncated}
          <CopyIcon className="h-4 w-4 ml-2" />
        </span>
      </TooltipTrigger>
      <TooltipContent>{formatted}</TooltipContent>
    </Tooltip>
  )
}
