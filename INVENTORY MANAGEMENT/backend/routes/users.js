const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middleware/auth');
const { getAllUsers, createUser, updateUser, deleteUser, updateProfile } = require('../controllers/userController');

router.get('/', verifyToken, verifyRole(['admin']), getAllUsers);
router.post('/', verifyToken, verifyRole(['admin']), createUser);
router.put('/profile', verifyToken, updateProfile);
router.put('/:id', verifyToken, verifyRole(['admin']), updateUser);
router.delete('/:id', verifyToken, verifyRole(['admin']), deleteUser);

module.exports = router;
