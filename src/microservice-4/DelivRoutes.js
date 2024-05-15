import React from 'react';
import {Routes, Route} from 'react-router-dom'
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const DelivRoutes = () => {
    return (
        <Routes>
            <Route path="/admindeliv" element={<AdminDashboard />} />
            <Route path="/userdeliv" element={<UserDashboard />} />
        </Routes>
    );
};

export default DelivRoutes;