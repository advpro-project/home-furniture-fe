import React, { useEffect, useState } from 'react';

function ViewPromos() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:8080/promos/all');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Description: {product.description}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default ViewPromos;
