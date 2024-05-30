export function getEntityId(
  chainId: number,
  entityId: bigint | string,
): string {
  return `${chainId}-${entityId}`
}
