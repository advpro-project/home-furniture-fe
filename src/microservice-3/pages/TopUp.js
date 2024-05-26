import React, { useState } from 'react';
import axios from 'axios';

const TopUp = () => {
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');

    const handleTopUp = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/purchase/top-up', {
                userId,
                amount
            });
            setMessage('Top-up successful!');
        } catch (error) {
            setMessage('Top-up failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Top Up Balance</h2>
            <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
            <button onClick={handleTopUp}>Top Up</button>
            <p>{message}</p>
        </div>
    );
};

export default TopUp;
