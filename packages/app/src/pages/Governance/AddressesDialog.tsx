import { AddressLink } from '@/components/AddressLink'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { FC } from 'react'

export const AddressesDialog: FC<{
  label: string
  addresses: readonly string[]
}> = ({ label, addresses }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-fit text-right underline">
        {addresses.length} addresses
      </DialogTrigger>
      <DialogContent closeable>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        {renderAddresses(addresses, false)}
      </DialogContent>
    </Dialog>
  )
}

export const renderAddresses = (addresses: readonly string[], end = true) => {
  return (
    <div
      className={cn('flex flex-wrap items-start gap-1', { 'justify-end': end })}
    >
      {addresses.map((account) => (
        <AddressLink address={account} key={account} />
      ))}
    </div>
  )
}
