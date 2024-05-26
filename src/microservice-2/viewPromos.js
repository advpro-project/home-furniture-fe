import React, { useEffect, useState } from 'react';
const baseURL = 'http://35.226.59.207';
// const baseURL = 'http://localhost:8080';

function ViewPromos() {
    const [promos, setPromos] = useState([]);

    const fetchPromos = async () => {
        try {
            const response = await fetch(`${baseURL}/promos/all`);
            const data = await response.json();
            setPromos(data);
        } catch (error) {
            console.log(error);
        }
    };

    
    // Get a promo by ID
    const getPromo = async (id) => {
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
    };

    // Add a new promo
    const addPromo = async (newPromo) => {
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
    };

    // Update a promo
    const updatePromo = async (id, updatedPromo) => {
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
    };

    // Delete a promo
    const deletePromo = async (id) => {
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

    useEffect(() => {
        fetchPromos();
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

            {/* modal untuk update promo */}
            <div className={`modal ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update promo</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="promoName">promo Name</label>
                            <input type="text" className="form-control" id="promoName" defaultValue={currentPromo.name} onChange={e => setCurrentPromo({...currentPromo, name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoDescription">promo Description</label>
                            <input type="text" className="form-control" id="promoName" defaultValue={currentPromo.description} onChange={e => setCurrentPromo({...currentPromo, description: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoImageURL">promo imageURL</label>
                            <input type="text" className="form-control" id="promoName" defaultValue={currentPromo.imageUrl} onChange={e => setCurrentPromo({...currentPromo, imageUrl: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoSoldQuantity">promo Sold Quantity</label>
                            <input type="text" className="form-control" id="promoName" defaultValue={currentPromo.soldQuantity} onChange={e => setCurrentPromo({...currentPromo, soldQuantity: e.target.value})}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    <button type="button" className="btn btn-secondary" onClick={() => { updatePromo(currentPromo.internalId, currentPromo); handleClose(); }}>Save Changes</button>
                </div>
                </div>
            </div>
            </div>

            {/* modal untuk add promo */}
            <div className={`modal ${showAddModal ? 'show d-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add New promo</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="promoName">promo Name</label>
                            <input type="text" className="form-control" id="promoName" onChange={e => setNewpromo({...newpromo, name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoDescription">promo Description</label>
                            <input type="text" className="form-control" id="promoName" onChange={e => setNewpromo({...newpromo, description: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoImageURL">promo imageURL</label>
                            <input type="text" className="form-control" id="promoName" onChange={e => setNewpromo({...newpromo, imageUrl: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoSoldQuantity">promo Sold Quantity</label>
                            <input type="text" className="form-control" id="promoName" onChange={e => setNewpromo({...newpromo, soldQuantity: e.target.value})}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleAddClose}>Close</button>
                    <button type="button" className="btn btn-secondary" onClick={() => { addPromo(newpromo); handleClose(); }}>Save promo</button>
                </div>
                </div>
            </div>
            </div>

        </div>
    );
}

export default ViewPromos;
