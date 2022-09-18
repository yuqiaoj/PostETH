// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Board {
    struct Note {
        string text;
        uint256 date;
    }

    Note[] private notes;

    function getNotes() public view returns (Note[] memory) {
        return notes;
    }

    function createNote(string calldata _text, uint256 _date) public {
        notes.push(Note(_text, _date));
    }
}
