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
        <div style={styles.container}>
            <h2 style={styles.heading}>Transaction List</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>User ID</th>
                        <th style={styles.th}>Product ID</th>
                        <th style={styles.th}>Total Price</th>
                        <th style={styles.th}>Payment Method</th>
                        <th style={styles.th}>Promo Code</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} style={styles.tr}>
                            <td style={styles.td}>{transaction.userId}</td>
                            <td style={styles.td}>{transaction.productId}</td>
                            <td style={styles.td}>{transaction.totalPrice}</td>
                            <td style={styles.td}>{transaction.paymentMethod}</td>
                            <td style={styles.td}>{transaction.promoCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '50px',
    },
    heading: {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    th: {
        padding: '10px',
        borderBottom: '2px solid #ddd',
        textAlign: 'left',
        backgroundColor: '#f1f1f1',
        color: '#333',
    },
    tr: {
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        textAlign: 'left',
    },
};

export default TransactionList;
