import * as React from 'react'

import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  copy?: boolean
  isInvalid?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, copy, isInvalid, ...props }, ref) => {
    const [hasJustCopied, setHasJustCopied] = React.useState(false)

    const copyNode = copy ? (
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="pointer-events-auto"
          onClick={() => {
            navigator.clipboard.writeText(props.value?.toString() ?? '')
            setHasJustCopied(true)
            setTimeout(() => setHasJustCopied(false), 1500)
          }}
        >
          {hasJustCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    ) : null

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            'aria-[invalid=true]:border-destructive',
            className
          )}
          aria-invalid={isInvalid}
          ref={ref}
          {...props}
        />
        {copyNode}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
