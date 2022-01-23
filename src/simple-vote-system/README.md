# Simple Voting System
This a simple project to learn Solidity with Hardhat. The project consist in only smart contract for now and I'll update later with a UI;

## Overview
The smart contract as its name stated if very simple starting point to learn some concepts especially how to test smart contracts and use Hardhat.js.

The contract holds a list of candidates with unique numbers set at creation and a end date. 
Anyone can vote until the blockchain reaches or passes the end date.
Each Vote is published on the blockchain in form of event.
When someone calls the `getResults()` function a summary of the candidates votes will be publish in form of `VotingResult` event with the candidate number and total of votes.


## Setup Project

### Install dependencies
The project uses `yarn`, so you will ahve to run the following command to install all dependencies:
```shell
yarn install
```

### Run Tests
The projects uses Hardhat.js.
To run tests use the following commands: 
```shell
npx hardhat test
```

### Coverage
```
-------------------------|----------|----------|----------|----------|----------------|
File                     |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------------------|----------|----------|----------|----------|----------------|
 contracts/              |      100 |       75 |      100 |      100 |                |
  SimpleVotingSystem.sol |      100 |       75 |      100 |      100 |                |
-------------------------|----------|----------|----------|----------|----------------|
All files                |      100 |       75 |      100 |      100 |                |
-------------------------|----------|----------|----------|----------|----------------|
```