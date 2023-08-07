import React, { useState } from 'react'

const Main = ({ flowers, addToCart }) => {
  const [addedItem, setAddedItem] = useState(null)

  const handleAddToCart = (flower) => {
    if (!flower.bought) {
      addToCart(flower)
    }
  }

  // Filter out the flowers that have already been bought
  const availableFlowers = flowers.filter((flower) => !flower.bought)

  return (
    <div className="main">
      {availableFlowers.length === 0 ? (
        <p>
          Currently, there are no items in stock. Please come back again
          later...!!
          <img src="public/img/empty-cart.png"></img>
        </p>
      ) : (
        availableFlowers.map((flower) => (
          <div key={flower.id} className="flower-card">
            <img src={flower.flowerUrl} alt="Flower" />
            <span>Price: ${flower.price}</span>
            <button onClick={() => handleAddToCart(flower)}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  )
}

export default Main
