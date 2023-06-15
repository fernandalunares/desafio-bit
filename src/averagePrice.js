import React from 'react';

const AveragePrice = ({ products }) => {
  const totalPrice = products.reduce((total, product) => total + product.price, 0);
  const averagePrice = totalPrice / products.length;
  return <span> Promedio: ${averagePrice.toFixed(2)}</span>;
};

export default AveragePrice;
