import { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Make sure CartContext is defined and exported correctly
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons';
export default function ProductGrid({ products }) {
    // Using the CartContext to access cart items and the addToCart function
    const { addToCart, cartItems } = useContext(CartContext);

    
    const handleAddToCart = (product) => {
        addToCart({ ...product, quantity: 1 });
        alert("Shoes Successfully Added to cart.");
    };

    return (
        <div className="row row-pb-md">
            {Array.isArray(products) && products.length > 0 ? (
                products.map(product => (
                    <div className="col-md-4 col-lg-4 mb-4 text-center" key={product.id}>
                        <div className="product-entry border">
                            {/* Link to product details page */}
                            <Link to={`/products/${product.id}`} className="prod-img">
                                <img src={product.image_urls[0]} className="img-fluid" alt={product.name} />
                                
                            </Link>

                            <div className="desc">
                                <h2>
                                    {/* Title and link to the product detail page */}
                                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                                </h2>
                                <span className="price">${product.price}</span>
                            </div>

                            {/* Add to Cart Button */}
                            {/* <div className="col-sm-12 text-center">
                                <p className="addtocart">
                                    <button
                                        className="btn btn-primary btn-addtocart"
                                        type="button" // Ensure it's not type submit
                                        onClick={() => handleAddToCart(product)} >
                                        <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                                    </button>
                                </p>
                            </div> */}
                        </div>
                    </div>
                ))
            ) : (
                <p>No product found.</p>
            )}
        </div>
    );
}
