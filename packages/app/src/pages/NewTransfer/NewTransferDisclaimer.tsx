import { FC, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ScrollArea } from '@/components/ui/scroll-area'

type NewTransferDisclaimerProps = {
  isOpen: boolean
  onClose: (accepted: boolean) => void
}

export const useNewTransferDisclaimerStore = create<{
  hasAccepted: boolean
  setHasAccepted: (accepted: boolean) => void
}>()(
  persist(
    (set) => ({
      hasAccepted: false,
      setHasAccepted: (accepted) => {
        set({ hasAccepted: accepted })
      },
    }),
    {
      name: 'argoapp-disclaimer',
    }
  )
)

export const NewTransferDisclaimer: FC<NewTransferDisclaimerProps> = ({
  isOpen,
  onClose,
}) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Argo bridge disclaimer</DialogTitle>
        </DialogHeader>
        By using this bridge to transfer JOY tokens between the Joystream and
        Base networks, you acknowledge and agree to the following:
        <ScrollArea className="max-h-[30vh] sm:max-h-[30vh] md:max-h-[50vh] lg:max-h-[70vh]">
          <ol className="list-decimal list-inside space-y-1 mb-2">
            <li>
              <span className="font-semibold">Use at Your Own Risk:</span> You
              are using this bridge service at your own risk. Neither the
              Joystream DAO nor any of the bridge signers can be held liable for
              any losses or damages incurred through the use of this service.
            </li>
            <li>
              <span className="font-semibold">
                No Liability for User Errors:
              </span>{' '}
              The Joystream DAO and bridge signers are not responsible for any
              errors made by users, including but not limited to incorrect
              addresses, wrong network selections, or improper token amounts.
            </li>
            <li>
              <span className="font-semibold">Open Source Software:</span> The
              bridge software is open source and{' '}
              <a
                href="https://github.com/Joystream/argo-bridge"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                available on GitHub
              </a>
              . While efforts have been made to ensure its security and
              functionality, neither the Joystream DAO nor the bridge signers
              can guarantee it is free from errors or vulnerabilities.
            </li>
            <li>
              <span className="font-semibold">No Warranty:</span> This service
              is provided “as is” without any warranties, express or implied.
              Users are encouraged to review the source code and understand the
              risks involved before using the bridge.
            </li>
          </ol>
          By proceeding to use the Argo bridge, you confirm that you have read,
          understood, and agreed to these terms.
        </ScrollArea>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(!!checked)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I accept these terms
          </label>
        </div>
        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={() => onClose(false)}>
            Close
          </Button>
          <Button disabled={!isChecked} onClick={() => onClose(true)}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
