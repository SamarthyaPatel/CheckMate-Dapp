// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CheckMate {
    event Added(uint256 index);

    struct State {
        string location;
        address party;
        string dateAndTime;
    }

    struct Product {
        uint256 productID;
        string productName;
        uint256 batchID;
        address creator;
        uint256 totalStates;
        address owner;
    }

    mapping (uint256 => mapping(uint256 => State)) locations;

    mapping(uint256 => Product) allProducts;

    uint256 nthItem = 0; //For productID

    //Adding new Product to the blockchain network
    function registerProduct(string memory _name, uint _batch) public returns (bool) {
        
        address ideal;
        
        Product memory newProduct = Product({productID: nthItem, productName: _name, batchID: _batch, creator: msg.sender, totalStates: 0, owner: ideal});

        //Adding the new Product to the network
        allProducts[nthItem] = newProduct;

        //Increment the product counter
        nthItem = nthItem + 1;
        emit Added(nthItem-1);

        return true;
    }

    function addInterLocation(uint256 _productID, string memory _location, string memory _dateTime) public returns (string memory) {
        require(_productID<=nthItem);

        uint state_number = allProducts[_productID].totalStates;
        State memory newState;

        newState.party =  msg.sender;
        newState.location = _location;
        newState.dateAndTime = _dateTime;

        locations[_productID][state_number] = newState;

        allProducts[_productID].totalStates = allProducts[_productID].totalStates + 1;
        
        return string("New state is added.");
    }

    function fetchStates(uint _productID) public view returns (State[] memory) {

        State[] memory states = new State[](allProducts[_productID].totalStates);

        for (uint i = 0; i < allProducts[_productID].totalStates; i++) {
            states[i] = locations[_productID][i];
        }

        return states;
    }

    function getNumber() public view returns (uint256) {
        return nthItem;
    }

    function getProduct(uint _productID) public view returns (Product memory) {
        return allProducts[_productID];
    }
}