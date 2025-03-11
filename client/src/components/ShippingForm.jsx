
export default function ShippingForm () {

    
  // Navigation helpers
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

    const submitShippingForm = async (e) => {
        e.preventDefault();
        
        // For this example, we assume that if the user chooses to use the same address,
        // the billing address is the same as the shipping address.
        const billingAddress = shippingData; 
      
        try {
          const response = await fetch(`${api}/api/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.id,                 // from your UserContext
              cart_items: cartItems,            // from your CartContext
              total_price: total,               // total price (you can adjust to include shipping/tax if needed)
              billing_address: billingAddress,  // using shippingData as billing address here
              shipping_address: shippingData,   // shipping details from the form
            }),
          });
      
          if (!response.ok) {
            throw new Error("Checkout failed");
          }
      
          const data = await response.json();
          console.log("Checkout successful:", data);
          // Optionally, you could save the order ID returned in data.orderId
          // and then move to the next step (e.g. review or confirmation).
          nextStep();
        } catch (error) {
          console.error("Error during checkout:", error);
          alert("Checkout failed: " + error.message);
        }
        nextStep();
      };
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