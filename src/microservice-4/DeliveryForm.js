import React, { useState, useEffect } from 'react';
import { getFurnitures } from './FetchData';

const DeliveryForm = () => {
    const [furnitures, setFurnitures] = useState([]);
    const [userData, setUserData] = useState(null);
    const [furnitureList, setFurnitureList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFurnitures();
                const furnituresData = response.content; 
                setFurnitures(furnituresData);

                setFurnitureList(furnituresData);
                
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

        const transportation = { type: null };

        // Debug logs
        console.log('Furniture list:', furnitureList);
        console.log('User email:', userData ? userData.email : 'No user data');
        console.log('Transportation:', transportation);

        const requestBody = {
            status: "MENUNGGU_VERIFIKASI",
            transportation: transportation,
            furnitureList: furnitureList, 
            userEmail: userData.email,
        };

        try {
            const response = await fetch('http://34.101.59.10:8081/deliveries/delivery/create', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });
            console.log(response.body)
            if (!response.ok) {
                console.log(response)
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
