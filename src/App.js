import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";
import MarketplaceAbi from "../src/contracts/ABIs/Marketplace.json";
import MarketplaceAddress from "../src/contracts/Contract_Address/Marketplace-Address.json";
import NFTAbi from "../src/contracts/ABIs/NFT.json";
import NFTAddress from "../src/contracts/Contract_Address/NFTAddress.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateItem from "./components/CreateItem";
import ListedItems from "./components/ListedItems";
import PurchasedItems from "./components/PurchasedItems";


function App() {
  const [loading, setLoading] = useState(true);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [tip,setTip] = useState(0);

  const web3Handler = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          {loading ? (
            <label>Loading...</label>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateItem />} />
              <Route path="/listed-items" element={<ListedItems />} />
              <Route path="/purchased-items" element={<PurchasedItems />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
