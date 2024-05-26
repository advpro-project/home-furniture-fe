import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
const baseURL = 'http://35.226.59.207';
// const baseURL = 'http://localhost:8080';

function ViewPromos() {
    const [promos, setPromos] = useState([]);

    const [showUpdate, setShowUpdate] = useState(false);
    const [currentPromo, setCurrentPromo] = useState({});

    const [showAdd, setShowAdd] = useState(false);  
    const [newPromo, setNewPromo] = useState({});

    const handleShow = (promo) => {
        setCurrentPromo(promo);
        setShowUpdate(true);
      };
      
    const handleClose = () => {
        setShowUpdate(false);
    };

    const handleAddShow = () => setShowAdd(true);
    const handleAddClose = () => setShowAdd(false);

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
            const response = await fetch(`${baseURL}/promos/register`, {
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
            await fetchPromos();
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
            await fetchPromos();
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
            await fetchPromos();
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
            <h1 class="display-4" >Promo Codes</h1>
            <button className="btn btn-secondary m-1" onClick={handleAddShow}>Add new Promo code</button>
            <div className="row">
                {Object.values(promos).map(promo => (
                    <div key={promo.id} className="col-md-4 p-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{promo.name}</h5>
                                <p className="card-text">{promo.description}</p>
                                <button className="btn btn-secondary m-1" onClick={() => handleShow(promo)}>Update</button>
                                <button className="btn btn-danger m-1" onClick={() => deletePromo(promo.internalId)}>Delete</button>
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
            <div className={`modal ${showUpdate ? 'show d-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update promo</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="promoName">Promo Name</label>
                            <input type="text" className="form-control" id="promoName" defaultValue={currentPromo.name} onChange={e => setCurrentPromo({...currentPromo, name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoDescription">Promo Description</label>
                            <input type="text" className="form-control" id="promoName" defaultValue={currentPromo.description} onChange={e => setCurrentPromo({...currentPromo, description: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoImageURL">Promo Minimum Purchase</label>
                            <input type="text" className="form-control" id="promoName" defaultValue={currentPromo.minimumPurchase} onChange={e => setCurrentPromo({...currentPromo, minimumPurchase: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoSoldQuantity">Promo Valid Until</label>
                            <input type="text" className="form-control" id="promoName" defaultValue={currentPromo.validUntil} onChange={e => setCurrentPromo({...currentPromo, validUntil: e.target.value})}/>
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
            <div className={`modal ${showAdd ? 'show d-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add New promo</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="promoName">Promo Name</label>
                            <input type="text" className="form-control" id="promoName" onChange={e => setNewPromo({...newPromo, name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoDescription">Promo Description</label>
                            <input type="text" className="form-control" id="promoName" onChange={e => setNewPromo({...newPromo, description: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoImageURL">Promo Minimum Purchase</label>
                            <input type="text" className="form-control" id="promoName" onChange={e => setNewPromo({...newPromo, minimumPurchase: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="promoSoldQuantity">Promo Valid Until</label>
                            <input type="text" className="form-control" id="promoName" onChange={e => setNewPromo({...newPromo, validUntil: e.target.value})}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleAddClose}>Close</button>
                    <button type="button" className="btn btn-secondary" onClick={() => { addPromo(newPromo); handleAddClose(); }}>Save promo</button>
                </div>
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default ViewPromos;
