import { ethers, network } from "hardhat";
import { BigNumber, Contract, ContractFactory, Overrides, PayableOverrides, Signer } from "ethers";
import moment from 'moment';
import { expect } from 'chai';
import { getEmitHelpers } from "typescript";

describe("Proposal contract", function () {
    let accounts: Signer[];
    let VoteManagerContractFactory: ContractFactory;
    let ProposalContractFactory: ContractFactory;
    let proposalAddress: string;
    let createProposalReceipt;
    let ProposalContract: Contract | null;
    let VoteManagerContract: Contract | null;
    let currentBlockTimestamp: moment.Moment;
    let proposalId: BigNumber;
    let overrides: PayableOverrides;

    before(async () => {
        VoteManagerContractFactory = await ethers.getContractFactory("VoteManager");
        ProposalContractFactory = await ethers.getContractFactory("Proposal");
    });

    beforeEach(async function () {
        overrides = { value: ethers.utils.parseEther("1.0") };

        accounts = await ethers.getSigners();
        const currentBlock = await ethers.provider.getBlock('latest');
        currentBlockTimestamp = moment.unix(currentBlock.timestamp * 1000);

        VoteManagerContract = await VoteManagerContractFactory.deploy(1); // 1 day to expire proposal

        const proposalMetadata = `/test-${moment().unix()}.json`;
        [proposalId, proposalAddress] = await VoteManagerContract.callStatic.createProposal(proposalMetadata, overrides);

        createProposalReceipt = await VoteManagerContract.createProposal(proposalMetadata, overrides);

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
        const ownerAddress = await accounts[0].getAddress();
        await expect(ProposalContractFactory.deploy("/test-metdata.json", moment().subtract(1, 'days').unix(), 1, ownerAddress, overrides)).to.be.revertedWith("Invalid deadline timestamp");
    });

    it("Proposal cannot be created without eth contribution", async function () {
        const ownerAddress = await accounts[0].getAddress();
        await expect(ProposalContractFactory.deploy("/test-metdata-2.json", moment().add(10, 'days').unix(), 1, ownerAddress)).to.be.revertedWith("Missing ETH");
    });

    it("Proposal cannot be created with an invalid creator address", async function () {
        const zeroAddress = ethers.constants.AddressZero;
        await expect(ProposalContractFactory.deploy("/test-metdata-2.json", moment().add(10, 'days').unix(), 1, zeroAddress)).to.be.revertedWith("Invalid creator address");
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
    });


    it("Locked ETH withdrawn successfully", async () => {
        const proposalMetadata = `/test-${moment().unix()}-2.json`;
        const [proposalId, proposalAddress] = await VoteManagerContract.callStatic.createProposal(proposalMetadata, overrides);

        const createProposalReceipt = await VoteManagerContract.createProposal(proposalMetadata, overrides);
        await createProposalReceipt.wait();

        const Proposal = ProposalContract.attach(proposalAddress);
        const proposalDeadline = (await Proposal.proposalDeadline());

        await network.provider.send("evm_setNextBlockTimestamp", [moment.unix(proposalDeadline).add(1, 'hours').unix()]);
        await network.provider.send("evm_mine", []);

        const withdrawReceipt = await Proposal.withdraw();

        await expect(withdrawReceipt).to.changeEtherBalance(accounts[0], ethers.utils.parseEther('1'));
        await expect(withdrawReceipt).to.changeEtherBalance(await ethers.getSigner(proposalAddress), ethers.utils.parseEther('-1'));
    });

    it("Locked ETH can only be withdrawn by the proposal creator", async () => {
        const proposalMetadata = `/test-${moment().unix()}-2.json`;
        const [proposalId, proposalAddress] = await VoteManagerContract.callStatic.createProposal(proposalMetadata, overrides);

        const createProposalReceipt = await VoteManagerContract.createProposal(proposalMetadata, overrides);
        await createProposalReceipt.wait();

        const Proposal = ProposalContract.attach(proposalAddress);
        const proposalDeadline = (await Proposal.proposalDeadline());

        await network.provider.send("evm_setNextBlockTimestamp", [moment.unix(proposalDeadline).add(1, 'hours').unix()]);
        await network.provider.send("evm_mine", []);

        await expect(Proposal.connect(accounts[1]).withdraw()).to.be.revertedWith("TimeLock: sender address is not the proposal creator");
    });

    it("Locked ETH can only be withdrawn after the proposal deadline is reached", async () => {
        const proposalMetadata = `/test-${moment().unix()}-2.json`;
        const [proposalId, proposalAddress] = await VoteManagerContract.callStatic.createProposal(proposalMetadata, overrides);

        const createProposalReceipt = await VoteManagerContract.createProposal(proposalMetadata, overrides);
        await createProposalReceipt.wait();

        const Proposal = ProposalContract.attach(proposalAddress);
        const proposalDeadline = (await Proposal.proposalDeadline());

        await expect(Proposal.connect(accounts[1]).withdraw()).to.be.revertedWith("TimeLock: Lock expiration not yet reached");
    });

    it("Locked ETH can only be withdrawn if there is balance locked", async () => {
        const proposalMetadata = `/test-${moment().unix()}-2.json`;
        const [proposalId, proposalAddress] = await VoteManagerContract.callStatic.createProposal(proposalMetadata, overrides);

        const createProposalReceipt = await VoteManagerContract.createProposal(proposalMetadata, overrides);
        await createProposalReceipt.wait();

        const Proposal = ProposalContract.attach(proposalAddress);
        const proposalDeadline = (await Proposal.proposalDeadline());

        await network.provider.send("evm_setNextBlockTimestamp", [moment.unix(proposalDeadline).add(1, 'hours').unix()]);
        await network.provider.send("evm_mine", []);
        
        const withdrawReceipt = await Proposal.withdraw();

        expect(await (await ethers.getSigner(proposalAddress)).getBalance()).to.be.deep.equal(BigNumber.from('0'));

        await expect(Proposal.withdraw()).to.be.revertedWith("TimeLock: There is no ETH to withdraw");
    });
});
