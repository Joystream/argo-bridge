import { FC } from 'react'
import { BridgeTransfer } from '@/lib/transfer'
import { BridgeTransferType } from '@/gql/graphql'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatJoy } from '@/lib/utils'
import { TransferRowJoyCells } from '@/pages/Transfers/TransferRowJoyCells'
import { TransferRowEvmCells } from '@/pages/Transfers/TransferRowEvmCells'

export const TransferRow: FC<{ transfer: BridgeTransfer }> = ({ transfer }) => {
  return (
    <TableRow>
      <TableCell>{transfer.id}</TableCell>
      <TableCell>{transfer.status}</TableCell>
      <TableCell>{transfer.sourceChainId}</TableCell>
      <TableCell className="max-w-[160px]  overflow-ellipsis overflow-hidden">
        {transfer.sourceAccount}
      </TableCell>
      <TableCell>{transfer.destChainId}</TableCell>
      <TableCell className="max-w-[160px] overflow-ellipsis overflow-hidden">
        {transfer.destAccount}
      </TableCell>
      <TableCell className="text-right">{formatJoy(transfer.amount)}</TableCell>
      {transfer.type === BridgeTransferType.EvmToJoy ? (
        <TransferRowJoyCells transfer={transfer} />
      ) : (
        <TransferRowEvmCells transfer={transfer} />
      )}
    </TableRow>
  )
}
