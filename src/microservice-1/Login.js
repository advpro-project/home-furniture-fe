import React, { useState } from 'react';
import axios from "axios";

const Login = ({ setView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const baseURL = 'http://34.143.229.201';
    // const baseURL = 'http://localhost:8080';

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        };

        try {
            const response = await axios.post(`${baseURL}/auth/login`, loginData);

            if (!response.data.token) {
                throw new Error('Login failed');
            }

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data.userData));

            setSuccessMessage('Login successful! Redirect to homepage in 1.5 seconds...');

            setTimeout(() => {
                setView('home');
            }, 1500);

        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                setErrorMessage('Email atau password Anda salah!');
            } else {
                setErrorMessage(error.message);
            }

        }
    };

    return (
        <div className="container">
            <h2 className="fw-bold">Login</h2>
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
