import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Components/admin/adminSidebar'; 
import AdminHeader from '../Components/admin/adminNavbar'; 
import ProductModal from '../Components/admin/ProductModal';

function AdminLayout() {
  // Sidebar ki mobile state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null);

  const OpenAddProductModal = () =>{
    setEditingProduct(null)
    setIsAddModalOpen(true)
  }
const closeModal = () =>{
  setIsAddModalOpen(false)
  setEditingProduct(null)
}

const openEditProductModal = (product) => {
    setEditingProduct(product); 
    setIsAddModalOpen(true);
  };

  return (
    <div className="flex h-screen w-full bg-[#FAF8F5] overflow-hidden relative">
      
      {/* Sidebar ko state aur setter function pass kiya */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden w-full">
        {/* Header ko toggle function pass kiya */}
        <AdminHeader 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onAddProductClick={OpenAddProductModal} 
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet context={{OpenAddProductModal, openEditProductModal}} />
        </main>
      </div>

      <ProductModal
      isOpen={isAddModalOpen}
      onCLose={closeModal}
      editingProduct={editingProduct}
      />
      
    </div>
  );
}

export default AdminLayout;