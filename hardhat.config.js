require("@nomicfoundation/hardhat-toolbox");

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "kvy3BxiyD-omPUuCscOF5f_-2wdn2kDP";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY =
  "9c7e8981e20ba66ef199b73063a34d3e2a097bbc31aa903f9c312d1605b328e4";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  // networks: {
  //   goerli: {
  //     url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
  //     accounts: [GOERLI_PRIVATE_KEY],
  //   },
  // },
};
