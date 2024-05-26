import React, { useState, useEffect } from 'react';
import DeliveryStatusForm from './DeliveryStatusForm';

const AdminDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetch('/deliveries/getAllDeliv')
      .then(response => response.json())
      .then(data => setDeliveries(data))
      .catch(error => console.error('Error fetching deliveries:', error));
  }, []);

  const handleStatusChange = (kodeResi, newStatus) => {
    setDeliveries(prevDeliveries => 
      prevDeliveries.map(delivery => 
        delivery.kodeResi === kodeResi ? { ...delivery, status: newStatus } : delivery
      )
    );
  };

  return (
    <div>
      <h1>Hoomgroom</h1>
      <h2>Current Delivery Statuses:</h2>
      <ul>
        {deliveries.map(delivery => (
          <li key={delivery.kodeResi}>
            Kode Resi: {delivery.kodeResi}, Status: {delivery.status}
            <DeliveryStatusForm
              kodeResi={delivery.kodeResi}
              currentStatus={delivery.status}
              onStatusChange={handleStatusChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
