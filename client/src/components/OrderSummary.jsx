import React, { useState, useContext, useEffect } from "react";

const UserContext = React.createContext({
    isLoggedIn: false,
    savedAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
    },
    savedPaymentMethod: {
      cardNumber: '1111-2222-3333-4444',
    },
  });
  
  const CartContext = React.createContext({
    cartItems: [
      { id: 1, name: 'T-Shirt', price: 19.99, quantity: 2, imageUrl: 'shirt.jpg' },
      { id: 2, name: 'Jeans', price: 49.99, quantity: 1, imageUrl: 'jeans.jpg' },
    ],
    total: 89.97,
  });
export default function OrderSummary() {
    const { cartItems, total } = useContext(CartContext);
      // Shipping fields
  const [shippingData, setShippingData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
    shippingMethod: 'standard',
  });

    // Shipping cost & tax logic
    const shippingCost =
      shippingData.shippingMethod === 'standard'
        ? 5
        : shippingData.shippingMethod === 'express'
          ? 10
          : 15;
    const tax = 0.08 * total;

  
    return (

        <div className="order-summary">
            <h4>{cartItems.length} Item{cartItems.length !== 1 && 's'}</h4>

            {cartItems.map((item) => (
                <div className="item" key={item.id}>
                    {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.name} />
                    )}
                    <div className="item-details">
                        <p>{item.name}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>${item.price.toFixed(2)}</p>
                    </div>
                </div>
            ))}

            <div className="order-total">
                <div className="subtotal">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="subtotal">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="subtotal">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="total">
                    <span>Total to Pay</span>
                    <strong>${(total + shippingCost + tax).toFixed(2)}</strong>
                </div>
            </div>
        </div>
    );
}