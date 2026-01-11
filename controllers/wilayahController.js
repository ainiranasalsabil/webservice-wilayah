const axios = require('axios');

/**
 * ============================
 * GET PROVINSI
 * ============================
 */
exports.provinsi = async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json'
    );
    res.json(response.data);
  } catch (error) {
    console.error('PROVINSI ERROR:', error.message);
    res.status(500).json({ message: 'Gagal mengambil data provinsi' });
  }
};

/**
 * ============================
 * GET KABUPATEN BY PROVINSI
 * ============================
 */
exports.kabupaten = async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${req.params.id}.json`
    );
    res.json(response.data);
  } catch (error) {
    console.error('KABUPATEN ERROR:', error.message);
    res.status(500).json({ message: 'Gagal mengambil data kabupaten' });
  }
};

/**
 * ============================
 * GET KECAMATAN BY KABUPATEN
 * ============================
 */
exports.kecamatan = async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${req.params.id}.json`
    );
    res.json(response.data);
  } catch (error) {
    console.error('KECAMATAN ERROR:', error.message);
    res.status(500).json({ message: 'Gagal mengambil data kecamatan' });
  }
};
