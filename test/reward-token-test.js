const { assert } = require("chai");

let alice = "[CONTRACT_ADDRESS]";

describe("RewardToken", () => {
  beforeEach(async () => {
    this.RewardToken = await ethers.getContractFactory("RewardToken");
    this.brc = await this.RewardToken.deploy(); // brc : busayoRewardToken
    await this.brc.deployed();
  });

  it("mint", async () => {
    await this.brc.mint(alice, 1000);
    assert.equal((await this.brc.balanceOf(alice)).toString(), "1000");
  });
});
