import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <footer id="colorlib-footer" role="contentinfo">
            <div className="container">
                <div className="row row-pb-md">
                    {/* About Section */}
                    <div className="col footer-col colorlib-widget">
                        <h4>About Shoes</h4>
                        <p>
                            Even the all-powerful Pointing has no control about the blind
                            texts. It is an almost unorthographic life.
                        </p>
                        <ul className="colorlib-social-icons">
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                            </li>
                            <li>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Care Section */}
                    <div className="col footer-col colorlib-widget">
                        <h4>Shop</h4>
                        <ul className="colorlib-footer-links">
                            <li> <a href="#">Shop Men</a> </li>
                            <li> <a href="#">Shop Women</a></li>
                    
                        </ul>
                    </div>

                    {/* Information Section */}
                    <div className="col footer-col colorlib-widget">
                        <h4>Need Help?</h4>
                        <ul className="colorlib-footer-links">
                            <li>
                                <Link to="/faqs">FAQs</Link>
                            </li>
                            <li>
                                <Link to="/shipping-returns">Shipping & Returns</Link>
                            </li>
                            <li>
                                <Link to="/shoe-care">Shoe Care</Link>
                            </li>
                            <li>
                                <Link to="/size-chart">Size Chart</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="col footer-col">
                        <h4>Contact Information</h4>
                        <ul className="colorlib-footer-links">
                            <li>
                                291 South 21th Street, <br />
                                Suite 721 New York NY 10016
                            </li>
                            <li><a href="tel://1234567920">+ 1235 2355 98</a></li>
                            <li><a href="mailto:info@yoursite.com">info@yoursite.com</a> </li>
                            <li><a href="#">yoursite.com</a></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="copy">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <p>
                                <span>
                                    Copyright &copy; {new Date().getFullYear()} All rights reserved.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}