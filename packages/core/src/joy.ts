import { SubmittableExtrinsic } from "@polkadot/api/types"
import { KeyringPair } from "@polkadot/keyring/types"
import { Signer } from "@polkadot/types/types"
import * as ss58 from "@subsquid/ss58"

export const joyAddressCodec = ss58.codec("joystream")

export enum ExtrinsicStatus {
  Unsigned,
  Signed,
  Completed,
  Error,
}
export type ExtrinsicStatusCallbackFn = (status: ExtrinsicStatus.Signed) => void

export type RawExtrinsicResult = {
  events: string[]
  blockHash: string
  transactionHash: string
}

export function submitExtrinsic(
  tx: SubmittableExtrinsic<"promise">,
  accountId: string,
  signer: Signer,
  cb?: ExtrinsicStatusCallbackFn,
): Promise<RawExtrinsicResult>

export function submitExtrinsic(
  tx: SubmittableExtrinsic<"promise">,
  account: KeyringPair,
  cb?: ExtrinsicStatusCallbackFn,
): Promise<RawExtrinsicResult>
export function submitExtrinsic(
  tx: SubmittableExtrinsic<"promise">,
  account: string | KeyringPair,
  signerOrCb?: Signer | ExtrinsicStatusCallbackFn,
  cb?: ExtrinsicStatusCallbackFn,
): Promise<RawExtrinsicResult> {
  let signer: Signer | undefined
  if (typeof account === "string" && typeof signerOrCb === "object") {
    signer = signerOrCb
  } else {
    cb = signerOrCb as ExtrinsicStatusCallbackFn
  }
  return new Promise<RawExtrinsicResult>((resolve, reject) => {
    let unsub: () => void
    let transactionInfo: string

    tx.signAndSend(account, { nonce: -1, signer }, (result) => {
      const extrinsicsHash = tx.hash.toHex()
      const { status, isError, events: rawEvents } = result
      if (isError) {
        unsub()

        console.error(`Transaction error: ${transactionInfo}`)
        reject(new Error("UnknownError"))
        return
      }

      if (status.isInBlock) {
        unsub()

        const events = rawEvents.map((record) => {
          const { event } = record
          return `${event.section}.${event.method}`
        })

        if (events.includes("system.ExtrinsicFailed")) {
          reject(new Error(`ExtrinsicFailed in block ${status.asInBlock}`))
          return
        }

        try {
          resolve({
            events,
            blockHash: status.asInBlock.toString(),
            transactionHash: extrinsicsHash,
          })
        } catch (error) {
          reject(error)
        }
      }
    })
      .then((unsubFn) => {
        // if signAndSend succeeded, report back to the caller with the update
        cb?.(ExtrinsicStatus.Signed)
        unsub = unsubFn
      })
      .catch((e) => {
        reject(e)
      })
  })
}
