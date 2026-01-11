const User = require('../models/User'); // ✅ HURUF BESAR BENAR

/**
 * ============================
 * GET ALL USERS (ADMIN)
 * ============================
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // 🔒 jangan kirim password
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Gagal mengambil data user',
      error: error.message
    });
  }
};

/**
 * ============================
 * DELETE USER (ADMIN)
 * ============================
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        message: 'User tidak ditemukan'
      });
    }

    res.json({
      message: 'User berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal menghapus user',
      error: error.message
    });
  }
};
