// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.6.2 <0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract myERC20 is ERC20{
    constructor(
        string memory _name, 
        string memory _symbol
    ) ERC20(_name, _symbol){
    }

    function mint(address to, uint amount) external {
        _mint(to, amount);
    }
}