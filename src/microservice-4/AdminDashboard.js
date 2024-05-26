import React, { useState, useEffect } from 'react';
import DeliveryStatusForm from './DeliveryStatusForm';
import axios from 'axios';

const AdminDashboard = ({ userEmail }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransportationType, setSelectedTransportationType] = useState('');

  useEffect(() => {
    fetch('/deliveries/getAllDeliv')
      .then(response => response.json())
      .then(data => {
        // Filter deliveries based on the user's email
        const filteredDeliveries = data.filter(delivery => delivery.userEmail === userEmail);
        setDeliveries(filteredDeliveries);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching deliveries:', error);
        setLoading(false);
      });
  }, [userEmail]); // Re-fetch deliveries when userEmail changes

  const handleStatusChange = (kodeResi, newStatus) => {
    setDeliveries(prevDeliveries =>
      prevDeliveries.map(delivery =>
        delivery.kodeResi === kodeResi ? { ...delivery, status: newStatus } : delivery
      )
    );
  };

  const handleTransportationUpdate = async (kodeResi) => {
    try {
      // Ensure a transportation type is selected
      if (!selectedTransportationType) {
        console.error('Please select a transportation type.');
        return;
      }
      
      // Prepare the new transportation data
      const newTransportation = {
        type: selectedTransportationType,
        // Add other transportation-specific data if needed
      };

      // Send the PUT request to update the transportation
      await axios.put(`/updateTransportation/${kodeResi}/transportation`, newTransportation);
      
      // Optionally, you can re-fetch the updated deliveries after transportation update
      // or update the local state to reflect the transportation change
    } catch (error) {
      console.error('Error updating transportation:', error);
    }
  };

  const handleTransportationTypeChange = (e) => {
    setSelectedTransportationType(e.target.value);
  };

  return (
    <div>
      <h1>Hoomgroom</h1>
      <h2>Current Delivery Statuses:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {deliveries.length > 0 ? (
            deliveries.map(delivery => (
              <li key={delivery.kodeResi}>
                Kode Resi: {delivery.kodeResi}, Status: {delivery.status}
                <DeliveryStatusForm
                  kodeResi={delivery.kodeResi}
                  currentStatus={delivery.status}
                  onStatusChange={handleStatusChange}
                />
                {delivery.status === 'DIPROSES' && (
                  <div>
                    <select value={selectedTransportationType} onChange={handleTransportationTypeChange}>
                      <option value="">Select Transportation Type</option>
                      <option value="motor">Motor</option>
                      <option value="truk">Truk</option>
                      <option value="pesawat">Pesawat</option>
                    </select>
                    <button onClick={() => handleTransportationUpdate(delivery.kodeResi)}>
                      Update Transportation
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>Anda belum melakukan pengiriman</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
