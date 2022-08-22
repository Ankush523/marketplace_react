import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import MarketplaceAbi from "../src/contracts/ABIs/Marketplace.json";
import MarketplaceAddress from "../src/contracts/Contract_Address/Marketplace-Address.json";
import NFTAbi from "../src/contracts/ABIs/NFT.json";
import NFTAddress from "../src/contracts/Contract_Address/NFTAddress.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateItem from "./components/CreateItem";
import ListedItems from "./components/ListedItems";
import PurchasedItems from "./components/PurchasedItems";
import GetContract from "./hooks/GetContract";


function App() {
  const [loading, setLoading] = useState(false);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [tip,setTip] = useState(0);



  
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          {loading ? (
            <label>Loading...</label>
          ) : (
            <Routes>
              <Route path="/" element={<Home/>} />
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
