import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
export default function Footer() {
    const socialLinks = [
        { id: 1, href: "https://twitter.com", icon: faTwitter },
        { id: 2, href: "https://facebook.com", icon: faFacebook },
        { id: 3, href: "https://linkedin.com", icon: faLinkedin },
        { id: 4, href: "https://instagram.com", icon: faInstagram },
    ];
      
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
                        <ul className="colorlib-social-icons d-flex list-unstyled">
                            {socialLinks.map(({ id, href, icon }) => (
                                <li key={id} className="me-3">
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                                        <FontAwesomeIcon icon={icon} />
                                    </a>
                                </li>
                            ))}
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
                            <li> <Link to="/contact">
                                291 South 21th Street, <br />
                                Suite 721,New York, NY 10016
                            </Link>
                            </li>
                            <li>
                                <Link to="/contact">+1 235-2355-98</Link>
                            </li>
                            <li>
                                <Link to="/contact">info@theshoestore.com</Link>
                            </li>
                            <li>
                                <Link to="/">www.theshoestore.com</Link>
                            </li>
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