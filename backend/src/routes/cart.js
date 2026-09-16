const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.getByUserId(req.user.id);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    await Cart.addItem(req.user.id, product_id, quantity);
    res.json({ message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:product_id', authMiddleware, async (req, res) => {
  try {
    await Cart.removeItem(req.user.id, req.params.product_id);
    res.json({ message: 'Removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:product_id', authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;
    await Cart.updateQuantity(req.user.id, req.params.product_id, quantity);
    res.json({ message: 'Cart updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/clear', authMiddleware, async (req, res) => {
  try {
    await Cart.clear(req.user.id);
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;