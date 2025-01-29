import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("adminToken"); // Check if the adminToken exists in localStorage
    return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
