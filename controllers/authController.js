const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// 1. Fungsi Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: 'Email sudah terdaftar' });

    const hash = await bcrypt.hash(password, 10);
    const apiKey = crypto.randomBytes(16).toString('hex');

    await User.create({
      name,
      email,
      password: hash,
      role: 'user',
      api_key: apiKey
    });

    res.json({ message: 'Register berhasil', apiKey });
  } catch (error) {
    res.status(500).json({ message: 'Register gagal', error: error.message });
  }
};

// 2. Fungsi Login
exports.login = async (req, res) => {
  try {
    const { email, password, apiKey } = req.body;
    
    // 1. Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    // 2. Validasi Password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Password salah' });

    // 3. LOGIC ROLE & API KEY
    // Jika user adalah admin, lewati pengecekan API Key
    if (user.role !== 'admin') {
      // Jika bukan admin (berarti user biasa), wajib cek API Key
      if (!apiKey || apiKey !== user.api_key) {
        return res.status(403).json({ message: 'API Key wajib diisi untuk User biasa' });
      }
    }

    // 4. Generate Token jika lolos salah satu syarat di atas
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Login gagal' });
  }
};

// 3. Fungsi Reveal API Key
exports.getApiKey = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Password salah' });

    res.json({ apiKey: user.api_key });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil API Key' });
  }
};