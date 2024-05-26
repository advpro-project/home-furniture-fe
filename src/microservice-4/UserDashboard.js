import React, { useState, useEffect } from 'react';
import FinishOrderButton from './FinishOrderButton';

const UserDashboard = () => {
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [deliveryExists, setDeliveryExists] = useState(true);
  const [userData] = useState({});

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = () => {
    // Fetch deliveries
    fetch(`/deliveries/getAllDeliv`)
      .then(response => response.json())
      .then(deliveries => {
        // Find the delivery that matches the user's email
        const userDelivery = deliveries.find(delivery => delivery.userEmail === userData.email);
        if (userDelivery) {
          setDeliveryStatus(userDelivery.status);
          setDeliveryExists(true);
        } else {
          setDeliveryExists(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching deliveries:', error);
        setLoading(false);
      });
  };

  const handleDeleteDelivery = () => {
    // Assuming you have the deliveryId here
    const deliveryId = 'someDeliveryId';
    fetch(`/deliveries/delete/${deliveryId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setDeliveryStatus('');
          alert('Delivery deleted successfully');
        } else {
          alert('Failed to delete delivery');
        }
      })
      .catch(error => console.error('Error deleting delivery:', error));
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {deliveryExists ? (
            <>
              <p>User Email: {userData.email}</p>
              <p>Current Delivery Status: {deliveryStatus}</p>
              {deliveryStatus === 'TIBA' && <FinishOrderButton />}
              {deliveryStatus === 'SELESAI' && (
                <button onClick={handleDeleteDelivery}>Delete Delivery</button>
              )}
            </>
          ) : (
            <p>Anda belum memiliki pengiriman</p>
          )}
        </>
      )}
    </div>
  );
};

export default UserDashboard;
