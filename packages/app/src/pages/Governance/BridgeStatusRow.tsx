import { FC, ReactNode } from 'react'

export const BridgeStatusRow: FC<{
  label: string
  value: string | ReactNode
}> = ({ label, value }) => {
  return (
    <div className="flex items-start justify-between">
      <h5 className="text-muted-foreground">{label}:</h5>
      <span className="text-right max-w-[80%]">{value || '—'}</span>
    </div>
  )
}
