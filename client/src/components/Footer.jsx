import '../css/animate.css';
import '../css/icomoon.css';
import '../css/ionicons.min.css';
import '../css/bootstrap.min.css';
import '../css/magnific-popup.css';
import '../css/bootstrap-datepicker.css';
import '../css/style.css';
import '../fonts/flaticon/font/flaticon.css';
import '../js/main.js';

export default function Footer() {

    return (
            <footer id="colorlib-footer" role="contentinfo" >
                <div className='container'>
                    <div className='row row-pb-md'>
                        <div className='col footer-col colorlib-widget'>
                            <h4>About Shoes</h4>
                            <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
                         
                                <ul className='colorlib-social-icons'>
                                    <li><a href="#"><i className='icon-twitter'></i></a></li>
                                    <li><a href="#"><i className='icon-facebook'></i></a></li>
                                    <li><a href="#"><i className='icon-linkedin'></i></a></li>
                                    <li><a href="#"><i className='icon-instagram'></i></a></li>
                                </ul>
                           
                        </div>
                        <div className='col footer-col colorlib-widget'>
                            <h4>Customer Care</h4>
                            
                                <ul className='colorlib-footer-links'>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">Returns/Exchange</a></li>
                                    <li><a href="#">Gift Voucher</a></li>
                                    <li><a href="#">Wishlist</a></li>
                                    <li><a href="#">Special</a></li>
                                    <li><a href="#">Customer Services</a></li>
                                    <li><a href="#">Site maps</a></li>
                                </ul>
                          
                        </div>
                        <div className="col footer-col colorlib-widget">
                            <h4>Information</h4>
                          
                                <ul className="colorlib-footer-links">
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Delivery Information</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Support</a></li>
                                    <li><a href="#">Order Tracking</a></li>
                                </ul>
                          
                        </div>
                        <div className="col footer-col">
                            <h4>News</h4>
                            <ul className="colorlib-footer-links">
                                <li><a href="blog.html">Blog</a></li>
                                <li><a href="#">Press</a></li>
                                <li><a href="#">Exhibitions</a></li>
                            </ul>
                        </div>
                        <div className="col footer-col">
                            <h4>Contact Information</h4>
                            <ul className="colorlib-footer-links">
                                <li>291 South 21th Street, <br /> Suite 721 New York NY 10016</li>
                                <li><a href="tel://1234567920">+ 1235 2355 98</a></li>
                                <li><a href="mailto:info@yoursite.com">info@yoursite.com</a></li>
                                <li><a href="#">yoursite.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <div className="copy">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <p>
                                <span>Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved 
                                    </span>
                            </p>
                        </div>
                    </div>
                </div> */}
            </footer>
    );
}