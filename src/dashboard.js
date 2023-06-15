import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalProducts from '../src/totalProducts.js';
import TotalOrders from '../src/totalOrders.js';
import TotalRevenue from '../src/totalRevenue.js';
import AveragePrice from '../src/averagePrice.js';
import TopSellingProducts from '../src/topSellingProducts.js';
import './dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsResponse, cartsResponse] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/carts'),
        ]);

        setProducts(productsResponse.data);
        setCarts(cartsResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateTopSellingProducts = () => {
      const soldProducts = carts.reduce((sold, cart) => {
        cart.products.forEach((product) => {
          const existingProduct = sold.find((p) => p.id === product.productId);
          if (existingProduct) {
            existingProduct.quantity += product.quantity;
            existingProduct.total +=
              product.quantity * getProductPrice(products, product.productId);
          } else {
            const productDetails = getProductDetails(products, product.productId);
            if (productDetails) {
              sold.push({
                id: productDetails.id,
                title: productDetails.title,
                price: getProductPrice(products, product.productId),
                quantity: product.quantity,
                image: productDetails.image,
                total:
                  product.quantity * getProductPrice(products, product.productId),
              });
            }
          }
        });
        return sold;
      }, []);

      const sortedProducts = soldProducts.sort((a, b) => b.quantity - a.quantity);
      const topProducts = sortedProducts.slice(0, 5);

      setTopSellingProducts(topProducts);
    };

    calculateTopSellingProducts();
  }, [carts, products]);

  return (
    <div className="admin-panel">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>Panel de Control</h1>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <TotalProducts products={products} />
            </div>
            <div className="dashboard-card">
              <TotalOrders carts={carts} />
            </div>
            <div className="dashboard-card">
              <TotalRevenue topSellingProducts={topSellingProducts} />
            </div>
            <div className="dashboard-card">
              <AveragePrice products={products} />
            </div>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-title">Productos Más Vendidos</div>
            <TopSellingProducts carts={carts} products={products} />
          </div>
        </div>
      )}
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

export default Dashboard;
