import '../css/animate.css';
import '../css/icomoon.css';
import '../css/ionicons.min.css';
import '../css/bootstrap.min.css';
import '../css/magnific-popup.css';
import '../css/bootstrap-datepicker.css';
import '../css/style.css';
import '../fonts/flaticon/font/flaticon.css';
import '../js/main.js';
import logo from '../assets/logo1.png';

export default function Navigations() {

    return (
       
            <nav className="colorlib-nav" role="navigation">
                <div className="sale">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 offset-sm-3 text-center">
                                <div className="row">
                                    <div className="owl-carousel2">
                                        <div className="item">
                                            <div className="col">
                                                <h3><a href="#">Free Express Shipping on all orders with all duties included</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='top-menu'>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-7 col-md-9">
                                <div id="colorlib-logo">
                                    <a href="#">
                                        <img src={logo} alt="Recycled Shoe Store" width="200" height="70"></img>
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-5 col-md-3">
                                <form action="#" className='search-wrap'>
                                    <div className='form-group'>
                                        <input type='search' className='form-control search' placeholder='Search' />
                                        <button className='btn btn-primary submit-search text-center' type='submit' ><i className='icon-search'></i></button>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-sm-12 text-left menu-1'>
                                <ul>
                                    <li className="active"> <a href='#'>Home</a></li>
                                    <li className="has-dropdown"> <a href='#'>Men</a>
                                        <ul className="dropdown">
                                            <li><a href="#">Running Shoes</a></li>
                                            <li><a href="#">Athelete Shoes</a></li>
                                            <li><a href="#">Football Shoes</a></li>
                                        </ul>
                                    </li>
                                    <li> <a href='#'>Women</a></li>
                                    <li> <a href='#'>About</a></li>
                                    <li> <a href='#'>Contact</a></li>
                                    <li className="cart"><a href="#"><i className="icon-shopping-cart"></i> Cart [0]</a></li>
                                    <li className="cart"><a href="#"><i className="icon-user"></i> Account </a></li>
                                    <li className="cart"><a href="#"><i className="icon-book"></i> Sign Up </a></li>
                                    <li className="cart"><a href="#"><i className="icon-enter"></i> Login </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>
    );
}