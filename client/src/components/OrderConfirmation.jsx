import React from "react";
// import "../styles/OrderConfirmation.css";

const OrderConfirmation = ({ orderDetails }) => {
  return (
    <>
      <div className="order-confirmation-container">
        <div className="order-summary">
          <div className="confirmation-message">
            <div className="confirmation-icon">✔</div>
            <h1>Thank you for your order!</h1>
            <p>Your order has been successfully placed.</p>
          </div>
          <h2>Order Summary</h2>
          <p>
            <strong>Order ID:</strong> {orderDetails.orderId}
          </p>
          <p>
            <strong>Name:</strong> {orderDetails.name}
          </p>
          <p>
            <strong>Address:</strong> {orderDetails.address}
          </p>
          <p>
            <strong>Total:</strong> ${orderDetails.total}
          </p>
        </div>
        <div className="items-list">
          <h3>Items Purchased</h3>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <span>
                  ${item.price} x {item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
