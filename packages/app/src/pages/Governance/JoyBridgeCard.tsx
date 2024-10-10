import { AddressesDialog, renderAddresses } from './AddressesDialog'
import { BridgeStatusRow } from './BridgeStatusRow'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { JOY_NETWORK } from '@/config'
import { JoyBridgeStatus } from '@/gql/graphql'
import { formatJoy } from '@/lib/utils'
import { useJoyApiContext } from '@/providers/joyApi'
import { useTransaction } from '@/providers/transaction'
import { useUser } from '@/providers/user/user.hooks'
import { joyAddressCodec } from '@joystream/argo-core'
import { useQuery } from '@tanstack/react-query'
import { FC, useMemo } from 'react'
import { toast } from 'sonner'

export const JoyBridgeCard: FC<{
  joyConfig: any
  refetchConfigs: () => void
}> = ({ joyConfig, refetchConfigs }) => {
  const { api } = useJoyApiContext()
  const { submitJoyTx } = useTransaction()
  const { userJoyPauser, userJoyOperator } = useUser()

  const { data: lastJoyBlock } = useQuery({
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
        joyFinishUnpauseCall.method.hash.toHex(),
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
      (address) => address !== userJoyOperator,
    )
    const callDispatchInfo = await api.call.transactionPaymentApi.queryInfo(
      joyFinishUnpauseCall.toHex(),
      joyFinishUnpauseCall.length,
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
              callDispatchInfo.weight,
            )
          : api.tx.multisig.approveAsMulti(
              threshold,
              otherSignatories,
              joyCallMultisigInfo?.timepoint ?? null,
              joyFinishUnpauseCall.method.hash.toHex(),
              callDispatchInfo.weight,
            ),
      userJoyOperator,
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
      userJoyPauser,
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
      userJoyPauser,
    )
    refetchConfigs()
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

  const canApprove =
    userJoyOperator && !joyCallMultisigInfo?.approvals.includes(userJoyOperator)

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
      lastJoyBlock &&
      joyConfig.thawnEndsAtBlock &&
      lastJoyBlock >= joyConfig.thawnEndsAtBlock
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

  if (!joyConfig) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Joystream bridge</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">General information</h3>
          <div className="space-y-2">
            <BridgeStatusRow label="Chain ID" value={joyConfig.id} />
            <BridgeStatusRow label="Status" value={getJoyBridgeStatus()} />
            <BridgeStatusRow
              label="Transfer fee"
              value={formatJoy(joyConfig.bridgingFee)}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Stats</h3>
          <div className="space-y-2">
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
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Governance</h3>
          <div className="space-y-2">
            <BridgeStatusRow
              label="Operator multisig"
              value={renderAddresses([joyConfig.operatorAccount])}
            />
            {JOY_NETWORK.opMulti && (
              <BridgeStatusRow
                label="Operator signers"
                value={
                  <AddressesDialog
                    label="Joystream operator signers"
                    addresses={JOY_NETWORK.opMulti.signers}
                  />
                }
              />
            )}
            <BridgeStatusRow
              label="Pausers"
              value={
                <AddressesDialog
                  label="Joystream pausers"
                  addresses={joyConfig.pauserAccounts}
                />
              }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>{renderActions()}</CardFooter>
    </Card>
  )
}
