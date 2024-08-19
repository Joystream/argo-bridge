import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ExternalLinkIcon } from 'lucide-react'
import { FC } from 'react'

export type LinkBadgeProps = {
  href?: string
  fullText: string
  label: string
}

export const LinkBadge: FC<LinkBadgeProps> = ({ href, fullText, label }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Badge variant="outline">
            {label}
            <ExternalLinkIcon className="ml-1 w-3 h-3" />
          </Badge>
        </a>
      </TooltipTrigger>
      <TooltipContent>{fullText}</TooltipContent>
    </Tooltip>
  )
}
