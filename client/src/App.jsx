import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import Navigations from "./components/Navigations";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import ProductDetail from "./components/ProductDetail";
import Cartpage from "./components/Cartpage";
import ContactPage from "./pages/ContactPage";
import Checkout from "./components/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import AdminLogin from "./pages/admin/Login";
import DashboardLayout from "./pages/admin/DashboardLayout";
import AdminProducts from "./pages/admin/Products";
import AdminUsers from "./pages/admin/Users";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = savedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalQuantity);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    window.location.href = "/admin/login";
  };

  return (
    <div id="page">
      <CartProvider cartCount={cartCount} token={token} setToken={setToken}>
        <Router>
          <Navigations cartCount={cartCount} token={token} setToken={setToken} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/products/:id" element={<ProductDetail setCartCount={setCartCount} />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<ContactPage />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin setToken={setToken} />} />
            <Route
              path="/admin"
              element={<DashboardLayout />}
            >
              <Route path="products" element={<AdminProducts />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
