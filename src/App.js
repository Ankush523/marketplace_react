import logo from './logo.svg';
import './App.css';
import {ethers} from "ethers";
import { useState } from 'react';
import MarketplaceAbi from '../src/contracts/ABIs/Marketplace.json'
import MarketplaceAddress from '../src/contracts/Contract_Address/Marketplace-Address.json'
import NFTAbi from '../src/contracts/ABIs/NFT.json'
import NFTAddress from '../src/contracts/Contract_Address/NFTAddress.json'
import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
  const[loading, setLoading] = useState(true)
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
     setLoading(false)
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/create" element={<VoterDetails/>}/>
        <Route path="/listed-items" element={<CandidateDetails/>}/>
        <Route path="/purchased-items" element={<CandidateList/>} />
      </Routes>
      </BrowserRouter>     
    </div>
  );
}

export default App;
