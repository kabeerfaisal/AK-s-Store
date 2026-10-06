import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, ShieldCheck, X
} from 'lucide-react';
import { useAuth } from '../../hooks/AuthHook'; 

// Props receive kiye
function AdminSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { handleLogout, user, logout} = useAuth() || { user: { name: 'Admin User' } }; 

  const handleSignOut = () => {
    if (handleLogout) handleLogout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop (Dark Overlay) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden"
          onClick={() => setIsOpen(false)} // Bahar click karne pe close
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-30 flex h-screen w-64 flex-col bg-white border-r border-[#E8DFD1] shadow-sm transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        
        {/* Brand & Logo Area */}
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-[#E8DFD1]">
          <div className="flex items-center gap-2 text-[#8C1515]">
            <ShieldCheck className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">Admin<span className="text-[#D97706]">Panel</span></span>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            className="lg:hidden text-gray-400 hover:text-[#8C1515]" 
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => setIsOpen(false)} // Link click hone pe mobile pe close ho jaye
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FAF8F5] text-[#8C1515] shadow-sm ring-1 ring-[#E8DFD1]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon 
                      className={`h-5 w-5 flex-shrink-0 transition-colors ${
                        isActive ? 'text-[#8C1515]' : 'text-gray-400 group-hover:text-gray-600'
                      }`} 
                    />
                    {item.name}
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#D97706]"></span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Profile & Logout */}
        <div className="border-t border-[#E8DFD1] p-4 bg-white">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="h-9 w-9 rounded-full bg-[#FAF8F5] border border-[#E8DFD1] flex items-center justify-center text-[#8C1515] font-bold shadow-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 truncate w-32">{user?.name || 'Administrator'}</span>
              <span className="text-xs text-gray-500 truncate w-32">admin@system.com</span>
            </div>
          </div>

          <button
            onClick={() => { logout() }}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-[#8C1515]"
          >
            <LogOut className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-[#8C1515]" />
            Sign Out
          </button>
        </div>
        
      </div>
    </>
  );
}

export default AdminSidebar;