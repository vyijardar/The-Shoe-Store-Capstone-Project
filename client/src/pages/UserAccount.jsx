import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const api = import.meta.env.VITE_API_URL || "http://localhost:3001";
export default function UserAccount({ token }) {
    const [accountInfo, setAccountInfo] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    // Fetch user account info from the API
    const fetchAccountInfo = async () => {
        try {
        
            const response = await fetch(`${api}/api/auth/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,  // Ensure the token is being sent correctly
                },
            });
        
          
            if (!response.ok) {
                console.error("Response not OK:", response.status, response.statusText);
                throw new Error("Failed to fetch account info");
            }
            const data = await response.json();
            setAccountInfo(data);
        } catch (error) {
            console.error("Failed to fetch account info", error);
        }
    };
  
    useEffect(() => {
        if (!token) {
            navigate("/login"); // Redirect to login page if no token
        } else {
            fetchAccountInfo(); // Fetch account info when token is present
            fetchOrderHistory(); // Fetch order history when token is present
        }
    }, [token, navigate]); // Re-run this effect when token changes

    // Fetch order history from the API
    const fetchOrderHistory = async () => {
        try {
            // Simulating an API response with dummy order data
            const dummyOrders = [
                {
                    id: "ORD12345",
                    date: "2025-01-18",
                    status: "Shipped",
                    total: 120.5,
                    items: [
                        { product: "Men's Sneakers", quantity: 1, price: 50 },
                        { product: "Women's Boots", quantity: 1, price: 70.5 },
                    ],
                },
                {
                    id: "ORD12346",
                    date: "2025-01-10",
                    status: "Delivered",
                    total: 85.0,
                    items: [
                        { product: "Running Shoes", quantity: 1, price: 85 },
                    ],
                },
            ];

            setOrders(dummyOrders);
        } catch (error) {
            console.error("Failed to fetch order history", error);
        }
    };

    const handleCheckout = () => {
        navigate("/checkout"); // Redirect to the checkout page
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-9">
                    {accountInfo ? (
                        <div>
                            <h1>Welcome, {accountInfo.firstname} {accountInfo.lastname}</h1>
                            <p><strong>Email:</strong> {accountInfo.email}</p>
                            <p><strong>Phone:</strong> {accountInfo.phone}</p>
                            <p><strong>Address:</strong> {accountInfo.address}</p>
                            {/* Add more fields as necessary */}
                        </div>
                    ) : (
                        <p>Loading account information...</p>
                    )}
                </div>

                {/* Order History Section */}
            </div>

            <div className="order-history mt-4">
                <h2>Your Order History</h2>
                {orders.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    <div className="list-group">
                        {orders.map((order) => (
                            <div key={order.id} className="list-group-item list-group-item-action mb-3">
                                <h5 className="mb-1">Order ID: {order.id}</h5>
                                <p className="mb-1">Date: {order.date}</p>
                                <p className="mb-1">Status: {order.status}</p>
                                <p className="mb-1">Total: ${order.total}</p>
                                <h6>Items:</h6>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.product} - Quantity: {item.quantity} - Price: ${item.price}
                                        </li>
                                    ))}
                                </ul>
                                <button className="btn btn-primary" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
