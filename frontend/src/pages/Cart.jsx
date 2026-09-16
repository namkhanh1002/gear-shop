import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(localStorage.getItem('orderSuccess') === 'true');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    if (orderSuccess) {
      setLoading(false);
      return;
    }
    axios.get('/api/cart').then(res => {
      setItems(res.data);
      setTotal(res.data.reduce((sum, item) => sum + item.price * item.quantity, 0));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user, orderSuccess]);

  useEffect(() => {
    if (orderSuccess) {
      const timer = setTimeout(() => {
        localStorage.removeItem('orderSuccess');
        setOrderSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [orderSuccess]);

  const updateQty = (product_id, quantity) => {
    if (quantity < 1) {
      removeItem(product_id);
      return;
    }
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
      .then(async () => {
        await axios.delete('/api/cart/clear');
        localStorage.setItem('orderSuccess', 'true');
        setOrderSuccess(true);
        setItems([]);
        setTotal(0);
      })
      .catch(() => alert('Lỗi đặt hàng'));
  };

  if (!user) return <div className="page"><p>Vui lòng đăng nhập để xem giỏ hàng</p></div>;

  return (
    <div className="page">
      <h2 className="section-title">Giỏ Hàng</h2>
      {orderSuccess && (
        <div className="order-success">
          <i className="fas fa-check-circle"></i> Đặt hàng thành công! Cảm ơn bạn!
        </div>
      )}
      {loading ? (
        <p className="no-products">Đang tải...</p>
      ) : items.length === 0 ? (
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