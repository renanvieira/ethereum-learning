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

    Proposal[] public proposals;
    mapping(address => ProposalData) _proposalMap;
    mapping(uint256 => bool) _proposalIds;

    event ProposalCreated(
        address indexed owner,
        uint256 indexed proposalId,
        address indexed proposalAddress
    );

    constructor(uint16 proposalDeadLineInDays) {
        require(proposalDeadLineInDays > 0);
        proposalsDeadLineInDays = proposalDeadLineInDays;
    }

    function createProposal(string memory metadata)
        external
        payable
        returns (uint256, address)
    {
        require(msg.value == 1 ether);

        uint256 proposalId = generateId(msg.sender, metadata);
        require(bytes(metadata).length > 0);
        require(_proposalIds[proposalId] == false, "Proposal Already Exists");

        uint256 deadlineTimestamp = block.timestamp +
            (proposalsDeadLineInDays * 1 days);

        Proposal newProposal = (new Proposal){value: msg.value}(
            metadata,
            deadlineTimestamp,
            proposalId,
            msg.sender
        );

        address newProposalAddress = address(newProposal);
        _proposalIds[proposalId] = true;

        _proposalMap[newProposalAddress].id = proposalId;
        _proposalMap[newProposalAddress].index = proposals.length;
        _proposalMap[newProposalAddress].creator = msg.sender;
        _proposalMap[newProposalAddress].contractAddress = newProposalAddress;
        _proposalMap[newProposalAddress].exists = true;

        proposals.push(newProposal);

        emit ProposalCreated(msg.sender, proposalId, newProposalAddress);

        return (proposalId, newProposalAddress);
    }

    function getProposal(address id)
        external
        view
        returns (ProposalData memory)
    {
        require(id != address(0));
        require(_proposalMap[id].exists, "The proposal request don't exists");
        return _proposalMap[id];
    }

    function generateId(address creator, string memory metadata)
        internal
        pure
        returns (uint256)
    {
        return uint256(keccak256(abi.encode(creator, metadata)));
    }

    function getNumberOfProposals() external view returns (uint256) {
        return proposals.length;
    }
}
