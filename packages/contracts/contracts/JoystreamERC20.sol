// SPDX-License-Identifier: ISC
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract JoystreamERC20 is ERC20, ERC20Burnable, AccessControl, ERC20Permit {
    event JoystreamERC20MaxSupplyUpdated(uint256 newMaxSupply);

    error JoystreamERC20MaxSupplyExceeded(
        uint256 maxSupply,
        uint256 totalSupply,
        uint256 amount
    );

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // The maximum supply of the token. 0 means no limit. Can be updated by the admin.
    uint256 public maxSupply = 0;

    constructor(
        address defaultAdmin,
        uint256 initialMaxSupply
    ) ERC20("JoystreamERC20", "JOY") ERC20Permit("JoystreamERC20") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        maxSupply = initialMaxSupply;
    }

    function decimals() public view virtual override returns (uint8) {
        return 10;
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        // Check if the max supply is exceeded
        // If maxSupply is 0, there is no limit
        if (maxSupply != 0 && totalSupply() + amount > maxSupply) {
            revert JoystreamERC20MaxSupplyExceeded(
                maxSupply,
                totalSupply(),
                amount
            );
        }

        _mint(to, amount);
    }

    function updateMaxSupply(
        uint256 newMaxSupply
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        maxSupply = newMaxSupply;

        emit JoystreamERC20MaxSupplyUpdated(newMaxSupply);
    }
}
