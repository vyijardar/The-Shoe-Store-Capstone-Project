
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

export default function DashboardLayout() {
 
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };


  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="bg-dark text-white p-3 vh-100 position-fixed" style={{ width: '250px' }}>
        <h2 className="text-center">Admin Dashboard</h2>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <NavLink to="/admin/products" className="nav-link text-white" activeClassName="active">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/users" className="nav-link text-white" activeClassName="active">
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <button className="btn btn-danger mt-3 w-100" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className="flex-grow-1 ms-250 p-4" style={{ marginLeft: '250px' }}>
        <Outlet />
      </div>
    </div>
  );
}
