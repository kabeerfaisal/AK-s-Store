import React from 'react';
import { Search, Bell, Menu, Plus } from 'lucide-react';

function AdminHeader({ toggleSidebar }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-white px-3 sm:px-6 border-b border-[#E8DFD1] shadow-sm gap-2 sm:gap-4">
      
      {/* Left Section: Mobile Menu Toggle & Search */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-1.5 text-gray-500 hover:text-[#8C1515] hover:bg-gray-50 rounded-md focus:outline-none transition-colors shrink-0"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Global Search Bar (Visible on all screens now) */}
        <div className="flex w-full max-w-md items-center relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..." // Placeholder chota kar diya taake mobile pe bura na lage
            className="block w-full rounded-lg bg-[#FAF8F5] border border-transparent py-2 sm:py-2 pl-9 sm:pl-10 pr-3 sm:pr-4 text-sm text-gray-900 focus:border-[#E8DFD1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515] transition-all"
          />
        </div>
      </div>

      {/* Right Section: Actions & Notifications */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        
        {/* Quick Add Button (Icon only on mobile, Icon + Text on Desktop) */}
        <button className="flex items-center justify-center gap-2 rounded-lg bg-[#FAF8F5] p-2 sm:px-3 sm:py-2 text-sm font-medium text-[#8C1515] border border-[#E8DFD1] hover:bg-[#8C1515] hover:text-white transition-all shadow-sm">
          <Plus className="h-5 w-5 sm:h-4 sm:w-4" />
          {/* Ye text sirf bari screen pe show hoga */}
          <span className="hidden sm:block">New Product</span>
        </button>

        {/* Vertical Divider (Mobile pe hide rahega jagah bachanay k liye) */}
        <div className="hidden sm:block h-6 w-px bg-[#E8DFD1]"></div>

        {/* Notifications Bell */}
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