import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulated login logic
        setTimeout(() => {
            if (username === 'admin' && password === 'password123') {
                const fakeToken = 'dummy-jwt-token';
                localStorage.setItem('adminToken', fakeToken);
                setToken(fakeToken);
                navigate('/admin/products');
            } else {
                setError('Invalid credentials. Please try again.');
            }
            setIsLoading(false);
        }, 1000); // Simulating network delay
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ textAlign: 'left' }}>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    />
                </label>
                <label style={{ textAlign: 'left' }}>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    />
                </label>
                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
        </div>
    );
}
