import { printDone, printTask, run } from "./shared"
import "@joystream/types"
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api"
import { SubmittableExtrinsic } from "@polkadot/api/types"
import { KeyringPair } from "@polkadot/keyring/types"
import { blake2AsHex } from "@polkadot/util-crypto"
import { waitReady } from "@polkadot/wasm-crypto"

const RPC_URL = "ws://localhost:9944"

export let startedJoyNode = false
export async function deployJoy() {
  printTask("Starting Joystream node")
  await run([
    "docker",
    "run",
    "-d",
    "--name",
    "argo-tests-joystream-node",
    "--restart",
    "unless-stopped",
    "-p",
    "9944:9944",
    "-p",
    "9933:9933",
    "joystream/node:9bb9ac54b99d6988c5127046966916681dbb3ffa",
    "--chain",
    "dev",
    "--alice",
    "--validator",
    "--pruning=archive",
    "--unsafe-ws-external",
    "--unsafe-rpc-external",
    "--rpc-methods",
    "Safe",
    "--rpc-cors=all",
    "--log",
    "runtime",
    "--base-path",
    "/data",
    "--no-hardware-benchmarks",
  ])
  startedJoyNode = true

  await new Promise((resolve) => setTimeout(resolve, 5000))
  printDone()

  printTask("Electing council")
  await electCouncil()
  printDone()
}

const keyring = new Keyring({ type: "sr25519", ss58Format: 126 })

const toHapi = (joy: number) => BigInt(joy) * 10n ** 10n

const VERBOSE = true
const debug = (msg: string) => {
  if (VERBOSE) {
    console.log(msg)
  }
}

export const councilAccounts: KeyringPair[] = []
const councilStakeAccounts: KeyringPair[] = []
const voterAccounts: KeyringPair[] = []
export let proposerAccount: KeyringPair
export let proposerStakeAccount: KeyringPair

export let joyApi: ApiPromise
let joyApiSetup = false
export async function setupJoyApi() {
  if (joyApiSetup) {
    return
  }
  await waitReady()
  joyApi = new ApiPromise({
    provider: new WsProvider(RPC_URL),
    throwOnConnect: true,
    throwOnUnknown: true,
  })
  await joyApi.isReady

  const [councilSize, minNumberOfExtraCandidates] = await Promise.all([
    joyApi.consts.council.councilSize,
    joyApi.consts.council.minNumberOfExtraCandidates,
  ])
  const requiredAccounts = councilSize
    .add(minNumberOfExtraCandidates)
    .toNumber()

  for (let i = 0; i < requiredAccounts; i++) {
    const account = keyring.addFromUri(`//Council${i}`)
    councilAccounts.push(account)
  }

  for (let i = 0; i < requiredAccounts; i++) {
    const account = keyring.addFromUri(`//CouncilStake${i}`)
    councilStakeAccounts.push(account)
  }

  for (let i = 0; i < councilSize.toNumber(); i++) {
    const account = keyring.addFromUri(`//Voter${i}`)
    voterAccounts.push(account)
  }

  proposerAccount = keyring.addFromUri("//Proposer")
  proposerStakeAccount = keyring.addFromUri("//ProposerStake")

  joyApiSetup = true
}

