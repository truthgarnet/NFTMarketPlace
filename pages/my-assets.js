import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from 'web3modal';
import Image from "next/image";
import UserImage from "./images/user.png";

import {
   nftaddress, nftmarketaddress
} from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export default function MyAssets() {
   const [nfts, setNfts] = useState([])
   const [loadingState, setLoadingState] = useState('not-loaded')

   useEffect(() => {
      loadNFTs()
   }, [])
   

   async function loadNFTs() {
      // const webM3odal = new Web3Modal({
      //    network: "mainnet",
      //    cacheProvider: true,
      // })

      const web3Modal = new Web3Modal()

      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()

      const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
      const data = await marketContract.fetchMyNFTs()


      const address =  await window.ethereum.request({
         method: "eth_accounts",
       });
      const account = address[0];

      const items = await Promise.all(data.map(async i => {
         const tokenUri = await tokenContract.tokenURI(i.tokenId)
         const meta = await axios.get(tokenUri)
        
         let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
         let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
         }
         return item
      }))
      setAccounts(info)
      setNfts(items)
      setLoadingState('loaded')
   }


   if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl"></h1>)
   return (
      <div className="flex justify-center grid grid-rows-3 grid-flow-col gap-4">
         <div className="p-4">
            <div className="col-span-3 flex justify-center">
               <Image
                  src={UserImage}
                  width={200}
                  height={200}
               />
            </div>
            <div className="col-span-3 flex justify-center">
               
            </div>

            <div>
               <h3>소유한 도시</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                  {
                     nfts.map((nft, i) => (
                        <div key={i} className="border shadow rounded-xl overflow-hidden">

                           <Image
                              src={nft.image}
                              alt="Picture of the author"
                              className="rounded"
                              width={250}
                              height={300}
                           />
                           <div className="p-4 bg-black">
                              <p className="text-2xl font-bold text-white">{nft.price}</p>
                           </div>
                        </div>
                     ))
                  }
               </div>
               <div>
                  거래내역
               </div>
            </div>
         </div>
      </div>
   )

}