import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BuyProduct = () => {
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [message, setMessage] = useState('');
    const [wallet, setWallet] = useState('');

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/purchase/balance?userId=${userId}`);
                setWallet(response.data);
            } catch (error) {
                console.error('Failed to fetch wallet balance');
            }
        };

        if (userId) {
            fetchWallet();
        }
    }, [userId]);

    const handleBuyProduct = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/purchase/buy', {
                userId,
                productId,
                totalPrice,
                paymentMethod,
                promoCode
            });
            setMessage('Purchase successful!');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Buy Product</h2>
            <div style={styles.balance}>Wallet Balance: {wallet}</div>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                style={styles.input}
            />
            <input
                type="number"
                placeholder="Total Price"
                value={totalPrice}
                onChange={(e) => setTotalPrice(parseFloat(e.target.value))}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Payment Method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleBuyProduct} style={styles.button}>Buy</button>
            <p style={styles.message}>{message}</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '50px',
    },
    heading: {
        marginBottom: '20px',
        color: '#333',
    },
    balance: {
        fontSize: '20px',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '10px',
        margin: '20px 0',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#333',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#555',
    },
    message: {
        color: '#333',
        fontSize: '14px',
        marginTop: '10px',
    }
};

export default BuyProduct;
