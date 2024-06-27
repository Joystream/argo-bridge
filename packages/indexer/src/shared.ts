import { Context } from "./eth/processor"
import { ProcessorContext } from "./joy/processor"
import { codec } from "@subsquid/ss58"
import { Address, isAddress, isHex, trim } from "viem"

export const joyAccountCodec = codec("joystream")

export const tryDecodeEthereumAddress = (address: string): Address | false => {
  if (!isHex(address)) return false
  const trimmed = trim(address)
  if (!isAddress(trimmed)) return false
  return trimmed
}

export function groupByClass(list: any[]) {
  return list.reduce<Record<string, any[]>>((acc, item) => {
    const key = item?.constructor?.name
    if (!key) return acc
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})
}

export function saveEvents(
  ctx: Context | ProcessorContext<any>,
  events: any[],
) {
  const groupedEvents = groupByClass(events)
  const eventsSavePromises = Object.values(groupedEvents).map((events) =>
    ctx.store.insert(events),
  )
  return Promise.all(eventsSavePromises)
}
