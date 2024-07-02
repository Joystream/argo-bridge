import { EVM_NETWORKS } from "../src"
import { deploySafe } from "../src/multisig/safe"

async function main() {
  const NETWORK = EVM_NETWORKS.baseSepolia
  const OWNER_1_PRIVATE_KEY = process.env.OWNER_1_PRIVATE_KEY

  await deploySafe(
    {
      provider: NETWORK.rpc.url,
      signer: OWNER_1_PRIVATE_KEY,
    },
    {
      owners: [
        "0x5a8f5ee896d5bb15C8916cA744dBF9bCDDa63413",
        "0xb39f942c37f98A7fE59e5bdd06d82b70718c5f96",
      ],
      threshold: 2,
    },
  )
}

main().catch(console.error)
