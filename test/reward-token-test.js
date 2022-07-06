const { assert } = require("chai");

let alice = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

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
