import React from 'react';

const TotalOrders = ({ carts }) => {
  return <span> Pedidos: {carts.length}</span>;
};

export default TotalOrders;
