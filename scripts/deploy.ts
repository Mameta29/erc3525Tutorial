import { ethers } from "hardhat";

async function main() {
  const ERC3525Tutorial = await ethers.getContractFactory("ERC3525Tutorial");
  const erc3525tutorial = await ERC3525Tutorial.deploy();
  erc3525tutorial.deployed();

  console.log(`ERC3525Tutorial deployed to ${erc3525tutorial.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


  // const [owner] = await ethers.getSigners();
  // console.log(`owner getAddrrss ${owner.getAddress}`);
  // console.log(`owner addrrss ${owner.address}`);

  // console.log(`"ERC3525Tutorial : " ${ERC3525Tutorial.bytecode}`);

// console.log(`"erc3525utorial : " ${erc3525tutorial.address}`);