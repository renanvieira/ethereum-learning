import { ethers, network } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import moment from 'moment';
import { expect } from 'chai';

describe("Proposal contract", function () {
    let accounts: Signer[];
    let VoteManagerContractFactory: ContractFactory;
    let ProposalContractFactory: ContractFactory;
    let proposalAddress: string;
    let createProposalReceipt;
    let ProposalContract: Contract | null;
    let VoteManagerContract: Contract | null;

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

    it("Proposal deadline has to be in the future", async () => {
        const trxPromise = ProposalContractFactory.deploy("metadata.json", moment("2020-01-01").unix(), 1)
        expect(trxPromise).to.be.reverted;
    })

    it("Same wallet can only do one vote", async function () {
        await ProposalContract?.vote(0);
        await expect(ProposalContract?.vote(1)).to.be.revertedWith("This address already voted");
    });

    it("Can't vote if it's passed the deadline", async function () {
        await network.provider.send("evm_increaseTime", [moment.duration(1, "day").asSeconds()]);
        await network.provider.send("evm_mine");

        await expect(ProposalContract?.vote(1)).to.be.revertedWith("Proposal expired");
    });

    it("Different wallets can vote at any time - yes", async function () {
        await ProposalContract?.vote(0);
        await ProposalContract?.connect(accounts[1]).vote(1);

        const voteCount = await ProposalContract?.callStatic.getVotes();

        expect(voteCount.yesVotes).to.be.equal(1);
        expect(voteCount.noVotes).to.be.equal(1);
    });

    it("Different wallets can vote at any time - no", async function () {
        await ProposalContract?.vote(1);
        await ProposalContract?.connect(accounts[1]).vote(1);

        const voteCount = await ProposalContract?.callStatic.getVotes();

        expect(voteCount.yesVotes).to.be.equal(0);
        expect(voteCount.noVotes).to.be.equal(2);
    });

    it("Proposal cannot be created with deadline in the past", async function () {
        await expect(ProposalContractFactory.deploy("/test-metdata.json", moment().subtract(1, 'days').unix())).to.be.reverted;
    });

    it("getVotes shows the current state of votes", async () => {
        await ProposalContract?.vote(0);
        await ProposalContract?.connect(accounts[1]).vote(1);
        await ProposalContract?.connect(accounts[2]).vote(1);
        await ProposalContract?.connect(accounts[3]).vote(1);
        await ProposalContract?.connect(accounts[4]).vote(1);

        const voteCount = await ProposalContract?.getVotes();

        expect(voteCount.yesVotes).to.be.equal(1);
        expect(voteCount.noVotes).to.be.equal(4);
    })
});