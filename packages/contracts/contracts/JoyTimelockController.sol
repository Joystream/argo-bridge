// SPDX-License-Identifier: ISC
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/governance/TimelockController.sol";

// TODO: get rid of this contract and use TimelockController directly
contract JoyTimelockController is TimelockController {
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
