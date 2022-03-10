// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SimpleStorage{
    /**
     * var `_store` stores the value 
     */
    uint private _store;

    /**
     * getStoreValue
     * @return uint `_store` value
     */
    function getStoreValue() external view returns(uint){
        return _store;
    }

    /**
     * setStoreValue sets the `_value` to `_store`
     */
    function setStoreValue(uint _value) external {
        _store = _value;
    }
}