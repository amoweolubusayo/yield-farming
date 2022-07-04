const { expect, use } = require("chai");
const { solidity } = require("ethereum-waffle");
const { RewardToken, StakingToken } = "../typechain";
use(solidity);

let alice = "[CONTRACT_ADDRESS]";

describe("StakingToken", () => {
  beforeEach(async () => {
    this.StakingToken = await ethers.getContractFactory("StakingToken");
    this.stakeToken = await this.StakingToken.deploy(alice, 4);
    await this.stakeToken.deployed();
  });

  it("Creates a new pool", async () => {
    await expect(this.stakeToken.createStakingPool(alice))
      .to.emit(alice, "PoolCreated")
      .withArgs(0);
  });

  it("deposit", async () => {
    await expect(this.stakeToken.deposit(1, 0)).to.be.revertedWith(
      "Deposit amount can't be zero"
    );
  });
  it("withdraw", async () => {
    await expect(this.stakeToken.withdraw(1, 0)).to.be.revertedWith(
      "Withdraw amount can't be zero"
    );
  });
});
