import React from "react";
// import "../styles/UserAccount.css";

const UserAccount = ({ user, orders }) => {
  return (
    <>      
      <div className="user-account-container">
        <div className="main-content">
          <h2>My Account</h2>
          <div className="section">
            <h3>Personal Information</h3>
            <div className="details">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>
          <div className="section">
            <h3>Order History</h3>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>${order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
