// SPDX-License-Identifier: ISC
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./JoyToken.sol";

contract JoyEthArgoBridgeV1 is Ownable {
    event TransferToJoystreamRequested(
        address indexed ethRequester,
        uint256 amount,
        bytes32 joyDestinationAddress
    );
    event TransferToEthCompleted(
        bytes32 indexed transferId,
        uint256 amount,
        address indexed ethDestinationAddress
    );

    JoyToken public joyToken;
    uint256 public bridgeFee = 0.01 ether;
    bool public isBridgeActive = true;

    constructor(address _owner, address _joyTokenAddress) Ownable(_owner) {
        joyToken = JoyToken(_joyTokenAddress);
    }

    function requestTransferToJoystream(
        uint256 _amount,
        bytes32 _joyDestinationAddress
    ) public payable {
        require(isBridgeActive, "Bridge is not active");
        require(msg.value == bridgeFee, "Bridge fee not paid");
        joyToken.burnFrom(msg.sender, _amount);
        emit TransferToJoystreamRequested(
            msg.sender,
            _amount,
            _joyDestinationAddress
        );
    }

    function completeTransferToEth(
        bytes32 _transferId,
        uint256 _amount,
        address _ethDestinationAddress
    ) public onlyOwner {
        joyToken.mint(_ethDestinationAddress, _amount);
        emit TransferToEthCompleted(
            _transferId,
            _amount,
            _ethDestinationAddress
        );
    }

    function setBridgeActive(bool _isBridgeActive) public onlyOwner {
        isBridgeActive = _isBridgeActive;
    }

    function setBridgeFee(uint256 _bridgeFee) public onlyOwner {
        bridgeFee = _bridgeFee;
    }

    function withdrawBridgeFees() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
