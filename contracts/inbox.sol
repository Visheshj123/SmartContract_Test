pragma solidity ^0.4.22; //version of solidity we are writing

contract Inbox{
    string public message;

    constructor(string intialMessage) public {
        message = intialMessage;
    }

    //setter
    function setMessage(string newMessage) public{
        message = newMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }

}
