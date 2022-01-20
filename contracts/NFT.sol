//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0 ;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage{
   //auto-increment field for each token
   //using for : using library function
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   //address of the NFT Market place
   //https://t.me/techjobsng

   address contractAddres; 

   constructor(address marketplaceAddress) ERC721("Partnerverse Tokens", "PNVT"){
      contractAddres = marketplaceAddress;
   }

   /// @notice create a new token
   /// @param tokenURI : token URI
   function createToken(string memory tokenURI) public returns(uint){
      //set a new token id for the token to be minted
      _tokenIds.increment();
      uint256 newItemId = _tokenIds.current();

      _mint(msg.sender, newItemId); //mint the token
      _setTokenURI(newItemId, tokenURI); //generate the URI
      setApprovalForAll(contractAddres, true); //grant transaction permission to marketplace

      //return token ID at web3
      return newItemId;
   }
}