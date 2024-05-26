import React, { useState } from 'react';
import axios from 'axios';

const DeliveryStatusForm = ({ kodeResi, currentStatus, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);

  const handleChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/updateStatus/${kodeResi}/status`, { newStatus });
      onStatusChange(kodeResi, newStatus);
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Change Status:
        <select value={newStatus} onChange={handleChange}>
          <option value="MENUNGGU VERIFIKASI">MENUNGGU VERIFIKASI</option>
          <option value="DIPROSES">DIPROSES</option>
          <option value="DIKIRIM">DIKIRIM</option>
          <option value="TIBA">TIBA</option>
          <option value="SELESAI">SELESAI</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DeliveryStatusForm;
