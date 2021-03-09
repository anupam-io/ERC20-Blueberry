// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.6.2 <0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract myERC20 is ERC20{
    address mainMinter;
    constructor(
        string memory _name, 
        string memory _symbol,
        address _mainMinter
    ) ERC20(_name, _symbol){
        mainMinter = _mainMinter;
    }

    function mint(address account, uint amount) external{
        require(msg.sender == mainMinter);
        _mint(account, amount);
    }

    function burn(address account, uint amount)external{
        require(msg.sender == mainMinter);
        require(account == msg.sender);
        _burn(account, amount);
    }
}