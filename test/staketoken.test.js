const { assert } = require("chai");

let alice = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

describe("StakeToken", () => {
  beforeEach(async () => {
    this.StakeToken = await ethers.getContractFactory("StakeToken");
    this.stakeToken = await this.StakeToken.deploy();
    await this.stakeToken.deployed();
  });

  it("mint", async () => {
    await this.stakeToken.mint(alice, 1000);
    assert.equal((await this.stakeToken.balanceOf(alice)).toString(), "1000");
  });
});
