// src/components/ProductListing.js
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../css/ProductListing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons';
const api = import.meta.env.API_URL || "http://localhost:3001";
function ProductListing() {
  // Access context values
  const { cartItems, addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${api}/api/products`);
        const result = await response.json();
        if (!Array.isArray(result)) {
          throw new Error("Invalid response format: Expected an array");
        }
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([])
      }
    }
    fetchProducts();
  }, []);
  return (
    <section className="product-listing">
      <div className="breadcrumbs-two">
        <div className="row">
          <div className="col">
            <h2>Our Shoes Styles</h2>
          </div>
        </div>
      </div>
      <div className="colorlib-product">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-xl-12">
              <div className="row row-pb-md">
                {/* <ProductSort onSortChange={handleSortChange} />
                            <ProductGrid products={filteredProducts} /> */}
                {products.map((product) => (
                  <div className="col-md-3 col-lg-3 mb-4 text-center" key={product.id}>
                    <div className="product-entry border"> 
                    
                      <Link to={`/products/${product.id}`} className="prod-img">
                        <img src={product.image_urls[0]} alt={product.name} className="img-fluid" />
                      </Link>
                      <div className="desc">
                        <h2> <Link to={`/products/${product.id}`}>{product.name}</Link></h2>
                        <span className="price">${product.price}</span>
                        <button onClick={
                          () =>{ addToCart({ ...product, quantity: 1 });
                          alert("Product added to cart succesfully !!");
                          }} className="btn btn-primary btn-addtocart">
                        <FontAwesomeIcon icon={faShoppingCart} />  Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
      <div className="grid">

      </div>
    </section>
  );
}

export default ProductListing;
