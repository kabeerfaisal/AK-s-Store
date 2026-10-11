import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
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
import { addProduct, deleteProduct, getProducts } from '../services/Admin_Services/AdminProductServices';

// Mock Data for UI Testing
const INITIAL_PRODUCTS = [
  {
    _id: '1',
    title: 'Royal Silk Velvet Gown',
    sku: 'APP-9B2X71',
    slug: 'royal-silk-velvet-gown-a8f3',
    category: 'Apparel',
    price: 1250,
    discountPrice: 990,
    stock: 14,
    status: 'active',
    images: [{ url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&auto=format&fit=crop&q=80' }],
    sizes: ['S', 'M', 'L'],
    isFeatured: true,
  },
  {
    _id: '2',
    title: 'Crimson Leather Duffel',
    sku: 'BAG-3K8L22',
    slug: 'crimson-leather-duffel-b2x9',
    category: 'Bags',
    price: 890,
    discountPrice: 0,
    stock: 3,
    status: 'active',
    images: [{ url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=80' }],
    sizes: ['Standard'],
    isFeatured: false,
  },
  {
    _id: '3',
    title: 'Gold Inlaid Timepiece',
    sku: 'ACC-7M1P90',
    slug: 'gold-inlaid-timepiece-x7c1',
    category: 'Accessories',
    price: 3400,
    discountPrice: 0,
    stock: 0,
    status: 'out_of_stock',
    images: [{ url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80' }],
    sizes: ['Standard'],
    isFeatured: true,
  },
];

const CATEGORIES = ['All', 'Apparel', 'Bags', 'Accessories', 'Footwear', 'Jewelry'];
const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Standard'];

function AdminProducts() {
  // Outlet context (agar AdminLayout me state set ki ho, warna local state fallback)
  const outletContext = useOutletContext();
  const [localModalOpen, setLocalModalOpen] = useState(false);

  const isModalOpen = outletContext?.isAddModalOpen ?? localModalOpen;
  const setIsModalOpen = outletContext?.setIsAddModalOpen ?? setLocalModalOpen;

  const [products, setProducts] = useState([]);
  const [Fetching, setFetching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingId, setEditingId] = useState(null);

  // Form State
  const initialForm = {
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    stock: '',
    category: 'Apparel',
    collectionName: '',
    imageUrl: '',
    sizes: [],
    isFeatured: false,
  };
  const [formData, setFormData] = useState(initialForm);

  // Filtered Products Logic
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Modal Close & Reset
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  // Toggle Size
  const handleSizeToggle = (sz) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(sz) ? prev.sizes.filter(s => s !== sz) : [...prev.sizes, sz]
    }));
  };


  const fetchProducts = async () => {
    try {
      setFetching(true)
      let response = await getProducts()
      if (response.success) {
        setProducts(response.products)
        console.log(response)
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Local Form Submit (Mock Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (editingId) {
    //   setProducts(products.map(p => p._id === editingId ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) } : p));
    // } else {
    //   const newItem = {
    //     _id: String(Date.now()),
    //     title: formData.title,
    //     sku: `${formData.category.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    //     slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
    //     category: formData.category,
    //     price: Number(formData.price),
    //     discountPrice: Number(formData.discountPrice) || 0,
    //     stock: Number(formData.stock),
    //     status: Number(formData.stock) > 0 ? 'active' : 'out_of_stock',
    //     images: [{ url: formData.imageUrl || 'https://via.placeholder.com/150' }],
    //     sizes: formData.sizes,
    //     isFeatured: formData.isFeatured,
    //   };
    //   setProducts([newItem, ...products]);
    // }
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        discountPrice: Number(formData.discountPrice) || 0,
        stock: Number(formData.stock),
        status: Number(formData.stock) > 0 ? 'active' : 'out_of_stock',
        images: [{ url: formData.imageUrl || 'https://placeholder.com' }]
      }
      const response = await addProduct(productData)
      console.log(response)
      closeModal();
      setFormData(initialForm)
      setEditingId(null)
      await fetchProducts()
    } catch (error) {
      setError(error.message);
    }
  };

  // Mock Delete
  const handleDelete = async (id) => {
    const response = await deleteProduct(id)
    console.log(response)
    if (response.success) {
      setProducts(products.filter(p => p._id !== id));
      await fetchProducts()
    }
  };

  // Mock Edit Click
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      description: item.description || '',
      price: item.price,
      discountPrice: item.discountPrice || '',
      stock: item.stock,
      category: item.category,
      collectionName: item.collectionName || '',
      imageUrl: item.images?.[0]?.url || '',
      sizes: item.sizes || [],
      isFeatured: item.isFeatured || false,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Products Catalog</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage luxury inventory, pricing, and stock levels.</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setFormData(initialForm);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#8C1515] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#701010]"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </button>
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
            onChange={(e) => setSelectedCategory(e.target.value)}
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
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD1]">
              {Fetching ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8C1515] border-t-slate-600" />
                      <p className="mt-4 text-sm text-slate-500">
                        Loading products...
                      </p>
                    </div>
                  </td>
                </tr>
              ) :
                filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
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
                      <td className="px-6 py-4 font-semibold text-gray-900">${item.price.toLocaleString()}</td>

                      {/* Stock */}
                      <td className="px-6 py-4 text-gray-600">{item.stock} units</td>

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
                            onClick={() => handleEdit(item)}
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
          <span>Showing {filteredProducts.length} items</span>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded border border-[#E8DFD1] bg-white opacity-50" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-1.5 rounded border border-[#E8DFD1] bg-white opacity-50" disabled>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-[#E8DFD1] my-8 relative">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingId ? 'Edit Product Details' : 'Add Luxury Product'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">SKU and Slug are auto-generated by the backend.</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Silk Velvet Gown"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-[#E8DFD1] bg-[#FAF8F5] p-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                />
              </div>

              {/* Category & Collection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD1] bg-[#FAF8F5] p-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Collection Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Winter Edition 2026"
                    value={formData.collectionName}
                    onChange={(e) => setFormData({ ...formData, collectionName: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD1] bg-[#FAF8F5] p-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                  />
                </div>
              </div>

              {/* Price, Discount Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Price ($) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="1200"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD1] bg-[#FAF8F5] p-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Discount Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="950"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD1] bg-[#FAF8F5] p-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="15"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD1] bg-[#FAF8F5] p-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Craftsmanship details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-[#E8DFD1] bg-[#FAF8F5] p-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full rounded-lg border border-[#E8DFD1] bg-[#FAF8F5] p-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
                />
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">Available Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SIZES.map((sz) => {
                    const isSelected = formData.sizes.includes(sz);
                    return (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => handleSizeToggle(sz)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold border transition-all ${isSelected
                            ? 'bg-[#8C1515] text-white border-[#8C1515]'
                            : 'bg-[#FAF8F5] text-gray-600 border-[#E8DFD1] hover:border-gray-400'
                          }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="h-4 w-4 rounded text-[#8C1515] focus:ring-[#8C1515] border-[#E8DFD1]"
                />
                <label htmlFor="isFeatured" className="text-xs font-semibold text-gray-700 select-none">
                  Mark as Featured Product
                </label>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFD1]">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#8C1515] px-5 py-2 text-sm font-semibold text-white hover:bg-[#701010] shadow-sm"
                >
                  Save Item
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminProducts;