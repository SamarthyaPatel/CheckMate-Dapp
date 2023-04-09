// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CheckMate {
    event ProductsOnBlockchain(uint256 index);

    struct User {
        uint256 userID;
        string name;
        string email;
        address wallet;
        string role;
        uint256 totalBelongings;
        uint256 totalMessages;
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

    struct Message {
        uint256 messageID;
        address to;
        address from;
        string message;
        string dateAndTime;
    }

    mapping(uint256 => User) Users;
    mapping(uint256 => Product) Products;
    mapping(uint256 => mapping(uint256 => State)) Locations;
    mapping(uint256 => mapping(uint256 => uint256)) Belongings;
    mapping(uint256 => Message) Mails;
    mapping(uint256 => uint256[]) ShipmentPartners;

    uint256 nthUser = 0; 
    uint256 nthItem = 0; 
    uint256 nthState = 0;
    uint256 nthMessage = 0;

    function addUser(string memory _name, string memory _email, string memory _role) public {
        User memory user = User({name: _name, email: _email, wallet: msg.sender, role: _role, userID: nthUser, totalBelongings: 0, totalMessages: 0});
        Users[nthUser] = user;
        nthUser ++;
    }

    function getUser() public view returns (User memory) {
        for(uint i = 0; i < nthUser; i ++) {
            if(Users[i].wallet == msg.sender) {
                return Users[i];
            }
        }
        User memory user;
        return user;
    }

    function updateUser(string memory _name, string memory _email) public {

        User memory user = getUser();

        require(keccak256(abi.encodePacked(user.name)) != keccak256(abi.encodePacked(_name)) || keccak256(abi.encodePacked(user.email)) != keccak256(abi.encodePacked(_email)));
        Users[user.userID].name = _name;
        Users[user.userID].email = _email;
    }

    //Adding new Product to the blockchain network
    function registerProduct(string memory _name, uint _batch, uint[] memory supplier) public {

        Product memory newProduct = Product({productID: nthItem, productName: _name, batchID: _batch, creator: msg.sender, totalStates: 0, owner: address(0x0), isOwned: false});

        //Adding the new Product to the network
        Products[nthItem] = newProduct;
        createShipment(nthItem, supplier);

        emit ProductsOnBlockchain(nthItem);
        //Increment the product counter
        nthItem = nthItem + 1;

        //Incrementing Manufacturer's total creations
        User memory creator = getUser();
        Users[creator.userID].totalBelongings += 1;
    }

    function createShipment(uint _productID, uint[] memory _supplier) public {

        ShipmentPartners[_productID] = _supplier;
        for(uint i = 0; i < _supplier.length; i++) {
            Users[_supplier[i]].totalBelongings += 1;
        }
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

        for(uint i = 0; i < nthItem; i ++) {
            for(uint j = 0; j < ShipmentPartners[i].length; j ++) {
                if(Users[ShipmentPartners[i][j]].wallet == supplier.wallet) {
                    allShipments[position] = getProduct(i);
                    position ++;
                }
            }
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

    function postMessage(address _to, string memory _message, string memory _dateTime) public {
        require(_to != msg.sender, "You can't send message to your own self.");
        Message memory mail = Message({messageID: nthMessage, to: _to, from: msg.sender, message: _message, dateAndTime: _dateTime});
        Mails[nthMessage] = mail;
        nthMessage ++;

        for(uint i = 0; i < nthUser; i ++) {
            if(Users[i].wallet == _to || Users[i].wallet == msg.sender) {
                Users[i].totalMessages ++;
            }
        }
    }

    function getMails() public view returns (Message[] memory) {
        User memory user = getUser();
        Message[] memory mails = new Message[](user.totalMessages);
        uint256 position = 0;
        for(uint256 i = 0; i < nthMessage; i ++) {
            if(Mails[i].to == user.wallet || Mails[i].from == user.wallet) {
                mails[position] = Mails[i];
                position++;
            }
        }
        return mails;
    }

    function alertProductOwners(uint256 _batchID, string memory _message, string memory _dateTime) public {
        for(uint256 i = 0; i < nthItem; i ++) {
            if(Products[i].isOwned && Products[i].batchID == _batchID) {
                postMessage(Products[i].owner, _message, _dateTime);
            }
        }
    }

    function getShipmentPartners(uint256 product) public view returns (User[] memory) {
        require(product < nthItem);
        User[] memory sp = new User[](ShipmentPartners[product].length);
        for(uint i = 0; i < ShipmentPartners[product].length; i ++) {
            sp[i] = Users[ShipmentPartners[product][i]];
        }
        return sp;
    }

    function addShipmentPartners(uint256 p, uint256[] memory sp) public {
        ShipmentPartners[p] = sp;
    }

}