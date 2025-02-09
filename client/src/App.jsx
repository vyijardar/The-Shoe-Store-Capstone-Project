import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import CartProvider from "./context/CartContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navigations from "./components/Navigations";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import ProductDetail from "./components/ProductDetail";
import Cartpage from "./components/Cartpage";
import ContactPage from "./pages/ContactPage";
import Checkout from "./components/Checkout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/admin/AdminLogin";
import DashboardLayout from "./pages/admin/DashboardLayout";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Footer from './components/Footer';
import UserAccount from './pages/UserAccount';
import About from './pages/About';
import OrderConfirmation from './components/OrderConfirmation';
import ShoeCare from "./pages/Shoecare";
import FAQs from "./pages/FAQs";
import ShippingAndReturns from "./pages/ShippingAndReturns";
import SizeChart from "./pages/SizeChart";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  const [cartItems, setCartItems] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = savedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItems(totalQuantity);
  }, []);

  return (
    <div id="page">
      <CartProvider cartItems={cartItems} token={token} setToken={setToken}>
        <Router>
          <Content 
            cartItems={cartItems} 
            token={token} 
            setToken={setToken} 
            setisLoggedIn={setisLoggedIn} 
          />
        </Router>
      </CartProvider>
    </div>
  );
}

function Content({ cartItems, token, setToken, setisLoggedIn ,setCartItems}) {
  const location = useLocation();

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Only show Navigations and Footer if not on admin routes */}
      {!isAdminRoute && <Navigations cartItems={cartItems} token={token} setToken={setToken} setisLoggedIn={setisLoggedIn} />}

      <Routes>
        {/* Admin Routes Nested under DashboardLayout */}
        <Route path="/admin" element={<ProtectedRoute><DashboardLayout token={token}  setToken={setToken} setisLoggedIn={setisLoggedIn} /> </ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard token={token} />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin setToken={setToken} setIsLoggedIn={setisLoggedIn} />} />

        {/* Customer Routes */}
        <Route path="/" element={<Home token={token} setToken={setToken} />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path='/products/:id' element={<ProductDetail setCartItems={setCartItems} />} />
        <Route path="/cart" element={<Cartpage token={token} setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} setisLoggedIn={setisLoggedIn} />} />
        <Route path="/signup" element={<SignUp token={token} setToken={setToken} setisLoggedIn={setisLoggedIn} />} />
        <Route path="/about" element={<About token={token} setToken={setToken} />} />
        <Route path="/checkout" element={<Checkout token={token} setToken={setToken} />} />
        <Route path="/orderconfirm" element={<OrderConfirmation token={token} setToken={setToken} />} />
        <Route path="/account" element={<ProtectedRoute><UserAccount token={token} setToken={setToken} setisLoggedIn={setisLoggedIn} /> </ProtectedRoute>} />
        <Route path="/contact" element={<ContactPage token={token} setToken={setToken} />} />
        <Route path="/shoe-care" element={<ShoeCare />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/shipping-returns" element={<ShippingAndReturns />} />
        <Route path="/size-chart" element={<SizeChart />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
