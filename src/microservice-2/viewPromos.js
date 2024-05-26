import React, { useEffect, useState } from 'react';
const baseURL = 'http://35.226.59.207';
// const baseURL = 'http://localhost:8080';

function ViewPromos() {
    const [promos, setpromos] = useState([]);

    useEffect(() => {
        const fetchpromos = async () => {
            try {
                const response = await fetch(`${baseURL}/promos/all`);
                const data = await response.json();
                setpromos(data);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchpromos();
    }, []);

    return (
        <div>
            <h1>Promos</h1>
            <ul>
                {promos.map(promo => (
                    <div key={promo.id}>
                        <h2>{promo.name}</h2>
                        <p>Description: {promo.description}</p>
                        <p>Minimum Purchase: {promo.minimumPurchase}</p>
                        <p>Valid Until: {promo.validUntil}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

// Get a promo by ID
async function getPromo(id) {
    try {
        const response = await fetch(`${baseURL}/promos/get/${id}`);
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add a new promo
async function addPromo(newPromo) {
    try {
        const response = await fetch(`${baseURL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPromo),
        });
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Update a promo
async function updatePromo(id, updatedPromo) {
    try {
        const response = await fetch(`${baseURL}/promos/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPromo),
        });
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Delete a promo
async function deletePromo(id) {
    try {
        const response = await fetch(`${baseURL}/promos/delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export default ViewPromos;