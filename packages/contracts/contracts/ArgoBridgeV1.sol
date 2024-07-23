// SPDX-License-Identifier: ISC
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

import "./JoystreamERC20.sol";

/// @title ArgoBridgeV1 - A bridge between EVM and Joystream chains.
/// @author Klaudiusz Dembler - contact@kdembler.com
/// @notice This contract is used to facilitate transfers of tokens between EVM and Joystream chains, in both directions.
/// The contract expects to have minting permissions for the Joystream ERC20 token.
///
/// There are 3 privileged actors:
/// - OPERATOR_ROLE holders are responsible for completing transfers from the Joystream chain -
/// they can call the completeTransferToEth function to complete a transfer from the Joystream chain and mint new tokens on the EVM.
/// - PAUSER_ROLE holders are allowed to pause the bridge in a case of emergency.
/// - DEFAULT_ADMIN_ROLE holders are responsible for bridge governance - they can adjust bridge fee, minting limits and also
/// assign OPERATOR_ROLE and PAUSER_ROLE roles.
///
/// The contract implements a minting limit mechanism, which limits the amount of tokens that can be minted per given period of time.
///
/// For more details on the bridge design, see the https://github.com/Joystream/argo-bridge repository.
contract ArgoBridgeV1 is AccessControl {
    /* === ERRORS === */

    /// @notice Thrown when the bridge is not active.
    error ArgoBridgeNotActive();
    /// @notice Thrown when the user requested a transfer without paying the correct bridge fee.
    /// @param requiredFee The required fee (wei).
    error ArgoBridgeInvalidFee(uint256 requiredFee);
    /// @notice Thrown when the user requested a transfer with an invalid amount (0).
    /// @param amount The requested amount (HAPI).
    error ArgoBridgeInvalidAmount(uint256 amount);
    /// @notice Thrown when the operator tries to complete a transfer that would exceed the minting limit.
    /// @param requestedAmount The amount (HAPI) that operator tried to mint.
    /// @param mintingAllowance The amount (HAPI) that can be minted in the current minting period.
    error ArgoBridgeMintingLimitReached(uint256 requestedAmount, uint256 mintingAllowance);

    /* === EVENTS === */

    /// @notice Emitted after a user requests a transfer to the Joystream chain.
    /// @param ethTransferId The local ID of the transfer on the source chain.
    /// @param ethRequester The address of the user that requested the transfer.
    /// @param joyDestAccount The destination account on the Joystream chain.
    /// @param amount The amount of tokens (HAPI) that were burned and are being transferred.
    event ArgoTransferToJoystreamRequested(
        uint256 indexed ethTransferId,
        address indexed ethRequester,
        bytes32 joyDestAccount,
        uint256 amount
    );
    /// @notice Emitted after the operator completes a transfer to the EVM.
    /// @param joyTransferId The local ID of the transfer on the source chain.
    /// @param ethDestAddress The target address on the EVM to which the tokens were minted.
    /// @param amount The amount of tokens (HAPI) that were minted.
    event ArgoTransferToEthCompleted(uint256 indexed joyTransferId, address indexed ethDestAddress, uint256 amount);
    /// @notice Emitted after the operator reverts a transfer to the Joystream chain.
    /// @param ethTransferId The local ID of the transfer on the source chain.
    /// @param revertAddress The address on the EVM to which the transfer was reverted and the tokens were minted.
    /// @param revertAmount The amount of tokens (HAPI) that were minted.
    /// @param rationale The reason why the transfer was reverted.
    event ArgoTransferToJoystreamReverted(
        uint256 indexed ethTransferId,
        address indexed revertAddress,
        uint256 revertAmount,
        string rationale
    );
    /// @notice Emitted when the bridge status is changed.
    /// @param newStatus The new status of the bridge.
    event ArgoBridgeStatusChanged(ArgoBridgeStatus newStatus);
    /// @notice Emitted when the bridge fee is changed.
    /// @param newFee The new fee (wei).
    event ArgoBridgeFeeChanged(uint256 newFee);
    /// @notice Emitted when the bridge fees are withdrawn by the admin.
    /// @param destination The address to which the fees were sent.
    /// @param amount The amount of fees (wei) that were withdrawn.
    event ArgoBridgeFeesWithdrawn(address destination, uint256 amount);
    /// @notice Emitted when the minting limits are updated.
    /// @param newMintingLimitPeriodLengthBlocks The new minting limit period length in blocks.
    /// @param newMintingLimitPerPeriod The new minting limit amount (HAPI) per period.
    event ArgoBridgeMintingLimitsUpdated(uint256 newMintingLimitPeriodLengthBlocks, uint256 newMintingLimitPerPeriod);

    /* === ROLES === */

    /// @notice The role that allows to complete transfers and effectively mint tokens on the EVM.
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    /// @notice The role that allows to pause the bridge in case of emergency.
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    /* === CONTRACT STATE === */

    /// @notice The Joystream ERC20 token contract.
    JoystreamERC20 public immutable joystreamErc20;

    enum ArgoBridgeStatus {
        Active,
        Paused
    }
    /// @notice The current status of the bridge.
    /// Transfers can be requested/completed only when the bridge is active.
    ArgoBridgeStatus public bridgeStatus = ArgoBridgeStatus.Paused;

    /// @notice The fee (wei) that is charged for each transfer to the Joystream chain.
    /// Can be updated by the admin by calling `setBridgeFee`.
    uint256 public bridgeFee;

    /// @notice Counter for assigning incremental local IDs to requested transfers.
    uint256 internal transferIdCounter = 0;

    /// @notice The length of the minting limit period in blocks.
    uint256 public mintingLimitPeriodLengthBlocks;
    /// @notice The amount of tokens (HAPI) that can be minted during single minting limit period.
    uint256 public mintingLimitPerPeriod;
    /// @notice The block number when the current minting limit period ends.
    uint256 public currentMintingPeriodEndBlock;
    /// @notice The amount of tokens (HAPI) that have been minted during the current minting limit period.
    uint256 public currentMintingPeriodMinted = 0;

    /// @notice Creates a new instance of the ArgoBridgeV1 contract - assigns admin role and sets initial parameters.
    /// It will emit:
    /// - RoleGranted event for the DEFAULT_ADMIN_ROLE,
    /// - ArgoBridgeFeeChanged event with the initialBridgeFee,
    /// - ArgoBridgeMintingLimitsUpdated event with the initialMintingLimitPeriodLengthBlocks and initialMintingLimitPerPeriod.
    /// @param defaultAdmin The address of the admin that will be granted the DEFAULT_ADMIN_ROLE.
    /// @param joystreamErc20Address The address of the Joystream ERC20 token contract.
    /// @param initialBridgeFee The initial fee (wei) that is charged for each transfer to the Joystream chain.
    /// @param initialMintingLimitPeriodLengthBlocks The initial length of the minting limit period in blocks.
    /// @param initialMintingLimitPerPeriod The initial amount of tokens (HAPI) that can be minted during single minting limit period.
    constructor(
        address defaultAdmin,
        address joystreamErc20Address,
        uint256 initialBridgeFee,
        uint256 initialMintingLimitPeriodLengthBlocks,
        uint256 initialMintingLimitPerPeriod
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);

        joystreamErc20 = JoystreamERC20(joystreamErc20Address);

        _setBridgeFee(initialBridgeFee);

        _setMintingLimits(initialMintingLimitPeriodLengthBlocks, initialMintingLimitPerPeriod);
        currentMintingPeriodEndBlock = block.number + mintingLimitPeriodLengthBlocks;
    }

    /* === PUBLIC FUNCTIONS === */

    /// @notice Requests a transfer to the Joystream chain.
    /// A successful request will:
    /// - collect `bridgeFee` wei from the caller into the contract,
    /// - burn `amount` tokens from the caller JOY balance,
    /// - emit the ArgoTransferToJoystreamRequested event,
    /// - increment the transferIdCounter.
    ///
    /// It will revert if:
    /// - the bridge is not active
    /// - the msg.value is not equal to the current bridge fee,
    /// - the amount is 0,
    /// - caller does not have at least `amount` tokens on its balance,
    /// - caller did not approve the ArgoBridgeV1 to spend at least `amount` tokens of its balance.///
    /// @param joyDestAccount The transfer destination account on the Joystream chain.
    /// @param amount The amount of tokens (HAPI) to transfer.
    function requestTransferToJoystream(bytes32 joyDestAccount, uint256 amount) public payable {
        if (!_isActive()) {
            revert ArgoBridgeNotActive();
        }
        if (msg.value != bridgeFee) {
            revert ArgoBridgeInvalidFee(bridgeFee);
        }
        if (amount == 0) {
            revert ArgoBridgeInvalidAmount(amount);
        }

        joystreamErc20.burnFrom(msg.sender, amount);

        emit ArgoTransferToJoystreamRequested(transferIdCounter, msg.sender, joyDestAccount, amount);

        transferIdCounter += 1;
    }

    /* === OPERATOR FUNCTIONS === */

    /// @notice Completes a transfer from the Joystream chain.
    /// A successful completion will:
    /// - update current minting period, if needed,
    /// - update the current minting period minted amount,
    /// - mint `amount` tokens to `ethDestAddress`,
    /// - emit the ArgoTransferToEthCompleted event,
    ///
    /// It will revert if:
    /// - caller does not have the OPERATOR_ROLE,
    /// - the bridge is not active,
    /// - the amount is 0,
    /// - the amount exceeds the current period minting limit, after it was updated.
    /// @param joyTransferId The local ID of the transfer on the source chain.
    /// @param ethDestAddress The target address on the EVM to which the tokens will be minted.
    /// @param amount The amount of tokens (HAPI) to be minted.
    function completeTransferToEth(
        uint256 joyTransferId,
        address ethDestAddress,
        uint256 amount
    ) public onlyRole(OPERATOR_ROLE) {
        if (!_isActive()) {
            revert ArgoBridgeNotActive();
        }
        if (amount == 0) {
            revert ArgoBridgeInvalidAmount(amount);
        }

        _updateMintingPeriod();
        uint256 mintingAllowance = mintingLimitPerPeriod - currentMintingPeriodMinted;
        if (amount > mintingAllowance) {
            revert ArgoBridgeMintingLimitReached(amount, mintingAllowance);
        }

        currentMintingPeriodMinted += amount;
        joystreamErc20.mint(ethDestAddress, amount);
        emit ArgoTransferToEthCompleted(joyTransferId, ethDestAddress, amount);
    }

    /// @notice Reverts a transfer to the Joystream chain.
    /// Works almost the same as the completeTransferToEth function, but emits the ArgoTransferToJoystreamReverted event instead.
    /// @param ethTransferId The local ID of the transfer on the source chain.
    /// @param revertAddress The address on the EVM that will receive the tokens.
    /// @param revertAmount The amount of tokens (HAPI) that will be minted.
    /// @param rationale The reason why the transfer was reverted.
    function revertTransferToJoystream(
        uint256 ethTransferId,
        address revertAddress,
        uint256 revertAmount,
        string memory rationale
    ) public onlyRole(OPERATOR_ROLE) {
        if (!_isActive()) {
            revert ArgoBridgeNotActive();
        }
        if (revertAmount == 0) {
            revert ArgoBridgeInvalidAmount(revertAmount);
        }

        _updateMintingPeriod();
        uint256 mintingAllowance = mintingLimitPerPeriod - currentMintingPeriodMinted;
        if (revertAmount > mintingAllowance) {
            revert ArgoBridgeMintingLimitReached(revertAmount, mintingAllowance);
        }

        currentMintingPeriodMinted += revertAmount;
        joystreamErc20.mint(revertAddress, revertAmount);
        emit ArgoTransferToJoystreamReverted(ethTransferId, revertAddress, revertAmount, rationale);
    }

    /* === PAUSER FUNCTIONS === */

    /// @notice Pauses the bridge.
    /// It will revert if the bridge is not active or the caller does not have the PAUSER_ROLE.
    /// Successful call will emit the ArgoBridgeStatusChanged event.
    /// Once paused, the bridge can be unpaused only be the admin.
    function pauseBridge() public onlyRole(PAUSER_ROLE) {
        if (!_isActive()) {
            revert ArgoBridgeNotActive();
        }

        bridgeStatus = ArgoBridgeStatus.Paused;
        emit ArgoBridgeStatusChanged(ArgoBridgeStatus.Paused);
    }

    /* === ADMIN FUNCTIONS === */

    /// @notice Unpauses the bridge.
    /// It will revert if the caller does not have the DEFAULT_ADMIN_ROLE.
    /// Successful call will emit the ArgoBridgeStatusChanged event.
    function unpauseBridge() public onlyRole(DEFAULT_ADMIN_ROLE) {
        bridgeStatus = ArgoBridgeStatus.Active;
        emit ArgoBridgeStatusChanged(ArgoBridgeStatus.Active);
    }

    /// @notice Sets the bridge fee to be charged for all new transfers.
    /// It will revert if the caller does not have the DEFAULT_ADMIN_ROLE.
    /// Successful call will emit the ArgoBridgeFeeChanged event.
    function setBridgeFee(uint256 newBridgeFee) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setBridgeFee(newBridgeFee);
    }

    /// @notice Sets the minting limits.
    /// It will revert if the caller does not have the DEFAULT_ADMIN_ROLE.
    /// Successful call will emit the ArgoBridgeMintingLimitsUpdated event.
    /// The new limits will apply only starting from the next minting period.
    /// @param newMintingLimitPeriodLengthBlocks The new minting limit period length in blocks.
    /// @param newMintingLimitPerPeriod The new minting limit amount (HAPI) per period.
    function setMintingLimits(
        uint256 newMintingLimitPeriodLengthBlocks,
        uint256 newMintingLimitPerPeriod
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setMintingLimits(newMintingLimitPeriodLengthBlocks, newMintingLimitPerPeriod);
    }

    /// @notice Withdraws the bridge fees stored in the contract to the caller account.
    /// It will revert if the caller does not have the DEFAULT_ADMIN_ROLE.
    /// Successful call will emit the ArgoBridgeFeesWithdrawn event.
    function withdrawBridgeFees() public onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
        emit ArgoBridgeFeesWithdrawn(msg.sender, balance);
    }

    /* === INTERNAL FUNCTIONS === */

    /// @notice Sets the bridge fee.
    function _setBridgeFee(uint256 newBridgeFee) internal {
        bridgeFee = newBridgeFee;
        emit ArgoBridgeFeeChanged(newBridgeFee);
    }

    /// @notice Sets the minting limits.
    function _setMintingLimits(uint256 newMintingLimitPeriodLengthBlocks, uint256 newMintingLimitPerPeriod) internal {
        mintingLimitPeriodLengthBlocks = newMintingLimitPeriodLengthBlocks;
        mintingLimitPerPeriod = newMintingLimitPerPeriod;
        emit ArgoBridgeMintingLimitsUpdated(newMintingLimitPeriodLengthBlocks, newMintingLimitPerPeriod);
    }

    /// @notice Updates the minting period if needed.
    function _updateMintingPeriod() internal {
        if (block.number >= currentMintingPeriodEndBlock) {
            currentMintingPeriodEndBlock = block.number + mintingLimitPeriodLengthBlocks;
            currentMintingPeriodMinted = 0;
        }
    }

    /// @notice Checks if the bridge is active.
    function _isActive() internal view returns (bool) {
        return bridgeStatus == ArgoBridgeStatus.Active;
    }
}
