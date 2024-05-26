import React, { useState } from 'react';
import DeliveryStatusForm from './DeliveryStatusForm';

const AdminDashboard = () => {
  const [deliveryStatus, setDeliveryStatus] = useState('MENUNGGU VERIFIKASI');

  const handleStatusChange = (newStatus) => {
    setDeliveryStatus(newStatus);
  };

  return (
    <div>
      <h1>Hoomgroom</h1>
      <p>Current Delivery Status: {deliveryStatus}</p>
      <DeliveryStatusForm
        currentStatus={deliveryStatus}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default AdminDashboard;
