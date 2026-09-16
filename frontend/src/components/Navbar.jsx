import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-shield-halved"></i> GearShop
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Trang Chủ</Link>
          <Link to="/products" className="nav-link">Sản Phẩm</Link>
          {user ? (
            <>
              <Link to="/cart" className="nav-link"><i className="fas fa-shopping-cart"></i> Giỏ Hàng</Link>
              <span className="nav-user">Xin chào, {user.username}</span>
              <button onClick={handleLogout} className="btn-logout">Đăng Xuất</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">Đăng Nhập</Link>
              <Link to="/register" className="btn-register">Đăng Ký</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;