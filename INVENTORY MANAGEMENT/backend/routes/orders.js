const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middleware/auth');
const { getAllOrders, createOrder, updateOrderStatus, deleteOrder, getOrderById } = require('../controllers/orderController');

router.get('/', verifyToken, getAllOrders);
router.post('/', verifyToken, createOrder);
router.get('/:id', verifyToken, getOrderById);
router.put('/:id', verifyToken, verifyRole(['admin']), updateOrderStatus);
router.delete('/:id', verifyToken, verifyRole(['admin']), deleteOrder);

module.exports = router;
