import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { ARGO_INDEXER_URL, BRIDGE_ADDRESS } from '@/config'
import { getTransfersDocument } from '@/queries/transfers'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatJoy, truncateAddress } from '@/lib/utils'
import { useAccount, useWriteContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import { BridgeAbi } from '@joystream/argo-core'
import { Hex } from 'viem'
import { BridgeTransfer, parseTransfer } from '@/lib/transfer'
import { BridgeTransferStatus, BridgeTransferType } from '@/gql/graphql'
import { useTransaction } from '@/providers/transaction'
import { buildFinalizeTransferExtrinsic } from '@/lib/joyExtrinsics'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { useJoyWallets } from '@/providers/joyWallet'
import { TypographyH2 } from '@/components/ui/typography'

export const TransfersPage: FC = () => {
  const { data } = useQuery({
    queryKey: ['transfers'],
    queryFn: () => request(ARGO_INDEXER_URL, getTransfersDocument, {}),
  })
  const transfers = data?.bridgeTransfers.map(parseTransfer)

  return (
    <div>
      <TypographyH2>Transfers</TypographyH2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source chain</TableHead>
            <TableHead>Source account</TableHead>
            <TableHead>Target chain</TableHead>
            <TableHead>Target account</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transfers?.map((transfer) => (
            <TransferRow key={transfer.id} transfer={transfer} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const TransferRow: FC<{ transfer: BridgeTransfer }> = ({ transfer }) => {
  const { writeContractAsync } = useWriteContract()
  const { addTxPromise, submitJoyTx } = useTransaction()
  const { data: bridgeConfigs } = useBridgeConfigs()
  const evmOperators = bridgeConfigs?.evm.operatorAccounts
  const joyOperator = bridgeConfigs?.joy.operatorAccount
  const { walletAccounts: joyAccounts } = useJoyWallets()
  const { address: evmAddress } = useAccount()

  const completeTransferToEvm = () => {
    if (!addTxPromise) {
      return
    }

    const tx = writeContractAsync({
      abi: BridgeAbi,
      address: BRIDGE_ADDRESS,
      functionName: 'completeTransferToEth',
      args: [
        transfer.sourceTransferId,
        transfer.destAccount as Hex,
        transfer.amount,
      ],
    })
    addTxPromise(tx)
  }

  const completeTransferToJoy = async () => {
    if (!submitJoyTx || !joyOperator) {
      console.error('submitJoyTx not available')
      return
    }
    await submitJoyTx(
      await buildFinalizeTransferExtrinsic({
        sourceTransferId: transfer.sourceTransferId,
        sourceChainId: transfer.sourceChainId,
        destAccount: transfer.destAccount as Hex,
        amount: transfer.amount,
      }),
      joyOperator
    )
  }

  const renderAction = () => {
    if (!evmOperators || !joyOperator) {
      return null
    }
    const isJoyOperator = joyAccounts?.some(
      (account) => account.address === joyOperator
    )
    const isEvmOperator = evmOperators.some(
      (address) => address === evmAddress?.toLowerCase()
    )

    if (transfer.status === BridgeTransferStatus.Requested) {
      if (transfer.type === BridgeTransferType.EvmToJoy) {
        if (isJoyOperator) {
          return (
            <Button variant="ghost" size="sm" onClick={completeTransferToJoy}>
              Complete
            </Button>
          )
        }
      } else {
        if (isEvmOperator) {
          return (
            <Button variant="ghost" size="sm" onClick={completeTransferToEvm}>
              Complete
            </Button>
          )
        }
      }
    }

    return null
  }

  return (
    <TableRow>
      <TableCell>{transfer.id}</TableCell>
      <TableCell>{transfer.status}</TableCell>
      <TableCell>{transfer.sourceChainId}</TableCell>
      <TableCell>{truncateAddress(transfer.sourceAccount)}</TableCell>
      <TableCell>{transfer.destChainId}</TableCell>
      <TableCell>{truncateAddress(transfer.destAccount)}</TableCell>
      <TableCell className="text-right">{formatJoy(transfer.amount)}</TableCell>
      <TableCell>{renderAction()}</TableCell>
    </TableRow>
  )
}
