import { ethers } from "hardhat";
import { BigNumber, Contract, ContractFactory, Signer } from "ethers";
import moment from 'moment';
import { expect } from 'chai';

describe("VoteManager contract", function () {
  let accounts: Signer[];
  let owner: string;
  let VoteManagerContractFactory: ContractFactory;
  let ProposalContractFactory: ContractFactory;
  let currentBlockTimestamp: moment.Moment;
  let VoteManagerContract: Contract;

  before(async () => {
    VoteManagerContractFactory = await ethers.getContractFactory("VoteManager");
    ProposalContractFactory = await ethers.getContractFactory("Proposal");
  });

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    owner = await accounts[0].getAddress();
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
    expect(receiptPromise).to.emit(VoteManagerContract, 'ProposalCreated').withArgs(owner, expectedProposalId, proposalAddress);
  });

  it("New Proposal has to have metadata URL", async function () {
    const callProposal = VoteManagerContract.createProposal('');
    await expect(callProposal).to.be.reverted;
  });

  it("Proposals can't have duplicated metadata URL", async function () {
    const metadata = `/test-${moment().unix()}.json`;

    const callProposalFirst = await VoteManagerContract.createProposal(metadata);
    const callProposalSecond = VoteManagerContract.createProposal(metadata);

    await expect(callProposalSecond).to.be.reverted;
  });

  it("Anyone should be able to get proposal data by address", async function () {
    const [proposalId, proposalAddress] = await VoteManagerContract.callStatic.createProposal('/test-getProposal.json');
    const receipt = await VoteManagerContract.createProposal('/test-getProposal.json');

    const data = await VoteManagerContract.callStatic.getProposal(proposalAddress);

    expect(data.contractAddress).to.be.properAddress;
    expect(proposalAddress).to.be.properAddress;
    expect(data.contractAddress).to.be.equal(proposalAddress);
    expect(data.creator).to.be.equal(await accounts[0].getAddress());
    expect((data.id as BigNumber).gt(BigNumber.from('0'))).to.be.true;
    expect((data.index as BigNumber).eq(BigNumber.from('0'))).to.be.true;
    expect(data.exists).to.be.true;
  });

  it("User should see an error when get proposal address is 0x0", async function () {
    await expect(VoteManagerContract.getProposal(ethers.constants.AddressZero)).to.be.reverted;
  });

  it("User should see an error when get proposal with inexistent id", async function () {
    await expect(VoteManagerContract.getProposal('0x8ba1f109551bD432803012645Ac136ddd64DBA72')).to.be.reverted;
  });

  it("Get the number of proposals created in the contract", async function () {

    const proposal1 = await VoteManagerContract.createProposal('/test-getProposal1.json');
    const proposal2 = await VoteManagerContract.createProposal('/test-getProposal2.json');

    const result = await VoteManagerContract.getNumberOfProposals();

    expect(result).to.be.equal(2);
  });

});
