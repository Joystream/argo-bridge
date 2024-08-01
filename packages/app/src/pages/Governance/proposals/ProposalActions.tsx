import { FC } from 'react'
import { EvmGovernanceProposal } from '@/lib/proposal'
import { useUser } from '@/providers/user/user.hooks'
import { useSafeStore } from '@/providers/safe/safe.store'
import { useTransaction } from '@/providers/transaction'
import { Hex, zeroHash } from 'viem'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { useEvmProposalsQuery } from '@/lib/hooks'
import { TimelockAbi } from '@joystream/argo-core'
import { TIMELOCK_ADDRESS } from '@/config'
import { useWriteContract } from 'wagmi'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type ProposalActionsProps = {
  proposal: EvmGovernanceProposal
}

export const ProposalActions: FC<ProposalActionsProps> = ({ proposal }) => {
  const { refetch } = useEvmProposalsQuery()
  const { userEvmAdmin, evmAddresses } = useUser()
  const { safeApiKit, adminSafe } = useSafeStore()
  const { addTxPromise, isSubmittingTx } = useTransaction()
  const { writeContractAsync } = useWriteContract()

  const handleConfirm = async () => {
    const status = proposal.status
    if (
      !adminSafe ||
      !userEvmAdmin ||
      !addTxPromise ||
      status.type !== 'proposed'
    ) {
      toast.error('Unexpected error')
      console.error({
        adminSafe,
        userEvmAdmin,
        addTxPromise,
        status,
      })
      return
    }

    const doConfirm = async () => {
      const signature = await adminSafe.signHash(status.safeTx.safeTxHash)
      await safeApiKit?.confirmTransaction(
        status.safeTx.safeTxHash,
        signature.data
      )
      await refetch()
    }
    addTxPromise(doConfirm())
  }

  const handleFinishApproval = async () => {
    const status = proposal.status
    if (
      !adminSafe ||
      !userEvmAdmin ||
      !addTxPromise ||
      status.type !== 'proposed'
    ) {
      toast.error('Unexpected error')
      console.error({
        adminSafe,
        userEvmAdmin,
        addTxPromise,
        status,
      })
      return
    }

    const currentNonce = await adminSafe.getNonce()
    if (currentNonce !== status.safeTx.nonce) {
      toast.error(
        `Transaction (nonce ${status.safeTx.nonce}) is not the next in queue. Next nonce is ${currentNonce}.`
      )
      return
    }

    const doExecute = async () => {
      const response = await adminSafe.executeTransaction(status.safeTx)
      // @ts-ignore
      await response.transactionResponse?.wait?.()

      await refetch()
    }

    addTxPromise(doExecute())
  }

  const handleExecute = async () => {
    if (!addTxPromise || !proposal.calls.length) {
      return
    }

    let txPromise: Promise<Hex>
    const predecessor = proposal.predecessor ? proposal.predecessor : zeroHash
    const salt = proposal.salt ? proposal.salt : zeroHash
    if (proposal.calls.length > 1) {
      txPromise = writeContractAsync({
        abi: TimelockAbi,
        address: TIMELOCK_ADDRESS,
        functionName: 'executeBatch',
        args: [
          proposal.calls.map((call) => call.targetAddress),
          proposal.calls.map((call) => call.value),
          proposal.calls.map((call) => call.data),
          predecessor,
          salt,
        ],
      })
    } else {
      txPromise = writeContractAsync({
        abi: TimelockAbi,
        address: TIMELOCK_ADDRESS,
        functionName: 'execute',
        args: [
          proposal.calls[0].targetAddress,
          proposal.calls[0].value,
          proposal.calls[0].data,
          predecessor,
          salt,
        ],
      })
    }

    addTxPromise(txPromise, () => refetch())
  }

  if (proposal.status.type === 'proposed') {
    const { approvals, threshold } = proposal.status
    const hasAlreadyApproved = userEvmAdmin && approvals.includes(userEvmAdmin)

    if (approvals.length >= threshold) {
      if (!userEvmAdmin) {
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <DropdownMenuItem disabled>Finish approval</DropdownMenuItem>
              </span>
            </TooltipTrigger>
            <TooltipContent>You're not an EthAdmin member.</TooltipContent>
          </Tooltip>
        )
      }
      return (
        <DropdownMenuItem onClick={handleFinishApproval}>
          Finish approval
        </DropdownMenuItem>
      )
    }

    if (!userEvmAdmin || hasAlreadyApproved || isSubmittingTx) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <DropdownMenuItem disabled>
                Approve ({approvals.length}/{threshold})
              </DropdownMenuItem>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {hasAlreadyApproved
              ? 'You already approved this proposal'
              : isSubmittingTx
                ? 'Please wait for previous transaction to finish'
                : "You're not an EthAdmin member"}
          </TooltipContent>
        </Tooltip>
      )
    }

    return (
      <DropdownMenuItem onClick={handleConfirm}>
        Approve ({approvals.length}/{threshold})
      </DropdownMenuItem>
    )
  }

  if (proposal.status.type === 'ready') {
    return (
      <DropdownMenuItem
        onClick={handleExecute}
        disabled={!evmAddresses?.length || isSubmittingTx}
      >
        Execute
      </DropdownMenuItem>
    )
  }

  return null
}
