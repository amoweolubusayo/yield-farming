require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const { alchemyApiKey, mnemonic } = require("./secrets.json");

module.exports = {
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
    },
  },
  etherscan: {
    apiKey: "9EIIENUCJKMA9UVGRIIY4DZV6Z9PDQ4JVH",
  },
  solidity: "0.8.4",
};
