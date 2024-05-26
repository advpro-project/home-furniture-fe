import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/purchase/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Failed to fetch transactions');
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.userId} bought {transaction.productId} for {transaction.totalPrice} using {transaction.paymentMethod} with promo code {transaction.promoCode}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
