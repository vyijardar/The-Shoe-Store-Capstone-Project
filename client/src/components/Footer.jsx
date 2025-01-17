import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
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
                            <li><a href="#" ><FontAwesomeIcon icon={faTwitter} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                            <li><a href="#"> <FontAwesomeIcon icon={faLinkedin} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        </ul>
                    </div>

                    {/* Customer Care Section */}
                    <div className="col footer-col colorlib-widget">
                        <h4>Shop</h4>
                        <ul className="colorlib-footer-links">
                            <li> <a href="#">Shop Men</a> </li>
                            <li> <a href="#">Shop Women</a></li>
                            <li><a href="#">Lookbook</a></li>
                            <li><a href="#">Sale</a></li>
                        </ul>
                    </div>

                    {/* Information Section */}
                    <div className="col footer-col colorlib-widget">
                        <h4>Need Help?</h4>
                        <ul className="colorlib-footer-links">
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Shipping & Returns</a></li>
                            <li><a href="#">Shoe Care</a></li>
                            <li><a href="#">Size Chart</a></li>
                            <li><a href="#">Contact Us</a></li>
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
        </footer>
    );
}
