import React from 'react'
import { Link } from 'react-router-dom'

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
            <img src="../public/img/cart-icon.png" alt="Cart" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
