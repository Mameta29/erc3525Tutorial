import { ethers } from "hardhat";
require('dotenv').config();
const {
  CONTRACT_ADDRESS,
} = process.env;

async function main() {
  const [owner] = await ethers.getSigners();
  const ERC3525Tutorial = await ethers.getContractFactory("ERC3525Tutorial");
  const erc3525tutorial = await ERC3525Tutorial.attach(`${CONTRACT_ADDRESS}`);
  const tx = await erc3525tutorial.mint(owner.address, 3525, 1000);
  await tx.wait();
  const uri = await erc3525tutorial.tokenURI(1);
  console.log(uri);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});