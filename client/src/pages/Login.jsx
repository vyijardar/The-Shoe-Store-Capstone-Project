import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken ,setisLoggedIn}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function validateForm() {
        const errors = {};

        if (!email.trim()) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email address.";
        }
    
        if (!password.trim()) {
            errors.password = "Password is required.";
        } else if (password.length < 4) {
            errors.password = "Password must be at least 4 characters long.";
        }

        return errors;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }
        setError("");

        try {
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const result = await response.json();
            if (result.token) {
                setToken(result.token);
                localStorage.setItem("token", result.token);
                alert("Logged in successfully");
                navigate("/account");
            } else {
                throw new Error("Failed to sign up, no token received");
            }
        } catch (error) {
            setError({ global: error.message });
        }
    }
      // Simulate a login process
      const handleLogin = () => {
        // If credentials are valid, set the token
        setToken('fake-token');  // Replace with actual token from API
        setisLoggedIn(true);
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Email input */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${error.email ? "is-invalid" : ""}`}
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                    {error.email && <div className="invalid-feedback">{error.email}</div>}
                                </div>

                                {/* Password input */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${error.password ? "is-invalid" : ""}`}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                    {error.password && <div className="invalid-feedback">{error.password}</div>}
                                </div>

                                {/* Submit Button */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-link"
                                            onClick={() => navigate("/signup")}
                                        >
                                            Don't have an account? Register Here!
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Global error */}
                            {error.global && <div className="alert alert-danger mt-3">{error.global}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
