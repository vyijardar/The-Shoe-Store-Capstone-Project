import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './Cartpage.css';

function Cartpage() {
  const { cartItems, total, updateItemQuantity, removeItem } = useContext(CartContext);

  // Example: a function to format currency neatly
  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {/* If the cart is empty */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty!</p>
          <a href="/shop" className="continue-shopping">Continue Shopping</a>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                {/* 
                  If you have an image URL for the item, display it here
                  If not, you can remove the <img> element 
                */}
                <img 
                  src={item.imageUrl} 
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
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>

          <a href="/Home" className="continue-shopping">Continue Shopping</a>
        </>
      )}
    </div>
  );
}

export default Cartpage;


