import { FC, useState } from 'react'
import { BridgeTransferType } from '@/gql/graphql'
import { NewTransferForm } from '@/pages/NewTransfer/NewTransferForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowRightLeft } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { FormItem, FormLabel } from '@/components/ui/form'

const chainOptions = [
  { label: 'Base', value: 'base' },
  { label: 'Joystream', value: 'joystream' },
]

export const NewTransferCard: FC = () => {
  const [transferType, setTransferType] = useState<BridgeTransferType>(
    BridgeTransferType.JoyToEvm
  )
  return (
    <div className="mx-auto w-fit">
      {/*<JoyToEvmTransfer />*/}
      {/*<EvmToJoyTransfer />*/}
      <div className="grid grid-cols-[1fr_40px_1fr] gap-x-3 mb-3 items-end">
        <div className="flex flex-col gap-2">
          <Label>Source chain</Label>
          <Select
            value={
              transferType === BridgeTransferType.JoyToEvm
                ? 'joystream'
                : 'base'
            }
            onValueChange={(value) =>
              setTransferType(
                value === 'joystream'
                  ? BridgeTransferType.JoyToEvm
                  : BridgeTransferType.EvmToJoy
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {chainOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setTransferType(
              transferType === BridgeTransferType.EvmToJoy
                ? BridgeTransferType.JoyToEvm
                : BridgeTransferType.EvmToJoy
            )
          }
        >
          <ArrowRightLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-col gap-2">
          <Label>Destination chain</Label>
          <Select
            value={
              transferType === BridgeTransferType.EvmToJoy
                ? 'joystream'
                : 'base'
            }
            onValueChange={(value) =>
              setTransferType(
                value === 'joystream'
                  ? BridgeTransferType.EvmToJoy
                  : BridgeTransferType.JoyToEvm
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {chainOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
