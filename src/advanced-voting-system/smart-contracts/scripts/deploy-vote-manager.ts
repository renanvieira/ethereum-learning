import { ethers } from 'hardhat';

async function main() {
  const VoteManager = await ethers.getContractFactory("VoteManager");

  const voteManagerContract = await VoteManager.deploy(2);

  const deployed = await voteManagerContract.deployed();

  console.log("VoteManager deployed to:", deployed.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  