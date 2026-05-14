const Category = require('../models/Category');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

const seedData = async () => {
  try {
    // Always ensure admin user exists
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      });
      console.log('Seeded admin user');
    }

    const staffUser = await User.findOne({ email: 'staff@example.com' });
    if (!staffUser) {
      await User.create({
        username: 'staff',
        email: 'staff@example.com',
        password: 'password123',
        role: 'staff',
      });
      console.log('Seeded staff user');
    }

    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.create([
        { name: 'Electronics', description: 'Gadgets, accessories and electronic devices.' },
        { name: 'Office Supplies', description: 'Stationery, paper goods, and office essentials.' },
        { name: 'Household', description: 'Home cleaning and kitchen products.' },
      ]);
      console.log('Seeded categories');
    }

    const supplierCount = await Supplier.countDocuments();
    if (supplierCount === 0) {
      await Supplier.create([
        { name: 'Acme Supplies', email: 'sales@acmesupplies.com', phone: '+1-555-0123', address: '123 Commerce Ave' },
        { name: 'NorthStar Distributors', email: 'info@northstardist.com', phone: '+1-555-0456', address: '456 Market Street' },
        { name: 'Home Essentials Co.', email: 'support@homeessentials.co', phone: '+1-555-0789', address: '789 Industrial Blvd' },
      ]);
      console.log('Seeded suppliers');
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const categories = await Category.find();
      const suppliers = await Supplier.find();
      const getCategory = (name) => categories.find((category) => category.name === name);
      const getSupplier = (name) => suppliers.find((supplier) => supplier.name === name);

      await Product.create([
        {
          name: 'Wireless Mouse',
          category: getCategory('Electronics')._id,
          supplier: getSupplier('Acme Supplies')._id,
          price: 799,
          quantity: 90,
          sku: 'ELEC-MOUSE-01',
          description: 'Ergonomic wireless mouse with adjustable DPI.',
          lowStockThreshold: 10,
        },
        {
          name: 'Bluetooth Keyboard',
          category: getCategory('Electronics')._id,
          supplier: getSupplier('NorthStar Distributors')._id,
          price: 1299,
          quantity: 65,
          sku: 'ELEC-KEYB-01',
          description: 'Compact Bluetooth keyboard for laptops and tablets.',
          lowStockThreshold: 12,
        },
        {
          name: 'A4 Printing Paper',
          category: getCategory('Office Supplies')._id,
          supplier: getSupplier('Acme Supplies')._id,
          price: 499,
          quantity: 180,
          sku: 'OFF-PAPER-A4',
          description: '500-sheet pack of A4 printing paper.',
          lowStockThreshold: 25,
        },
        {
          name: 'All-Purpose Cleaner',
          category: getCategory('Household')._id,
          supplier: getSupplier('Home Essentials Co.')._id,
          price: 299,
          quantity: 120,
          sku: 'HOME-CLEAN-01',
          description: 'Multi-surface cleaner for kitchens and bathrooms.',
          lowStockThreshold: 20,
        },
      ]);
      console.log('Seeded products');
    }

    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      const products = await Product.find();
      const wirelessMouse = products.find((product) => product.sku === 'ELEC-MOUSE-01');
      const printingPaper = products.find((product) => product.sku === 'OFF-PAPER-A4');

      if (wirelessMouse && printingPaper) {
        await Order.create([
          {
            customerName: 'James Patel',
            products: [
              { product: wirelessMouse._id, quantity: 2, price: wirelessMouse.price },
              { product: printingPaper._id, quantity: 3, price: printingPaper.price },
            ],
            totalPrice: wirelessMouse.price * 2 + printingPaper.price * 3,
            status: 'processing',
            notes: 'Ship by Friday',
          },
          {
            customerName: 'Rina Sharma',
            products: [
              { product: printingPaper._id, quantity: 5, price: printingPaper.price },
            ],
            totalPrice: printingPaper.price * 5,
            status: 'pending',
            notes: 'Urgent order',
          },
        ]);
        console.log('Seeded orders');
      }
    }
  } catch (error) {
    console.error('Seed data error:', error);
  }
};

module.exports = seedData;
