import { ethers } from "hardhat";
import { ContractFactory, Signer } from "ethers";
import moment from 'moment';
import { expect } from 'chai';

describe("VoteManager contract", function () {
  let accounts: Signer[];
  let Contract: ContractFactory;
  let currentBlockTimestamp: moment.Moment;
  let nextDayBlockTimestamp: moment.Moment;

  before(async () => {
    Contract = await ethers.getContractFactory("VoteManager");
  });

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const currentBlock = await ethers.provider.getBlock('latest');
    currentBlockTimestamp = moment(currentBlock.timestamp * 1000);
    nextDayBlockTimestamp = moment(currentBlock.timestamp * 1000).add(1, 'days');
  });

  it("Create a new Proposal", async function () {

    const VoteManagerContract = await Contract.deploy(1);

    const proposalId = await VoteManagerContract.callStatic.createProposal('/test.json');
    const abiCoder = new ethers.utils.AbiCoder();
    const encodedData = abiCoder.encode(["address", "string"], [await accounts[0].getAddress(), '/test.json']);
    const expectedProposalId = ethers.utils.keccak256(encodedData);

    expect(proposalId).to.be.equal(expectedProposalId);

    const receiptPromise = await VoteManagerContract.createProposal('/test.json');
    expect(receiptPromise).to.emit(VoteManagerContract, 'ProposalCreated');
  });

  it("New Proposal has to have metadata URL", async function () {
    const VoteManagerContract = await Contract.deploy(1);

    const callProposal = VoteManagerContract.createProposal('');
    await expect(callProposal).to.be.reverted;
  });


});
