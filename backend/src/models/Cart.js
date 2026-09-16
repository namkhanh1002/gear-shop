const pool = require('../config/db');

class Cart {
  static async getByUserId(userId) {
    const [rows] = await pool.execute(
      `SELECT c.*, p.name, p.price, p.image_url FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = ?`,
      [userId]
    );
    return rows;
  }

  static async addItem(userId, productId, quantity) {
    const [existing] = await pool.execute(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    if (existing[0]) {
      await pool.execute(
        'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
      return { updated: true };
    }
    const [result] = await pool.execute(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity]
    );
    return result;
  }

  static async removeItem(userId, productId) {
    await pool.execute('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);
    return { deleted: true };
  }

  static async updateQuantity(userId, productId, quantity) {
    await pool.execute('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?', [quantity, userId, productId]);
    return { updated: true };
  }

  static async clear(userId) {
    await pool.execute('DELETE FROM cart WHERE user_id = ?', [userId]);
    return { cleared: true };
  }
}

module.exports = Cart;