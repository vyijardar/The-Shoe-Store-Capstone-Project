import React from 'react';
import './Cartpage.css';

function CartItem({ item, updateQuantity, remove }) {
  return (
    <div className="cart-item">
      <img src={item.image_urls[0]} alt={item.name} className="item-image" />
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>Price: ${item.price}</p>
        <div className="item-quantity">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
        <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
        <button onClick={() => remove(item.id)} className="remove-btn">Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
