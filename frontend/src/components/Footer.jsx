import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3><i className="fas fa-shield-halved"></i> GearShop</h3>
          <p>Cửa hàng gear chuyên nghiệp cho game thủ Việt Nam</p>
        </div>
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <p><i className="fas fa-envelope"></i> support@gearshop.com</p>
          <p><i className="fas fa-phone"></i> 0901 234 567</p>
        </div>
        <div className="footer-section">
          <h4>Theo dõi chúng tôi</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-zalo"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 GearShop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;