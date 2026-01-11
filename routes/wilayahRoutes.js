const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const wilayah = require('../controllers/wilayahController');

router.get('/provinsi', auth, wilayah.provinsi);
router.get('/kabupaten/:id', auth, wilayah.kabupaten);
router.get('/kecamatan/:id', auth, wilayah.kecamatan);

module.exports = router;
