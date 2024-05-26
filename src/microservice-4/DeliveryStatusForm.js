import React, { useState } from 'react';

const DeliveryStatusForm = ({ currentStatus, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);

  const handleChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStatusChange(newStatus);
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