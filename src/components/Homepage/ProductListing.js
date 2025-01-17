// src/components/ProductListing.js
import React, { useContext } from 'react';
import { CartContext } from '../Cart/CartContext';
import './ProductListing.css';

function ProductListing() {
  // Access context values
  const { cartItems, addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: "Men's Recycled Trainers", price: 65 },
    { id: 2, name: "Women's Sustainable Runner", price: 68 },
    { id: 3, name: "Kids Eco Sneakers", price: 45 },
    { id: 4, name: "Women's Urban Trainers", price: 70 },
    { id: 5, name: "Men's Vegan Running", price: 60 },
    { id: 6, name: "Unisex Coastal Canvas", price: 55 },
  ];

  return (
    <section className="product-listing">
      <h2>Our Shoe Styles</h2>
      <div className="grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src="placeholder.png" alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p>{`$${product.price}`}</p>
            <button onClick={() => addToCart({ ...product, quantity: 1 })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductListing;
