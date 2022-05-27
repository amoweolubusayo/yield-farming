import { ethers } from "hardhat";
import { expect } from "chai";

describe("Atm", function () {
  const tokenAdress = "";

  this.before(async function () {
    this.StakingToken = await ethers.getContractFactory("StakingToken");
  });

  this.beforeEach(async function () {
    this.stakingToken = await this.StakingToken.deploy();
    await this.stakingToken.deployed();

    it("Creates a new pool", async function () {
      await expect(this.stakingToken.createStakingPool(tokenAdress))
        .to.emit(this.stakingToken, "PoolCreated")
        .withArgs(0);
    });
  });
});
