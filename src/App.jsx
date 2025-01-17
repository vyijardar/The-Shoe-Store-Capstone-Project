import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './components/Cart/CartContext';
import HeroSection from './components/Homepage/HeroSection';
import MaterialSection from './components/Homepage/MaterialSection';
import ShoeShowcase from './components/Homepage/ShoeShowcase';
import ProductListing from './components/Homepage/ProductListing';
import Cartpage from './components/Cart/Cartpage';

// 1. Import your ContactPage
import ContactPage from './components/Form/ContactPage';

// Home component
function Home() {
  return (
    <div>
      <HeroSection />
      <MaterialSection />
      <ShoeShowcase />
      <ProductListing />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <header className="navbar">
            <div className="logo">PLANSHOE</div>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/cart">Cart</Link>
              {/* 2. Add Contact link */}
              <Link to="/contact">Contact</Link>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cartpage />} />
            {/* 3. Create the route for Contact */}
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
