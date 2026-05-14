const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middleware/auth');
const { getAllSuppliers, createSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController');

router.get('/', getAllSuppliers);
router.post('/', verifyToken, verifyRole(['admin']), createSupplier);
router.put('/:id', verifyToken, verifyRole(['admin']), updateSupplier);
router.delete('/:id', verifyToken, verifyRole(['admin']), deleteSupplier);

module.exports = router;
