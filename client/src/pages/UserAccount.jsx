import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = ({ token, setToken, setIsLoggedIn }) => {
    const [accountInfo, setAccountInfo] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login"); // Redirect to login page if no token
        } else {
            fetchAccountInfo(); // Fetch account info when token is present
            fetchOrderHistory(); // Fetch order history (using dummy data here)
        }
    }, [token, navigate]);

    // Fetch user account info from the API (Simulated with dummy data)
    const fetchAccountInfo = async () => {
        try {
            const data = {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
            };
            setAccountInfo(data);
        } catch (error) {
            console.error("Failed to fetch account info", error);
        }
    };

    // Fetch order history from the API (Simulated with dummy data)
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

    // Handle logout
    const handleLogout = () => {
        setToken(null); // Clear the token
        setIsLoggedIn(false); // Update the login status
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-9">
                    {accountInfo ? (
                        <div>
                            <h1>Welcome, {accountInfo.firstName} {accountInfo.lastName}</h1>
                            <p>Email: {accountInfo.email}</p>
                        </div>
                    ) : (
                        <p>Loading account information...</p>
                    )}
                </div>

                <div className="col-lg-3">
                    {/* Logout button */}
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Order History Section */}
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
                                <button className="btn btn-info btn-sm">View Details</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Account;
