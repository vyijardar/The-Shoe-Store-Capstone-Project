import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../css/dashboard.css";

export default function DashboardLayout() {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <NavLink to="/admin/products" activeClassName="active">
          Products
        </NavLink>
        <NavLink to="/admin/users" activeClassName="active">
          Users
        </NavLink>
        <button onClick={handleLogout}>Logout</button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
