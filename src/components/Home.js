import { useState, useEffect } from 'react'
import { ethers } from "ethers"

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <div>
      <h2>Loading...</h2>
    </div>
  )
  return (
    <div className="">
      {items.length > 0 ?
        <div className="">
          <div className="">
            {items.map((item, idx) => (
              <div key={idx} className="">
                <div>
                  <img src={item.image} alt={item.name}/>
                  <div>
                    <h1>{item.name}</h1>
                    <p>
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <div className=''>
                      <button onClick={() => buyMarketItem(item)}>
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );
}
export default Home