CREATE DATABASE IF NOT EXISTS gear_shop;
USE gear_shop;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer', 'admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50),
  image_url VARCHAR(255),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_product (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('HyperX Cloud III', 'Headset gaming siêu âm, mic thu âm rõ ràng', 1299000, 'Headsets', 'https://via.placeholder.com/300x300?text=HyperX+Cloud+III', 50),
('Razer BlackWidow V4', 'Bàn phím cơ RGB, switch Green', 3499000, 'Bàn phím', 'https://via.placeholder.com/300x300?text=Razer+BlackWidow', 30),
('Logitech G502 X', 'Mouse gaming 25K DPI, LIGHTSYNC', 1799000, 'Mouse', 'https://via.placeholder.com/300x300?text=G502+X', 80),
('SteelSeries Arctis Nova 7', 'Tai nghe không dây, đa nền tảng', 2199000, 'Headsets', 'https://via.placeholder.com/300x300?text=Arctis+Nova+7', 25),
('Corsair K70 RGB', 'Bàn phím cơ Cherry MX Red', 2499000, 'Bàn phím', 'https://via.placeholder.com/300x300?text=Corsair+K70', 20),
('Razer DeathAdder V4', 'Mouse nhẹ 47g, Focus Pro 30K', 1499000, 'Mouse', 'https://via.placeholder.com/300x300?text=DeathAdder+V4', 60),
('Razer Basilisk V3', 'Mouse không dây, 11 nút lập trình', 1999000, 'Mouse', 'https://via.placeholder.com/300x300?text=Basilisk+V3', 40),
('HyperX Alloy Origins 65', 'Bàn phím cơ 65%, hồng ngoại', 1899000, 'Bàn phím', 'https://via.placeholder.com/300x300?text=Alloy+Origins', 35),
('Razer Kraken V4', 'Tai nghe 7.1 surround, mic retractable', 1599000, 'Headsets', 'https://via.placeholder.com/300x300?text=Kraken+V4', 45),
('Finalmouse Ultralight', 'Mouse siêu nhẹ 42g', 2999000, 'Mouse', 'https://via.placeholder.com/300x300?text=Ultralight', 15);