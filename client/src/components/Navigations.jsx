import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="colorlib-nav">
      {/* Top Banner */}
      <div className="top-header text-center py-2">
        <div className="col-sm-8 offset-sm-2 text-center"><h3>Free Express Shipping on all orders with all duties included</h3></div>
      </div>
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
                  <input className="form-control search" type="search" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
                  <button className="btn btn-primary submit-search text-center" type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg top-menu">
        <div className="container">
          {/* Toggler */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar content */}
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/men') ? 'active' : ''}`} to="/men">Men</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/women') ? 'active' : ''}`} to="/women">Women</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/about') ? 'active' : ''}`} to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/contact') ? 'active' : ''}`} to="/contact">Contact</Link>
              </li>
            </ul>

            {/* Search form */}
            {/* <form className="d-flex me-3" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form> */}

            {/* Auth / Cart */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/cart') ? 'active' : ''}`} to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} /> Cart [{totalItems}]
                </Link>
              </li>

              {token ? (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/account') ? 'active' : ''}`} to="/account">
                      <FontAwesomeIcon icon={faUser} /> Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger ms-2" onClick={logout}>
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/signup') ? 'active' : ''}`} to="/signup">
                      <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/login') ? 'active' : ''}`} to="/login">
                      <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

      </nav>
    </div>
  );
}
