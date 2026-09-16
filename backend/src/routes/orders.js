const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role === 'admin') return res.status(403).json({ message: 'Admin cannot place orders' });
    const { items, total } = req.body;
    const result = await Order.create(req.user.id, items, total);
    res.status(201).json({ message: 'Order placed successfully', order: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const orders = await Order.getAll();
      return res.json(orders);
    }
    const orders = await Order.getByUserId(req.user.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.getById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const { status } = req.body;
    await Order.updateStatus(req.params.id, status);
    res.json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;