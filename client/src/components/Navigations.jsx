import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/icomoon.css";
import "../css/ionicons.min.css"; // Correct import path for ionicons.min.css
import "../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";

export default function Navigations({ cartCount, token, setToken }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="colorlib-nav" role="navigation">
      <div className="top-header">
        <h3>Free Express Shipping on all orders with all duties included</h3>
      </div>
      <div className="top-menu">
        <div className="container">
          <div className="row">
            <div id="colorlib-logo">
              <Link to="/">
                <img src={logo} alt="Shoe Store" width="200" height="70" />
              </Link>
            </div>
            <ul>
              {token ? (
                <>
                  <li className={isActive("/") ? "active" : ""}>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <button onClick={logout} className="logout-button">
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signup" className="signup-link">
                      <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="login-link">
                      <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
