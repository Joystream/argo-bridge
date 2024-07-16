import { FC } from 'react'
import { BridgeTransferType } from '@/gql/graphql'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowRightLeft } from 'lucide-react'

const chainOptions = [
  { label: 'Base', value: 'base' },
  { label: 'Joystream', value: 'joystream' },
]

type NewTransferDirectionSelectorProps = {
  value: BridgeTransferType
  onChange: (value: BridgeTransferType) => void
}

export const NewTransferDirectionSelector: FC<
  NewTransferDirectionSelectorProps
> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-[1fr_40px_1fr] gap-x-3 mb-3 items-end">
      <div className="flex flex-col gap-2">
        <Label>Source chain</Label>
        <Select
          value={value === BridgeTransferType.JoyToEvm ? 'joystream' : 'base'}
          onValueChange={(value) =>
            onChange(
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
          onChange(
            value === BridgeTransferType.EvmToJoy
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
          value={value === BridgeTransferType.EvmToJoy ? 'joystream' : 'base'}
          onValueChange={(value) =>
            onChange(
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
  )
}
