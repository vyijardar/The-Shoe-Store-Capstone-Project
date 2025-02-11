import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/icomoon.css";
import "../css/ionicons.min.css"; // Correct import path for ionicons.min.css
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faSignInAlt, faUserPlus, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../context/CartContext";
import logo from "../assets/logo1.png";


export default function Navigations({ token, setToken, setisLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useContext(CartContext);
  const isActive = (path) => location.pathname === path;

  const logout = () => {
    localStorage.removeItem("token");
    setisLoggedIn(false);
    setToken(null);
    navigate("/login");
  };
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Fix: Ensure proper encoding
    }
};

  return (
    <nav className="colorlib-nav" role="navigation">
      <div className="top-header ">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 text-center">
            <h3>Free Express Shipping on all orders with all duties included</h3>
          </div>
        </div>
      </div>
      {/* Top Menu */}
      <div className="top-menu">
        <div className="container">
          <div className="row">
            {/* Logo Section */}
            <div className="col-sm-7 col-md-9">
              <div id="colorlib-logo">
                <Link to="/">
                  <img src={logo} alt="Shoe Store" width="200" height="70" />
                </Link>
              </div>
            </div>
            {/* Search Section */}
            <div className="col-sm-5 col-md-3">
              <form onSubmit={handleSearch} className="search-wrap">
                <div className="form-group">
                  <input className="form-control search" type="search" placeholder="Search"  onChange={(e) => setSearchQuery(e.target.value)} />
                  <button className="btn btn-primary submit-search text-center" type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Menu Items */}
          <div className="row">
            <div className="col-sm-12 text-left menu-1">
              {token ? (
                <ul>
                  <li className={isActive('/') ? 'active' : ''}>
                    <Link to="/">Home</Link>
                  </li>
                  <li className={isActive('/men') ? 'active' : ''}>
                    <Link to="/men">Men</Link>
                  </li>
                  <li className={isActive('/women') ? 'active' : ''}>
                    <Link to="/women">Women</Link>
                  </li>
                  <li className={isActive('/about') ? 'active' : ''}>
                    <Link to="/about">About</Link>
                  </li>
                  <li className={isActive('/contact') ? 'active' : ''}>
                    <Link to="/contact">Contact</Link>
                  </li>

                  {/* Cart & Account Links */}
                  <li className={isActive('/cart') ? 'active cart' : 'cart'}>
                    <Link to="/cart">
                      <FontAwesomeIcon icon={faShoppingCart} /> Cart [{totalItems}]
                    </Link>
                  </li>
                  <li className={isActive('/account') ? 'active cart' : 'cart'}>
                    <Link to="/account">
                      <FontAwesomeIcon icon={faUser} /> Account
                    </Link>
                  </li>
                  <li>
                    <button className="btn btn-danger cart" onClick={logout}>  <FontAwesomeIcon icon={faSignOutAlt} /> Logout</button>

                  </li>
                </ul>
              ) : (
                <ul>
                  <li className={isActive('/') ? 'active' : ''}>
                    <Link to="/">Home</Link>
                  </li>
                  <li className={isActive('/men') ? 'active' : ''}>
                    <Link to="/men">Men</Link>
                  </li>
                  <li className={isActive('/women') ? 'active' : ''}>
                    <Link to="/women">Women</Link>
                  </li>
                  <li className={isActive('/about') ? 'active' : ''}>
                    <Link to="/about">About</Link>
                  </li>
                  <li className={isActive('/contact') ? 'active' : ''}>
                    <Link to="/contact">Contact</Link>
                  </li>

                  {/* Cart & Account Links */}
                  <li className={isActive('/cart') ? 'active cart' : 'cart'}>
                    <Link to="/cart">
                      <FontAwesomeIcon icon={faShoppingCart} /> Cart [{totalItems}]
                    </Link>
                  </li>
                  <li className={isActive('/signup') ? 'active cart' : 'cart'}>
                    <Link to="/signup">
                      <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                    </Link>
                  </li>
                  <li className={isActive('/login') ? 'active cart' : 'cart'}>
                    <Link to="/login">
                      <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

}