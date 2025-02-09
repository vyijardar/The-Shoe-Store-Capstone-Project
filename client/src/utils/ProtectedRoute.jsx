
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");  // Assuming you store userRole in localStorage

    if (!token) {
        // If no token is found, redirect to login
        return <Navigate to="/login" />;
    }
     
    // Check if the user's role matches the required role
    if (role && userRole !== role) {
        // If the role doesn't match, redirect to an access denied or different page
        return <Navigate to="/" />;
    }

    return children;  // If authenticated and the role matches, allow access
};

export default ProtectedRoute;
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//     const isAuthenticated = !!localStorage.getItem("adminToken"); // Check if the adminToken exists in localStorage
//     return isAuthenticated ? children : <Navigate to="/admin/login" />;
// };

// export default ProtectedRoute;