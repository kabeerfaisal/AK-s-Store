import React from 'react';
import { Bell, Menu, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminHeader({ toggleSidebar, onAddProductClick }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-white px-3 sm:px-6 border-b border-[#E8DFD1] shadow-sm gap-2 sm:gap-4">
      
      {/* Mobile Menu Toggle & Icon */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-1.5 text-gray-500 hover:text-[#8C1515] hover:bg-gray-50 rounded-md focus:outline-none transition-colors shrink-0"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-black text-[#7D0A0A] tracking-tight hover:opacity-90 transition-opacity">
                AK'S<span className="text-[#BF3131]"> STORE</span>
              </Link>
            </div>
      </div>

      {/* Right Section: Actions & Notifications */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button onClick={onAddProductClick} className="flex items-center justify-center gap-2 rounded-lg bg-[#FAF8F5] p-2 sm:px-3 sm:py-2 text-sm font-medium text-[#8C1515] border border-[#E8DFD1] hover:bg-[#8C1515] hover:text-white transition-all shadow-sm">
          <Plus className="h-5 w-5 sm:h-4 sm:w-4" />
          <span className="hidden sm:block">New Product</span>
        </button>
        <div className="hidden sm:block h-6 w-px bg-[#E8DFD1]"></div>

        {/* Notification */}
        <button className="relative p-2 text-gray-400 hover:text-[#8C1515] transition-colors rounded-full hover:bg-gray-50 shrink-0">
          <span className="sr-only">View notifications</span>
          <Bell className="h-5 w-5" />
          {/* Notification Badge */}
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D97706]"></span>
          </span>
        </button>
        
      </div>
    </header>
  );
}

export default AdminHeader;