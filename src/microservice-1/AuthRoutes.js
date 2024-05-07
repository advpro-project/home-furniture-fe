import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default AuthRoutes;
