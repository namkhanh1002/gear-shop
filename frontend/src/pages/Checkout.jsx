import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { user } = useAuth();

  if (!user) return <div className="page"><p>Vui lòng đăng nhập</p></div>;

  return (
    <div className="page">
      <h2 className="section-title">Thanh Toán</h2>
      <div className="checkout-card">
        <h3>Thông tin giao hàng</h3>
        <form className="checkout-form">
          <div className="form-group">
            <label>Họ tên</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Địa chỉ</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="tel" required />
          </div>
          <div className="form-group">
            <label>Phương thức thanh toán</label>
            <select>
              <option>COD (Thanh toán khi nhận hàng)</option>
              <option>Vietcombank</option>
              <option>Momo</option>
            </select>
          </div>
          <button type="submit" className="btn-submit">Xác Nhận Đặt Hàng</button>
        </form>
        <Link to="/cart" className="btn-back">Quay lại giỏ hàng</Link>
      </div>
    </div>
  );
};

export default Checkout;