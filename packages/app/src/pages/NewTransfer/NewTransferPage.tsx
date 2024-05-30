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

export const NewTransferPage: FC = () => {
  const { address: evmAddress } = useAccount()
  const { api: joyApi } = useJoyApiContext()
  const joyAddress = useJoyWallets().walletAccounts[0]?.address

  const _evmBalance = useBalance({
    address: evmAddress,
    token: ERC20_ADDRESS,
  })
  const evmBalance =
    _evmBalance.data &&
    dn.from(_evmBalance.data.value, _evmBalance.data.decimals)

  const [joyBalance, setJoyBalance] = useState<dn.Dnum | null>(null)

  useEffect(() => {
    if (!joyApi || !joyAddress) return

    let unsub: () => void

    console.log('subscribing to JOY balance')
    joyApi.query.system
      .account(joyAddress, (account) => {
        setJoyBalance(dn.from(account.data.free.toBigInt(), 10))
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
      <JoyToEvmTransfer />
    </div>
  )
}
