import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from 'web3modal';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import{
   nftaddress, nftmarketaddress
} from '../config';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import Image from 'next/image';

export default function AssetDetail() {
   const [fileUrl, setFileUrl] = useState(null);
   const [formInput, updateFormInput] = useState({price: '', name: '', descrption: ''});
   const router = useRouter();

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
      setNfts(items)
      setLoadingState('loaded')
   }
     
   }
   return (
      <div>
        <div className="p-4">
          <h2 className="text-2xl py-2 font-mono font-semibold">Items Created</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
              nfts.map((nft, i) => (
                <div key={i} className="border shadow rounded-xl overflow-hidden">
                 
  
                          <Image
                              src={nft.image}
                              alt="Picture of the author"
                              className="rounded"
                              width={400}
                              height={300} 
                              blurDataURL="data:..." automatically provided
                              placeholder="blur" // Optional blur-up while loading
                            />
  
                  <div className="p-4 bg-black">
                    <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
          <br/>
          <div className="px-4">
          <hr/>
          </div>
      </div>
    )
   
