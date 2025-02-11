import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../css/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({setToken,setisLoggedIn}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setisLoggedIn(false);
    setToken(null);
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="dashboard-layout" style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? "☰" : "✖"}
        </button>
        {!isCollapsed && (
          <>
            <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/products" className={({ isActive }) => (isActive ? "active" : "")}>
              Products
            </NavLink>
            <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")}>
              Users
            </NavLink>
            <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? "active" : "")}>
              Orders
            </NavLink>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
