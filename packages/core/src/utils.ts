import { ChainName, NETWORKS } from "./config"

export function getEntityId(
  chainOrId: ChainName | number,
  entityId: bigint | string,
): string {
  const chainId =
    typeof chainOrId === "number" ? chainOrId : NETWORKS[chainOrId].chainId
  return `${chainId}-${entityId}`
}
