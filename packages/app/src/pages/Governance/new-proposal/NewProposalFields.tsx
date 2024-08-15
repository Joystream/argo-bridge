import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useUser } from '@/providers/user/user.hooks'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

type NewProposalField<TData extends FieldValues> = {
  name: Path<TData>
  label: string
}

type NewProposalFieldsProps<TData extends FieldValues> = {
  form: UseFormReturn<TData>
  fields: NewProposalField<TData>[]
  description?: string
  onSubmit: (values: TData) => void
}

export function NewProposalFields<TData extends FieldValues>({
  form,
  fields,
  description,
  onSubmit,
}: NewProposalFieldsProps<TData>) {
  const { userEvmAdmin } = useUser()

  const buttonNode = userEvmAdmin ? (
    <Button type="submit" size="lg" className="self-end mt-2">
      Propose change
    </Button>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="self-end mt-2">
          <Button type="submit" size="lg" disabled>
            Propose change
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        You need to be a member of admin multisig to propose changes.
      </TooltipContent>
    </Tooltip>
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {description ? (
          <span className="text-sm text-muted-foreground">{description}</span>
        ) : null}
        {fields.map((fieldDescription) => (
          <FormField
            key={fieldDescription.name}
            control={form.control}
            name={fieldDescription.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldDescription.label}</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {buttonNode}
      </form>
    </Form>
  )
}
