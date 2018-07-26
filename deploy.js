
//will specifiy which account to unlock for us, what outside node we will connect to
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');


//args are account mnemonic on metamask account, URL to network we want to connect to (infura)
const provider = new HDWalletProvider(
  'razor edge ride comfort acoustic edit swarm bone audit cart pave wool',
  'https://rinkeby.infura.io/v3/75bc98b601a345c0b179e93e028c7e6c'

);
const web3 = new Web3(provider); //allows us to deploy contracts, read, write, send ether, etc

const deploy = async () => {
  const accounts = await web3.eth.getAccounts(); //mnemonic can generate many accounts
  console.log('Attempting to deploy FROM account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface)) //instance of contract
    .deploy({ data: '0x' + bytecode, arguments: ['first message'] })
    .send({from: accounts[0] });
    console.log('Contract deployed TO', result.options.address); //gives us who holds our deployed contract


};

deploy();

//node deploy.js
