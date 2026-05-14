const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middleware/auth');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.post('/', verifyToken, verifyRole(['admin']), createCategory);
router.put('/:id', verifyToken, verifyRole(['admin']), updateCategory);
router.delete('/:id', verifyToken, verifyRole(['admin']), deleteCategory);

module.exports = router;
