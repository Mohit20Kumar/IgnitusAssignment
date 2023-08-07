import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Main from './Index'
import Cart from './Cart'
import flowers from './data'

function App() {
  const [cart, setCart] = useState([])
  const [flowersData, setFlowersData] = useState(flowers)

  // Function to add an item to the cart
  const addToCart = (flower) => {
    // Check if the flower is already in the cart
    const isFlowerInCart = cart.some((item) => item.id === flower.id)
    if (!isFlowerInCart) {
      setCart([...cart, flower])
    }
  }

  // Function to handle the "Buy" button click
  const buyItems = () => {
    // Update the 'bought' property for the flowers in the cart to true
    const updatedFlowersData = flowersData.map((flower) => {
      if (cart.some((cartItem) => cartItem.id === flower.id)) {
        return { ...flower, bought: true }
      }
      return flower
    })

    setFlowersData(updatedFlowersData)

    // Clear the cart after the purchase
    setCart([])
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar cartCount={cart.length} />
        <Routes>
          <Route
            path="/"
            element={<Main flowers={flowersData} addToCart={addToCart} />}
          ></Route>
          <Route
            path="/cart"
            element={<Cart cart={cart} buyItems={buyItems} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App
