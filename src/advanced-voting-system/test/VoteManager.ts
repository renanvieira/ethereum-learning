import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import moment from 'moment';
import { expect } from 'chai';

describe("VoteManager contract", function () {
  let accounts: Signer[];
  let VoteManagerContractFactory: ContractFactory;
  let ProposalContractFactory: ContractFactory;
  let currentBlockTimestamp: moment.Moment;
  let nextDayBlockTimestamp: moment.Moment;
  let VoteManagerContract : Contract;

  before(async () => {
    VoteManagerContractFactory = await ethers.getContractFactory("VoteManager");
    ProposalContractFactory = await ethers.getContractFactory("Proposal");
  });

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const currentBlock = await ethers.provider.getBlock('latest');
    currentBlockTimestamp = moment(currentBlock.timestamp * 1000);

    VoteManagerContract = await VoteManagerContractFactory.deploy(1);

  });

  it("Create a new Proposal", async function () {
    const [proposalId, proposalAddress] = await VoteManagerContract.callStatic.createProposal('/test.json');
    const abiCoder = new ethers.utils.AbiCoder();
    const encodedData = abiCoder.encode(["address", "string"], [await accounts[0].getAddress(), '/test.json']);
    const expectedProposalId = ethers.utils.keccak256(encodedData);

    expect(proposalId).to.be.equal(expectedProposalId);
    expect(proposalAddress).to.be.properAddress;

    const receiptPromise = await VoteManagerContract.createProposal('/test.json');
    expect(receiptPromise).to.emit(VoteManagerContract, 'ProposalCreated').withArgs(proposalAddress);
  });

  it("New Proposal has to have metadata URL", async function () {
    const callProposal = VoteManagerContract.createProposal('');
    await expect(callProposal).to.be.reverted;
  });

  it("New Proposal has to have deadline in the future", async function () {
    const callProposal = VoteManagerContract.createProposal('/test-deadline.json', moment().subtract(1, 'days').unix());
    await expect(callProposal).to.be.reverted;
  });

  it("Proposals can't have duplicated metadata URL", async function () {
    const metadata = `/test-${moment().unix()}.json`;
    const callProposalFirst = await VoteManagerContract.createProposal(metadata);
    const callProposalSecond = VoteManagerContract.createProposal(metadata);
    await expect(callProposalSecond).to.be.reverted;
  });

  it("Anyone should be able to get proposal address by id", async function(){
    const [proposalId, proposalAddress] = await VoteManagerContract.callStatic.createProposal('/test-getProposal.json');
    const receipt = await VoteManagerContract.createProposal('/test-getProposal.json');

    const address = await VoteManagerContract.callStatic.getProposal(proposalId);

    expect(address).to.be.properAddress;
    expect(proposalAddress).to.be.properAddress;
    expect(address).to.be.equal(proposalAddress);

  });

  it("User should see an error when get proposal with id greater than 0", async function(){
    await expect(VoteManagerContract.getProposal(0)).to.be.reverted;
  });

  it("User should see an error when get proposal with inexistent id", async function(){
    await expect(VoteManagerContract.getProposal(999)).to.be.reverted;
  });

});
