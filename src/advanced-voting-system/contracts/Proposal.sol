//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Proposal {

    string public metadata;
    uint public proposalDeadline;

    mapping(address => bool) _votes;

    constructor(string memory metadataURL, uint deadline){
        metadata = metadataURL;
        proposalDeadline = deadline;
    }

    function vote() external {
        
    }

}
