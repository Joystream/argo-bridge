import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers"
import { expect } from "chai"
import hre from "hardhat"

const INITIAL_MAX_SUPPLY = 1000000n

describe("JoystreamERC20", function () {
  async function deployErc20() {
    const [deployer, admin, minter, otherAccount] =
      await hre.ethers.getSigners()

    const erc20 = await hre.ethers.deployContract("JoystreamERC20", [
      admin.address,
      INITIAL_MAX_SUPPLY,
    ])
    const erc20AsAdmin = erc20.connect(admin)
    const erc20AsMinter = erc20.connect(minter)

    const minterRole = await erc20.MINTER_ROLE()

    return {
      erc20,
      erc20AsAdmin,
      erc20AsMinter,
      deployer,
      admin,
      minter,
      otherAccount,
      minterRole,
    }
  }

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      const { erc20, admin } = await loadFixture(deployErc20)
      const adminRole = await erc20.DEFAULT_ADMIN_ROLE()

      expect(await erc20.hasRole(adminRole, admin.address)).to.be.true
    })

    it("Should have 0 total supply", async function () {
      const { erc20 } = await loadFixture(deployErc20)
      expect(await erc20.totalSupply()).to.equal(0n)
    })

    it("Should have the right initial max supply", async function () {
      const { erc20 } = await loadFixture(deployErc20)
      expect(await erc20.maxSupply()).to.equal(INITIAL_MAX_SUPPLY)
    })
  })

  describe("Role management", function () {
    it("Should not allow managing roles if not admin", async function () {
      const { erc20, otherAccount, minterRole } = await loadFixture(deployErc20)

      const erc20AsOtherAccount = erc20.connect(otherAccount)

      await expect(
        erc20AsOtherAccount.grantRole(minterRole, otherAccount.address),
      ).to.be.revertedWithCustomError(erc20, "AccessControlUnauthorizedAccount")

      await expect(
        erc20AsOtherAccount.revokeRole(minterRole, otherAccount.address),
      ).to.be.revertedWithCustomError(erc20, "AccessControlUnauthorizedAccount")
    })
  })

  // TODO: add overflow tests
  describe("Minting", function () {
    it("Should not allow minting without minter role", async function () {
      const { erc20, admin, erc20AsAdmin } = await loadFixture(deployErc20)

      await expect(
        erc20AsAdmin.mint(admin.address, 1n),
      ).to.be.revertedWithCustomError(erc20, "AccessControlUnauthorizedAccount")
    })

    it("Should allow minting after granting the role", async function () {
      const { erc20AsAdmin, erc20AsMinter, minter, minterRole } =
        await loadFixture(deployErc20)

      await erc20AsAdmin.grantRole(minterRole, minter.address)

      await erc20AsMinter.mint(minter.address, 1n)
    })

    it("Should not allow minting after revoking the role", async function () {
      const { erc20, erc20AsAdmin, erc20AsMinter, minter, minterRole } =
        await loadFixture(deployErc20)

      await erc20AsAdmin.grantRole(minterRole, minter.address)
      await erc20AsAdmin.revokeRole(minterRole, minter.address)

      await expect(
        erc20AsMinter.mint(minter.address, 1n),
      ).to.be.revertedWithCustomError(erc20, "AccessControlUnauthorizedAccount")
    })
  })

  describe("Max supply", function () {
    it("Should not allow minting more than the max supply", async function () {
      const { erc20, erc20AsAdmin, erc20AsMinter, minter, minterRole } =
        await loadFixture(deployErc20)

      await erc20AsAdmin.grantRole(minterRole, minter.address)

      await erc20AsMinter.mint(minter.address, INITIAL_MAX_SUPPLY)

      await expect(
        erc20AsMinter.mint(minter.address, 1n),
      ).to.be.revertedWithCustomError(erc20, "JoystreamERC20MaxSupplyExceeded")
    })

    it("Should not allow non-admins to change the max supply", async function () {
      const { erc20, otherAccount } = await loadFixture(deployErc20)

      await expect(
        erc20.connect(otherAccount).updateMaxSupply(1n),
      ).to.be.revertedWithCustomError(erc20, "AccessControlUnauthorizedAccount")
    })

    it("Should allow admins to change the max supply", async function () {
      const { erc20, erc20AsAdmin } = await loadFixture(deployErc20)

      await expect(erc20AsAdmin.updateMaxSupply(1n))
        .to.emit(erc20, "JoystreamERC20MaxSupplyUpdated")
        .withArgs(1n)

      expect(await erc20.maxSupply()).to.equal(1n)
    })
  })
})
