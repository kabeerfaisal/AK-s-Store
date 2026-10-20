import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Package,
  X,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';

import { deleteProduct } from '../services/Admin_Services/AdminProductServices';
// import { useGetProduct } from '../hooks/GetProductsHook';

import { useOutletContext } from 'react-router-dom';
import GetProductsByFilter from '../hooks/GetProductsByFilter';

const CATEGORIES = [
  'All', 'Apparel', 'Bags',
  'Accessories', 'Footwear', 'Jewelry'
];

function AdminProducts() {
  const { openEditProductModal, setRefetchHandler } = useOutletContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { products, loading,
    refetch, searchTerm, setSearchTerm,
    page, setPage, totalPages,
    totalProducts } = GetProductsByFilter({ includeInactive: true, category: selectedCategory })

  // Delete
  const handleDelete = async (id) => {
    const response = await deleteProduct(id)
    console.log(response)
    if (response?.success) {
      await refetch()
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(1); // Reset page on category filter change
  };

  useEffect(() => {
    if (setRefetchHandler) {
      setRefetchHandler(() => refetch);
    }
  }, [refetch, setRefetchHandler])

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Products Catalog</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage luxury inventory, pricing, and stock levels.</p>
        </div>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E8DFD1] shadow-sm">

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or SKU..."
            className="w-full rounded-lg bg-[#FAF8F5] border border-[#E8DFD1] py-2 pl-9 pr-4 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-gray-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full sm:w-48 rounded-lg bg-[#FAF8F5] border border-[#E8DFD1] py-2 px-3 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-[#E8DFD1] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#FAF8F5] text-gray-600 border-b border-[#E8DFD1]">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">SKU</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD1]">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8C1515] border-t-gray-100" />
                      <p className="mt-4 text-sm text-slate-500">
                        Loading products...
                      </p>
                    </div>
                  </td>
                </tr>
              ) :
                products.length > 0 ? (
                  products.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">

                      {/* Image & Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.images?.[0]?.url}
                            alt={item.title}
                            className="h-12 w-12 rounded-lg object-cover border border-[#E8DFD1]"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-gray-900">{item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}</span>
                              {item.isFeatured && (
                                <Star className="h-3.5 w-3.5 fill-[#D97706] text-[#D97706]" title="Featured Item" />
                              )}
                            </div>
                            <span className="text-xs text-gray-400 block">{item.slug}</span>
                          </div>
                        </div>
                      </td>

                      {/* Auto SKU */}
                      <td className="px-6 py-4 font-mono text-xs font-medium text-gray-600">{item.sku}</td>

                      {/* Category */}
                      <td className="px-6 py-4 text-gray-600">{item.category}</td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col justify-center">
                          {item.discountPrice && item.discountPrice > 0 && item.discountPrice < item.price ? (
                            <>
                              {/* Discounted Price */}
                              <span className="font-semibold text-[#8C1515]">
                                ${item.discountPrice.toLocaleString()}
                              </span>
                              {/* Original Price (Crossed Out) */}
                              <span className="text-xs text-gray-400 line-through">
                                ${item.price?.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            /* Standard Price */
                            <span className="font-semibold text-gray-900">
                              ${item.price?.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4 text-gray-600">{item.stock} units</td>

                      {/* Description */}
                      <td className="px-6 py-4 text-gray-600 max-w-1 truncate">{item.description}</td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border capitalize ${item.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                          {item.status.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditProductModal(item)}
                            className="p-1.5 text-gray-400 hover:text-[#8C1515] hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <Package className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="font-medium text-gray-700">No products found</p>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8DFD1] bg-[#FAF8F5] text-xs text-gray-500">
          <span>Showing {products.length} of {totalProducts} items (Page {page} of {totalPages})</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page <= 1 || loading}
              className="p-1.5 rounded border border-[#E8DFD1] bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-semibold px-2">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page >= totalPages || loading}
              className="p-1.5 rounded border border-[#E8DFD1] bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>



    // </div >
  );
}

export default AdminProducts;