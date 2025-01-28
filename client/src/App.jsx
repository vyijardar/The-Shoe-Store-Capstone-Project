import React,{useState ,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { CartProvider } from './context/CartContext';
import Cartpage from './components/Cartpage';
import Home from './pages/Home';
import Navigations from './components/Navigations'
import Footer from './components/Footer'
import Men from './pages/Men'
import Women from './pages/Women'
import ProductDetail from './components/ProductDetail'
import ContactPage from './pages/ContactPage'
import Checkout from './pages/Checkout'
import UserAccount from './pages/UserAccount'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import About from './pages/About'
import OrderConfirmation from './components/OrderConfirmation'
import ShoeCare from "./pages/Shoecare";
import FAQs from "./pages/FAQs";
import ShippingAndReturns from "./pages/ShippingAndReturns";
import SizeChart from "./pages/SizeChart";
function App() {
    const [cartCount, setCartCount] = useState(0);
    const [token, setToken] = useState(null);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    // Initialize the cart count from localStorage on component mount
    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQuantity = savedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalQuantity);
  }, []);
  return (
    <div id="page">
      <CartProvider>
        <Router>
          <Navigations cartCount={cartCount} token={token}
            setToken={setToken} setisLoggedIn={setisLoggedIn} />
          <Routes>
            <Route path="/" element={<Home token={token} setToken={setToken} />} />
            <Route path="/men" element={<Men token={token} setToken={setToken} />} />
            <Route path="/women" element={<Women token={token} setToken={setToken} />} />
            <Route path='/products/:id' element={<ProductDetail setCartCount={setCartCount} />} token={token} setToken={setToken} ></Route>
            <Route path="/cart" element={<Cartpage token={token} setToken={setToken} />} />
            <Route path="/login" element={<Login token={token} setToken={setToken} setisLoggedIn={setisLoggedIn} />} />
            <Route path="/signup" element={<SignUp token={token} setToken={setToken} />} />
            <Route path="/about" element={<About token={token} setToken={setToken} />} />
            <Route path="/checkout" element={<Checkout token={token} setToken={setToken} />} />
            <Route path="/orderconfirm" element={<OrderConfirmation token={token} setToken={setToken} />} />
            <Route path="/account" element={<UserAccount token={token} setToken={setToken} />} />
            <Route path="/contact" element={<ContactPage token={token} setToken={setToken} />} />
            <Route path="/shoe-care" element={<ShoeCare />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/shipping-returns" element={<ShippingAndReturns />} />
            <Route path="/size-chart" element={<SizeChart />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </div>
    
  )
}

export default App
