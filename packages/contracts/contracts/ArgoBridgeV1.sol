// SPDX-License-Identifier: ISC
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

import "./JoystreamERC20.sol";

contract ArgoBridgeV1 is AccessControl {
    /* === ERRORS AND EVENTS === */
    error ArgoBridgeNotActive();
    error ArgoBridgeInvalidFee(uint256 requiredFee);
    error ArgoBridgeInvalidAmount(uint256 amount);
    error ArgoBridgeMintingLimitReached(uint256 requestedAmount, uint256 mintingAllowance);

    event ArgoTransferToJoystreamRequested(
        uint256 indexed ethTransferId,
        address indexed ethRequester,
        bytes32 joyDestAccount,
        uint256 amount
    );
    event ArgoTransferToEthCompleted(uint256 indexed joyTransferId, address indexed ethDestAddress, uint256 amount);
    event ArgoBridgeStatusChanged(ArgoBridgeStatus newStatus);
    event ArgoBridgeFeeChanged(uint256 newFee);
    event ArgoBridgeFeesWithdrawn(address destination, uint256 amount);
    event ArgoBridgeMintingLimitsUpdated(uint256 newMintingLimitPeriodLengthBlocks, uint256 newMintingLimitPerPeriod);

    /* === ROLES === */
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    /* === CONTRACT STATE === */
    enum ArgoBridgeStatus {
        Active,
        Paused
    }
    ArgoBridgeStatus public bridgeStatus = ArgoBridgeStatus.Paused;

    uint256 public bridgeFee;

    JoystreamERC20 public joystreamErc20;

    uint256 internal transferIdCounter = 0;

    uint256 public mintingLimitPeriodLengthBlocks;
    uint256 public mintingLimitPerPeriod;
    uint256 public currentMintingPeriodEndBlock;
    uint256 public currentMintingPeriodMinted = 0;

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

    /* === PAUSER FUNCTIONS === */

    function pauseBridge() public onlyRole(PAUSER_ROLE) {
        if (!_isActive()) {
            revert ArgoBridgeNotActive();
        }

        bridgeStatus = ArgoBridgeStatus.Paused;
        emit ArgoBridgeStatusChanged(ArgoBridgeStatus.Paused);
    }

    /* === ADMIN FUNCTIONS === */

    function unpauseBridge() public onlyRole(DEFAULT_ADMIN_ROLE) {
        bridgeStatus = ArgoBridgeStatus.Active;
        emit ArgoBridgeStatusChanged(ArgoBridgeStatus.Active);
    }

    function setBridgeFee(uint256 newBridgeFee) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setBridgeFee(newBridgeFee);
    }

    function setMintingLimits(
        uint256 newMintingLimitPeriodLengthBlocks,
        uint256 newMintingLimitPerPeriod
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setMintingLimits(newMintingLimitPeriodLengthBlocks, newMintingLimitPerPeriod);
    }

    function withdrawBridgeFees() public onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
        emit ArgoBridgeFeesWithdrawn(msg.sender, balance);
    }

    /* === INTERNAL FUNCTIONS === */

    function _setBridgeFee(uint256 newBridgeFee) internal {
        bridgeFee = newBridgeFee;
        emit ArgoBridgeFeeChanged(newBridgeFee);
    }

    function _setMintingLimits(uint256 newMintingLimitPeriodLengthBlocks, uint256 newMintingLimitPerPeriod) internal {
        mintingLimitPeriodLengthBlocks = newMintingLimitPeriodLengthBlocks;
        mintingLimitPerPeriod = newMintingLimitPerPeriod;
        emit ArgoBridgeMintingLimitsUpdated(newMintingLimitPeriodLengthBlocks, newMintingLimitPerPeriod);
    }

    function _updateMintingPeriod() internal {
        if (block.number >= currentMintingPeriodEndBlock) {
            currentMintingPeriodEndBlock = block.number + mintingLimitPeriodLengthBlocks;
            currentMintingPeriodMinted = 0;
        }
    }

    function _isActive() internal view returns (bool) {
        return bridgeStatus == ArgoBridgeStatus.Active;
    }
}
