
import { NavLink, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import "../../css/dashboard.css";

export default function DashboardLayout() {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <NavLink to="dashboard"   className={({ isActive }) => (isActive ? "active" : "")}>
          Dashboard
        </NavLink>
        <NavLink to="products"  className={({ isActive }) => (isActive ? "active" : "")}>
          Products
        </NavLink>
        <NavLink to="users"   className={({ isActive }) => (isActive ? "active" : "")}>
          Users
        </NavLink>
        <NavLink to="orders"   className={({ isActive }) => (isActive ? "active" : "")}>
          Orders
        </NavLink>
        <button onClick={handleLogout}>Logout</button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>

  );
}
