import '../css/icomoon.css';
import '../css/ionicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation  } from "react-router-dom";
import logo from '../assets/logo1.png';


export default function Navigations({ cartCount }) {
    // State for menu dropdowns (optional)
    const location = useLocation();
    // Check if the current path matches the link
    const isActive = (path) => location.pathname === path;

    function handleSubmit(){

    }
    function handleChange() {
        
    }
    
    return (
        <nav className="colorlib-nav" role="navigation">
            <div className="top-header ">
                <div className="row">
                <div className="col-sm-8 offset-sm-2 text-center">
                    <h3> Free Express Shipping on all orders with all duties included</h3>
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
                            <form action="#" onSubmit={handleSubmit} className="search-wrap">
                                <div className="form-group">                                 
                                    <input type="search" className="form-control search" placeholder="Search"  onChange={handleChange}/>
                                    <button className="btn btn-primary submit-search text-center" type="submit">
                                        <i className="icon-search"></i>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="row">
                        <div className="col-sm-12 text-left menu-1">
                            <ul>
                                <li className={isActive('/') ? 'active' : ''}> <Link to="/">Home</Link> </li>
                                <li className={isActive("/men") ? "active" : ""} > <Link to="/men">Men</Link> </li>
                                <li className={isActive("/women") ? "active" : ""} > <Link to="/women">Women</Link> </li>
                                <li className={isActive("/about") ? "active" : ""}><Link to="/about">About</Link></li>
                                <li className={isActive("/contact") ? "active" : ""}><Link to="/contact">Contact</Link></li>
                                {/* Cart & Account Links */}
                                <li className={isActive("/cart") ? "active cart" : "cart"}>
                                    <Link to="/cart">
                                    <FontAwesomeIcon icon={faShoppingCart} /> Cart [{cartCount}]
                                        
                                    </Link>
                                </li>
                                <li className={isActive("/account") ? "active cart" : "cart"}>
                                    <Link to="/account">
                                         <FontAwesomeIcon icon={faUser} />  Account
                                    </Link>
                                </li>
                                <li className={isActive("/signup") ? "active cart" : "cart"}>
                                    <Link to="/signup">
                                        <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                                    </Link>
                                </li>
                                <li className={isActive("/login") ? "active cart" : "cart"}>
                                    <Link to="/login">
                                       <FontAwesomeIcon icon={faSignInAlt} /> Login
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}