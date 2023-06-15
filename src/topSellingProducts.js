import React from 'react';

const TopSellingProducts = ({ carts, products }) => {
  const soldProducts = carts.reduce((sold, cart) => {
    cart.products.forEach((product) => {
      const existingProduct = sold.find((p) => p.id === product.productId);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
        existingProduct.total += product.quantity * getProductPrice(products, product.productId);
      } else {
        const productDetails = getProductDetails(products, product.productId);
        if (productDetails) {
          sold.push({
            id: productDetails.id,
            title: productDetails.title,
            price: getProductPrice(products, product.productId),
            quantity: product.quantity,
            image: productDetails.image,
            total: product.quantity * getProductPrice(products, product.productId),
          });
        }
      }
    });
    return sold;
  }, []);

  const sortedProducts = soldProducts.sort((a, b) => b.quantity - a.quantity);
  const topProducts = sortedProducts.slice(0, 5);

  return (
    <div>
      <div className="top-selling-products__cards">
        {topProducts.map((product) => (
          <div key={product.id} className="top-selling-products__card">
            <h4>{product.title}</h4>
            <img src={product.image} alt={product.title} />
            <p>Precio: ${product.price.toFixed(2)}</p>
            <p>Cantidad vendida: {product.quantity}</p>
            <p>Total vendido: ${product.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const getProductPrice = (products, productId) => {
  const product = products.find((p) => p.id === productId);
  return product ? product.price : 0;
};

const getProductDetails = (products, productId) => {
  return products.find((p) => p.id === productId);
};

export default TopSellingProducts;
