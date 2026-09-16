const bcrypt = require('bcryptjs');
const pool = require('./config/db');

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const [existing] = await pool.execute('SELECT * FROM users WHERE email = ?', ['admin@gear.com']);
  if (existing[0]) {
    console.log('Admin already exists!');
    return;
  }
  await pool.execute(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    ['admin', 'admin@gear.com', hashedPassword, 'admin']
  );
  console.log('Admin account created! Email: admin@gear.com | Password: admin123');
};

seedAdmin().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
