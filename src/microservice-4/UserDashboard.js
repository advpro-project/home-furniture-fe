import React, { useState, useEffect } from 'react';
import FinishOrderButton from './FinishOrderButton';

const UserDashboard = () => {
  const [deliveryStatus, setDeliveryStatus] = useState('');

  useEffect(() => {
    const userKodeResi = 'someKodeResi';
    fetch(`/deliveries/get${userKodeResi}`)
      .then(response => response.json())
      .then(data => setDeliveryStatus(data.status))
      .catch(error => console.error('Error fetching delivery status:', error));
  }, []);

  const handleDeleteDelivery = () => {
    const userKodeResi = 'someKodeResi';
    fetch(`/deliveries/delete${userKodeResi}`, {
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
      <p>Current Delivery Status: {deliveryStatus}</p>
      {deliveryStatus === 'TIBA' && <FinishOrderButton />}
      {deliveryStatus === 'SELESAI' && (
        <button onClick={handleDeleteDelivery}>Delete Delivery</button>
      )}
    </div>
  );
};

export default UserDashboard;
