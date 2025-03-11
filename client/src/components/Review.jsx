export default function Review () {
      // For guest checkout: optional account creation
      const [createAccount, setCreateAccount] = useState(false);
    
      // Handle order completion
      const handleOrderComplete = async () => {
        if (!isLoggedIn && createAccount) {
          console.log('Creating user account:', shippingData);
          try {
            const response = await fetch(`${api}/api/users`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstname,
                lastname,
                email,
                password,
              }),
            });
            const result = await response.json();
            if (response.ok) {
              if (result.token) {
                alert("Registered Successfully");
                navigate('/login'); // Redirect to login after registration             
              } else {
                setError({ global: "Failed to sign up, no token received" });
              }
            } else {
              setError({ global: "An error occurred during signup" });
            }
          } catch (error) {
            setError({ global: error.message });
          }
        }
        const orderPayload = {
          user_id: user.id,
          cart_items: cartItems.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          total_price: total + shippingCost + tax,
          billing_address: billingData,
          shipping_address: shippingData,
        };
    
        // Create order.
        const orderResponse = await fetch(`${api}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
        if (!orderResponse.ok) throw new Error("Order creation failed");
        const orderData = await orderResponse.json();
        console.log("Order created:", orderData);
    
        // Simulate payment.
        const paymentPayload = {
          user_id: user.id,
          order_id: orderData.orderId, // Ensure your backend returns an orderId field.
          amount: orderPayload.total_price,
          payment_method: "credit_card", // Or derive from user input.
        };
        const paymentResponse = await fetch(`${api}/api/payments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentPayload),
        });
        if (!paymentResponse.ok) throw new Error("Payment failed");
        const paymentData = await paymentResponse.json();
        console.log("Payment processed:", paymentData);
    
        // Clear the cart (if applicable).
        setCartItems([]);
        nextStep();
      };
     
    return (
        <div className="checkout-step">
            <h2 className="checkout-section-title">Review Your Order</h2>

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
}