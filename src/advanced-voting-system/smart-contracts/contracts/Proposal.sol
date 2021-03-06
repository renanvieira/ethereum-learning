//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./utils/TimeLock.sol";

contract Proposal is TimeLock {
    enum Vote {
        YEA,
        NAY
    }

    struct VoteResult {
        uint256 yesVotes;
        uint256 noVotes;
    }

    string public metadata;
    uint256 public proposalDeadline;
    uint256 public id;

    mapping(address => bool) _addressVoted;
    address[] public _noVotes;
    address[] public _yesVotes;

    event Voted(address indexed voter, address indexed proposal);

    constructor(
        string memory metadataURL,
        uint256 deadline,
        uint256 _id,
        address creator
    ) payable {
        require(block.timestamp < deadline, "Invalid deadline timestamp");
        require(creator != address(0), "Invalid creator address");
        require(msg.value > 0, "Missing ETH");

        id = _id;
        metadata = metadataURL;
        proposalDeadline = deadline;

        lockETH(creator, proposalDeadline);
    }

    function vote(Vote userVote) external {
        require(
            _addressVoted[msg.sender] == false,
            "This address already voted"
        );
        require(block.timestamp <= proposalDeadline, "Proposal expired");

        _addressVoted[msg.sender] = true;
        if (userVote == Vote.YEA) {
            _yesVotes.push(msg.sender);
        } else {
            _noVotes.push(msg.sender);
        }

        emit Voted(msg.sender, address(this));
    }

    function getVotes()
        external
        view
        returns (uint256 yesVotes, uint256 noVotes)
    {
        return (_yesVotes.length, _noVotes.length);
    }
}
