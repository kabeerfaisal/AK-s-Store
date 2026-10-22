import React, { useState } from 'react';
import { FiFilter, FiChevronDown, FiX, FiSearch, FiShoppingBag, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GetProductsByFilter from '../hooks/GetProductsByFilter';
import ProductCard from '../Components/user/productCard';


const ShopPage = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  // const Navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()

  const currentCategory = searchParams.get('category') || 'all';

  const {
    products,
    loading,
    error,
    sortBy,
    setSortBy,
    page,
    setPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    totalProducts
  } = GetProductsByFilter({
    initialSort: 'featured',
    category: currentCategory
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

  const handleCategorySelect = (cat) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (cat.toLowerCase() === 'all') {
      updatedParams.delete('category');
    } else {
      updatedParams.set('category', cat);
    }
    setSearchParams(updatedParams);
    setPage(1); // Reset to page 1 on category change
  };

  const categoriesList = [
    'all',
    'Bags',
    'Accessories',
    'Footwear',
    'Apparel',
    'Jewelry'
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen flex flex-col bg-[#1A0505] text-[#E8DFD1] selection:bg-[#8C1515] selection:text-white"
      >

        <main className="grow pt-20 pb-16">
          <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">

            {/* Page Header & Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E8DFD1]/15 pb-6 mb-8 pt-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">All Products</h1>
                <p className="text-sm text-[#F3C97A] mt-1">Explore our exclusive collection</p>
              </div>

              <div className="flex items-center justify-between md:justify-end space-x-4 mt-4 md:mt-0">
                {/* Mobile Filter Button */}
                <button
                  className="md:hidden flex items-center px-3 py-2 bg-white border border-[#E8DFD1] rounded-lg text-[#1A0505] font-medium hover:bg-stone-50"
                  onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                >
                  <FiFilter className="mr-2 text-[#F3C97A]" /> Filters
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center text-[#F3C97A]">
                  <span className="mr-2 text-sm font-medium">Sort by:</span>
                  <div className="relative">
                    <select value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value)
                        setPage(1)
                      }}
                      className="appearance-none bg-white border border-[#E8DFD1] text-[#1A0505] py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8C1515] cursor-pointer shadow-sm">
                      <option value={"featured"}>Featured</option>
                      <option value={"price-low"}>Price: Low to High</option>
                      <option value={"price-high"}>Price: High to Low</option>
                      <option value={"newest"}>Newest Arrivals</option>
                    </select>
                    <FiChevronDown className="absolute right-2.5 top-3 text-[#1A0505] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Layout: Sidebar & Product Grid */}
            <div className="flex flex-col md:flex-row gap-8">

              {/* Sidebar Filters */}
              <aside className={`w-full md:w-64 shrink-0 bg-white md:bg-transparent p-5 md:p-0 rounded-xl border md:border-0 border-[#E8DFD1] shadow-sm md:shadow-none ${isMobileFiltersOpen ? 'block' : 'hidden'} md:block`}>

                {/* Mobile Close Button */}
                <div className="flex justify-between items-center md:hidden mb-4 border-b border-[#E8DFD1] pb-4">
                  <h2 className="text-lg font-bold text-[#1A0505]">Filters</h2>
                  <button onClick={() => setIsMobileFiltersOpen(false)} className="text-[#1A0505] hover:text-[#8C1515]">
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Search Bar */}
                  <div>
                    <h3 className="text-xs font-bold text-[#1A0505]  md:text-[#F3C97A]  mb-3 tracking-wider uppercase">
                      Search Products
                    </h3>

                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-[#1A0505]  md:text-[#F3C97A] text-sm" />
                      </div>

                      <input
                        value={searchTerm}
                        onChange={handleSearchChange}
                        type="text"
                        placeholder="Type to search..."
                        className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8DFD1] rounded-lg text-sm text-[#1A0505] placeholder-stone-400 focus:outline-none focus:ring-2 md:focus:ring-[#F3C97A] focus:ring-[#1A0505] transition-all"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="border-t border-[#E8DFD1] pt-5">
                    <h3 className="text-xs font-bold text-[#1A0505]  md:text-[#F3C97A] mb-3 tracking-wider uppercase">Categories</h3>
                    <div className="space-y-2.5">
                      {categoriesList.map((cat, idx) => {
                        const isSelected = currentCategory.toLowerCase() === cat.toLowerCase();
                        return (
                          <button key={idx}
                            onClick={() => {
                              handleCategorySelect(cat)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-between 
                              ${isSelected
                                ? 'bg-[#F3C97A] text-[#1A0505] font-bold'
                                : 'md:text-white text-[#1A0505]  hover:bg-stone-100 hover:text-[#1A0505]'
                              }`}>
                            <span className="capitalize">{cat === 'all' ? 'All Categories' : cat}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="border-t border-[#E8DFD1] pt-5">
                    <h3 className="text-xs font-bold text-[#1A0505]  md:text-[#F3C97A] mb-3 tracking-wider uppercase">Price Range</h3>
                    <div className="flex items-center justify-between gap-2">
                      <input type="text" placeholder="Min" className="w-full border border-[#E8DFD1] bg-white text-stone-800 rounded-md py-1.5 px-3 text-sm focus:ring-[#8C1515] focus:border-[#8C1515]" />
                      <span className="text-stone-400">-</span>
                      <input type="text" placeholder="Max" className="w-full border border-[#E8DFD1] bg-white text-stone-800 rounded-md py-1.5 px-3 text-sm focus:ring-[#8C1515] focus:border-[#8C1515]" />
                    </div>
                  </div>

                  {/* Colors Filter */}
                  <div className="border-t border-[#E8DFD1] pt-5">
                    <h3 className="text-xs font-bold text-[#1A0505]  md:text-[#F3C97A] mb-3 tracking-wider uppercase">Colors</h3>
                    <div className="flex space-x-2">
                      {['bg-stone-900', 'bg-white border border-stone-300', 'bg-red-800', 'bg-amber-600', 'bg-emerald-700'].map((color, idx) => (
                        <button key={idx} className={`w-6 h-6 rounded-full ${color} focus:outline-none focus:ring-2 focus:ring-[#8C1515] shadow-sm transition-transform hover:scale-110`}></button>
                      ))}
                    </div>
                  </div>

                  {/* Apply Filters Mobile Button */}
                  <button
                    className="w-full bg-[#8C1515] text-white py-2.5 rounded-lg font-medium hover:bg-[#680909] md:hidden transition-colors shadow-md"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </aside>

              {/* Product Grid */}
              <div className="flex-1">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-10 h-10 border-4 border-[#EAD196] border-t-[#8C1515] rounded-full"
                    />
                  </div>
                ) : error ? (
                  /* Error State */
                  <div className="text-center py-16 bg-white rounded-2xl border border-red-200 p-8">
                    <p className="text-sm font-bold text-red-800 mb-2">{error}</p>
                    <p className="text-xs text-stone-500">Please check your connection and try again.</p>
                  </div>
                ) : products.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col justify-center items-center h-96 text-center border-2 border-dashed border-[#F3C97A] rounded-2xl p-8 bg-transparent"
                  >
                    <div className="bg-amber-50 p-4 rounded-full border border-amber-200 text-[#D97706] mb-4">
                      <FiShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-[#F3C97A] mb-1">No Products Found</h3>
                    <p className="text-sm text-stone-500 max-w-sm">
                      We couldn't find any products matching your current filters. Try adjusting your search or category selection.
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
                    {products.map((products) => (
                      <ProductCard key={products._id} product={products} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="mt-12 flex justify-center border-t border-[#E8DFD1] pt-8">
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px overflow-hidden" aria-label="Pagination">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      className="inline-flex items-center px-3 py-2 border border-[#E8DFD1] bg-white text-xs font-bold text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiChevronLeft className="h-4 w-4 mr-1" /> Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`inline-flex items-center px-4 py-2 border text-xs font-bold transition-colors ${page === pageNum
                          ? 'z-10 bg-[#F3C97A] text-[#1A0505] border-[#F3C97A]'
                          : 'bg-white border-[#E8DFD1] text-stone-600 hover:bg-stone-50'
                          }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                      className="inline-flex items-center px-3 py-2 border border-[#E8DFD1] bg-white text-xs font-bold text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Next <FiChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </nav>
                </div>

              </div>
            </div>

          </div>
        </main>
      </motion.div>
    </>
  );
};

export default ShopPage;