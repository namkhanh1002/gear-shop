import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    axios.get('/api/cart').then(res => {
      setItems(res.data);
      setTotal(res.data.reduce((sum, item) => sum + item.price * item.quantity, 0));
    });
  }, [user]);

  const updateQty = (product_id, quantity) => {
    axios.put(`/api/cart/${product_id}`, { quantity }).then(() => {
      axios.get('/api/cart').then(res => {
        setItems(res.data);
        setTotal(res.data.reduce((sum, item) => sum + item.price * item.quantity, 0));
      });
    });
  };

  const removeItem = (product_id) => {
    axios.delete(`/api/cart/${product_id}`).then(() => {
      axios.get('/api/cart').then(res => {
        setItems(res.data);
        setTotal(res.data.reduce((sum, item) => sum + item.price * item.quantity, 0));
      });
    });
  };

  const checkout = () => {
    if (!user) {
      alert('Vui lòng đăng nhập');
      return;
    }
    axios.post('/api/orders', { items, total })
      .then(() => alert('Đặt hàng thành công!'))
      .catch(() => alert('Lỗi đặt hàng'));
  };

  if (!user) return <div className="page"><p>Vui lòng đăng nhập để xem giỏ hàng</p></div>;

  return (
    <div className="page">
      <h2 className="section-title">Giỏ Hàng</h2>
      {items.length === 0 ? (
        <p className="no-products">Giỏ hàng trống</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image_url} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.price.toLocaleString()} VNĐ</p>
                </div>
                <div className="cart-qty">
                  <button onClick={() => updateQty(item.product_id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item.product_id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-total">{(item.price * item.quantity).toLocaleString()} VNĐ</div>
                <button className="btn-remove" onClick={() => removeItem(item.product_id)}><i className="fas fa-trash"></i></button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Tổng cộng: {total.toLocaleString()} VNĐ</h3>
            <button className="btn-checkout" onClick={checkout}>Thanh Toán</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;