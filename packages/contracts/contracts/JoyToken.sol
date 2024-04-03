// SPDX-License-Identifier: ISC
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract JoyToken is ERC20, ERC20Burnable, AccessControl, ERC20Permit {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    // TODO: remove burner role, rely on permit/allowance instead
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor(
        address defaultAdmin
    ) ERC20("JoyToken", "JOY") ERC20Permit("JoyToken") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
    }

    function decimals() public view virtual override returns (uint8) {
        return 10;
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burnFrom(
        address account,
        uint256 value
    ) public virtual override(ERC20Burnable) onlyRole(BURNER_ROLE) {
        _burn(account, value);
    }
}
