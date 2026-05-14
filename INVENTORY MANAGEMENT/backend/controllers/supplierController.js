const Supplier = require('../models/Supplier');

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
  }
};

// Create supplier
exports.createSupplier = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Please provide name and phone' });
    }

    const supplier = await Supplier.create({ name, email, phone, address });
    res.status(201).json({ message: 'Supplier created successfully', supplier });
  } catch (error) {
    res.status(500).json({ message: 'Error creating supplier', error: error.message });
  }
};

// Update supplier
exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    if (name) supplier.name = name;
    if (email) supplier.email = email;
    if (phone) supplier.phone = phone;
    if (address) supplier.address = address;

    await supplier.save();
    res.status(200).json({ message: 'Supplier updated successfully', supplier });
  } catch (error) {
    res.status(500).json({ message: 'Error updating supplier', error: error.message });
  }
};

// Delete supplier (soft delete)
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    supplier.isDeleted = true;
    await supplier.save();
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier', error: error.message });
  }
};
