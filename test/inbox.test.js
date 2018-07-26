const assert = require('assert');
const ganache = require('ganache-cli') //deploy to test network
const Initial_String = 'hi there'


//We3 is a constructor, creates instances of web3 library
//each instance is for a Ethereum network
const Web3 = require('web3')

//creates instance of web3, connects with ganache's provider
const provider = ganache.provider();
const web3 = new Web3(provider);

//compile file will output two things and put them into these vars
const {interface, bytecode} = require('../compile');

/*class Car {
  park(){
    return 'stopped';
  }

  drive(){
    return 'vroom';
  }


}
let car; //first is undefined

//runs before each it function
beforeEach(() => {
    const car = new Car(); //will give above car = new Car();
})

describe ('boi', () => { //'boi' is the name of our desscribe thing
  it('We are testing park func', () =>{ //first paramter is a descrption of what this 'it' is doing
    //  const car = new Car(); //creates instance of Car class
      assert.equal(car.park(), 'stopped'); //tests func and compares to send parameter 'stopped'
  } )

  it('testing the drive func' () => {

    //const car = new Car();
    assert.equal(car.park(), 'vroom');
  })

})*/
let accounts; //allows to be accessed outside of beforeEach scope
let inbox;

beforeEach(async () =>{
  //Get a list of all acounts
  accounts = await web3.eth.getAccounts(); //eth module(class) of web3 library, using getAccounts() function
     //.then(fetchedAccounts => {
    //  console.log(fetchedAccounts);

  //  });
  //Use on of those accounts to deploy contract, await keyword for async operations
  inbox = await new web3.eth.Contract(JSON.parse(interface)) //interface is abi
    .deploy({data: bytecode, arguments: ['hi there']}) //arguments are defined in the contact constructor using an array
    .send({from: accounts[0], gas: '1000000'}); //who sent it, amount of gas,
});

describe('Inbox', () => {
  it ('deploys a contract', () => {
      console.log(inbox); //prints out deployed contract
      assert.ok(inbox.options.address); //accessing the contract tabs, ok method ensures first argument is a defined value
  });
  it ("default message for contract creation", async () => { //default message when creating new contract
      const message = await inbox.methods.message().call(); //.call() is used for read-only operations
      assert.equal(message, Initial_String);
  });
  it ('Can change the message', async () =>{
    await inbox.methods.setMessage('bye').send({from: accounts[0]}); //for modifying contract, returns hash, uses gas from earlier
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
