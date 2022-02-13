//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TimeLock {
    struct Lock {
        address owner;
        uint256 expiration;
        uint256 amount;
    }

    Lock lockedResource;

    function lockETH(address user, uint256 expiration) internal {
        require(msg.value > 0);

        lockedResource.amount = msg.value;
        lockedResource.expiration = expiration;
        lockedResource.owner = user;
    }

    function withdraw() external {        
        require(block.timestamp >= lockedResource.expiration, 'TimeLock: Lock expiration not yet reached');
        require(lockedResource.owner == msg.sender, 'TimeLock: sender address is not the proposal creator');
        require(lockedResource.amount > 0, 'TimeLock: There is no ETH to withdraw' );

        Lock memory resources = lockedResource;
        delete lockedResource.amount;

        (bool success, ) = payable(msg.sender).call{value: resources.amount}(
            ""
        );
        require(success, "Failed to send Ether");
    }
}
