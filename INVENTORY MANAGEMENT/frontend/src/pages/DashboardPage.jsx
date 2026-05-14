import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes, productsRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/recent-orders'),
        api.get('/dashboard/recent-products'),
      ]);

      setStats(statsRes.data);
      setRecentOrders(ordersRes.data);
      setRecentProducts(productsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Products</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">{stats?.totalProducts || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Stock</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{stats?.totalStock || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Orders</div>
            <div className="text-3xl font-bold text-purple-600 mt-2">{stats?.totalOrders || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Low Stock Items</div>
            <div className="text-3xl font-bold text-red-600 mt-2">{stats?.lowStockItems || 0}</div>
          </div>
        </div>

        {/* Recent Orders and Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order._id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="font-semibold text-gray-800">{order.customerName}</div>
                    <div className="text-sm text-gray-500">Amount: ₹{order.totalPrice}</div>
                    <div className="text-sm text-gray-500">Status: <span className="font-semibold capitalize">{order.status}</span></div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No recent orders</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Products</h2>
            <div className="space-y-3">
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <div key={product._id} className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="font-semibold text-gray-800">{product.name}</div>
                    <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                    <div className="text-sm text-gray-500">Stock: {product.quantity} | Price: ₹{product.price}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No recent products</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
