pragma solidity 0.8.9;

contract SimpleVotingSystem {
    struct CandidateRegistration {
        uint16 number;
        string name;
    }

    CandidateRegistration[] public allCandidates;
    mapping(uint16 => string) _candidatesByNumber;
    mapping(uint16 => uint32) _candidateVotes;

    event VoteReceived(
        uint16 candidateNumber,
        string candidateName,
        uint32 votes
    );
    event VotingResult(uint16 candidateNumber, uint32 totalVotes);

    uint256 public endDate;

    constructor(uint256 voteEndDate, CandidateRegistration[] memory candidates)
    {
        require(block.timestamp < voteEndDate, "End Date must be in the future");
        require(candidates.length>0, "Need to send candidates");
        endDate = voteEndDate;

        for (uint256 index = 0; index < candidates.length; index++) {
            CandidateRegistration memory candidate = candidates[index];

            require(candidate.number > 0, "Candidate Number needs to be greater than 0");
            require(
                bytes(_candidatesByNumber[candidate.number]).length == 0,
                "Duplicated candidate numbers found"
            );
            require(
                bytes(candidate.name).length > 0,
                "Candidate Name cannot be null"
            );

            allCandidates.push(candidate);
            _candidatesByNumber[candidate.number] = candidate.name;
            _candidateVotes[candidate.number] = 0;
        }
    }

    function vote(uint16 candidateNumber) external {
        require(
            bytes(_candidatesByNumber[candidateNumber]).length > 0,
            "Candidate Number Should Exist in the contract"
        );
        require(block.timestamp <= endDate, "Voting has already ended");

        _candidateVotes[candidateNumber] += 1;

        emit VoteReceived(
            candidateNumber,
            _candidatesByNumber[candidateNumber],
            _candidateVotes[candidateNumber]
        );
    }

    function getResults() external {
        require(block.timestamp > endDate, "Voting still running");

        for (uint256 index = 0; index < allCandidates.length; index++) {
            CandidateRegistration memory candidate = allCandidates[index];
            uint32 votes = _candidateVotes[candidate.number];

            emit VotingResult(candidate.number, votes);
        }
    }
}
