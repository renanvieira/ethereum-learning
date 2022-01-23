const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const moment = require('moment');

describe("Simple Voting System contract", function () {

    let owner;
    let Contract;
    let currentBlockTimestamp;
    let nextDayBlockTimestamp;
    let candidates = [
        {
            "name": "Andrea Pirooz",
            "number": 1823
        },
        {
            "name": "Aleksandras Otto",
            "number": 9289
        },
        {
            "name": "Lal Janna",
            "number": 53631
        },
    ];


    before(async () => {
        owner = (await ethers.getSigners())[0];
        Contract = await ethers.getContractFactory("SimpleVotingSystem");
    });

    beforeEach(async () => {
        const currentBlock = await ethers.provider.getBlock();
        currentBlockTimestamp = moment(currentBlock.timestamp * 1000);
        nextDayBlockTimestamp = moment(currentBlock.timestamp * 1000).add(1, 'days');
    });

    afterEach(async () => {
        await network.provider.send("evm_mine");
    })

    it("Voting end date must be in the future", async function () {
        await expect(Contract.deploy(currentBlockTimestamp.add(-1, 'days').unix(), candidates)).to.be.revertedWith("End Date must be in the future");
    });

    it("Candidates has to be unique", async function () {
        const extraCandidate = { "name": "Joseph Doe", "number": 1823 };

        const newCandidateList = [...candidates, extraCandidate];
        await expect(Contract.deploy(nextDayBlockTimestamp.unix(), newCandidateList)).to.be.revertedWith("Duplicated candidate numbers found");
    });

    it("Anyone can vote before deadline", async () => {
        const candidate = candidates[0];
        const SimpleVotingContract = await Contract.deploy(nextDayBlockTimestamp.unix(), candidates);

        await expect(SimpleVotingContract.vote(candidate.number)).to.emit(SimpleVotingContract, "VoteReceived").withArgs(candidate.number, candidate.name, 1);
    });

    it("No one can vote after deadline", async () => {
        const candidate = candidates[0];
        const SimpleVotingContract = await Contract.deploy(nextDayBlockTimestamp.unix(), candidates);

        await network.provider.send("evm_increaseTime", [moment.duration(1, "day").asMilliseconds()]);
        await network.provider.send("evm_mine");

        await expect(SimpleVotingContract.vote(candidate.number)).to.be.revertedWith("Voting has already ended");
    });

    it("Candidate number has to exist in the contract to vote", async () => {
        const SimpleVotingContract = await Contract.deploy(nextDayBlockTimestamp.unix(), candidates);

        await expect(SimpleVotingContract.vote(999)).to.be.revertedWith("Candidate Number Should Exist in the contract");
    });

    it("Anyone should be able to get the results after the voting has ended", async () => {
        const SimpleVotingContract = await Contract.deploy(nextDayBlockTimestamp.unix(), candidates);

        const expectedVotes = {};
        expectedVotes[candidates[0].number] = 3;
        expectedVotes[candidates[1].number] = 1;
        expectedVotes[candidates[2].number] = 0;

        await Promise.all([
            SimpleVotingContract.vote(candidates[0].number),
            SimpleVotingContract.vote(candidates[0].number),
            SimpleVotingContract.vote(candidates[1].number),
            SimpleVotingContract.vote(candidates[0].number),
        ]);


        await network.provider.send("evm_increaseTime", [moment.duration(2, "day").asMilliseconds()]);
        await network.provider.send("evm_mine");


        Promise.all(
            candidates.map(async (r) => {
                try {
                    await expect(SimpleVotingContract.getResults()).to.emit(SimpleVotingContract, "VotingResult").withArgs(r.number, expectedVotes[r.number]);
                } catch (e) {
                    assert.fail(`error: ${e.message} | candidate: ${JSON.stringify(r)}`);
                }
            })
        );

    });
});
