import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "react";
import { useRouter } from "react/router";
import Web3Modal from 'web3modal';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import{
   nftaddress, nftmarketaddress
} from '../config';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export default function CreateItem() {
   const [fileUrl, setFileUrl] = useState(null);
   const [formInput, updateFormInput] = useState({price: '', name: '', descrption: ''});
   const router = useRouter();

   async function onChange(e) {
      const file = e.target.file[0]
      try{ //try uploading the file
         const added = await client.add(
            file,
            {
               progress: (prog) => console.log('received: ${prog}')
            }
         )
         //file saved in the url path below
         const url = 'https://ipfs.infura.io/ipfs/${added.path}'
         setFileUrl(url) 
      }catch(e) {
         console.log(e);
      }
   }

   //1. create item (image/video) and upload to ipfs
   async function createItem(){
      const {name, descrption, price} = formInput; //get the vaule from the form input

      if(!name || !descrption || !price || !fileUrl) return //form validation 
         const data = JSON.stringify({
            name, descrption, image: fileurl
         });

         try{
            const added = await client.add(data)
            const url = 'https://ipfs.infura.io/ipfs/${added.path}'
            //pass the url to save it on Polygon  it has been uploaded to IPFS
            createSale(url)
         }catch(err) {
            console.log('Error uploading file: ', err);
         }
   }
   //2. List item for sale
}