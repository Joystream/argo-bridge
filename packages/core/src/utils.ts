import { ChainName, NETWORKS } from "./config"

export function getEntityId(
  chainOrId: ChainName | bigint,
  entityId: bigint | string,
): string {
  const chainId =
    typeof chainOrId === "bigint" ? chainOrId : NETWORKS[chainOrId].chainId
  return `${chainId}-${entityId}`
}
