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

  static async getAll() {
    const [rows] = await pool.execute(
      `SELECT o.*, u.username, u.email, 
       (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as total_items,
       (SELECT GROUP_CONCAT(CONCAT(p.name, " (x", oi.quantity, ")") SEPARATOR ", ") 
        FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = o.id) as items_str
       FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC`
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.execute(
      `SELECT o.*, u.username, u.email,
       (SELECT GROUP_CONCAT(CONCAT(p.name, " (x", oi.quantity, ")") SEPARATOR ", ")
        FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = o.id) as items_str
       FROM orders o JOIN users u ON o.user_id = u.id WHERE o.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async updateStatus(id, status) {
    const [result] = await pool.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
    return result;
  }
}

module.exports = Order;