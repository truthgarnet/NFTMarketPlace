import Image from 'next/image'
import { useState, useEffect } from "react";
import Web3Modal from 'web3modal';
import { ethers } from "ethers";
import axios from 'axios'

import{
  nftaddress, nftmarketaddress
} from '../config';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export default function WorldMap() {

   const [nfts, setNfts] = useState([])
   const [sold, setSold] = useState([])
   const [loadingState, setLoadingState] = useState('not-loaded')
   useEffect(() => {
     loadNFTs()
   }, [])
   
   async function loadNFTs() {
      const web3Modal = new Web3Modal(
          {
        network: "mainnet",
        cacheProvider: true,
      }
      )
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
        
      const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
      const data = await marketContract.fetchItemsCreated()
    
      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
          cityName: meta.data.cityName
        }
        return item
      }))
      /* create a filtered array of items that have been sold */
      const soldItems = items.filter(i => i.sold)
      setSold(soldItems)
      setNfts(items)
      setLoadingState('loaded')
    }

   async function buyNft(nft) {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      console.log(signer);
      const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
      const cityName = nft.cityName

      
      const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
        value: price
      })
  
      let tx = await transaction.wait();
      await transaction.wait()
      loadNFTs(tx)
    }

   return (

      <div className='grid grid-cols-3 grid-flow-col'>
         <div className='col-span-2'>
            
         </div>
         {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <div className="p-4 bg-black">
                  <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
                  <p className="text-2xl mb-4 font-bold text-white">{nft.cityName}</p>
                  <button className="w-full bg-orange-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
              </div>
            ))
          }

      </div>
   );
}

