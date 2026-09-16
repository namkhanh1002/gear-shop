import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image_url || 'https://via.placeholder.com/300x300?text=Gear'} alt={product.name} />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description?.substring(0, 80)}...</p>
        <div className="product-footer">
          <span className="product-price">{product.price.toLocaleString()} VNĐ</span>
          <Link to={`/products/${product.id}`} className="btn-detail">Xem chi tiết</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;