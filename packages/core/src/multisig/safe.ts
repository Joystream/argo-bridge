import {
  SafeAccountConfig,
  SafeFactory,
  SafeFactoryConfig,
} from "@safe-global/protocol-kit"

export async function deploySafe(
  factoryConfig: SafeFactoryConfig,
  accountConfig: SafeAccountConfig,
) {
  const safeFactory = await SafeFactory.init(factoryConfig)

  const safe = await safeFactory.deploySafe({
    safeAccountConfig: accountConfig,
  })
  const safeAddress = await safe.getAddress()

  console.log("Your Safe has been deployed:")
  console.log(`https://sepolia.basescan.org/address/${safeAddress}`)
  console.log(`https://app.safe.global/basesep:${safeAddress}`)

  return safe
}
