import React, { useState } from 'react';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        };

        try {
            const response = await axios.post('http://34.143.229.201/auth/login', loginData);

            if (!response.data.token) {
                throw new Error('Login failed');
            }

            localStorage.setItem('token', response.data.token);

            setSuccessMessage('Login successful! Redirect to homepage in 1.5 seconds...');

            setTimeout(() => {
                window.location.href = 'http://34.143.229.201/';
            }, 1500);

        } catch (error) {

            setErrorMessage(error.message);
            console.error('There was a problem with the login:', error.message);

        }
    };

    return (
        <div className="container">
            <h2 className="mt-4">Login</h2>
            <form onSubmit={handleLogin} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default Login;
