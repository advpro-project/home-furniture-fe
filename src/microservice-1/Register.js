import React, { useState } from 'react';

const Register = ({ setView }) => {
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('MALE');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PEMBELI');
    const [walletBalance, setWalletBalance] = useState(0);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const baseURL = 'http://34.143.229.201';
    // const baseURL = 'http://localhost:8080';

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = {
            fullName,
            dateOfBirth,
            gender,
            username,
            email,
            password,
            role,
            walletBalance
        };

        try {
            const response = await fetch(`${baseURL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setFullName('');
            setDateOfBirth('');
            setGender('MALE');
            setUsername('');
            setEmail('');
            setPassword('');
            setRole('PEMBELI');

            setSuccessMessage('Registration successful!');

            setTimeout(() => {
                setView('login');
            }, 1500);

        } catch (error) {
            //400 Bad Request
            console.log(error.message);
            if (!fullName || !dateOfBirth || !username || !email || !password) {
                setErrorMessage('Please fill in all required fields.');
                return;
            } else if (error.message === 'Network response was not ok') {
                setErrorMessage('Email Anda sudah terdaftar!');
            }
        }
    };

    return (
        <div className="container">
            <h2 className="fw-bold">Register</h2>
            <form onSubmit={handleRegister} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" id="fullName" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                    <input type="date" id="dateOfBirth" className="form-control" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select id="gender" className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select id="role" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="PEMBELI">Pembeli</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
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

export default Register;