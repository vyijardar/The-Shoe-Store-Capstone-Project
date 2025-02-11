
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");

    const userRole = localStorage.getItem("role");  

    if (!token) {
        // If no token is found, redirect to login
        return <Navigate to="/login" />;
    }

    // Check if the user's role matches the required role
    if (role && userRole !== role) {
      
        return <Navigate to="/" />;
    }

    return children; 
};

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//     const isAuthenticated = !!localStorage.getItem("adminToken"); // Check if the adminToken exists in localStorage
//     return isAuthenticated ? children : <Navigate to="/admin/login" />;
// };

// export default ProtectedRoute;