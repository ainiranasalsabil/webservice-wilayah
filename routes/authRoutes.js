const router = require('express').Router();
const auth = require('../controllers/authController');

// PASTIKAN SEPERTI INI: Tanpa middleware pengecekan token di tengahnya
router.post('/register', auth.register); 
router.post('/login', auth.login);
router.post('/reveal-api-key', auth.getApiKey);

module.exports = router;