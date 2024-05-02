// SPDX-License-Identifier: ISC
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

import "./JoystreamERC20.sol";

contract ArgoBridgeV1 is AccessControl {
    error ArgoBridgeNotActive();
    error ArgoBridgeInvalidFee(uint256 requiredFee);
    error ArgoBridgeInvalidAmount(uint256 amount);
    error ArgoBridgeInvalidTargetAddress(address targetAddress);

    event ArgoTransferToJoystreamRequested(
        uint256 indexed ethTransferId,
        address indexed ethRequester,
        bytes32 joyDestAccount,
        uint256 amount
    );
    event ArgoTransferToEthCompleted(
        uint256 indexed joyTransferId,
        address indexed ethDestAddress,
        uint256 amount
    );
    event ArgoBridgeStatusChanged(ArgoBridgeStatus newStatus);
    event ArgoBridgeFeeChanged(uint256 newFee);
    event ArgoBridgeFeesWithdrawn(address destination, uint256 amount);

    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    enum ArgoBridgeStatus {
        Active,
        Paused
    }
    ArgoBridgeStatus public bridgeStatus = ArgoBridgeStatus.Paused;

    uint256 public bridgeFee;

    JoystreamERC20 public joystreamErc20;

    uint256 internal transferIdCounter = 0;

    constructor(
        address defaultAdmin,
        address joystreamErc20Address,
        uint256 initialBridgeFee
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        joystreamErc20 = JoystreamERC20(joystreamErc20Address);
        _setBridgeFee(initialBridgeFee);
    }

    function requestTransferToJoystream(
        bytes32 joyDestAccount,
        uint256 amount
    ) public payable {
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

        emit ArgoTransferToJoystreamRequested(
            transferIdCounter,
            msg.sender,
            joyDestAccount,
            amount
        );

        transferIdCounter += 1;
    }

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
        if (ethDestAddress == address(0)) {
            revert ArgoBridgeInvalidTargetAddress(ethDestAddress);
        }

        joystreamErc20.mint(ethDestAddress, amount);
        emit ArgoTransferToEthCompleted(joyTransferId, ethDestAddress, amount);
    }

    function pauseBridge() public onlyRole(PAUSER_ROLE) {
        if (!_isActive()) {
            revert ArgoBridgeNotActive();
        }

        bridgeStatus = ArgoBridgeStatus.Paused;
        emit ArgoBridgeStatusChanged(ArgoBridgeStatus.Paused);
    }

    function unpauseBridge() public onlyRole(DEFAULT_ADMIN_ROLE) {
        bridgeStatus = ArgoBridgeStatus.Active;
        emit ArgoBridgeStatusChanged(ArgoBridgeStatus.Active);
    }

    function setBridgeFee(
        uint256 newBridgeFee
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setBridgeFee(newBridgeFee);
    }

    function withdrawBridgeFees() public onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
        emit ArgoBridgeFeesWithdrawn(msg.sender, balance);
    }

    function _setBridgeFee(uint256 newBridgeFee) internal {
        bridgeFee = newBridgeFee;
        emit ArgoBridgeFeeChanged(newBridgeFee);
    }

    function _isActive() internal view returns (bool) {
        return bridgeStatus == ArgoBridgeStatus.Active;
    }
}
