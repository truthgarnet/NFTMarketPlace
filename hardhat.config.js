require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".env").toString();
const projectId = "8a3065adea2e4a87a44d0e90f030059a";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337 //If it hasn't other chainid, You can change chainId
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`, //Infura
      accounts: [privateKey]
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`, //Infura
      accounts: [privateKey]
    },
  },
  solidity: "0.8.4",
};
