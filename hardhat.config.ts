import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

const {
  SEPOLIA_URL,
  PRIVATE_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    sepolia: {     
      url: SEPOLIA_URL,      
      accounts: [`0x${PRIVATE_KEY}`],   
    },
  },
  etherscan: {
    apiKey: {
      sepolia: 'GA7YG6PUPUGWM2H9E2V1X7J7J8HGK8M3C3'
    }
  }
};

export default config;