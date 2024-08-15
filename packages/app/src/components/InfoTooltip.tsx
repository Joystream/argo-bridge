import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { FC, PropsWithChildren } from 'react'

export const InfoTooltip: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Info className="w-4 h-4" />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  )
}
