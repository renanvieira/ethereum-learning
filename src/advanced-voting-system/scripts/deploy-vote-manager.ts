import { ethers } from 'hardhat';

async function main() {
  const VoteManager = await ethers.getContractFactory("VoteManager");
  const voteManagerContract = await VoteManager.deploy(1);

  await voteManagerContract.deployed();

  console.log("VoteManager deployed to:", voteManagerContract.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
