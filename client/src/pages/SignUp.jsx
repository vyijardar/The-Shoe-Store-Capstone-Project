import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    function validateForm() {
        const errors = {};

        if (!firstname.trim()) {
            errors.firstname = "First Name is required.";
        }
        if (!lastname.trim()) {
            errors.lastname = "Last Name is required.";
        }
        if (!email.trim()) {
            errors.email = "Email address is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email address";
        }
        if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        } else if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
            errors.password = "Password must contain at least one special character.";
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

        setError([]);

        try {
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    password,
                }),
            });

            const result = await response.json();

            if (result.token) {
                setToken(result.token);
                localStorage.setItem('token', result.token);
                alert("Registered Successfully");
                navigate('/login'); // Navigate to login page after registration
            } else {
                throw new Error("Failed to sign up, no token received");
            }
        } catch (error) {
            setError({ global: error.message });
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Registration</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* First Name input */}
                                <div className="mb-3">
                                    <label htmlFor="firstname" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error.firstname ? "is-invalid" : ""}`}
                                        id="firstname"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        placeholder="Enter your first name"
                                    />
                                    {error.firstname && <div className="invalid-feedback">{error.firstname}</div>}
                                </div>

                                {/* Last Name input */}
                                <div className="mb-3">
                                    <label htmlFor="lastname" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error.lastname ? "is-invalid" : ""}`}
                                        id="lastname"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        placeholder="Enter your last name"
                                    />
                                    {error.lastname && <div className="invalid-feedback">{error.lastname}</div>}
                                </div>

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
                                    <button type="submit" className="btn btn-primary">Register</button>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-link"
                                            onClick={() => navigate("/login")}
                                        >
                                            Already have an account? Login Here!
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
