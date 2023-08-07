import React from 'react'
import { Link } from 'react-router-dom'
import cart from './assets/img/cart-icon.png'
const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">
          FLOWERS ZONE
        </Link>
      </div>
      <div className="navbar-right">
        <div className="cart-icon">
          <Link to="/cart">
            <span className="cart-count">Cart: {cartCount}</span>
            <img src={cart} alt="Cart" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
