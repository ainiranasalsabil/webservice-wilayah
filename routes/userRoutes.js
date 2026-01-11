const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const user = require('../controllers/userController');

router.get('/', auth, role('admin'), user.getAllUsers);
router.delete('/:id', auth, role('admin'), user.deleteUser);

module.exports = router;
