import React,{useState ,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navigations from './components/Navigations'
import Footer from './components/Footer'
import Men from './components/Shop/Men'
import Women from './components/Shop/Women'
import ProductDetail from './components/ProductDetail'
function App() {
    const [cartCount, setCartCount] = useState(0);
    
    // Initialize the cart count from localStorage on component mount
    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQuantity = savedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalQuantity);
  }, []);
  return (
    <div id="page">
      <Router>
      <Navigations cartCount={cartCount}  />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path='/products/:id' element={<ProductDetail  setCartCount={setCartCount}/>}></Route>
        {/* <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderconfirm" element={<OrderConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
         */}
      </Routes>
      <Footer/>
    </Router>
    </div>
    
  )
}

export default App
