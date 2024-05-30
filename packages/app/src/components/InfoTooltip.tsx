import { FC, PropsWithChildren } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

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
