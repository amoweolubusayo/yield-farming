require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const { alchemyApiKey, mnemonic , etherScanKey } = require("./secrets.json");

module.exports = {
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
    },
  },
  etherscan: {
    apiKey: `${etherScanKey}`,
  },
  solidity: "0.8.4",
};
