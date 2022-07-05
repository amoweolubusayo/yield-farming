const ethers = "hardhat";

async function main() {
  const StakingToken = await ethers.getContractFactory("StakingToken");
  const stakingToken = await StakingToken.deploy(
    "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
    1
  );

  console.log("Deploying Staking Token....");
  // We get the contract to deploy
  await stakingToken.deployed();

  console.log("Deployed to:", stakingToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
