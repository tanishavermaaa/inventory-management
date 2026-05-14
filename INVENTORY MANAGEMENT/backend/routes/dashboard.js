const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getDashboardStats, getLowStockItems, getRecentOrders, getRecentProducts, getMonthlySales } = require('../controllers/dashboardController');

router.get('/stats', verifyToken, getDashboardStats);
router.get('/low-stock', verifyToken, getLowStockItems);
router.get('/recent-orders', verifyToken, getRecentOrders);
router.get('/recent-products', verifyToken, getRecentProducts);
router.get('/monthly-sales', verifyToken, getMonthlySales);

module.exports = router;
