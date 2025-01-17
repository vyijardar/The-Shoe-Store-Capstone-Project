import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from '../client/src/components/Cart/CartContext.jsx';
import HeroSection from '../client/src/components/Homepage/HeroSection.jsx';
import MaterialSection from '../client/src/components/Homepage/MaterialSection.jsx';
import ShoeShowcase from '../client/src/components/Homepage/ShoeShowcase.jsx';
import ProductListing from '../client/src/components/Homepage/ProductListing.jsx';
import Cartpage from '../client/src/components/Cart/Cartpage.jsx';

// 1. Import your ContactPage
import ContactPage from '../client/src/components/Form/ContactPage.jsx';

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
