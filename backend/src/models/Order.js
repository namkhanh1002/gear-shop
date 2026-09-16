const pool = require('../config/db');

class Order {
  static async create(userId, items, total) {
    const [result] = await pool.execute(
      'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
      [userId, total, 'pending']
    );
    const orderId = result.insertId;
    for (const item of items) {
      await pool.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }
    return { orderId, items, total };
  }

  static async getByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.execute(
      'SELECT o.*, GROUP_CONCAT(CONCAT(p.name, " (x", oi.quantity, ")") SEPARATOR ", ") as items_str FROM orders o LEFT JOIN order_items oi ON o.id = oi.order_id LEFT JOIN products p ON oi.product_id = p.id WHERE o.id = ? GROUP BY o.id',
      [id]
    );
    return rows[0];
  }
}

module.exports = Order;