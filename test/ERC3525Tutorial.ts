import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC3525Tutorial", function () {
  // Fixtureを使用すると関数実行後の状態を保存しておいてすぐに再利用可能。
  //そのため、コントラクトのデプロイやアドレスの用意はFixtureで行うことで後続するテストの実行時間を短縮できる
  async function deployERC3525TutorialFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const ERC3525Tutorial = await ethers.getContractFactory(
      "ERC3525Tutorial");
    const erc3525tutorial = await ERC3525Tutorial.deploy();
    return { erc3525tutorial, owner, otherAccount };
  }

  // deployテスト
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { erc3525tutorial, owner } = await loadFixture(
        deployERC3525TutorialFixture);
        expect(await erc3525tutorial.owner()).to.equal(owner.address);
    });
  });

  // mintテスト① コントラクトのownerのみmint可能になっているか
  describe("Mintable", function () {
    describe("Validations", function () {
      it("Should revert with not owner", async function () {
        const { erc3525tutorial, owner, otherAccount } = 
          await loadFixture(deployERC3525TutorialFixture);
        const slot = 3525
        const value = ethers.utils.parseEther("9.5");
        await expect(
          erc3525tutorial.connect(otherAccount)
                        .mint(owner.address, slot, value))
                        .to.be.revertedWith(
          "ERC3525Tutorial: only owner can mint"
        );
      });
    });

    // mintテスト② 想定しているmintの挙動になっているか
    describe("Mint", function () {
      it("Should mint to other account", async function () {
        const { erc3525tutorial, owner, otherAccount } = 
          await loadFixture(deployERC3525TutorialFixture);
        const slot = 3525
        const value = await ethers.utils.parseEther("9.5");

        await erc3525tutorial.mint(otherAccount.address, slot, value);
        expect(await erc3525tutorial["balanceOf(uint256)"](1)).to.eq(value);
        expect(await erc3525tutorial.slotOf(1)).to.eq(slot);
        expect(await erc3525tutorial.ownerOf(1))
                                   .to.eq(otherAccount.address);
      });
    });
  });
});