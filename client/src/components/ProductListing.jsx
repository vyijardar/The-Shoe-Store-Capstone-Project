// src/components/ProductListing.js
import React from 'react';
import './ProductListing.css';

function ProductListing() {
  const products = [
    { id: 1, name: "Men's Recycled Trainers", price: "$65", image: "" },
    { id: 2, name: "Women's Sustainable Runner", price: "$68", image: "" },
    { id: 3, name: "Kids Eco Sneakers", price: "$45", image: "" },
    { id: 4, name: "Women's Urban Trainers", price: "$70", image: "" },
    { id: 5, name: "Men's Vegan Running", price: "$60", image: "" },
    { id: 6, name: "Unisex Coastal Canvas", price: "$55", image: "" },
    // ...add more items
  ];

  return (
    <section className="product-listing">
      <h2>Our Shoe Styles</h2>
      <div className="grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">{/* add <img> or background here */}</div>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductListing;
