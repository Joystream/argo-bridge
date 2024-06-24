import { FC, useMemo } from 'react'
import { BridgeTransfer } from '@/lib/transfer'
import { useAccount, useWriteContract } from 'wagmi'
import { useTransaction } from '@/providers/transaction'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { useJoyWallets } from '@/providers/joyWallet'
import { BridgeAbi } from '@joystream/argo-core'
import { BRIDGE_ADDRESS } from '@/config'
import { Hex } from 'viem'
import { buildFinalizeTransferExtrinsic } from '@/lib/joyExtrinsics'
import { BridgeTransferStatus, BridgeTransferType } from '@/gql/graphql'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatJoy, truncateAddress } from '@/lib/utils'
import { useJoyApiContext } from '@/providers/joyApi'
import { useQuery } from '@tanstack/react-query'

const multisig = 'j4UJK4dg51HZcJ9nTh8epDCKzGDaNss4DkGdaa622GYVqLSqJ'

const signatories = [
  'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
  'j4UYhDYJ4pz2ihhDDzu69v2JTVeGaGmTebmBdWaX2ANVinXyE',
]
const threshold = 2

export const TransferRow: FC<{ transfer: BridgeTransfer }> = ({ transfer }) => {
  const { writeContractAsync } = useWriteContract()
  const { api } = useJoyApiContext()
  const { addTxPromise, submitJoyTx } = useTransaction()
  const { data: bridgeConfigs } = useBridgeConfigs()
  const evmOperators = bridgeConfigs?.evm.operatorAccounts
  const joyOperator = bridgeConfigs?.joy.operatorAccount
  const { walletAccounts: joyAccounts } = useJoyWallets()
  const { address: evmAddress } = useAccount()

  const joyCompleteCall = useMemo(() => {
    if (
      transfer.type !== BridgeTransferType.EvmToJoy ||
      transfer.status !== BridgeTransferStatus.Requested
    ) {
      return
    }

    if (!api) {
      return
    }

    const call = api.tx.argoBridge.finalizeInboundTransfer(
      api.createType('PalletArgoBridgeRemoteTransfer', {
        id: transfer.sourceTransferId,
        chain_id: transfer.sourceChainId,
      }),
      transfer.destAccount,
      transfer.amount
    )

    return call
  }, [api, transfer])

  const { data: joyApprovalsCount } = useQuery({
    queryKey: ['joyApprovalStatus', joyCompleteCall],
    queryFn: async () => {
      if (!joyCompleteCall || !api) return
      const result = await api.query.multisig.multisigs(
        multisig,
        joyCompleteCall.method.hash.toHex()
      )
      if (!result.isSome) return 0
      const { approvals } = result.unwrap()
      return approvals.length
    },
    enabled: !!joyCompleteCall,
  })

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
    if (!submitJoyTx || !joyOperator || !joyCompleteCall || !api) {
      console.error({
        submitJoyTx,
        joyOperator,
        joyCompleteCall,
      })
      console.error('submitJoyTx not available')
      return
    }
    const userAccount = joyAccounts?.find((account) =>
      signatories.includes(account.address)
    )
    if (!userAccount) {
      console.error('User account not found')
      return
    }
    const otherSignatories = signatories.filter(
      (address) => address !== userAccount.address
    )
    const callDispatchInfo = await api.call.transactionPaymentApi.queryInfo(
      joyCompleteCall.toHex(),
      joyCompleteCall.length
    )
    await submitJoyTx(
      (api) =>
        api.tx.multisig.approveAsMulti(
          threshold,
          otherSignatories,
          null,
          joyCompleteCall.method.hash.toHex(),
          callDispatchInfo.weight
        ),
      userAccount.address
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
      if (transfer.type === BridgeTransferType.EvmToJoy && isJoyOperator) {
        return (
          <Button variant="ghost" size="sm" onClick={completeTransferToJoy}>
            Complete
          </Button>
        )
      } else if (
        transfer.type === BridgeTransferType.JoyToEvm &&
        isEvmOperator
      ) {
        return (
          <Button variant="ghost" size="sm" onClick={completeTransferToEvm}>
            Complete
          </Button>
        )
      }
    }

    return null
  }

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
      <TableCell>
        {joyApprovalsCount}/{threshold}
      </TableCell>
      <TableCell>{renderAction()}</TableCell>
    </TableRow>
  )
}
