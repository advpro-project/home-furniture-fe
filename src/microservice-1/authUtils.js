import axios from 'axios';

export const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};

export const logout = async () => {
    try {
        //post with header bearer token
        // await axios.post('http://localhost:8080/auth/logout', {}, {
        await axios.post('http://34.143.229.201/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = '/';
    } catch (error) {
        console.error('Failed to logout:', error);
    }
};