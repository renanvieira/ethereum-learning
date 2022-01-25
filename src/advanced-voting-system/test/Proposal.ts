import { ethers, network } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import moment from 'moment';
import { expect } from 'chai';

describe("Proposal contract", function () {
    let accounts: Signer[];
    let VoteManagerContractFactory: ContractFactory;
    let ProposalContractFactory: ContractFactory;
    let currentBlockTimestamp: moment.Moment;
    let nextDayBlockTimestamp: moment.Moment;
    let proposalId : BigInt;
    let proposalAddress : string;
    let createProposalReceipt;
    let ProposalContract : Contract | null;
    let VoteManagerContract : Contract  | null;

    before(async () => {
        VoteManagerContractFactory = await ethers.getContractFactory("VoteManager");
        ProposalContractFactory = await ethers.getContractFactory("Proposal");
    });

    beforeEach(async function () {
        accounts = await ethers.getSigners();
        const currentBlock = await ethers.provider.getBlock('latest');
        currentBlockTimestamp = moment(currentBlock.timestamp * 1000);
    
        VoteManagerContract = await VoteManagerContractFactory.deploy(1); // 1 day to expire proposal

        const proposalMetadata = `/test-${moment().unix()}.json`;
        [proposalId, proposalAddress] = await VoteManagerContract.callStatic.createProposal(proposalMetadata);

        createProposalReceipt = await VoteManagerContract.createProposal(proposalMetadata);

        await createProposalReceipt.wait();
        ProposalContract = ProposalContractFactory.attach(proposalAddress);
    });

    it("Same wallet can only do one vote", async function () {
        await ProposalContract?.vote(0);
        await expect( ProposalContract?.vote(1)).to.be.revertedWith("This address already voted");
    });

    it("Can't vote if it's passed the deadline", async function () {
        await network.provider.send("evm_increaseTime", [moment.duration(1, "day").asSeconds()]);
        await network.provider.send("evm_mine");
        
        await expect( ProposalContract?.vote(1)).to.be.revertedWith("Proposal expired");
    });

    it("Different wallets can vote at any time", async function () {
        await ProposalContract?.vote(0);
        await ProposalContract?.connect(accounts[1]).vote(1);

        const voteCount = await ProposalContract?.callStatic.getVotes();

        expect(voteCount.yesVotes).to.be.equal(1);
        expect(voteCount.noVotes).to.be.equal(1);
    });
});
