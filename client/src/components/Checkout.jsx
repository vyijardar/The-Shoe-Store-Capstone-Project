import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
  });
  const [billingData, setBillingData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
  });
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [cardNumber, setCardNumber] = useState("");

  const { cartItems, total } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (useSameAddress) {
      setBillingData({ ...shippingData });
    }
  }, [useSameAddress, shippingData]);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const handleOrderComplete = () => {
    alert("Order placed successfully!");
    navigate("/thank-you");
  };

  return (
    <div className="checkout-container">
      {step === 1 && (
        <div className="checkout-step">
          <h2>Shipping Information</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNextStep();
            }}
          >
            <label>
              Name:
              <input
                type="text"
                value={shippingData.name}
                onChange={(e) =>
                  setShippingData({ ...shippingData, name: e.target.value })
                }
                required
              />
            </label>
            <label>
              Street:
              <input
                type="text"
                value={shippingData.street}
                onChange={(e) =>
                  setShippingData({ ...shippingData, street: e.target.value })
                }
                required
              />
            </label>
            <label>
              City:
              <input
                type="text"
                value={shippingData.city}
                onChange={(e) =>
                  setShippingData({ ...shippingData, city: e.target.value })
                }
                required
              />
            </label>
            <label>
              State:
              <input
                type="text"
                value={shippingData.state}
                onChange={(e) =>
                  setShippingData({ ...shippingData, state: e.target.value })
                }
                required
              />
            </label>
            <label>
              Postal Code:
              <input
                type="text"
                value={shippingData.postalCode}
                onChange={(e) =>
                  setShippingData({
                    ...shippingData,
                    postalCode: e.target.value,
                  })
                }
                required
              />
            </label>
            <button type="submit">Next</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="checkout-step">
          <h2>Payment Information</h2>
          <label>
            <input
              type="checkbox"
              checked={useSameAddress}
              onChange={(e) => setUseSameAddress(e.target.checked)}
            />
            Use same address as shipping
          </label>
          {!useSameAddress && (
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={billingData.name}
                  onChange={(e) =>
                    setBillingData({ ...billingData, name: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Street:
                <input
                  type="text"
                  value={billingData.street}
                  onChange={(e) =>
                    setBillingData({ ...billingData, street: e.target.value })
                  }
                  required
                />
              </label>
              {/* Add remaining billing fields */}
            </div>
          )}
          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </label>
          <div>
            <button onClick={handlePreviousStep}>Back</button>
            <button onClick={handleNextStep}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="checkout-step">
          <h2>Order Review</h2>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
          ))}
          <p>Total: ${total.toFixed(2)}</p>
          <div>
            <button onClick={handlePreviousStep}>Back</button>
            <button onClick={handleOrderComplete}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
}

