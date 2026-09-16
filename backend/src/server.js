const express = require('express');
const cors = require('cors');
const path = require('path');
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
    console.error('MySQL Connection Error:', err);
  });

app.get('/api', (req, res) => {
  res.json({ message: 'Gear Shop API', status: 'OK' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const buildPath = path.join(__dirname, '../../frontend/build');
app.use(express.static(buildPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});