import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            // NOTE: The URL must match your backend server address!
            const res = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password
            });

            // 1. Store the token in local storage (This is how we pass the PrivateRoute check!)
            localStorage.setItem('token', res.data.token);
            
            // 2. Redirect to the protected dashboard page
            navigate('/dashboard');

        } catch (err) {
            // Display error message from the backend (e.g., "Invalid Credentials")
            const msg = err.response?.data?.message || 'Login failed';
            setError(msg);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
        </div>
    );
}