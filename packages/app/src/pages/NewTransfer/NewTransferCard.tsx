import { FC, useState } from 'react'
import { BridgeTransferType } from '@/gql/graphql'
import { Button } from '@/components/ui/button'
import { NewTransferForm } from '@/pages/NewTransfer/NewTransferForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const NewTransferCard: FC = () => {
  const [transferType, setTransferType] = useState<BridgeTransferType>(
    BridgeTransferType.JoyToEvm
  )
  return (
    <div className="mx-auto w-fit">
      {/*<JoyToEvmTransfer />*/}
      {/*<EvmToJoyTransfer />*/}
      <div className="flex justify-center space-x-2 py-4">
        <Button onClick={() => setTransferType(BridgeTransferType.JoyToEvm)}>
          evm to joy
        </Button>
        <Button onClick={() => setTransferType(BridgeTransferType.EvmToJoy)}>
          joy to evm
        </Button>
      </div>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>
            {transferType === BridgeTransferType.JoyToEvm
              ? 'Transfer from Joystream to Base'
              : 'Transfer from Base to Joystream'}
          </CardTitle>
          <CardDescription>
            Enter the information below to request transfer of JOY tokens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewTransferForm
            key={transferType}
            onSubmit={() => {}}
            transferType={transferType}
          />
        </CardContent>
      </Card>
    </div>
  )
}
