import React from "react";
// import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cartItems }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/order-confirmation");
  };

  return (
    <>
      <div className="checkout-page">
        <div className="billing-section">
          <h2>Billing Details</h2>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="Your First Name" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Your Last Name" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" placeholder="Enter Your Address" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="Town/City" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State/Province</label>
                <input type="text" id="state" placeholder="State/Province" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP/Postal Code</label>
              <input type="text" id="zip" placeholder="ZIP/Postal Code" />
            </div>
            <div className="form-group">
              <h3>Payment Method</h3>
              <div>
                <label>
                  <input type="radio" name="payment" value="creditCard" /> Credit
                  Card
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" name="payment" value="paypal" /> PayPal
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="cart-total-section">
          <h2>Cart Total</h2>
          <ul>
            <li>
              <span>Subtotal</span>
              <span>$0.00</span>
            </li>
            <li>
              <span>Shipping</span>
              <span>$0.00</span>
            </li>
            <li>
              <span>Total</span>
              <span>$0.00</span>
            </li>
          </ul>
          <button type="button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
