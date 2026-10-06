import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Components/admin/adminSidebar'; 
import AdminHeader from '../Components/admin/adminNavbar'; 

function AdminLayout() {
  // Sidebar ki mobile state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#FAF8F5] overflow-hidden relative">
      
      {/* Sidebar ko state aur setter function pass kiya */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden w-full">
        {/* Header ko toggle function pass kiya */}
        <AdminHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
}

export default AdminLayout;