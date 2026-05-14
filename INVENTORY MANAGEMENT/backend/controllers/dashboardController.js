const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const totalOrders = await Order.countDocuments();

    const totalStock = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$quantity' },
        },
      },
    ]);

    const lowStockItems = await Product.countDocuments({
      $expr: { $lte: ['$quantity', '$lowStockThreshold'] },
    });

    const totalRevenue = await Order.aggregate([
      { $match: { status: 'delivered' } },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]);

    res.status(200).json({
      totalProducts,
      totalCategories,
      totalSuppliers,
      totalOrders,
      totalStock: totalStock.length > 0 ? totalStock[0].total : 0,
      lowStockItems,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

// Get low stock items
exports.getLowStockItems = async (req, res) => {
  try {
    const lowStockItems = await Product.find({
      $expr: { $lte: ['$quantity', '$lowStockThreshold'] },
    })
      .populate('category', 'name')
      .populate('supplier', 'name')
      .sort({ quantity: 1 });

    res.status(200).json(lowStockItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching low stock items', error: error.message });
  }
};

// Get recent orders
exports.getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate('products.product', 'name sku')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(recentOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent orders', error: error.message });
  }
};

// Get recent products
exports.getRecentProducts = async (req, res) => {
  try {
    const recentProducts = await Product.find()
      .populate('category', 'name')
      .populate('supplier', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(recentProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent products', error: error.message });
  }
};

// Get monthly sales
exports.getMonthlySales = async (req, res) => {
  try {
    const monthlySales = await Order.aggregate([
      { $match: { status: 'delivered' } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          totalSales: { $sum: '$totalPrice' },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.status(200).json(monthlySales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monthly sales', error: error.message });
  }
};
