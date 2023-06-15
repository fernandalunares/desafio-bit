import React from 'react';

const TotalRevenue = ({ topSellingProducts }) => {
  const totalRevenue = topSellingProducts.reduce(
    (total, product) => total + product.total,
    0
  );

  return (
    <div>
          <span>Ingresos: ${totalRevenue.toFixed(2)}</span>
    </div>
  );
};

export default TotalRevenue;
