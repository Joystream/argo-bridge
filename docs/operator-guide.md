# Argo bridge operator guide

This is a brief guide for Argo bridge operators. First we'll do a quick overview of how the bridge works and is governed, and then we'll walk through the app and actually performing actions.

## Bridge overview

Users can bridge JOY from Joystream to Base and other way around. For that we have a runtime pallet on Joystream and a set of smart contracts on Base:

1. JoystreamERC20 - ERC20 JOY token (packages/contracts/contracts/JoystreamERC20.sol)
2. ArgoBridgeV1 - bridge smart contract for managing transfers (packages/contracts/contracts/ArgoBridgeV1.sol)
3. TimelockController - security proposal mechanism that requires all actions to go through grace period (https://github.com/OpenZeppelin/openzeppelin-contracts/blob/659f3063f82422cef820de746444e6f6cba6ca7c/contracts/governance/TimelockController.sol)

Bridge is operated by 3 multisigs (+council):

1. JoyOp - operates Joystream side of the bridge
2. EthOp - operates Base side of the bridge
3. EthAdmin - governs JoystreamERC20 and ArgoBridgeV1 smart contracts

JoyOp is a regular Joystream multisig. All approvals are happening on-chain.
EthOp and EthAdmin are Safe multisig smart contract instances. Approvals can be sent off-chain through Safe Transaction Service, or on-chain.

### Transfer flow

User that wants to transfer from Joystream will use the app to call request extrinsic on Joystream and will burn `amount` JOY. This will also emit an event that will be picked up by the indexer and display the transfer in the bridge app. For the transfer to be completed, `amount` JOY need to be minted on Base by EthOp multisig, by calling a bridge smart contract function. This also emits an event so the transfer can be marked as completed in the app.

Transfer from Base to Joystream works similarly - user calls a smart contract function to burn Base `JOY`, then JoyOp needs to complete it on Joystream side and mint new tokens.

Transfers can also be reverted if there are some unexpected issues with requests. JoyOp can revert transfers on Joystream, EthOp on Base.

### EVM Governance

Admin of smart contracts can:
1. Grant and revoke minting permissions on ERC20. Only the bridge smart contract should ever have minting permissions.
2. Grant and revoke operator permissions on ArgoBridge. Only the EthOp multisig should have that permission.
3. Grant and revoke pausing permissions on ArgoBridge. The council will provide a set of addresses that should have that permission.
4. Grant and revoke proposer permissions on TimelockController. Only the EthAdmin multisig should have that permission.
5. Adjust timelock proposal gracing delay on TimelockController.
6. Grant and revoke admin permissions on ERC20, ArgoBridge, and TimelockController.

Because of high privileges of the admin, those permissions are not granted to any multisig directly but rather to the TimelockController contract. Only this contract, through proposals, can take admin actions.

#### Proposals

Proposal is a request to perform some actions as an admin. **One proposal can have multiple calls.** Each call is a smart function call / ETH transfer. So execution of a single proposal can result in multiple things happening.

Each proposal goes through few stages:
- Proposed - any signer of EthAdmin can propose an action. At this point the proposal is not on-chain yet. The transaction is tracked in Safe until enough approvals are collected.
- Gracing - once enough approvals are collected, the transaction is published on-chain by EthAdmin. It schedules an operation (possibly multiple calls) in the timelock. Now the operation is gracing for few days. Until then, it can be cancelled by EthAdmin.
- Ready - once gracing period ends, the operation is ready to be executed. Anybody can execute graced operation.
- Executed

## Bridge operations

All the bridge operations should be possible through the bridge app (packages/app). As of writing the app is deployed at https://argo-bridge.vercel.app/ and bridges between Joystream Petra testnet and Base Sepolia testnet.

### Safe transaction ordering

EthOp and EthAdmin are Safe multisigs. Every Safe transaction has a nonce, which indicates its order relative to other transactions. Transactions must be processed in order, transaction with nonce 2 cannot be executed until nonce 1 has been executed. Nonce must be set at the time of first proposing a transaction.

To illustrate, let's look at example operations of EthOp:
1. There are 2 transfer to Base waiting to be confirmed - A and B.
2. Signer of EthOp proposes Safe transaction to complete transfer A. It gets assigned nonce 1 and has 1/3 approval from proposer.
3. Same signer proposes new tx to complete B. It gets nonce 2 and 1/3 approval.
4. Other signers for some reason approve only tx to complete B. Even though that tx is approved, it can't be executed yet because tx with nonce 1 must come first.

It's important to note that proposed transactions can be replaced until they are executed. If the EthOp in the example above didn't want to finalize transfer A, it could propose new tx to revert A, or replace with dummy tx.

### JoyOp and EthOp

Operators of the bridges are responsible for verifying transfers and completing them by minting new tokens. You can find all the transfers in the Transfers tab (/transfers). Above the table you can filter by status to see only requested (not completed) transfers for example. You can also filter by destination chain - if you're in JoyOp, you will be interested in transfers **to** Joystream, if you're in EthOp, **to** Base.

The table contains basic info, but by clicking 3 dots on the right, you can see details of each transfer. There, under "Request TX", you can go to the block explorer to see the request transaction from the user. You should confirm that the details match those in the app. During testnets, the block explorer data may not be fully available. For transfers to Base, if they have at least 1 approval, you can also find link to Safe app with the transaction, and their Safe nonce.

If everything looks correct, you can approve the transfer in the same 3 dots context menu. For JoyOp, if only a single signature is missing (e.g. 2/3), you can approve and execute multisig transaction with a single wallet signature. For EthOp, you first need to sign off-chain approval, and once all signature are there (3/3), you have to send on-chain transaction to execute the operation.

Reverting transfers is not yet supported in the app but is possible on blockchain level on both Joystream and Base.

### EthAdmin

EthAdmin signers govern the bridge by submitting proposals and voting on them. You can submit a new proposal in the app in the Governance->Submit proposal tab (/governance/new-proposal). You can see all possible types of actions in the select there. After proposing an action it will appear in Governance->Proposals tab. There you can see basic data, but you can see more with "View details" in context menu on the right. There you can find Safe link and nonce for non-approved actions and details about proposal lifecycle. At the bottom you will also find details of each call that will be executed as part of this proposal.

You can approve a proposal in the same context menu. Once it's fully approved, it can be scheduled on-chain in the timelock. Then it will be gracing for the configured delay. After gracing is done, proposal can be executed by anyone.
