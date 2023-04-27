const CheckMateSmartContract = artifacts.require("CheckMate");

contract('CheckMate', () => {
  it('should equal to added product\'s name', async() => {
    const CheckMate = await CheckMateSmartContract.deployed();

    await CheckMate.addUser("Apple", "apple.email", "manufacturer");
    await CheckMate.registerProduct("iPhone", "1", [1]);

    const product = (await CheckMate.getProduct(0)).productName;

    assert.equal(product, "iPhone", "This function should pass.");
  });

  it('should not equal to added product\'s name', async() => {
    const CheckMate = await CheckMateSmartContract.deployed();

    await CheckMate.addUser("Apple", "apple.email", "manufacturer");
    await CheckMate.registerProduct("iPhone", "1", [1]);

    const product = (await CheckMate.getProduct(0)).productName;

    assert.notEqual(product, "iPad", "This function should pass.");
  });

  it('should equal to entered message', async() => {
    const CheckMate = await CheckMateSmartContract.deployed();

    await CheckMate.addUser("Person A", "person.email", "consumer");
    await CheckMate.postMessage("0x05d113d1742de83d4921e9a649c7f94970babc5c", "Message from person A to person B", "April 2023");

    const message = (await CheckMate.getMails())[0].message;

    assert.equal(message, "Message from person A to person B", "This function should pass.");
  });

  it('should not equal to the entered message', async() => {
    const CheckMate = await CheckMateSmartContract.deployed();

    await CheckMate.addUser("Person A", "person.email", "consumer");
    await CheckMate.postMessage("0x05d113d1742de83d4921e9a649c7f94970babc5c", "Message from person A to person B", "April 2023");

    const message = (await CheckMate.getMails())[0].message;

    assert.notEqual(message, "Message from person B to person A", "This function should pass.");
  });
});
