import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [params] = useSearchParams();
  const category = params.get('category') || '';

  useEffect(() => {
    axios.get('/api/products/categories').then(res => setCategories(res.data));
    axios.get('/api/products', {
      params: { category, search, page: 1 }
    }).then(res => setProducts(res.data));
  }, [category, search]);

  const handleSearch = () => {
    axios.get('/api/products', {
      params: { category, search, page: 1 }
    }).then(res => setProducts(res.data));
  };

  const filterCategory = (cat) => {
    setSearch('');
    window.location.href = `/products?category=${cat}`;
  };

  return (
    <div className="page">
      <section className="section">
        <h2 className="section-title">Tất Cả Sản Phẩm</h2>
        <div className="filter-bar">
          <div className="search-box">
            <input type="text" placeholder="Tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)} />
            <button onClick={handleSearch}><i className="fas fa-search"></i></button>
          </div>
          <div className="category-filters">
            <button className={category === '' ? 'active' : ''} onClick={() => filterCategory('')}>All</button>
            {categories.map(c => (
              <button key={c.category} className={category === c.category ? 'active' : ''} onClick={() => filterCategory(c.category)}>
                {c.category}
              </button>
            ))}
          </div>
        </div>
        <div className="products-grid">
          {products.length === 0 ? (
            <p className="no-products">Không tìm thấy sản phẩm</p>
          ) : (
            products.map(p => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;