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
        string dateAndTime;
    }

    mapping(uint256 => User) Users;

    mapping (uint256 => mapping(uint256 => State)) locations;

    mapping(uint256 => Product) allProducts;

    mapping(uint256 => mapping(uint256 => uint256)) belongings;

    mapping(uint256 => mapping(uint256 => uint256)) shipments; 

    uint256 nthUser = 0; //For userID

    uint256 nthItem = 0; //For productID
    
    uint256 nthState = 0;
    
    uint256 nthShipment = 0;

    function addUser(string memory _name, string memory _email, string memory _role) public returns (bool) {
        User memory user = User({name: _name, email: _email, wallet: msg.sender, role: _role, userID: nthUser, totalBelongings: 0});
        Users[nthUser] = user;
        nthUser ++;
        return true;
    }

    function getUser() public view returns (User memory) {
        for(uint i = 0; i < nthUser; i ++) {
            if(Users[i].wallet == msg.sender) {
                return Users[i];
            }
        }
    }

    function checkUser() public view returns (string memory) {
        for(uint i = 0; i < nthUser; i ++) {
            if(Users[i].wallet == msg.sender) {
                return Users[i].role;
            }
        }
        return "false";
    }

    function updateUser(string memory _name, string memory _email) public {
        for(uint i = 0; i < nthUser; i ++) {
            if(Users[i].wallet == msg.sender) {
                Users[i].name = _name;
                Users[i].email = _email;
                break;
            }
        }
    }

    //Adding new Product to the blockchain network
    function registerProduct(string memory _name, uint _batch, uint[] memory supplier) public returns (bool) {
        
        address ideal;
        
        Product memory newProduct = Product({productID: nthItem, productName: _name, batchID: _batch, creator: msg.sender, totalStates: 0, owner: ideal, isOwned: false});

        //Adding the new Product to the network
        allProducts[nthItem] = newProduct;
        addSupplier(nthItem, supplier);

        //Increment the product counter
        nthItem = nthItem + 1;
        emit Added(nthItem-1);

        return true;
    }

    function addSupplier(uint _productID, uint[] memory _supplier) public {
        for(uint i = 0; i < _supplier.length; i++) {
            shipments[nthShipment][i] = _productID;
            Users[i].totalBelongings += 1;
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

        User[] memory users = new User[](size);
        uint position = 0;
        for(uint i = 0; i < nthUser; i ++) {
            if(keccak256(abi.encodePacked((Users[i].role))) == keccak256(abi.encodePacked(("supplier")))) {
                users[position] = Users[i];
                position ++;
            }
        }

        return users;
    }

    function addInterLocation(uint256 _productID, string memory _location, string memory _dateTime) public returns (string memory) {
        require(_productID<=nthItem);

        uint state_number = allProducts[_productID].totalStates;
        State memory newState;

        newState.stateID = nthState;
        newState.party =  msg.sender;
        newState.location = _location;
        newState.dateAndTime = _dateTime;

        locations[_productID][state_number] = newState;

        allProducts[_productID].totalStates = allProducts[_productID].totalStates + 1;

        nthState ++;
        
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

    function addToBelongings(uint _productID) public {

        User memory user = getUser();

        belongings[user.userID][user.totalBelongings] = _productID;

        Users[user.userID].totalBelongings += 1;

        allProducts[_productID].owner = user.wallet;
        allProducts[_productID].isOwned = true;

    }

    //For Consumers
    function getBelongings() public view returns (Product[] memory) {
        
        User memory user = getUser();

        uint belonging = user.totalBelongings;

        Product[] memory list_of_belongings = new Product[](belonging);

        for(uint i = 0; i < belonging; i ++) {
            uint productID = belongings[user.userID][i];

            list_of_belongings[i] = getProduct(productID);
        }

        return list_of_belongings;
    }

    //For Manufacturer
    function getCreatedProducts() public view returns(Product[] memory) {

        uint size = 0;
        uint counter = 0;

        for(uint i = 0; i < nthItem; i ++) {
            if(allProducts[i].creator == msg.sender) {
                size ++;
            }
        }

        Product[] memory list_of_products = new Product[](size);

        for(uint i = 0; i < nthItem; i ++) {
            if(allProducts[i].creator == msg.sender) {
                list_of_products[counter] = getProduct(i);
                counter++;
            }
        }

        return list_of_products;
    }

    function getShipments() public view returns(Product[] memory) {

        User memory user = getUser();

        Product[] memory products = new Product[](user.totalBelongings);
        uint position = 0;

        for(uint i = 0; i < nthShipment; i ++) {
                products[position] = getProduct(shipments[i][user.userID]);
                position ++;
        }

        return products;

    }

    //List of products to display
    function getAllProducts() public view returns(Product[] memory) {
        
        Product[] memory list_of_products = new Product[](nthItem);

        uint counter = 0;

        for(uint i = 0; i < nthItem; i ++) {
            if(allProducts[i].isOwned == false) {
                list_of_products[counter] = getProduct(i);
                counter++;
            }
        }

        return list_of_products;
    }
}