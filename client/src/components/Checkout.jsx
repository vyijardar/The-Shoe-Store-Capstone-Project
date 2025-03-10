import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
import "../css/Checkout.css";

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

  // Payment field
  const [cardNumber, setCardNumber] = useState('');

  // For guest checkout: optional account creation
  const [createAccount, setCreateAccount] = useState(false);

  const { isLoggedIn, savedAddress, savedPaymentMethod } = useContext(UserContext);
  const { cartItems, total } = useContext(CartContext);
  const navigate = useNavigate();
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

  // Shipping cost & tax logic
  const shippingCost =
    shippingData.shippingMethod === 'standard'
      ? 5
      : shippingData.shippingMethod === 'express'
        ? 10
        : 15;
  const tax = 0.08 * total;

  // Navigation helpers
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Basic card validation (12 digits)
  const isCardValid = () => {
    const digitsOnly = cardNumber.replace(/\D/g, '');
    return digitsOnly.length === 12;
  };

  // Handle order completion
  const handleOrderComplete = () => {
    if (!isLoggedIn && createAccount) {
      console.log('Creating user account:', shippingData);
      // ... call your signup API, etc.
    }
    nextStep();
  };

  // Progress bar
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
    <div className="checkout-step checkout-form">
      <h2 className="checkout-section-title">Shipping Address</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nextStep();
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={shippingData.name}
            onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
            required
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            value={shippingData.street}
            onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={shippingData.city}
            onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
            required
          />
        </label>
        <label>
          State/Region:
          <input
            type="text"
            value={shippingData.state}
            onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
            required
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            value={shippingData.postalCode}
            onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            value={shippingData.country}
            onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
            required
          />
        </label>

        <h3 className="checkout-section-title">Shipping Method</h3>
        <label>
          <input
            type="radio"
            name="shippingMethod"
            value="standard"
            checked={shippingData.shippingMethod === 'standard'}
            onChange={(e) =>
              setShippingData({ ...shippingData, shippingMethod: e.target.value })
            }
          />
          Standard ($5)
        </label>
        <label>
          <input
            type="radio"
            name="shippingMethod"
            value="express"
            checked={shippingData.shippingMethod === 'express'}
            onChange={(e) =>
              setShippingData({ ...shippingData, shippingMethod: e.target.value })
            }
          />
          Express ($10)
        </label>
        <label>
          <input
            type="radio"
            name="shippingMethod"
            value="overnight"
            checked={shippingData.shippingMethod === 'overnight'}
            onChange={(e) =>
              setShippingData({ ...shippingData, shippingMethod: e.target.value })
            }
          />
          Overnight ($15)
        </label>

        <div className="button-row">
          <button type="submit" className="checkout-button">
            Next → Payment
          </button>
        </div>
      </form>
    </div>
  );

  // STEP 2: Payment
  const renderPaymentForm = () => (
    <div className="checkout-step checkout-form">
      <h2 className="checkout-section-title">Billing Information & Payment</h2>
      <label>
        <input
          type="checkbox"
          checked={useSameAddress}
          onChange={(e) => setUseSameAddress(e.target.checked)}
        />
        Use shipping address as billing address
      </label>

      {!useSameAddress && (
        <>
          <label>
            Name:
            <input
              type="text"
              value={billingData.name}
              onChange={(e) => setBillingData({ ...billingData, name: e.target.value })}
              required
            />
          </label>
          <label>
            Street:
            <input
              type="text"
              value={billingData.street}
              onChange={(e) => setBillingData({ ...billingData, street: e.target.value })}
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              value={billingData.city}
              onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
              required
            />
          </label>
          <label>
            State/Region:
            <input
              type="text"
              value={billingData.state}
              onChange={(e) => setBillingData({ ...billingData, state: e.target.value })}
              required
            />
          </label>
          <label>
            Postal Code:
            <input
              type="text"
              value={billingData.postalCode}
              onChange={(e) => setBillingData({ ...billingData, postalCode: e.target.value })}
              required
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              value={billingData.country}
              onChange={(e) => setBillingData({ ...billingData, country: e.target.value })}
              required
            />
          </label>
        </>
      )}

      <h3 className="checkout-section-title">Payment Method</h3>
      <label>
        Card Number (12 digits):
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="XXXX XXXX XXXX"
          required
        />
      </label>

      <div className="button-row">
        <button onClick={prevStep} className="button-secondary">
          ← Back
        </button>
        <button
          onClick={() => {
            if (!isCardValid()) {
              alert('Please enter a valid 12-digit card number.');
              return;
            }
            if (useSameAddress) {
              setBillingData(shippingData);
            }
            nextStep();
          }}
          className="checkout-button"
        >
          Next → Review
        </button>
      </div>
    </div>
  );

  // STEP 3: Review
  const renderReview = () => (
    <div className="checkout-step">
      <h2 className="checkout-section-title">Review Your Order</h2>

      {/* This item list is somewhat duplicated in the right column,
          but you can keep or remove depending on your design preference */}
      <div className="order-summary">
        {cartItems.map((item) => (
          <div className="item" key={item.id}>
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} />
            )}
            <div className="item-details">
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

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
          <span>Total</span>
          <strong>${(total + shippingCost + tax).toFixed(2)}</strong>
        </div>
      </div>

      <div className="address-recap">
        <h4>Shipping To:</h4>
        <p>
          {shippingData.name}
          <br />
          {shippingData.street}, {shippingData.city}, {shippingData.state}{' '}
          {shippingData.postalCode}
          <br />
          {shippingData.country}
        </p>

        <h4>Billing To:</h4>
        <p>
          {billingData.name}
          <br />
          {billingData.street}, {billingData.city}, {billingData.state}{' '}
          {billingData.postalCode}
          <br />
          {billingData.country}
        </p>

        <h4>Payment Method:</h4>
        <p>Card Number (Last 4): **** {cardNumber.slice(-4)}</p>
      </div>

      {!isLoggedIn && (
        <div>
          <label>
            <input
              type="checkbox"
              checked={createAccount}
              onChange={(e) => setCreateAccount(e.target.checked)}
            />
            Create an account after purchase?
          </label>
        </div>
      )}

      <div className="button-row">
        <button onClick={prevStep} className="button-secondary">
          ← Back
        </button>
        <button onClick={handleOrderComplete} className="checkout-button">
          Complete Order
        </button>
      </div>
    </div>
  );

  // STEP 4: Confirmation
  const renderConfirmation = () => (
    <div className="checkout-step">
      <h2 className="checkout-section-title">Order Confirmation</h2>
      <h1>Thank you for your order!</h1>
      <p>Your order has been successfully placed.</p>
      <p>Your order total was: ${(total + shippingCost + tax).toFixed(2)}</p>
      <p>
        <strong>Order ID:</strong> {cartItems.orderId}
      </p>
      <p>
        <strong>Name:</strong> {cartItems.name}
      </p>
      <p>
        <strong>Address:</strong> {cartItems.address}
      </p>
      <p>
        <strong>Total:</strong> ${cartItems.total}
      </p>
      {!isLoggedIn && createAccount && (
        <p>Your account has been created! Please check your email for a confirmation link.</p>
      )}

      <button onClick={() => navigate("/")} className="checkout-button">
        Back to Shop
      </button>
    </div>
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
