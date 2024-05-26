// src/components/DeliveryForm.js
import React, { useState, useEffect } from 'react';
import { getFurnitures } from './FetchData';
import { isLoggedIn } from '../microservice-1/authUtils';

const DeliveryForm = () => {
    const [furnitures, setFurnitures] = useState([]);
    const [userData, setUserData] = useState(null);
    const [selectedFurniture] = useState([]);
    const userLoggedIn = isLoggedIn();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFurnitures();
                const furnituresData = response.content; 
                setFurnitures(furnituresData);
                
                // Retrieve user data from localStorage
                const UserData = localStorage.getItem('userData');
                if (UserData) {
                    const parsedUserData = JSON.parse(UserData);
                    console.log('Retrieved userData from localStorage:', parsedUserData);
                    setUserData(parsedUserData);
                }
            } catch (error) {
                console.error('Error fetching furniture data:', error);
            }
        };
        fetchData();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://34.101.59.10:8081/deliveries/delivery/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: "MENUNGGU_VERIFIKASI",
                    furnitureList: selectedFurniture,
                    userDelivery: userLoggedIn
                }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to create delivery');
            }
    
            console.log('Delivery created successfully!');
        } catch (error) {
            console.error('Error creating delivery:', error);
        }
    };
    

    return (
        <div>
            <h1>Create Delivery</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User: </label>
                    <span>{userData ? userData.username : "Loading..."}</span>
                </div>
                <div>
                    <label>Furniture: </label>
                    <ul>
                        {Array.isArray(furnitures) ? (
                            furnitures.map(furniture => (
                                <li key={furniture.id}>{furniture.name}</li>
                            ))
                        ) : (
                            <li>Loading...</li>
                        )}
                    </ul>
                </div>
                <button type="submit">Create Delivery</button>
            </form>
        </div>
    );
};

export default DeliveryForm;
