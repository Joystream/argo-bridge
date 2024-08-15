# Argo bridge

The Argo bridge is a cross-chain token bridge that allows users to transfer JOY tokens between Joystream and Base networks. Even though those are the only networks supported at the moment, the bridge can be generalized to support bridging between any Substrate/EVM chains.

## Architecture

The bridge is semi-manual - all transfers are manually approved by a list of trusted signers and can be executed only by reaching a threshold of approvals. For more details, see the [architecture](docs/architecture.md) document.

## Bridge components

The bridge consists of 4 main components:

1. EVM smart contracts and deployment, found in the [packages/contracts](packages/contracts) directory.
2. Joystream runtime pallet, found in the [Joystream monorepo](https://github.com/Joystream/joystream/tree/master/runtime-modules/argo-bridge).
3. Subsquid indexer, found in the [packages/indexer](packages/indexer) directory.
4. Frontend app, found in the [packages/app](packages/app) directory.

Additionally, the repo contains a [core](packages/core) package that contains reusable code for the other components.

Lastly, in the [tests](packages/tests) directory, you can find the integration tests for all the bridge components.

Each component contains its own README file with more details.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/)
- [Docker](https://docker.com/)
- [Turborepo](https://turbo.build/repo/)

### Installation

To install all the dependencies, run:

```bash
npm install
```

Then, you should also build the `@joystream/argo-core` package:

```bash
npm run build:core
```

### Running the components

Once dependencies are ready, you can visit the respective component's README file for more details on how to run them.
