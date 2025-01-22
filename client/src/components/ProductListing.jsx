// src/components/ProductListing.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../css/ProductListing.css';
import men1 from '../assets/images/item-9.jpg';
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
                        <Link className="prod-img">
                          <img src={men1} alt={product.name} className="img-fluid" />
                        </Link>
                        <div className="desc">
                      <h2>{product.name}  <Link to={`/${product.id}`}>{product.name}</Link></h2>
                      <span className="price">${product.price}</span>
                      <button onClick={() => addToCart({ ...product, quantity: 1 })} className="btn btn-primary btn-addtocart">
                        Add to Cart
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
