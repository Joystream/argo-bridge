import { FC, ReactNode, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { EvmBridgeStatus, JoyBridgeStatus } from '@/gql/graphql'
import { formatEth, formatJoy } from '@/lib/utils'
import { AddressLink } from '@/components/AddressLink'
import { useUser } from '@/providers/user/user.hooks'
import { Button } from '@/components/ui/button'
import { useTransaction } from '@/providers/transaction'
import { useWriteContract } from 'wagmi'
import { toast } from 'sonner'
import { BridgeAbi, joyAddressCodec } from '@joystream/argo-core'
import { BRIDGE_ADDRESS, JOY_NETWORK } from '@/config'
import { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'
import { useJoyApiContext } from '@/providers/joyApi'

export const BridgeStatusTab: FC = () => {
  const { data: configsData, refetch: refetchConfigs } = useBridgeConfigs()
  const joyConfig = configsData?.joy
  const evmConfig = configsData?.evm
  const { addTxPromise, submitJoyTx } = useTransaction()
  const { writeContractAsync } = useWriteContract()

  const { userJoyPauser, userEvmPauser, userJoyOperator } = useUser()
  const { api } = useJoyApiContext()

  const { data: lastBlock } = useQuery({
    queryKey: ['latest joy block'],
    queryFn: async () => {
      if (!api) return
      const result = await api.query.system.number()
      return result.toNumber()
    },
    enabled: !!api,
    staleTime: 10000,
  })

  const threshold = JOY_NETWORK.opMulti?.threshold || 0

  const joyFinishUnpauseCall = useMemo(() => {
    if (!joyConfig || joyConfig.status !== JoyBridgeStatus.Thawn || !api) {
      return
    }

    return api.tx.argoBridge.finishUnpauseBridge()
  }, [api, joyConfig])

  const { data: joyCallMultisigInfo, refetch } = useQuery({
    queryKey: ['joyApprovalStatus', joyFinishUnpauseCall?.method.hash.toHex()],
    queryFn: async () => {
      if (!joyFinishUnpauseCall || !api || !JOY_NETWORK.opMulti) return
      const result = await api.query.multisig.multisigs(
        JOY_NETWORK.opMulti.address,
        joyFinishUnpauseCall.method.hash.toHex()
      )
      if (!result.isSome)
        return {
          approvals: [] as string[],
          timepoint: null,
        }
      const { approvals, when } = result.unwrap()
      return {
        approvals: approvals.map((a) => joyAddressCodec.encode(a)),
        timepoint: when,
      }
    },
    enabled: !!joyFinishUnpauseCall && !!api && !!JOY_NETWORK.opMulti,
  })

  const approveOrCompleteFinishUnpause = async () => {
    if (
      !submitJoyTx ||
      !joyFinishUnpauseCall ||
      !api ||
      !userJoyOperator ||
      !JOY_NETWORK.opMulti
    ) {
      console.error({
        submitJoyTx,
        joyFinishUnpauseCall,
        api,
        userJoyOperator,
      })
      toast.error('Unexpected error')
      return
    }
    const otherSignatories = JOY_NETWORK.opMulti.signers.filter(
      (address) => address !== userJoyOperator
    )
    const callDispatchInfo = await api.call.transactionPaymentApi.queryInfo(
      joyFinishUnpauseCall.toHex(),
      joyFinishUnpauseCall.length
    )

    const { data: freshData } = await refetch()

    const isComplete = freshData?.approvals ?? 0 >= threshold - 1

    await submitJoyTx(
      (api) =>
        isComplete
          ? api.tx.multisig.asMulti(
              threshold,
              otherSignatories,
              joyCallMultisigInfo?.timepoint ?? null,
              joyFinishUnpauseCall,
              callDispatchInfo.weight
            )
          : api.tx.multisig.approveAsMulti(
              threshold,
              otherSignatories,
              joyCallMultisigInfo?.timepoint ?? null,
              joyFinishUnpauseCall.method.hash.toHex(),
              callDispatchInfo.weight
            ),
      userJoyOperator
    )

    refetch()
    if (isComplete) {
      refetchConfigs()
    }
  }

  const handleJoyPause = async () => {
    if (!userJoyPauser || !submitJoyTx) {
      toast.error('Unexpected error')
      console.error({ userJoyPauser, submitJoyTx })
      return
    }

    await submitJoyTx(
      async (api) => api.tx.argoBridge.pauseBridge(),
      userJoyPauser
    )
    refetchConfigs()
  }

  const handleJoyInitUnpause = async () => {
    if (!userJoyPauser || !submitJoyTx) {
      toast.error('Unexpected error')
      console.error({ userJoyPauser, submitJoyTx })
      return
    }

    await submitJoyTx(
      async (api) => api.tx.argoBridge.initUnpauseBridge(),
      userJoyPauser
    )
    refetchConfigs()
  }

  const handleEvmPause = () => {
    if (!userEvmPauser || !addTxPromise) {
      toast.error('Unexpected error')
      console.error({ userEvmPauser, addTxPromise })
      return
    }

    const txPromise = writeContractAsync({
      abi: BridgeAbi,
      address: BRIDGE_ADDRESS,
      account: userEvmPauser as Address,
      functionName: 'pauseBridge',
    })
    addTxPromise(txPromise, () => refetchConfigs())
  }

  const getJoyBridgeStatus = () => {
    if (!joyConfig) return null
    if (joyConfig.status === JoyBridgeStatus.Active) {
      return 'Active'
    } else if (joyConfig.status === JoyBridgeStatus.Paused) {
      return <span className="text-destructive">Paused</span>
    } else {
      return (
        <span className="text-destructive">
          Thawn - ends at block {joyConfig.thawnEndsAtBlock}
        </span>
      )
    }
  }

  const renderAddresses = (addresses: string[]) => {
    return (
      <>
        {addresses.map((account) => (
          <AddressLink address={account} key={account} />
        ))}
      </>
    )
  }

  const canApprove =
    userJoyOperator && !joyCallMultisigInfo?.approvals.includes(userJoyOperator)

  const renderJoyBridgeCard = () => {
    if (!joyConfig) return null

    const renderActions = () => {
      if (joyConfig.status === JoyBridgeStatus.Active && userJoyPauser) {
        return (
          <Button onClick={handleJoyPause} className="w-full">
            Pause bridge
          </Button>
        )
      }

      if (joyConfig.status === JoyBridgeStatus.Paused && userJoyPauser) {
        return (
          <Button onClick={handleJoyInitUnpause} className="w-full">
            Init bridge unpause
          </Button>
        )
      }

      if (
        joyConfig.status === JoyBridgeStatus.Thawn &&
        lastBlock &&
        joyConfig.thawnEndsAtBlock &&
        lastBlock >= joyConfig.thawnEndsAtBlock
      ) {
        return (
          <Button
            onClick={approveOrCompleteFinishUnpause}
            disabled={!canApprove}
            className="w-full"
          >
            Finish unpause -{' '}
            {`${joyCallMultisigInfo?.approvals.length ?? 0}/${threshold}`}
          </Button>
        )
      }
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Joystream bridge</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <BridgeStatusRow label="ID" value={joyConfig.id} />
          <BridgeStatusRow label="Status" value={getJoyBridgeStatus()} />
          <BridgeStatusRow
            label="Transfer fee"
            value={formatJoy(joyConfig.bridgingFee)}
          />
          <BridgeStatusRow
            label="Total burnt"
            value={formatJoy(joyConfig.totalBurned)}
          />
          <BridgeStatusRow
            label="Total minted"
            value={formatJoy(joyConfig.totalMinted)}
          />
          <BridgeStatusRow
            label="Total fees burnt"
            value={formatJoy(joyConfig.feesBurned)}
          />
          <BridgeStatusRow
            label="Mint allowance"
            value={formatJoy(joyConfig.mintAllowance)}
          />
          <BridgeStatusRow
            label="Bridge operator"
            value={renderAddresses([joyConfig.operatorAccount])}
          />
          <BridgeStatusRow
            label="Pausers"
            value={renderAddresses(joyConfig.pauserAccounts)}
          />
        </CardContent>

        <CardFooter>{renderActions()}</CardFooter>
      </Card>
    )
  }

  const getEvmBridgeStatus = () => {
    if (!evmConfig) return null
    if (evmConfig.status === EvmBridgeStatus.Active) {
      return 'Active'
    } else {
      return <span className="text-destructive">Paused</span>
    }
  }

  const renderEvmBridgeCard = () => {
    if (!evmConfig) return null

    return (
      <Card>
        <CardHeader>
          <CardTitle>Base bridge</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <BridgeStatusRow label="ID" value={evmConfig.id} />
          <BridgeStatusRow label="Status" value={getEvmBridgeStatus()} />
          <BridgeStatusRow
            label="Transfer fee"
            value={formatEth(evmConfig.bridgingFee)}
          />
          <BridgeStatusRow
            label="Total burnt"
            value={formatJoy(evmConfig.totalBurned)}
          />
          <BridgeStatusRow
            label="Total minted"
            value={formatJoy(evmConfig.totalMinted)}
          />
          <BridgeStatusRow
            label="Minting limits"
            value={`${formatJoy(evmConfig.mintingLimits.periodLimit)} / ${evmConfig.mintingLimits.periodLength} blocks`}
          />
          <BridgeStatusRow
            label="Bridge admin"
            value={renderAddresses(evmConfig.bridgeAdminAccounts)}
          />
          <BridgeStatusRow
            label="Bridge operator"
            value={renderAddresses(evmConfig.bridgeOperatorAccounts)}
          />
          <BridgeStatusRow
            label="Timelock admin"
            value={renderAddresses(evmConfig.timelockAdminAccounts)}
          />
          <BridgeStatusRow
            label="Pausers"
            value={renderAddresses(evmConfig.pauserAccounts)}
          />
        </CardContent>
        {evmConfig.status === EvmBridgeStatus.Active && userEvmPauser && (
          <CardFooter>
            <Button onClick={handleEvmPause} className="w-full">
              Pause bridge
            </Button>
          </CardFooter>
        )}
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr] gap-6">
      {renderJoyBridgeCard()}
      {renderEvmBridgeCard()}
    </div>
  )
}

const BridgeStatusRow: FC<{ label: string; value: string | ReactNode }> = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h5 className="text-muted-foreground">{label}:</h5>
      <span className="text-right">{value || '—'}</span>
    </div>
  )
}