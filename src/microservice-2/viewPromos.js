import React, { useEffect, useState } from 'react';

function ViewPromos() {
    const [promos, setpromos] = useState([]);

    useEffect(() => {
        const fetchpromos = async () => {
            try {
                const response = await fetch('http://35.226.59.207/promos/all');
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
            <h1>promos</h1>
            <ul>
                {promos.map(promo => (
                    <div key={promo.id}>
                        <h2>{promo.name}</h2>
                        <p>Description: {promo.description}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default ViewPromos;
