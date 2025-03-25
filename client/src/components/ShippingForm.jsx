import { useState, useContext, useEffect } from "react";
import React from "react";

export default function ShippingForm() {
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
    const { isLoggedIn, savedAddress, savedPaymentMethod } = useContext(UserContext);
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
  
  function submitShippingForm(){

  }
    return (
        <div className="checkout-step checkout-form">
            <h2 className="checkout-section-title">Shipping Address</h2>
            <form onSubmit={submitShippingForm} >
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
}