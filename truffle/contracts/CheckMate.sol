// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CheckMate {
    event Added(uint256 index);

    struct User {
        uint256 userID;
        string name;
        string email;
        address wallet;
        string role;
        uint256 totalBelongings;
    }

    struct Product {
        uint256 productID;
        string productName;
        uint256 batchID;
        address creator;
        uint256 totalStates;
        address owner;
        bool isOwned;
    }

    struct State {
        uint256 stateID;
        string location;
        address party;
        bool status;
        string dateAndTime;
    }

    mapping(uint256 => User) Users;
    mapping(uint256 => Product) Products;
    mapping (uint256 => mapping(uint256 => State)) Locations;
    mapping(uint256 => mapping(uint256 => uint256)) Belongings;
    mapping(uint256 => mapping(uint256 => uint256)) Shipments; 

    uint256 nthUser = 0; //For userID
    uint256 nthItem = 0; //For productID
    uint256 nthState = 0; //For Locations
    uint256 nthShipment = 0; //For Shipments

    function addUser(string memory _name, string memory _email, string memory _role) public {
        User memory user = User({name: _name, email: _email, wallet: msg.sender, role: _role, userID: nthUser, totalBelongings: 0});
        Users[nthUser] = user;
        nthUser ++;
    }

    function getUser() public view returns (User memory) {
        require(nthUser > 0, "No one is registered on the network.");
        for(uint i = 0; i < nthUser; i ++) {
            if(Users[i].wallet == msg.sender) {
                return Users[i];
            }
        }
    }

    function updateUser(string memory _name, string memory _email) public {

        User memory user = getUser();

        require(keccak256(abi.encodePacked(user.name)) != keccak256(abi.encodePacked(_name)) || keccak256(abi.encodePacked(user.email)) != keccak256(abi.encodePacked(_email)));
        Users[user.userID].name = _name;
        Users[user.userID].email = _email;
    }

    //Adding new Product to the blockchain network
    function registerProduct(string memory _name, uint _batch, uint[] memory supplier) public {

        address ideal;
        
        Product memory newProduct = Product({productID: nthItem, productName: _name, batchID: _batch, creator: msg.sender, totalStates: 0, owner: ideal, isOwned: false});

        //Adding the new Product to the network
        Products[nthItem] = newProduct;
        createShipment(nthItem, supplier);

        //Increment the product counter
        nthItem = nthItem + 1;
        emit Added(nthItem-1);

        //Incrementing Manufacturer's total creations
        User memory creator = getUser();
        Users[creator.userID].totalBelongings += 1;
    }

    function createShipment(uint _productID, uint[] memory _supplier) public {
        for(uint i = 0; i < _supplier.length; i++) {
            Shipments[nthShipment][_supplier[i]] = _productID;
            Users[_supplier[i]].totalBelongings += 1;
        }
        nthShipment ++;
    }

    function getSuppliers() public view returns (User[] memory) {
        
        uint size = 0;
        for(uint i = 0; i < nthUser; i ++) {
            if(keccak256(abi.encodePacked((Users[i].role))) == keccak256(abi.encodePacked(("supplier")))) {
                size ++;
            }
        }
        User[] memory suppliers = new User[](size);
        uint position = 0;
        for(uint i = 0; i < nthUser; i ++) {
            if(keccak256(abi.encodePacked((Users[i].role))) == keccak256(abi.encodePacked(("supplier")))) {
                suppliers[position] = Users[i];
                position ++;
            }
        }
        return suppliers;
    }

    function addInterLocation(uint256 _productID, string memory _location, string memory _dateTime) public {
        require(_productID <= nthItem);

        uint state_number = Products[_productID].totalStates;

        State memory state = State({stateID: nthState, party: msg.sender, location: _location, status: true, dateAndTime: _dateTime});

        Locations[_productID][state_number] = state;
        Products[_productID].totalStates = Products[_productID].totalStates + 1;

        nthState ++;
    }

    function fetchStates(uint _productID) public view returns (State[] memory) {

        uint size = Products[_productID].totalStates;

        State[] memory states = new State[](size);
        for (uint i = 0; i < size; i++) {
            states[i] = Locations[_productID][i];
        }
        return states;
    }

    function addToBelongings(uint _productID) public {

        User memory user = getUser();

        Belongings[user.userID][user.totalBelongings] = _productID;

        Users[user.userID].totalBelongings += 1;

        Products[_productID].owner = user.wallet;
        Products[_productID].isOwned = true;

    }

    function getProduct(uint _productID) public view returns (Product memory) {
        require(_productID < nthItem, "Product doesn't exist on the network.");
        return Products[_productID];
    }

    //For Consumer
    function getBelongings() public view returns (Product[] memory) {
        
        User memory consumer = getUser();
        uint size = consumer.totalBelongings;

        Product[] memory collection = new Product[](size);

        for(uint i = 0; i < size; i ++) {
            uint productID = Belongings[consumer.userID][i];
            collection[i] = getProduct(productID);
        }
        return collection;
    }

    //For Manufacturer
    function getCreatedProducts() public view returns(Product[] memory) {

        uint size = getUser().totalBelongings;
        uint counter = 0;

        Product[] memory products = new Product[](size);

        for(uint i = 0; i < nthItem; i ++) {
            if(Products[i].creator == msg.sender) {
                products[counter] = getProduct(i);
                counter++;
            }
        }
        return products;
    }

    //For Supplier
    function getShipments() public view returns(Product[] memory) {

        User memory supplier = getUser();

        Product[] memory allShipments = new Product[](supplier.totalBelongings);
        uint position = 0;

        for(uint i = 0; i < nthShipment; i ++) {
            allShipments[position] = getProduct(Shipments[i][supplier.userID]);
            position ++;
        }
        return allShipments;

    }

    //List of products to display
    function getAvailableProducts() public view returns(Product[] memory) {

        uint size = 0;
        for(uint i = 0; i < nthItem; i ++) {
            if(Products[i].isOwned == false) {
                size++;
            }
        }
        
        Product[] memory products = new Product[](size);
        uint position = 0;

        for(uint i = 0; i < nthItem; i ++) {
            if(Products[i].isOwned == false) {
                products[position] = getProduct(i);
                position++;
            }
        }
        return products;
    }
}