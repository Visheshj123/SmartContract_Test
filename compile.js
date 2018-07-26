//import statements for js
const path = require ('path'); //terminal path from this file to inbox.sol file
const fs = require ('fs'); //filesystem
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol'); //will take you to SolidityProj folder

//read in contents of contract, inbox.sol
const source = fs.readFileSync(inboxPath, 'utf8');

//sourcecode and number of files needed to compile, print to terminal
            //console.log(solc.compile(source, 1));

//exports object for other files to use
module.exports = solc.compile(source, 1).contracts[':Inbox']; //'Inbox' is name of contract in .sol file
