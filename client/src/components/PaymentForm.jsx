export default function PaymentForm() {
      // Payment field
      const [cardNumber, setCardNumber] = useState('');
    
    
    // Basic card validation (12 digits)
    const isCardValid = () => {
        const digitsOnly = cardNumber.replace(/\D/g, '');
        return digitsOnly.length === 12;
    };
    return (
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
}