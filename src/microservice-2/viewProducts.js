import React, { useEffect, useState } from 'react';

function ViewProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://35.226.59.207/promos/all');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchProducts();
    }, []);

    return renderProducts(products);
}

function renderProducts(products) {
    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Type: {product.type}</p>
                        <p>Description: {product.description}</p>
                        <img src={product.imageUrl} alt={product.name} />
                        <p>Sold Quantity: {product.soldQuantity}</p>
                        <p>Original Price: {product.originalPrice}</p>
                        <p>Discounted Price: {product.discountedPrice}</p>
                        <p>Has Discount: {product.hasDiscount ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default ViewProducts;
