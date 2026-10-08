const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const pool = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pool.getConnection()
  .then(conn => {
    console.log('MySQL Connected!');
    conn.release();
  })
  .catch(err => {
    console.error('MySQL Connection Error:', err.message);
  });

app.get('/api', (req, res) => {
  res.json({ message: 'Gear Shop API', status: 'OK' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// 404 JSON cho các API không tồn tại (tránh trả HTML cho /api/*)
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API not found' });
});

// Ảnh upload: local lưu backend/src/uploads, Vercel chỉ ghi được /tmp
const uploadsDir = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// Phục vụ React build (local)
const buildPath = path.join(__dirname, '../../frontend/build');
app.use(express.static(buildPath));

// SPA fallback: trả index.html cho mọi route (deep link của React Router)
const buildIndex = path.join(buildPath, 'index.html');
const publicIndex = path.join(__dirname, '../../public/index.html');
app.get('*', (req, res) => {
  const indexFile = fs.existsSync(buildIndex) ? buildIndex : publicIndex;
  if (fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }
  res.redirect('/');
});

const PORT = process.env.PORT || 5001;

// Local (node backend/src/server.js) thì mở port;
// trên Vercel chỉ export app để chạy như Serverless Function
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
