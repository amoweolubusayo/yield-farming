const { expect, use, assert } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
use(solidity);

let alice = "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097";
let owner;
let addr1;
let addr2;
let addrs;

describe("StakingToken", () => {
  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    this.StakingToken = await ethers.getContractFactory("StakeToken");
    this.stakeToken = await this.StakingToken.deploy();
    await this.stakeToken.deployed();

    this.RewardToken = await ethers.getContractFactory("RewardToken");
    this.rewardToken = await this.RewardToken.deploy();
    await this.rewardToken.deployed();

    this.StakingContract = await ethers.getContractFactory("StakingToken");
    this.stakeContract = await this.StakingContract.deploy(
      this.rewardToken.address,
      10
    );
    await this.stakeContract.deployed();

    const amt = "15";
    await this.stakeToken.mint(addr1.address, amt);
    await this.rewardToken.mint(addr1.address, amt);
  });

  //test Emits event Pool Created
  it("Creates a new pool", async () => {
    let tx = await this.stakeContract.createStakingPool(
      this.stakeToken.address
    );
  });

  //test function reverted with message

  it("should not deposit 0", async () => {
    await expect(this.stakeContract.deposit(1, 0)).to.be.revertedWith(
      "Deposit amount can't be zero"
    );
  });

  it("should deposit an amount", async () => {
    console.log(
      "prev balance owner is ",
      await this.stakeToken.balanceOf(owner.address)
    );

    const ownerPreviousBalance = await this.stakeToken.balanceOf(owner.address); // //deposit
    await this.stakeContract.createStakingPool(this.stakeToken.address);

    const amount = "1000";

    console.log("amount ", amount);

    let txn = await this.stakeToken.approve(
      this.stakeContract.address,
      amount,
      {
        from: owner.address,
      }
    );
    console.log("txn: ", txn);
    // await this.stakeToken.deposit(0, amount);
    const excessValue = "300"; // 10000000000000000000
    let tx = await this.stakeContract.deposit(0, "20", {
      from: owner.address,
    });

    let receipt = await tx.wait();
    console.log(
      "event: ",
      receipt.events?.filter((x) => {
        return x.event == "Deposit";
      })
    );

    console.log(
      "new balance owner is ",
      await this.stakeToken.balanceOf(owner.address)
    );
    expect(await this.stakeToken.balanceOf(owner.address)).to.equal(
      "999999999999999999999980"
    );
  });

  it("should not withdraw 0", async () => {
    await expect(this.stakeContract.withdraw(1, 0)).to.be.revertedWith(
      "Withdraw amount can't be zero"
    );
  });

  it("should withdraw an amount", async () => {
    console.log(
      "prev balance owner is ",
      await this.stakeToken.balanceOf(owner.address)
    );

    await this.stakeContract.createStakingPool(this.stakeToken.address);

    const amount = "1000";

    console.log("amount ", amount);

    let txn = await this.stakeToken.approve(
      this.stakeContract.address,
      amount,
      {
        from: owner.address,
      }
    );
    console.log("txn: ", txn);

    await this.stakeContract.deposit(0, "20", {
      from: owner.address,
    });

    let tx = await this.stakeContract.withdraw(0, "10", {
      from: owner.address,
    });

    let receipt = await tx.wait();
    console.log(
      "event: ",
      receipt.events?.filter((x) => {
        return x.event == "Withdraw";
      })
    );

    console.log(
      "new balance owner is ",
      await this.stakeToken.balanceOf(owner.address)
    );
    expect(await this.stakeToken.balanceOf(owner.address)).to.equal(
      "999999999999999999999990"
    );
  });
});
