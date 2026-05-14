const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middleware/auth');
const { getAllUsers, createUser, updateUser, deleteUser, updateProfile } = require('../controllers/userController');

router.get('/', verifyToken, verifyRole(['admin']), getAllUsers);
router.post('/', verifyToken, verifyRole(['admin']), createUser);
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Get user profile - use /api/auth/profile' });
});
router.put('/profile', verifyToken, updateProfile);
router.put('/:id', verifyToken, verifyRole(['admin']), updateUser);
router.delete('/:id', verifyToken, verifyRole(['admin']), deleteUser);

module.exports = router;
