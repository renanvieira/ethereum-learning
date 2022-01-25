//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Proposal.sol";

contract VoteManager {
    struct ProposalData {
        address creator;
        address contractAddress;
        uint256 index;
        uint256 id;
        bool exists;
    }

    uint16 proposalsDeadLineInDays;

    Proposal[] proposals;
    mapping(uint256 => ProposalData) _proposalMap;

    event ProposalCreated(address id);

    constructor(uint16 proposalDeadLineInDays) {
        proposalsDeadLineInDays = proposalDeadLineInDays;
    }

    function createProposal(string memory metadata)
        external
        returns (uint256, address proposalAddress)
    {
        require(bytes(metadata).length > 0);
        uint256 deadlineTimestamp = block.timestamp +
            (proposalsDeadLineInDays * 1 days);

        Proposal newProposal = new Proposal(metadata, deadlineTimestamp);
        address newProposalAddress = address(newProposal);

        proposals.push(newProposal);

        uint256 proposalId = generateId(msg.sender, metadata);
        require(
            _proposalMap[proposalId].exists == false,
            "Proposal Already Exists"
        );

        _proposalMap[proposalId].id = generateId(msg.sender, metadata);
        _proposalMap[proposalId].index = proposals.length;
        _proposalMap[proposalId].creator = msg.sender;
        _proposalMap[proposalId].contractAddress = newProposalAddress;
        _proposalMap[proposalId].exists = true;

        emit ProposalCreated(newProposalAddress);

        return (proposalId, newProposalAddress);
    }

    function getProposal(uint256 id) external view returns (address) {
        require(id > 0);
        require(_proposalMap[id].exists, "The proposal request don't exists");
        return _proposalMap[id].contractAddress;
    }

    function generateId(address creator, string memory metadata)
        internal
        pure
        returns (uint256)
    {
        return uint256(keccak256(abi.encode(creator, metadata)));
    }
}