export async function electCouncil() {
  await setupJoyApi()
  const alice = keyring.addFromUri("//Alice")

  const funds: Array<{ dest: string; amount: bigint }> = [
    ...councilAccounts.map((account) => ({
      dest: account.address,
      amount: toHapi(5_000),
    })),
    ...councilStakeAccounts.map((account) => ({
      dest: account.address,
      amount: toHapi(200_000),
    })),
    ...voterAccounts.map((account) => ({
      dest: account.address,
      amount: toHapi(2_000),
    })),
    {
      dest: proposerAccount.address,
      amount: toHapi(100_000),
    },
    {
      dest: proposerStakeAccount.address,
      amount: toHapi(200_000),
    },
  ]
  debug("Funding accounts")
  await sendExtrinsic(
    joyApi.tx.utility.batchAll(
      funds.map(({ dest, amount }) =>
        joyApi.tx.balances.transfer(dest, amount),
      ),
    ),
    alice,
  )
  debug("Buying memberships")
  // buy membership for council accounts
  for (let idx = 0; idx < councilAccounts.length; idx++) {
    const account = councilAccounts[idx]
    await sendExtrinsic(
      joyApi.tx.members.buyMembership(
        joyApi.createType("PalletMembershipBuyMembershipParameters", {
          rootAccount: account.address,
          controllerAccount: account.address,
          handle: `Council${idx}`,
          metadata: "0x0",
        }),
      ),
      account,
    )
  }
  await sendExtrinsic(
    joyApi.tx.members.buyMembership(
      joyApi.createType("PalletMembershipBuyMembershipParameters", {
        rootAccount: proposerAccount.address,
        controllerAccount: proposerAccount.address,
        handle: "Proposer",
        metadata: "0x0",
      }),
    ),
    proposerAccount,
  )

  debug("Adding staking candidates")
  // add staking accounts
  const addStakingAccountPromises = [
    ...councilStakeAccounts.map((account, idx) =>
      sendExtrinsic(joyApi.tx.members.addStakingAccountCandidate(idx), account),
    ),
    sendExtrinsic(
      joyApi.tx.members.addStakingAccountCandidate(councilAccounts.length),
      proposerStakeAccount,
    ),
  ]
  await Promise.all(addStakingAccountPromises)
  debug("Confirming staking accounts")
  const confirmStakingAccountPromises = [
    ...councilAccounts.map((account, idx) =>
      sendExtrinsic(
        joyApi.tx.members.confirmStakingAccount(
          idx,
          councilStakeAccounts[idx].address,
        ),
        account,
      ),
    ),
    sendExtrinsic(
      joyApi.tx.members.confirmStakingAccount(
        councilAccounts.length,
        proposerStakeAccount.address,
      ),
      proposerAccount,
    ),
  ]
  await Promise.all(confirmStakingAccountPromises)

  debug("Waiting for announcing")
  await waitForAnnouncing(joyApi)

  debug("Announcing candidacies")
  const announcePromises = councilAccounts.map((account, idx) =>
    sendExtrinsic(
      joyApi.tx.council.announceCandidacy(
        idx,
        councilStakeAccounts[idx].address,
        account.address,
        toHapi(170_000),
      ),
      account,
    ),
  )
  await Promise.all(announcePromises)

  debug("Waiting for voting")
  await waitForAnnouncing(joyApi, true)

  debug("Voting")
  const cycleId = (await joyApi.query.referendum.stage()).asVoting
    .currentCycleId
  const votePromises = voterAccounts.map((account, idx) => {
    const accountId = joyApi.createType("GenericAccountId", account.address)
    const optionId = joyApi.createType("u64", idx)
    const salt = joyApi.createType("Bytes", `salt${idx}`)

    const payload = Buffer.concat([
      accountId.toU8a(),
      optionId.toU8a(),
      salt.toU8a(),
      cycleId.toU8a(),
    ])
    const commitment = blake2AsHex(payload)
    return sendExtrinsic(
      joyApi.tx.referendum.vote(commitment, toHapi(1000)),
      account,
    )
  })
  await Promise.all(votePromises)

  debug("Waiting for revealing")
  await waitForRevealing(joyApi)

  debug("Revealing")
  const revealPromises = voterAccounts.map((account, idx) => {
    const optionId = joyApi.createType("u64", idx)
    const salt = joyApi.createType("Bytes", `salt${idx}`)
    return sendExtrinsic(
      joyApi.tx.referendum.revealVote(salt, optionId),
      account,
    )
  })
  await Promise.all(revealPromises)

  debug("Waiting for election end")
  await waitForElectionEnd(joyApi)

  debug("Council elected")
}

async function waitForAnnouncing(api: ApiPromise, tillEnd = false) {
  const councilStage = await api.query.council.stage()
  if (!councilStage.stage.isAnnouncing) {
    throw new Error("Council is not in announcing stage")
  }
  const announcingStatus = councilStage.stage.asAnnouncing
  const currentBlock = await api.query.system.number()
  const remainingBlocks = announcingStatus.endsAt.sub(currentBlock).toNumber()
  if (tillEnd || remainingBlocks < 10) {
    await waitUntilBlock(api, announcingStatus.endsAt.toNumber())
  }
}

async function waitForRevealing(api: ApiPromise) {
  const referendumStage = await api.query.referendum.stage()
  if (!referendumStage.isVoting) {
    throw new Error("Referendum is not in voting stage")
  }
  const votingStatus = referendumStage.asVoting
  await waitUntilBlock(api, votingStatus.endsAt.toNumber())
}

async function waitForElectionEnd(api: ApiPromise) {
  const referendumStage = await api.query.referendum.stage()
  if (!referendumStage.isRevealing) {
    throw new Error("Referendum is not in revealing stage")
  }
  const revealingStatus = referendumStage.asRevealing
  await waitUntilBlock(api, revealingStatus.endsAt.toNumber())
}

export async function waitUntilBlock(api: ApiPromise, targetBlock: number) {
  debug(`Waiting until block ${targetBlock}`)
  return new Promise<void>((resolve) => {
    let unsub: () => void
    api.rpc.chain
      .subscribeNewHeads((header) => {
        if (header.number.toNumber() >= targetBlock) {
          debug("Target block reached")
          unsub()
          resolve()
        }
      })
      .then((u) => {
        unsub = u
      })
  })
}

type RawExtrinsicResult = {
  events: string[]
  blockHash: string
  transactionHash: string
}

export function sendExtrinsic(
  tx: SubmittableExtrinsic<"promise">,
  account: KeyringPair,
) {
  return new Promise<RawExtrinsicResult>((resolve, reject) => {
    let unsub: () => void
    let transactionInfo: string

    tx.signAndSend(account, { nonce: -1 }, (result) => {
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
        unsub = unsubFn
      })
      .catch((e) => {
        reject(e)
      })
  })
}
