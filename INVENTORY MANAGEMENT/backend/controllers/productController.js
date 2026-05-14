const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, supplier, search } = req.query;

    let filter = { isDeleted: false };
    if (category) filter.category = category;
    if (supplier) filter.supplier = supplier;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter)
      .populate('category', 'name')
      .populate('supplier', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('supplier', 'name email phone');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, supplier, price, quantity, description, sku, lowStockThreshold } = req.body;

    if (!name || !category || !supplier || !price || !sku) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }

    const product = await Product.create({
      name,
      category,
      supplier,
      price,
      quantity: quantity || 0,
      description,
      sku,
      lowStockThreshold: lowStockThreshold || 10,
    });

    await product.populate('category', 'name').populate('supplier', 'name email phone');

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, supplier, price, quantity, description, sku, lowStockThreshold } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (sku && sku !== product.sku) {
      const existingProduct = await Product.findOne({ sku, isDeleted: false });
      if (existingProduct) {
        return res.status(400).json({ message: 'Product with this SKU already exists' });
      }
    }

    if (name) product.name = name;
    if (category) product.category = category;
    if (supplier) product.supplier = supplier;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;
    if (description !== undefined) product.description = description;
    if (sku) product.sku = sku;
    if (lowStockThreshold !== undefined) product.lowStockThreshold = lowStockThreshold;

    await product.save();
    await product.populate('category', 'name').populate('supplier', 'name email phone');

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete product (soft delete)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isDeleted = true;
    await product.save();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Get low stock products
exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lte: ['$quantity', '$lowStockThreshold'] },
    })
      .populate('category', 'name')
      .populate('supplier', 'name')
      .sort({ quantity: 1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching low stock products', error: error.message });
  }
};
