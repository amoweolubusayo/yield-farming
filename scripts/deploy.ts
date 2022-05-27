import { ethers } from "hardhat";

async function main() {
  const StakingToken = await ethers.getContractFactory("StakingToken");
  const stakingToken = await StakingToken.deploy();

  console.log("Deploying Staking Token....");
  // We get the contract to deploy
  await stakingToken.deployed();

  console.log("Deployed to:", stakingToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
