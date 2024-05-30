import { FC, ReactNode, useId } from 'react'
import { Input, InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InfoTooltip } from '@/components/InfoTooltip'
import { cn } from '@/lib/utils'

export type JoyInputProps = {
  label: string
  tooltip?: ReactNode
  isInvalid?: boolean
} & InputProps

export const JoyInput: FC<JoyInputProps> = ({
  label,
  tooltip,
  isInvalid,
  ...props
}) => {
  const id = useId()

  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={id} className={cn(isInvalid && 'text-destructive')}>
        {tooltip ? (
          <div className="flex items-center justify-between">
            <span>{label}</span>
            <InfoTooltip>{tooltip}</InfoTooltip>
          </div>
        ) : (
          label
        )}
      </Label>
      <Input id={id} {...props} isInvalid={isInvalid} className="w-full" />
    </div>
  )
}
