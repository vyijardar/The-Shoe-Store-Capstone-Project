import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../css/Cartpage.css';
import { useNavigate, Link } from 'react-router-dom';
function Cartpage() {
  const { cartItems, total, updateItemQuantity, removeItem } = useContext(CartContext);
  const navigate = useNavigate();
  const formatPrice = (price) => {
    const numericPrice = Number(price) || 0;
    return `$${numericPrice.toFixed(2)}`;
  };
  
 return (
    <div className="colorlib-product">
      <div className="container">
        <div className="row">
          <div className="cart-page">
            <h1>Your Cart</h1>

            {/* If the cart is empty */}
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty!</p>
                <Link to="/" className="continue-shopping">Continue Shopping</Link>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      {/* Check if image_urls exists and is not empty */}
                   
                        <img
                          src={item.image_urls[0]} // Use the first image URL
                          alt={item.name}
                          className="item-image"
                        />
                       

                      <div className="item-details">
                        <h2>{item.name}</h2>
                        <p>{formatPrice(item.price)}</p>

                        <div className="item-quantity">
                          <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <h2>Total: {formatPrice(total)}</h2>
                  <button className="checkout-btn" onClick={() => { navigate('/checkout') }}>Proceed to Checkout</button>
                </div>

                <Link to="/" className="continue-shopping">Continue Shopping</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;


