const { expect, use } = require("chai");
const { solidity } = require("ethereum-waffle");
use(solidity);

let alice = "[CONTRACT_ADDRESS]";

describe("StakingToken", () => {
  beforeEach(async () => {
    this.StakingToken = await ethers.getContractFactory("StakingToken");
    this.stakeToken = await this.StakingToken.deploy(alice, 4);
    await this.stakeToken.deployed();

    this.RewardToken = await ethers.getContractFactory("RewardToken");
    this.rewardToken = await this.RewardToken.deploy();
    await this.rewardToken.deployed();
  });

  //test Emits event Pool Created
  it("Creates a new pool", async () => {
    await expect(this.stakeToken.createStakingPool(this.stakeToken.address))
      .to.emit(this.stakeToken, "PoolCreated")
      .withArgs(1);
  });

  //test function reverted with message
  it("deposit", async () => {
    await expect(this.stakeToken.deposit(1, 0)).to.be.revertedWith(
      "Deposit amount can't be zero"
    );

    // //approve trans
    // await this.stakeToken.createStakingPool(this.stakeToken.address);
    // const amount = ethers.utils.parseEther("10");
    // await this.rewardToken.approve(this.stakeToken.address, amount);

    // //deposit transaction
    // const depositTransaction = await this.stakeToken.deposit(1, amount);

    // await expect(depositTransaction)
    //   .to.emit(this.stakeToken, "Deposit")
    //   .withArgs(1, amount);
  });
  it("withdraw", async () => {
    await expect(this.stakeToken.withdraw(1, 0)).to.be.revertedWith(
      "Withdraw amount can't be zero"
    );
  });
});
