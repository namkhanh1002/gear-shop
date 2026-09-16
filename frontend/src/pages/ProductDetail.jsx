import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const addToCart = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
      return;
    }
    axios.post('/api/cart/add', { product_id: id, quantity })
      .then(() => alert('Đã thêm vào giỏ hàng!'))
      .catch(() => alert('Lỗi khi thêm vào giỏ hàng'));
  };

  if (!product) return <div className="page"><p>Đang tải...</p></div>;

  return (
    <div className="page">
      <div className="detail-container">
        <div className="detail-image">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-desc">{product.description}</p>
          <div className="detail-price">{product.price.toLocaleString()} VNĐ</div>
          <div className="detail-stock">Còn lại: {product.stock} sản phẩm</div>
          <div className="detail-qty">
            <label>Số lượng:</label>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          <button className="btn-add-cart" onClick={addToCart}>
            <i className="fas fa-cart-plus"></i> Thêm vào giỏ hàng
          </button>
          <Link to="/cart" className="btn-go-cart">Xem giỏ hàng</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;