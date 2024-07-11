import { FC, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TypographyH3 } from '@/components/ui/typography'
import { ChangeEvmLimits } from './ChangeEvmLimits'
import { SwapEvmOperator } from './SwapEvmOperator'
import { SwapEvmAdmin } from './SwapEvmAdmin'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const selectOptions = [
  {
    label: 'Change minting limits',
    value: 'change-evm-limits',
    component: ChangeEvmLimits,
  },
  {
    label: 'Swap bridge operator',
    value: 'swap-evm-operator',
    component: SwapEvmOperator,
  },
  {
    label: 'Swap timelock admin',
    value: 'swap-evm-admin',
    component: SwapEvmAdmin,
  },
]

export const ProposeAdminAction: FC = () => {
  const [selected, setSelected] = useState(selectOptions[0].value)
  const Component = selectOptions.find(
    (option) => option.value === selected
  )!.component
  return (
    <Card>
      <CardHeader>
        <TypographyH3>Propose EVM governance action</TypographyH3>
      </CardHeader>
      <CardContent>
        <Label>Choose action type</Label>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="pt-4">
          <Component />
        </div>
      </CardContent>
    </Card>
  )
}
