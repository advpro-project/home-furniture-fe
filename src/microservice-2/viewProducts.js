import React, { useEffect, useState } from 'react';
const baseURL = 'http://35.226.59.207';
// const baseURL = 'http://localhost:8080';

function ViewProducts() {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});

    const handleShow = (product) => {
        setCurrentProduct(product);
        setShow(true);
      };
      
      const handleClose = () => {
        setShow(false);
      };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${baseURL}/furniture/list`);
                const data = await response.json();
                setProducts(data.content);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchProducts();
    }, []);

    return (
        <div className="m-3">
            <h1>Furniture Products</h1>
            <button className="btn btn-primary m-1" onClick={() => addProduct()}>Add new Product</button>
            <div className="row">
                {Object.values(products).map(product => (
                    <div key={product.id} className="col-md-4 p-3">
                        <div className="card">
                            <img src={product.imageUrl === "not found" ? "imagenotfound.png" : product.imageUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <button className="btn btn-primary m-1" onClick={() => handleShow(product)}>Update</button>
                                <button className="btn btn-danger m-1" onClick={() => deleteProduct(product.id)}>Delete</button>
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

            <div className={`modal ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update Product</h5>
                    <button type="button" className="close" onClick={handleClose}>
                    <span>&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input type="text" className="form-control" id="productName" defaultValue={currentProduct.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productName">Product Type</label>
                        <input type="text" className="form-control" id="productName" defaultValue={currentProduct.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productName">Product Description</label>
                        <input type="text" className="form-control" id="productName" defaultValue={currentProduct.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productName">Product imageURL</label>
                        <input type="text" className="form-control" id="productName" defaultValue={currentProduct.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productName">Product Sold Quantity</label>
                        <input type="text" className="form-control" id="productName" defaultValue={currentProduct.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productName">Product Original Price</label>
                        <input type="text" className="form-control" id="productName" defaultValue={currentProduct.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productName">Product Discounted Price</label>
                        <input type="text" className="form-control" id="productName" defaultValue={currentProduct.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productName">Product hasDiscount</label>
                        <input type="text" className="form-control" id="productName" defaultValue={currentProduct.name} />
                    </div>
                    {/* Add other form groups for other product attributes... */}
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={updateProduct}>Save Changes</button>
                </div>
                </div>
            </div>
            </div>

        </div>
    );
}

async function updateProduct(id, updatedProduct) {
    try {
        const response = await fetch(`${baseURL}/furniture/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
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

async function addProduct(newProduct) {
    try {
        const response = await fetch(`${baseURL}/furniture/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
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

async function deleteProduct(id) {
    try {
        const response = await fetch(`${baseURL}/furniture/delete/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();
        ViewProducts();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getProduct(id) {
    try {
        const response = await fetch(`${baseURL}/get/${id}`);

        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export default ViewProducts;
