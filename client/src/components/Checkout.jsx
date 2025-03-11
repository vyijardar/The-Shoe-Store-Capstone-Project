import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
import "../css/Checkout.css";
import ShippingForm from "./ShippingForm";
import Confirmation from "./Confirmation";
const api = import.meta.env.VITE_API_URL || "http://localhost:3001";
const UserContext = React.createContext({
  isLoggedIn: false,
  user: {
    id: "", // When logged in, this should be set to the user's UUID.
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
  },
});

const CartContext = React.createContext({
  cartItems: [],
  total: 0,
  setCartItems: () => { },
});
export default function Checkout() {
  const [step, setStep] = useState(1);

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

  // Billing fields
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [billingData, setBillingData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
  });


  const { isLoggedIn, user, savedAddress, savedPaymentMethod } = useContext(UserContext);
  const { cartItems, total, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn && user.id) {
      setShippingData((prev) => ({
        ...prev,
        ...savedAddress,
        shippingMethod: 'standard',
      }));
      setBillingData((prev) => ({
        ...prev,
        ...savedAddress,
      }));
      setCardNumber(user.savedPaymentMethod.cardNumber || '');
      // Fetch cart items for the user.
      fetch(`${api}/api/cart?user_id=${user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch cart items");
          return res.json();
        })
        .then((data) => setCartItems(data))
        .catch((error) =>
          console.error("Error fetching cart items:", error)
        );
    }
  }, [isLoggedIn, user, setCartItems]);

  // Shipping cost & tax logic
  const shippingCost =
    shippingData.shippingMethod === 'standard'
      ? 5
      : shippingData.shippingMethod === 'express'
        ? 10
        : 15;
  const tax = 0.08 * total;

  // Progress bar
  const renderProgress = () => {
    const stepsArray = ['Cart', 'Shipping', 'Payment', 'Review', 'Confirmation'];

    return (
      <div className="progress-bar">
        {stepsArray.map((label, index) => {
          // 'active' remains true for all steps up to the current step
          const active = step >= index + 1;
          // 'currentStep' is ONLY true for the exact step the user is on
          const currentStep = step === index + 1;
          return (
            <div
              key={label}
              className={`progress-step ${active ? 'active' : ''}`}
              style={{ fontWeight: currentStep ? 'bold' : 'normal' }}
            >
              {label}
            </div>
          );
        })}
      </div>
    );
  };

  // STEP 1: Shipping
  const renderShippingForm = () => (
    <ShippingForm />
  );

  // STEP 2: Payment
  const renderPaymentForm = () => (
    <PaymentForm />
  );

  // STEP 3: Review
  const renderReview = () => (
   <Review />
  );

  // STEP 4: Confirmation
  const renderConfirmation = () => (
    <Confirmation />
  );

  // Always-visible order summary (right column)
  const renderOrderSummary = () => (
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

  return (
    <div className="checkout-container">
      {/* LEFT COLUMN: Steps / Forms */}
      <div className="checkout-left">
        {renderProgress()}

        {step === 1 && renderShippingForm()}
        {step === 2 && renderPaymentForm()}
        {step === 3 && renderReview()}
        {step === 4 && renderConfirmation()}
      </div>

      {/* RIGHT COLUMN: Always-visible summary */}
      <div className="checkout-right">
        {renderOrderSummary()}
      </div>
    </div>
  );
}
