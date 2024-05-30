import { FC, useEffect, useState } from 'react'
import { JoyToEvmTransfer } from '@/pages/NewTransfer/JoyToEvmTransfer'
import { useAccount, useBalance } from 'wagmi'
import { useJoyWallets } from '@/providers/joyWallet'
import { ERC20_ADDRESS } from '@/config'
import { useJoyApiContext } from '@/providers/joyApi'
import * as dn from 'dnum'
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from '@/components/ui/typography'
import { EvmToJoyTransfer } from '@/pages/NewTransfer/EvmToJoyTransfer'
import { Dnum } from 'dnum'

export const NewTransferPage: FC = () => {
  const { address: evmAddress } = useAccount()
  const { api: joyApi } = useJoyApiContext()
  const joyAddress = useJoyWallets().walletAccounts[0]?.address

  const _evmBalance = useBalance({
    address: evmAddress,
    token: ERC20_ADDRESS,
  })
  const evmBalance: Dnum | null = _evmBalance.data
    ? [_evmBalance.data.value, _evmBalance.data.decimals]
    : null

  const [joyBalance, setJoyBalance] = useState<dn.Dnum | null>(null)

  useEffect(() => {
    if (!joyApi || !joyAddress) return

    let unsub: () => void

    joyApi.query.system
      .account(joyAddress, (account) => {
        setJoyBalance([account.data.free.toBigInt(), 10])
      })
      .then((unsubFn) => {
        unsub = unsubFn
      })

    return () => {
      setJoyBalance(null)
      unsub?.()
    }
  }, [joyApi, joyAddress])

  return (
    <div>
      <TypographyH2>New Transfer</TypographyH2>
      <TypographyP>
        {evmBalance ? (
          <>
            <span>EVM balance: {dn.format(evmBalance, { compact: true })}</span>
            <br />
          </>
        ) : null}
        {joyBalance ? (
          <span>JOY balance: {dn.format(joyBalance, { compact: true })}</span>
        ) : null}
      </TypographyP>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <JoyToEvmTransfer />
        <EvmToJoyTransfer />
      </div>
    </div>
  )
}
