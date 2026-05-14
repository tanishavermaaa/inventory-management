const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middleware/auth');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getLowStockProducts } = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/low-stock', getLowStockProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken, verifyRole(['admin']), createProduct);
router.put('/:id', verifyToken, verifyRole(['admin']), updateProduct);
router.delete('/:id', verifyToken, verifyRole(['admin']), deleteProduct);

module.exports = router;
