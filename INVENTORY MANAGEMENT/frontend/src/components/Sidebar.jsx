import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { name: 'Products', icon: '📦', path: '/products' },
    { name: 'Categories', icon: '🏷️', path: '/categories' },
    { name: 'Suppliers', icon: '🤝', path: '/suppliers' },
    { name: 'Orders', icon: '📋', path: '/orders' },
  ];

  const adminMenuItems = [
    { name: 'Users', icon: '👥', path: '/users' },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white h-screen transition-all duration-300 fixed left-0 top-0 overflow-y-auto`}>
      <div className="p-4 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold">Inventory</h1>}
        <button onClick={() => setIsOpen(!isOpen)} className="hover:bg-gray-700 p-2 rounded">
          ☰
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="px-4 py-3 hover:bg-gray-700 flex items-center gap-3 transition"
          >
            <span>{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}

        {user?.role === 'admin' && (
          <>
            <hr className="my-4" />
            {adminMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-3 hover:bg-gray-700 flex items-center gap-3 transition"
              >
                <span>{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <Link to="/profile" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded mb-2">
          <span>👤</span>
          {isOpen && <span className="truncate">{user?.username}</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold"
        >
          {isOpen ? 'Logout' : '🚪'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
