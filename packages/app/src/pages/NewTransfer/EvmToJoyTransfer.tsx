import { z } from 'zod'
import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { JoyHapiInput } from '@/components/JoyHapiInput'
import { Button } from '@/components/ui/button'
import { TypographyH3, TypographyP } from '@/components/ui/typography'
import { useTransaction } from '@/providers/transaction'
import { BRIDGE_ADDRESS, ERC20_ADDRESS, EVM_NETWORK } from '@/config'
import { toast } from 'sonner'
import { Hex, isHex, maxUint256 } from 'viem'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { BridgeAbi, Erc20Abi, joyAddressCodec } from '@joystream/argo-core'
import { formatEth } from '@/lib/utils'

const formSchema = z.object({
  targetJoyAddress: z
    .string()
    .regex(/^j4[a-zA-Z0-9]{47}$/, 'Invalid JOY address'),
  amount: z.bigint().positive(),
})
type FormSchema = z.infer<typeof formSchema>

export const EvmToJoyTransfer: FC = () => {
  const { address: evmAddress } = useAccount()
  const { addTxPromise } = useTransaction()
  const { writeContractAsync } = useWriteContract()
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: ERC20_ADDRESS,
    abi: Erc20Abi,
    functionName: 'allowance',
    args: [evmAddress ?? '0x0', BRIDGE_ADDRESS],
  })
  const { data: bridgingFee } = useReadContract({
    address: BRIDGE_ADDRESS,
    abi: BridgeAbi,
    functionName: 'bridgeFee',
  })

  const form = useForm<FormSchema>({
    defaultValues: {
      targetJoyAddress: '',
      // amount: 0n,
    },
    resolver: zodResolver(formSchema),
  })

  const handleApprove = async () => {
    if (!evmAddress || !addTxPromise || !writeContractAsync) {
      toast.error('Error')
      console.error('Missing evmAddress or addTxPromise')
      return
    }
    const tx = writeContractAsync(
      {
        address: ERC20_ADDRESS,
        abi: Erc20Abi,
        functionName: 'approve',
        args: [BRIDGE_ADDRESS, maxUint256],
      },
      {
        onSuccess: () => {
          new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
            refetchAllowance()
          )
        },
      }
    )
    addTxPromise(tx)
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const encodedAccount = joyAddressCodec.decode(values.targetJoyAddress)

    if (
      !evmAddress ||
      !addTxPromise ||
      !bridgingFee ||
      !isHex(encodedAccount)
    ) {
      toast.error('Error')
      console.error('Missing evmAddress or addTxPromise')
      return
    }

    const tx = writeContractAsync({
      address: BRIDGE_ADDRESS,
      abi: BridgeAbi,
      functionName: 'requestTransferToJoystream',
      value: bridgingFee,
      args: [encodedAccount, values.amount],
    })
    addTxPromise(tx)
  }

  const getContent = () => {
    if (!evmAddress) {
      return <span>Connect EVM wallet</span>
    }
    if (allowance == null) {
      return <span>Loading...</span>
    }
    if (allowance === 0n) {
      return (
        <>
          <TypographyP>
            You need to approve the bridge contract to transfer JOY on your
            behalf.
          </TypographyP>
          <Button onClick={handleApprove}>Approve</Button>
        </>
      )
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <span>From: {evmAddress}</span>
          <FormField
            control={form.control}
            name="targetJoyAddress"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Destination JOY address</FormLabel>
                <Input type="text" {...field} className="text-sm h-10" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <JoyHapiInput
                  type="joy"
                  label="JOY amount"
                  hapiValue={field.value}
                  setHapiValue={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <TypographyP>
            Current bridging fee:{' '}
            {bridgingFee ? formatEth(bridgingFee) : 'unknown'}
          </TypographyP>
          <Button type="submit">Transfer</Button>
        </form>
      </Form>
    )
  }

  return (
    <div className="space-y-3 py-4 px-3 border-2 my-3 border-primary rounded-xl">
      <TypographyH3>EVM to JOY transfer</TypographyH3>
      {getContent()}
    </div>
  )
}
