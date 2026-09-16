const pool = require('../config/db');

class Product {
  static async getAll(filters = {}) {
    const { category, search, page = 1, limit = 12 } = filters;
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.execute(query, params);
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, description, price, category, image_url, stock } = data;
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, category, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, category, image_url, stock]
    );
    return result;
  }

  static async update(id, data) {
    const fields = [];
    const params = [];
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        params.push(value);
      }
    }
    params.push(id);
    const [result] = await pool.execute(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, params);
    return result;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    return result;
  }

  static async getCategories() {
    const [rows] = await pool.execute('SELECT DISTINCT category FROM products');
    return rows;
  }
}

module.exports = Product;