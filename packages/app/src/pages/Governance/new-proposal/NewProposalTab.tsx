import { ChangeEvmFee } from './ChangeEvmFee'
import { ChangeEvmLimits } from './ChangeEvmLimits'
import { SwapEvmAdmin } from './SwapEvmAdmin'
import { SwapEvmOperator } from './SwapEvmOperator'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TypographyH3 } from '@/components/ui/typography'
import { AddEvmPauser } from '@/pages/Governance/new-proposal/AddEvmPauser'
import { RevokeEvmPauser } from '@/pages/Governance/new-proposal/RevokeEvmPauser'
import { UnpauseEvm } from '@/pages/Governance/new-proposal/UnpauseEvm'
import React, { FC, useState } from 'react'

const selectOptions = [
  {
    label: 'Change bridging fee',
    value: 'set-bridging-fee',
    component: ChangeEvmFee,
  },
  {
    label: 'Change minting limits',
    value: 'change-evm-limits',
    component: ChangeEvmLimits,
  },
  {
    label: 'Add pauser role',
    value: 'add-evm-pauser',
    component: AddEvmPauser,
  },
  {
    label: 'Revoke pauser role',
    value: 'revoke-evm-pauser',
    component: RevokeEvmPauser,
  },
  {
    label: 'Unpause bridge',
    value: 'unpause-evm',
    component: UnpauseEvm,
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

export const NewProposalTab: FC = () => {
  const [selected, setSelected] = useState(selectOptions[0].value)
  const Component = selectOptions.find(
    (option) => option.value === selected,
  )!.component
  return (
    <Card className="max-w-[700px]">
      <CardHeader>
        <CardTitle>Propose new Base governance proposal</CardTitle>
        <CardDescription>
          For improved security, all Base governance actions must be first
          proposed and approved by the admin multisig. Once approved, the
          proposal needs to go through the timelock grace period before it can
          be executed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Proposal type</Label>
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
        <div className="pt-6">
          <Component />
        </div>
      </CardContent>
    </Card>
  )
}
