import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products?limit=8').then(res => setProducts(res.data));
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <h1>Gear Cho Game Thủ</h1>
          <p>Đồ gear chất lượng cao, giá tốt nhất thị trường</p>
          <Link to="/products" className="btn-hero">Xem Sản Phẩm</Link>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
        <div className="products-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default Home;