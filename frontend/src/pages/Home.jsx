import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get('/api/products?limit=8').then(res => setProducts(res.data));
    axios.get('/api/products/categories').then(res => setCategories(res.data));
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>⚔️ GearShop</h1>
          <p>Đồ gear chuyên nghiệp cho game thủ Việt Nam</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-hero">Xem Sản Phẩm</Link>
            {user && user.role === 'admin' && (
              <Link to="/admin" className="btn-hero btn-hero-admin">Trang Quản Trị</Link>
            )}
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">{products.length}</span>
            <span className="stat-label">Sản Phẩm</span>
          </div>
          <div className="stat">
            <span className="stat-number">{categories.length}</span>
            <span className="stat-label">Danh Mục</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%+</span>
            <span className="stat-label">Chất Lượng</span>
          </div>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
        <div className="products-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="view-all">
          <Link to="/products" className="btn-hero">Xem Tất Cả</Link>
        </div>
      </section>
      {user && user.role === 'admin' && (
        <section className="section admin-hint">
          <div className="admin-hint-card">
            <h3><i className="fas fa-shield-alt"></i> Chào Admin!</h3>
            <p>Bạn đang ở vai trò quản trị viên</p>
            <Link to="/admin" className="btn-hero">Quản Lý Sản Phẩm</Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;