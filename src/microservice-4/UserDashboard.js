import React, { useState } from 'react';
import FinishOrderButton from './FinishOrderButton';

const UserDashboard = () => {
  const [deliveryStatus] = useState('MENUNGGU VERIFIKASI');

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Current Delivery Status: {deliveryStatus}</p>
      {deliveryStatus === 'TIBA' && <FinishOrderButton />}
    </div>
  );
};

export default UserDashboard;
