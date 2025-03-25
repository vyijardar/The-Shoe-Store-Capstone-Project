import { useNavigate } from "react-router-dom";
export default function Confirmation() {

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

  // For guest checkout: optional account creation
  const [createAccount, setCreateAccount] = useState(false);

  const { isLoggedIn, savedAddress, savedPaymentMethod } = useContext(UserContext);
  const { cartItems, total } = useContext(CartContext);
  const navigate = useNavigate();

  // Shipping cost & tax logic
  const shippingCost =
    shippingData.shippingMethod === 'standard'
      ? 5
      : shippingData.shippingMethod === 'express'
        ? 10
        : 15;
  const tax = 0.08 * total;

    return (
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
}