import React from 'react'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Cart = ({ cart, buyItems }) => {
  const navigate = useNavigate()
  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0)

  return (
    <div className="cart">
      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          <h2>Your Cart</h2>
          <div className="my_cart_img">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.flowerUrl} alt="Flower" />
                <span>Price: ${item.price}</span>
              </div>
            ))}
          </div>
          <p>Total Price: ${totalPrice}</p>
          <button
            onClick={() => {
              buyItems()
              alert('Buy Successful!')
              navigate('/')
            }}
          >
            Buy
          </button>
        </>
      )}
    </div>
  )
}

export default Cart
