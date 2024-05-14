import { CHAIN_IDS, ChainName } from "./config"

export function getEntityId(
  chainOrId: ChainName | bigint,
  entityId: bigint | string,
): string {
  const chainId =
    typeof chainOrId === "bigint" ? chainOrId : CHAIN_IDS[chainOrId]
  return `${chainId}-${entityId}`
}
