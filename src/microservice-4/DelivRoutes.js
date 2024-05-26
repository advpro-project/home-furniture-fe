import React, { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const DelivRoutes = ({ setView }) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        var userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            console.log('Retrieved userData from localStorage:', userData);
            setUserData(userData);
           }
    }, []);

    const userRole = userData.role;

    if (!userRole) {
        return <div>Loading...</div>;
    }

    return userRole === 'ADMIN' ? (
        <AdminDashboard setView={setView} />
    ) : (
        <UserDashboard setView={setView} />
    );
};

export default DelivRoutes;
