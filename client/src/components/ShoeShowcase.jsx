// src/components/ShoeShowcase.js
import React from 'react';
import '../css/ShoeShowcase.css';
import men2 from '../assets/images/item-11.jpg';
function ShoeShowcase() {
  return (
    <section className="shoe-showcase">
      <h2>See how your shoes are made</h2>
      <div className="showcase-container">
        <div className="shoe-image">
         <img src={men2} alt="" className="img-fluid" />
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

