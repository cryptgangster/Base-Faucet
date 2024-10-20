// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Faucet {
    address public owner;
    uint public dripAmount = 0.1 ether;
    mapping(address => uint) public lastDrip;

    constructor() {
        owner = msg.sender;
    }

    function requestTokens() public {
        require(block.timestamp - lastDrip[msg.sender] > 1 days, "Wait 24 hours");
        lastDrip[msg.sender] = block.timestamp;
        payable(msg.sender).transfer(dripAmount);
    }

    receive() external payable {}  // Contract can receive Ether
}
