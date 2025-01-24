import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserContext = React.createContext({
  isLoggedIn: false,
  savedAddress: {
    name: "John Doe",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA",
  },
  savedPaymentMethod: {
    cardNumber: "1111-2222-3333-4444",
  },
});

const CartContext = React.createContext({
  cartItems: [
    { id: 1, name: "T-Shirt", price: 19.99, quantity: 2, imageUrl: "shirt.jpg" },
    { id: 2, name: "Jeans", price: 49.99, quantity: 1, imageUrl: "jeans.jpg" },
  ],
  total: 89.97,
});

export default function CheckoutFlow() {
  const [step, setStep] = useState(1);

  const [shippingData, setShippingData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
    shippingMethod: "standard",
  });

  const [useSameAddress, setUseSameAddress] = useState(true);
  const [billingData, setBillingData] = useState({ ...shippingData });
  const [cardNumber, setCardNumber] = useState("");

  const { isLoggedIn, savedAddress, savedPaymentMethod } = useContext(UserContext);
  const { cartItems, total } = useContext(CartContext);

  useEffect(() => {
    if (isLoggedIn) {
      setShippingData((prev) => ({ ...prev, ...savedAddress }));
      setBillingData((prev) => ({ ...prev, ...savedAddress }));
      setCardNumber(savedPaymentMethod.cardNumber || "");
    }
  }, [isLoggedIn]);

  const shippingCost =
    shippingData.shippingMethod === "standard" ? 5 : shippingData.shippingMethod === "express" ? 10 : 15;
  const tax = 0.08 * total;

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderProgress = () => (
    <div className="progress mb-4">
      {["Cart", "Shipping", "Payment", "Review", "Confirmation"].map((label, index) => (
        <div
          key={label}
          className={`progress-bar ${step >= index + 1 ? "bg-success" : ""}`}
          role="progressbar"
          style={{ width: `${100 / 5}%` }}
          aria-valuenow={(index + 1) * 20}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {label}
        </div>
      ))}
    </div>
  );

  const renderShippingForm = () => (
    <form className="row g-3" onSubmit={(e) => e.preventDefault() || nextStep()}>
      <h4>Shipping Address</h4>
      {["name", "street", "city", "state", "postalCode", "country"].map((field, idx) => (
        <div className="col-md-6" key={idx}>
          <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type="text"
            className="form-control"
            value={shippingData[field]}
            onChange={(e) => setShippingData({ ...shippingData, [field]: e.target.value })}
            required
          />
        </div>
      ))}
      <div className="col-md-12">
        <label className="form-label">Shipping Method</label>
        {["standard", "express", "overnight"].map((method) => (
          <div className="form-check" key={method}>
            <input
              className="form-check-input"
              type="radio"
              name="shippingMethod"
              value={method}
              checked={shippingData.shippingMethod === method}
              onChange={(e) => setShippingData({ ...shippingData, shippingMethod: method })}
            />
            <label className="form-check-label">
              {method.charAt(0).toUpperCase() + method.slice(1)} (${method === "standard" ? 5 : method === "express" ? 10 : 15})
            </label>
          </div>
        ))}
      </div>
      <div className="col-md-12 text-end">
        <button type="submit" className="btn btn-primary">
          Next → Payment
        </button>
      </div>
    </form>
  );

  const renderPaymentForm = () => (
    <form className="row g-3" onSubmit={(e) => e.preventDefault() || nextStep()}>
      <h4>Payment Information</h4>
      <div className="col-md-12">
        <label className="form-label">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={useSameAddress}
            onChange={(e) => setUseSameAddress(e.target.checked)}
          />
          Use shipping address as billing address
        </label>
      </div>
      {!useSameAddress &&
        ["name", "street", "city", "state", "postalCode", "country"].map((field, idx) => (
          <div className="col-md-6" key={idx}>
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              className="form-control"
              value={billingData[field]}
              onChange={(e) => setBillingData({ ...billingData, [field]: e.target.value })}
              required
            />
          </div>
        ))}
      <div className="col-md-12">
        <label className="form-label">Card Number</label>
        <input
          type="text"
          className="form-control"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <div className="col-md-12 text-end">
        <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>
          ← Back
        </button>
        <button type="submit" className="btn btn-primary">
          Next → Review
        </button>
      </div>
    </form>
  );

  const renderReview = () => (
    <div>
      <h4>Review Your Order</h4>
      <div>
        <h5>Shipping Information</h5>
        <p>{`${shippingData.name}, ${shippingData.street}, ${shippingData.city}, ${shippingData.state}, ${shippingData.postalCode}, ${shippingData.country}`}</p>
      </div>
      <div>
        <h5>Billing Information</h5>
        <p>{`${billingData.name}, ${billingData.street}, ${billingData.city}, ${billingData.state}, ${billingData.postalCode}, ${billingData.country}`}</p>
      </div>
      <div>
        <h5>Payment Method</h5>
        <p>Card ending in {cardNumber.slice(-4)}</p>
      </div>
      <div>
        <h5>Order Summary</h5>
        <ul className="list-group">
          {cartItems.map((item) => (
            <li key={item.id} className="list-group-item">
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
        <p>Subtotal: ${total.toFixed(2)}</p>
        <p>Shipping: ${shippingCost.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <hr />
        <p>Total: ${(total + shippingCost + tax).toFixed(2)}</p>
      </div>
      <div className="text-end">
        <button className="btn btn-secondary me-2" onClick={prevStep}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          Confirm Order
        </button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div>
      <h4>Order Confirmation</h4>
      <p>Thank you for your order! Your order has been placed successfully.</p>
      <p>You will receive a confirmation email shortly.</p>
    </div>
  );

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          {renderProgress()}
          {step === 1 && renderShippingForm()}
          {step === 2 && renderPaymentForm()}
          {step === 3 && renderReview()}
          {step === 4 && renderConfirmation()}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                {item.name}
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <p>Subtotal: ${total.toFixed(2)}</p>
            <p>Shipping: ${shippingCost.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <hr />
            <p>Total: ${(total + shippingCost + tax).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
