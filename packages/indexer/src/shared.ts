import { codec } from "@subsquid/ss58"
import { Address, isAddress, isHex, trim } from "viem"

export const joyAccountCodec = codec("joystream")

export const tryDecodeEthereumAddress = (address: string): Address | false => {
  if (!isHex(address)) return false
  const trimmed = trim(address)
  if (!isAddress(trimmed)) return false
  return trimmed
}
