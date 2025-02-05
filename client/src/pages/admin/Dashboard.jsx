import React from "react";

export default function Dashboard() {
  return (
    <div className="container ">
      <h2  className="text-center">Welcome to the Admin Dashboard</h2>
      <p className="text-center">Here you can manage products, orders, and settings.</p>
      {/* Add some widgets or statistics here */}
      <div className="d-flex justify-content-around te">
        <div className="card p-4">
          <h5>Total Products</h5>
          <p>50</p>
        </div>
        <div className="card p-4">
          <h5>Total Orders</h5>
          <p>120</p>
        </div>
      </div>
    </div>
  );
}
