import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
const baseURL = 'http://35.226.59.207';
// const baseURL = 'http://localhost:8080';

function ViewStatProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${baseURL}/furniture/statistics/top10`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchProducts();
    }, []);

    return (
        <div className="m-3">
            <h1 class="display-4" >Top 10 Furniture Products</h1>
            <div className="row">
                {Object.values(products).map(product => (
                    <div key={product.id} className="col-md-4 p-3">
                        <div className="card">
                            <img src={product.imageUrl === "not found" ? "imagenotfound.png" : product.imageUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Type: {product.type}</li>
                                <li className="list-group-item">Sold Quantity: {product.soldQuantity}</li>
                                <li className="list-group-item">Original Price: {product.originalPrice}</li>
                                <li className="list-group-item">Discounted Price: {product.discountedPrice}</li>
                                <li className="list-group-item">Has Discount: {product.hasDiscount ? 'Yes' : 'No'}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default ViewStatProducts;
