import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register';
const Urls = () => {
    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
        </Routes>
    );
};

export default Urls;