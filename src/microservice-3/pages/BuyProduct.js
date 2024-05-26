import React, { useState } from 'react';
import axios from 'axios';

const BuyProduct = () => {
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [message, setMessage] = useState('');

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
        <div>
            <h2>Buy Product</h2>
            <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
            <input type="number" placeholder="Total Price" value={totalPrice} onChange={(e) => setTotalPrice(parseFloat(e.target.value))} />
            <input type="text" placeholder="Payment Method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
            <input type="text" placeholder="Promo Code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
            <button onClick={handleBuyProduct}>Buy</button>
            <p>{message}</p>
        </div>
    );
};

export default BuyProduct;
