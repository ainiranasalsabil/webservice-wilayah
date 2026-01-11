require('dotenv').config();
const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const User = require('./models/User');

async function seedAdmin() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // cek apakah admin sudah ada
    const existingAdmin = await User.findOne({
      where: { email: 'admin@system.com' }
    });

    if (existingAdmin) {
      console.log('⚠️ Admin sudah ada');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Di dalam fungsi seedAdmin() pada file seedAdmin.js
  await User.create({
    name: 'Administrator',
    email: 'admin@system.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin',
    api_key: 'ADMIN-MASTER-KEY-2026' // API Key khusus admin
  });

    console.log('✅ Admin berhasil dibuat');
    console.log('Email    : admin@system.com');
    console.log('Password : admin123');
    process.exit(0);

  } catch (error) {
    console.error('❌ Gagal seed admin:', error);
    process.exit(1);
  }
}

seedAdmin();
