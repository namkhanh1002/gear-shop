const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async register(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, 'customer']
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT id, username, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}

module.exports = User;