import { FC } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useSettingsStore } from './settings.store'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const formSchema = z.object({
  joyUsdRate: z.number().positive('Must be a positive number'),
  termLength: z
    .number()
    .int('Must be an integer')
    .positive('Must be a positive number'),
})

export const Settings: FC = () => {
  const {
    joyUsdRate,
    termLength,
    isSettingsOpen,
    setSettingsOpen,
    setJoyUsdRate,
    setTermLength,
  } = useSettingsStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      joyUsdRate,
      termLength,
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setJoyUsdRate(values.joyUsdRate)
    setTermLength(values.termLength)
    form.reset({
      joyUsdRate: values.joyUsdRate,
      termLength: values.termLength,
    })
    toast.success('Settings saved')
    setSettingsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    setSettingsOpen(open)
    if (!open) {
      form.reset()
    }
  }

  return (
    <Sheet open={isSettingsOpen} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-y-4 mt-6"
          >
            <FormField
              control={form.control}
              name="joyUsdRate"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>JOY/USD rate</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="JOY/USD rate"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription
                    className={cn(fieldState.error ? 'text-destructive' : null)}
                  >
                    {fieldState.error?.message ??
                      'Exchange rate of JOY to USD used for calculations'}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="termLength"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Term length</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Term length"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription
                    className={cn(fieldState.error ? 'text-destructive' : null)}
                  >
                    {fieldState.error?.message ??
                      'Length of the term in blocks'}
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="mr-3"
              >
                Reset
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
