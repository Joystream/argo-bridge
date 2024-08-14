import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FC } from 'react'

export const FAQPage: FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently asked questions
      </h2>

      <Accordion type="single" collapsible>
        <AccordionItem value="what-is-the-bridge">
          <AccordionTrigger>What is Argo bridge?</AccordionTrigger>
          <AccordionContent>
            The Argo bridge is a cross-chain token bridge that allows users to
            transfer JOY tokens between Joystream and Base networks.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="who-operates-the-bridge">
          <AccordionTrigger>Who operates the bridge?</AccordionTrigger>
          <AccordionContent>
            Argo bridge is an official bridge operated by the Joystream DAO. The
            DAO governs the bridge and assigns operators responsible for running
            it.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="how-does-it-work">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            The bridge is semi-manual. It consists of bridge modules on each
            supported chain. Users can burn their JOY tokens on one chain to
            request a transfer to another chain by sending a transaction on the
            source chain. Bridge operators will then browse the requested
            transfers and verify the request. If the transfer is valid, signers
            will issue multisig approvals for transfer completion. Once the
            approval threshold is reached, the bridge module on the destination
            chain will execute the transfer and mint the requested amount of JOY
            tokens to the destination account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>Where can I get support?</AccordionTrigger>
          <AccordionContent>
            If you encounter any issues or have questions, please{' '}
            <a
              href="https://discord.gg/joystream"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              join the Joystream Discord server
            </a>{' '}
            and ask for support.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="fees">
          <AccordionTrigger>
            Is there a fee for using the bridge?
          </AccordionTrigger>
          <AccordionContent>
            Yes, there is a small fee for requesting a transfer, which is
            currently set at around $5 worth of JOY (when bridging from
            Joystream) or ETH (when bridging from Base). This fee ensures that
            the bridge is not abused and transfers are processed in a timely
            manner.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="learn-more">
          <AccordionTrigger>
            Where can I learn more about the bridge?
          </AccordionTrigger>
          <AccordionContent>
            You can learn more about the bridge and its architecture on the{' '}
            <a
              href="https://github.com/joystream/argo-bridge"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Argo bridge GitHub repository
            </a>
            .
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="chains">
          <AccordionTrigger>What chains are supported?</AccordionTrigger>
          <AccordionContent>
            The Argo bridge currently supports only Joystream and Base chains.
            More chains may be added in the future.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
