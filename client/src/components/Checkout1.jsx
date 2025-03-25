import React, { useState, useContext, useEffect } from "react";

// import { CartContext } from "../context/CartContext";
import "../css/Checkout.css";
import ShippingForm from "./ShippingForm";
import Confirmation from "./Confirmation";
import OrderSummary from "./OrderSummary";
const api = import.meta.env.VITE_API_URL || "http://localhost:3001";

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

  const [billingData, setBillingData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
  });


  const { isLoggedIn} = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn) {
      setShippingData((prev) => ({
        ...prev,
        ...savedAddress,
        shippingMethod: 'standard',
      }));
      setBillingData((prev) => ({
        ...prev,
        ...savedAddress,
      }));
      setCardNumber(savedPaymentMethod.cardNumber || '');
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

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
    <OrderSummary />
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
