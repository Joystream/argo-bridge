import { FC } from 'react'
import { truncateAddress } from '@/lib/utils'
import { CopyIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'
import { getAddress, isAddress } from 'viem'

export const AddressLabel: FC<{ address: string }> = ({
  address: rawAddress,
}) => {
  const address = isAddress(rawAddress, { strict: false })
    ? getAddress(rawAddress)
    : rawAddress

  const truncated = truncateAddress(address, 10)

  const handleClick = () => {
    navigator.clipboard.writeText(address)
    toast.info('Address copied to clipboard')
  }

  return (
    <Tooltip>
      <TooltipTrigger onClick={handleClick}>
        <span className="flex items-center justify-between min-w-[205px]">
          {truncated}
          <CopyIcon className="h-4 w-4 ml-2" />
        </span>
      </TooltipTrigger>
      <TooltipContent>{address}</TooltipContent>
    </Tooltip>
  )
}
