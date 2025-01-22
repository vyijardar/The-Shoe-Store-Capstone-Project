import { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Make sure CartContext is defined and exported correctly
import { Link } from 'react-router-dom';

export default function ProductGrid({ products }) {
    // Using the CartContext to access cart items and the addToCart function
    const { addToCart } = useContext(CartContext);

    return (
        <div className="row row-pb-md">
            {products.map(product => (
                <div className="col-md-3 col-lg-3 mb-4 text-center" key={product.id}>
                    <div className="product-entry border">
                        {/* Link to product details page */}
                        <Link to={`/products/${product.id}`} className="prod-img">
                            <img src={product.image} className="img-fluid" alt={product.title} />
                        </Link>

                        <div className="desc">
                            <h2>
                                {/* Title and link to the product detail page */}
                                <Link to={`/products/${product.id}`}>{product.title}</Link>
                            </h2>
                            <span className="price">${product.price}</span>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="col-sm-12 text-center">
                            <p className="addtocart">
                                <button
                                    className="btn btn-primary btn-addtocart"
                                    type="button" // Ensure it's not type submit
                                    onClick={() => addToCart({ ...product, quantity: 1 })} // Add to cart with quantity
                                >
                                    <i className="icon-shopping-cart"></i> Add to Cart
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
