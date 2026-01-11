require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

// Import model agar Sequelize tahu tabel apa yang harus disinkronkan
require('./models/User'); 

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    // Menggunakan { alter: true } agar jika ada kolom baru (seperti api_key), 
    // tabel otomatis diperbarui tanpa menghapus data yang sudah ada.
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('✅ Database Synced & Updated');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`👉 http://localhost:${PORT}/login.html`);
    });
  })
  .catch(err => {
    console.error('❌ DB Error:', err);
  });