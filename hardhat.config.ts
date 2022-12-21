import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

const {
  SEPOLIA_URL,
  INFURA_KEY,
  PRIVATE_KEY,
  ETHERSCAN_API_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    // sepolia: {     
    //   url: SEPOLIA_URL,      
    //   accounts: [`0x${PRIVATE_KEY}`],   
    // },
    sepolia: {
      url: SEPOLIA_URL || `https://sepolia.infura.io/v3/${INFURA_KEY}`,
      accounts:
        PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
  },
  // etherscan: {
  //   apiKey: {
  //     sepolia: ETHERSCAN_API_KEY !== undefined ? [ETHERSCAN_API_KEY] : [],
  //   }
  // }
};

export default config;