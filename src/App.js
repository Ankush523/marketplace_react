import logo from './logo.svg';
import './App.css';
import {ethers} from "ethers";
import { useState } from 'react';

function App() {

  const[nft, setNFT] = useState({})
  const[marketplace,setMarketplace] = useState({})

  const web3Handler = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    loadContracts(signer)
  } 

  const loadContracts = async(signer) =>{
     const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
     setMarketplace(marketplace)
     const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
     setNFT(nft)
  }
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
