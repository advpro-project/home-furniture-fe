import React, { useEffect, useState } from 'react';
const baseURL = 'http://35.226.59.207';
// const baseURL = 'http://localhost:8080';

function ViewProducts() {
    const [products, setProducts] = useState([]);

    const [show, setShow] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});

    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({});

    const handleShow = (product) => {
        setCurrentProduct(product);
        setShow(true);
      };
      
    const handleClose = () => {
        setShow(false);
    };

    const handleAddShow = () => setShowAddModal(true);
    const handleAddClose = () => setShowAddModal(false);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${baseURL}/furniture/list`);
            const data = await response.json();
            setProducts(data.content);
        } catch (error) {
            console.log(error);
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        console.log('updateProduct called with id:', id, 'and updatedProduct:', updatedProduct);
        try {
            console.log('About to fetch...');
            const response = await fetch(`${baseURL}/furniture/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            
            console.log('Fetch completed. Response:', response);

            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
    
            console.log('Response OK. Parsing JSON...');
            const data = await response.json();
            console.log('JSON parsed. Data:', data);

            console.log('Updating products...');
            await fetchProducts();
            console.log('Products updated.');

            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addProduct = async (newProduct) => {
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
            await fetchProducts();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${baseURL}/furniture/delete/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
    
            const data = await response.json();
            await fetchProducts();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const getProduct = async (id) => {
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
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="m-3">

            {/* display all products */}
            <h1>Furniture Products</h1>
            <button className="btn btn-secondary m-1" onClick={handleAddShow}>Add new Product</button>
            <div className="row">
                {Object.values(products).map(product => (
                    <div key={product.id} className="col-md-4 p-3">
                        <div className="card">
                            <img src={product.imageUrl === "not found" ? "imagenotfound.png" : product.imageUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <button className="btn btn-secondary m-1" onClick={() => handleShow(product)}>Update</button>
                                <button className="btn btn-danger m-1" onClick={() => deleteProduct(product.internalId)}>Delete</button>
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

            {/* modal untuk update product */}
            <div className={`modal ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update Product</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input type="text" className="form-control" id="productName" defaultValue={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productType">Product Type</label>
                            <select className="form-control" id="productType" defaultValue={currentProduct.type} onChange={e => setCurrentProduct({...currentProduct, type: e.target.value})}>
                                <option value="Seating">Seating</option>
                                <option value="Tables">Tables</option>
                                <option value="Storage">Storage</option>
                                <option value="Beds">Beds</option>
                                <option value="Desks">Desks</option>
                                <option value="Outdoor Furniture">Outdoor Furniture</option>
                                <option value="Entertainment Units">Entertainment Units</option>
                                <option value="Accent Furniture">Accent Furniture</option>
                                <option value="Office Furniture">Office Furniture</option>
                                <option value="Dining Furniture">Dining Furniture</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productDescription">Product Description</label>
                            <input type="text" className="form-control" id="productName" defaultValue={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productImageURL">Product imageURL</label>
                            <input type="text" className="form-control" id="productName" defaultValue={currentProduct.imageUrl} onChange={e => setCurrentProduct({...currentProduct, imageUrl: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productSoldQuantity">Product Sold Quantity</label>
                            <input type="text" className="form-control" id="productName" defaultValue={currentProduct.soldQuantity} onChange={e => setCurrentProduct({...currentProduct, soldQuantity: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productOriginalPrice">Product Original Price</label>
                            <input type="text" className="form-control" id="productName" defaultValue={currentProduct.originalPrice} onChange={e => setCurrentProduct({...currentProduct, originalPrice: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productDiscountedPrice">Product Discounted Price</label>
                            <input type="text" className="form-control" id="productName" defaultValue={currentProduct.discountedPrice} onChange={e => setCurrentProduct({...currentProduct, discountedPrice: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productHasDiscount">Product hasDiscount</label>
                            <select className="form-control" id="productHasDiscount" defaultValue={currentProduct.hasDiscount} onChange={e => setCurrentProduct({...currentProduct, hasDiscount: e.target.value})}>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    <button type="button" className="btn btn-secondary" onClick={() => { updateProduct(currentProduct.internalId, currentProduct); handleClose(); }}>Save Changes</button>
                </div>
                </div>
            </div>
            </div>

            {/* modal untuk add product */}
            <div className={`modal ${showAddModal ? 'show d-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add New Product</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input type="text" className="form-control" id="productName" onChange={e => setNewProduct({...newProduct, name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productType">Product Type</label>
                            <select className="form-control" id="productType" onChange={e => setNewProduct({...newProduct, type: e.target.value})}>
                                <option value="Seating">Seating</option>
                                <option value="Tables">Tables</option>
                                <option value="Storage">Storage</option>
                                <option value="Beds">Beds</option>
                                <option value="Desks">Desks</option>
                                <option value="Outdoor Furniture">Outdoor Furniture</option>
                                <option value="Entertainment Units">Entertainment Units</option>
                                <option value="Accent Furniture">Accent Furniture</option>
                                <option value="Office Furniture">Office Furniture</option>
                                <option value="Dining Furniture">Dining Furniture</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productDescription">Product Description</label>
                            <input type="text" className="form-control" id="productName" onChange={e => setNewProduct({...newProduct, description: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productImageURL">Product imageURL</label>
                            <input type="text" className="form-control" id="productName" onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productSoldQuantity">Product Sold Quantity</label>
                            <input type="text" className="form-control" id="productName" onChange={e => setNewProduct({...newProduct, soldQuantity: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productOriginalPrice">Product Original Price</label>
                            <input type="text" className="form-control" id="productName" onChange={e => setNewProduct({...newProduct, originalPrice: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productDiscountedPrice">Product Discounted Price</label>
                            <input type="text" className="form-control" id="productName" onChange={e => setNewProduct({...newProduct, discountedPrice: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productHasDiscount">Product hasDiscount</label>
                            <select className="form-control" id="productHasDiscount" onChange={e => setNewProduct({...newProduct, hasDiscount: e.target.value})}>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleAddClose}>Close</button>
                    <button type="button" className="btn btn-secondary" onClick={() => { addProduct(newProduct); handleClose(); }}>Save Product</button>
                </div>
                </div>
            </div>
            </div>

        </div>
    );
}

export default ViewProducts;
