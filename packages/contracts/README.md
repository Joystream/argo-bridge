# Argo EVM smart contracts

This package contains the EVM smart contracts and deployment scripts used for the bridge.

## Contracts

### JoystreamERC20

This is the ERC20 token contract for EVM Joystream deployments. It is a standard OpenZeppelin ERC20 implementation, with tiny modifications to allow minting and burning of tokens.

### ArgoBridgeV1

This is the main bridge contract. It allows users to request transfers to the Joystream chain, and operators to complete transfers and mint new tokens on the EVM side. It uses standard OpenZeppelin `AccessControl` implementation to manage roles and permissions.

#### Minting limits

ArgoBridgeV1 introduces a minting limit mechanism, which limits how many tokens can be minted in a given period of time. Configuration of minting limits consists of two parameters:

- `mintingLimitPeriodLengthBlocks` - the length of the minting limit period in blocks.
- `mintingLimitPerPeriod` - the amount of tokens that can be minted during a single minting limit period.

Whenever a new transfer is requested, the contract checks if the current minting period is over. If it is, a new minting period is started and the current minting period's minted amount is reset to 0. Whenever new tokens are minted, the current minting period's minted amount is incremented by the amount of tokens minted.

Both period length and minting limit per period can be updated by the contract admin through the `setMintingLimits` function.

For more details, refer to the comments in the contract source code.

### TimelockController

This is a utility contract that allows to schedule transactions that can be executed only after a certain delay. It is used as an administrator for both JoystreamERC20 and ArgoBridgeV1 contracts to. For more details, please refer to the [architecture](../../docs/architecture.md) document.

This contract source code is not available directly in this package, as it uses a standard OpenZeppelin implementation. It can be found in the [OpenZeppelin repository](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4764ea50750d8bda9096e833706beba86918b163/contracts/governance/TimelockController.sol).

## Deployment

The deployment of the contracts is done through the [Hardhat Ignition](https://hardhat.org/ignition/docs/getting-started#overview) modules.

We use 2 separate modules:

1. JoystreamDevelopmentEth - used for development, deploys all contracts and does all the initial setup of assigning roles and permissions. Uses parameters from `ignition/parameters-dev.json` file.
2. JoystreamProductionEth - used for production, only deploys contracts and assigns TimelockController as the admin. All the other configuration must be done manually by EthAdmin. Uses parameters from `ignition/parameters.json` file.

Deployments can be executed with (replace module, network and parameters file with your own):

```bash
npx hardhat ignition deploy ignition/modules/JoystreamDevelopmentEth.ts --network localhost --parameters ignition/parameters-dev.json
```

After the deployment is done, all the information about it is stored in `ignition/deployments` directory.

## Testing

The `test` directory contains unit tests for all the contracts and both of the deployment modules. The tests can be run with:

```bash
npm run test
```
