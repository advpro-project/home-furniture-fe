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
        <div className="m-3">
            <h1>Promo Codes</h1>
            <button className="btn btn-secondary m-1" >Add new Promo code</button>
            <div className="row">
                {Object.values(promos).map(promo => (
                    <div key={promo.id} className="col-md-4 p-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{promo.name}</h5>
                                <p className="card-text">{promo.description}</p>
                                <button className="btn btn-secondary m-1" >Update</button>
                                <button className="btn btn-danger m-1" >Delete</button>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Minimum Purchase: {promo.minimumPurchase}</li>
                                <li className="list-group-item">Valid Until: {promo.validUntil}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
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
