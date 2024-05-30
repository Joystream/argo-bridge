import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'
import { u8aToHex } from '@polkadot/util'
import { JOYSTREAM_SS58_PREFIX } from '@/config'
import { useSettingsStore } from '@/components/Settings'
import { formatUnits, parseUnits } from 'ethers'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatJoystreamAddress = (address: string) => {
  const publicKey = decodeAddress(address)
  return encodeAddress(publicKey, JOYSTREAM_SS58_PREFIX)
}

export function hapiToJoy(hapi: string | bigint) {
  const asBigint = BigInt(hapi)
  return Number(formatUnits(asBigint, 10))
}

export function joyToHapi(joy: number) {
  return parseUnits(joy.toFixed(10), 10)
}

export function asJoyPerTerm(perBlock: string | bigint) {
  const asBigint = BigInt(perBlock)
  const termLength = BigInt(useSettingsStore.getState().termLength)
  return hapiToJoy(asBigint * termLength)
}

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  // minimumSignificantDigits: 2,
  // maximumSignificantDigits: 5,
})
export function formatNumber(n: number | string) {
  const asNumber = Number(n)
  return formatter.format(asNumber)
}
