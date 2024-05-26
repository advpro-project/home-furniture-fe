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
        <div style={styles.container}>
            <h2 style={styles.heading}>Top Up Balance</h2>
            <div style={styles.formGroup}>
                <input 
                    type="text" 
                    placeholder="User ID" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={amount} 
                    onChange={(e) => setAmount(parseFloat(e.target.value))} 
                    style={styles.input}
                />
            </div>
            <button onClick={handleTopUp} style={styles.button}>Top Up</button>
            <p style={styles.message}>{message}</p>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '400px',
        margin: 'auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '50px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        marginBottom: '20px',
        color: '#333',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#333',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    buttonHover: {
        backgroundColor: '#555',
    },
    message: {
        marginTop: '20px',
        fontSize: '16px',
        color: '#333',
    }
};

export default TopUp;

