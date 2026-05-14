const Order = require('../models/Order');
const Product = require('../models/Product');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status, search } = req.query;

    let filter = { isDeleted: false };
    if (status) filter.status = status;
    if (search) filter.customerName = { $regex: search, $options: 'i' };

    const orders = await Order.find(filter)
      .populate('products.product', 'name sku price')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { customerName, products, notes } = req.body;

    if (!customerName || !products || products.length === 0) {
      return res.status(400).json({ message: 'Please provide customer name and products' });
    }

    let totalPrice = 0;
    const populatedProducts = [];

    // Process each product in the order
    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product} not found` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product ${product.name}. Available: ${product.quantity}`,
        });
      }

      const itemPrice = product.price * item.quantity;
      totalPrice += itemPrice;

      populatedProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      // Deduct quantity from product
      product.quantity -= item.quantity;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      customerName,
      products: populatedProducts,
      totalPrice,
      notes,
      status: 'pending',
    });

    await order.populate('products.product', 'name sku price');

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'processing', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Please provide a valid status' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // If cancelling, restore product quantities
    if (status === 'cancelled' && order.status !== 'cancelled') {
      for (const item of order.products) {
        const product = await Product.findById(item.product);
        if (product) {
          product.quantity += item.quantity;
          await product.save();
        }
      }
    }

    order.status = status;
    await order.save();
    await order.populate('products.product', 'name sku price');

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

// Delete order (soft delete)
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Restore product quantities
    for (const item of order.products) {
      const product = await Product.findById(item.product);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

    order.isDeleted = true;
    await order.save();

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product', 'name sku price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};
