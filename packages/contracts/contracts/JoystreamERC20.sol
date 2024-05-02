// SPDX-License-Identifier: ISC
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract JoystreamERC20 is ERC20, ERC20Burnable, AccessControl, ERC20Permit {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(address defaultAdmin) ERC20("JoystreamERC20", "JOY") ERC20Permit("JoystreamERC20") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
    }

    function decimals() public view virtual override returns (uint8) {
        return 10;
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
