import { EVM_NETWORKS } from "../src"
import SafeApiKit from "@safe-global/api-kit"
import { SafeAccountConfig, SafeFactory } from "@safe-global/protocol-kit"

async function create() {
  const NETWORK = EVM_NETWORKS.baseSepolia

  const OWNER_1_PRIVATE_KEY = process.env.OWNER_1_PRIVATE_KEY

  const safeFactory = await SafeFactory.init({
    provider: NETWORK.rpc.url,
    signer: OWNER_1_PRIVATE_KEY,
  })

  const safeAccountConfig: SafeAccountConfig = {
    owners: [
      "0x5a8f5ee896d5bb15C8916cA744dBF9bCDDa63413",
      "0xb39f942c37f98A7fE59e5bdd06d82b70718c5f96",
    ],
    threshold: 2,
  }

  const protocolKitOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
  const safeAddress = await protocolKitOwner1.getAddress()

  console.log("Your Safe has been deployed:")
  console.log(`https://sepolia.basescan.org/address/${safeAddress}`)
  console.log(`https://app.safe.global/basesep:${safeAddress}`)

  const apiKit = new SafeApiKit({
    chainId: 1n,
  })
  const r = await apiKit.getPendingTransactions("0x0")
}

create().catch(console.error)
