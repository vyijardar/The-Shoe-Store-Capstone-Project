// src/components/ShoeShowcase.js
import React from 'react';
import './ShoeShowcase.css';

function ShoeShowcase() {
  return (
    <section className="shoe-showcase">
      <h2>See how your shoes are made</h2>
      <div className="showcase-container">
        <div className="shoe-image">
          {/* Placeholder for shoe image with annotation points */}
        </div>
        <ul className="shoe-points">
          <li>Recycled Upper</li>
          <li>Eco-friendly Rubber Outsole</li>
          <li>Organic Cotton Laces</li>
        </ul>
      </div>
    </section>
  );
}

export default ShoeShowcase;

