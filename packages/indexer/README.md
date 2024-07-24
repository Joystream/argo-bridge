## Argo bridge indexer

This package contains the indexer for the Argo bridge. It consists of two separate processor, one for the Joystream Substrate chain and one for the EVM chain. The Joystream processor handles the events emitted by the `argoBridge` runtime pallet, while the EVM processor handles the events emitted by the set of EVM contracts.

The indexer keeps track of the following state:
1. The full configuration and status of the Joystream bridge, including stats on the amounts of tokens minted/burned, current mint allowance, etc.
2. The full configuration and status of the EVM bridge, including all the roles and permissions.
3. Timelock operations for EVM bridge governance.
4. All the transfers processed on any side of the bridge, along with all the metadata and the status of the transfer.

Both processors keep their own state, apart from the `BridgeTransfer` entity, which is shared between the two processors to produce a unified view of transfers for consumption in the bridging app. [Subsquid docs](https://docs.subsquid.io/sdk/resources/basics/multichain/#handling-concurrency) discourage this approach because of potential concurrency issues, but simultaneous writes of a single entity should be very rare in our usecase (virtually nonexistent apart from the initial sync). Even though simultaneous write of a single entity can crash one of the processors, it should gracefully recover and continue syncing without losing any data.

## Running the indexer

### Prerequisites

- Node.js >= 18
- `sqd` CLI available globally (`npm install -g @subsquid/cli@latest`)
- Postgres database running locally (can be started with `docker compose -f docker-compose.dev.yml up db`, the production docker compose does not expose the database to the host)

---

0. Make sure the `@joystream/argo-core` package is built first.
```bash
# Run the following command from the monorepo root
npm run build:core
```

1. Build the indexer
```bash
npm run build
```

2. Start the JOY processor
```bash
# JOY_NETWORK must be one of the supported networks defined in @joystream/argo-core package
JOY_NETWORK=local npm run process:joy
```

3. Start the EVM processor
```bash
# EVM_NETWORK must be one of the supported networks defined in @joystream/argo-core package
EVM_NETWORK=hardhat npm run process:eth
```

4. Start the GraphQL server
```bash
npm run serve
```

### Docker deployment

The indexer can be also deployed as a docker compose stack to simplify production deployment: image:
```bash
# First, build the joystream/argo-indexer image
# Run the following command from the monorepo root
npm run build:indexer:docker

# cd to the indexer package for convenience
cd packages/indexer

# Start the indexer DB
docker compose up -d db

# Start the processors
# Currently, the target networks for both processors are hardcoded in the docker-compose.yml file
docker compose up -d indexer-eth indexer-joy

# Start the GraphQL server
docker compose up -d graphql
```


## Entities

### BridgeTransfer

The `BridgeTransfer` entity represents a transfer of tokens between 2 chains. It contains data from both sides of the bridge. Notable fields:
- `id` - a globally unique identifier of the form `sourceChainId-sourceTransferId`
- `status` - status of the transfer, with the possible values:
  - `REQUESTED` - the transfer has been requested by the user on the source chain,
  - `COMPLETED` - the transfer was completed on the destination chain after being requested,
  - `REVERTED` - the transfer was reverted on the source chain,
  - `MAYBE_COMPLETED` - edge case, the transfer was completed on the destination chain, but the indexer is not aware of it being requested on the source chain. This should never happen in normal operation, outside of initial state sync where one of the processors can be way ahead of the other. 
- `sourceChainId`, `sourceTransferId`, `sourceAccount` - ID of the source chain, the transfer ID on the source chain, and the account that initiated the transfer on the source chain.
- `destChainId`, `destAccount` - ID of the destination chain, and the transfer destination account on the destination chain.

### JoyBridgeConfig

The `JoyBridgeConfig` entity represents the configuration of the Joystream bridge. Because of Subsquid's conventions, this is an array of entities, but should only contain a single enitity for Joystream mainnet (id `0`).

### EvmBridgeConfig

The `EvmBridgeConfig` entity represents the configuration of an EVM bridge. The indexer is able to support multiple EVM bridges at the same time, with ID corresponsing to the EVM chain ID as defined in EIP-155.

### EvmTimelockOperation

The `EvmTimelockOperation` entity represents a timelock governance operation. It tracks the following fields:
- `id` - a globally unique identifier of the form `chainId-operationId`
- `operationId` - the operation ID as defined in the timelock contract, can be duplicated across different chains,
- `status` - status of the operation, with the possible values:
  - `PENDING` - the operation is pending (gracing),
  - `EXECUTED` - the operation was executed,
  - `CANCELLED` - the operation was cancelled.
- `calls` - an array of `EvmTimelockCall` entities, one for each call in the operation. Each call has the following fields:
  - `callIndex` - index of the call in the operation,
  - `callTarget` - the target address of the call,
  - `callValue` - the value of the call in wei,
  - `callData` - the calldata of the call,
  - `callSignature` - possibly decoded calldata function signature,
  - `callArgs` - possibly decoded calldata arguments.
- `delayDoneTimestamp` - the timestamp when the proposal will be ready to be executed.

### Events

Apart from the entities above, the indexer also keeps track of all the raw events emitted by the pallet and the EVM contracts stored in `*Event` entities.
