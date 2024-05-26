import React from 'react';

const FinishOrderButton = () => {
  const handleClick = () => {
    alert('Order finished!');
  };

  return <button onClick={handleClick}>Finish Order</button>;
};

export default FinishOrderButton;
