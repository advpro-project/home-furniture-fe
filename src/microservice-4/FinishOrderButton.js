import React from 'react';
import axios from 'axios';

const FinishOrderButton = ({ kodeResi, onOrderFinished }) => {
  const handleClick = async () => {
    try {
      // Make a PUT request to update the status to SELESAI
      await axios.put(`/updateStatus/${kodeResi}/status`, { newStatus: 'SELESAI' });
      // Notify parent component that the order has been finished
      onOrderFinished();
      alert('Order finished!');
    } catch (error) {
      console.error('Error finishing order:', error);
    }
  };

  return <button onClick={handleClick}>Finish Order</button>;
};

export default FinishOrderButton;
