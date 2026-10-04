import React, { useContext, useEffect, useState } from 'react';
import { FiFilter, FiChevronDown, FiShoppingCart, FiX, FiSearch } from 'react-icons/fi';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../hooks/ApiHook';
import { CartContext } from '../hooks/CartHook';

const ShopPage = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  // const [fetchProduct, setProduct] = useState([]);
  const Navigate = useNavigate();
  const [search, setSearch] = useState('');

  function detailPage(data) {
    Navigate(`/shop/product-detail/${data.id}`, { state: data });
  }

 
  let {products,loading,error} = useContext(ApiContext)
  let {addToCart} = useContext(CartContext)

  const filterProduct = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <>
    <Navbar />
    <motion.div 
      className="min-h-screen flex flex-col bg-[#FAF8F5]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >

      <main className="grow pt-20 pb-16">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header & Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E8DFD1] pb-6 mb-8 pt-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#7A0C0C] tracking-tight">All Products</h1>
              <p className="text-sm text-stone-500 mt-1">Explore our exclusive collection</p>
            </div>

            <div className="flex items-center justify-between md:justify-end space-x-4 mt-4 md:mt-0">
              {/* Mobile Filter Button */}
              <button
                className="md:hidden flex items-center px-3 py-2 bg-white border border-[#E8DFD1] rounded-lg text-stone-700 font-medium hover:bg-stone-50"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              >
                <FiFilter className="mr-2 text-[#8C1515]" /> Filters
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center text-stone-700">
                <span className="mr-2 text-sm font-medium">Sort by:</span>
                <div className="relative">
                  <select className="appearance-none bg-white border border-[#E8DFD1] text-stone-800 py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8C1515] cursor-pointer shadow-sm">
                    <option>Most Popular</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                  <FiChevronDown className="absolute right-2.5 top-3 text-stone-500 pointer-events-none" />
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
                <h2 className="text-lg font-bold text-[#7A0C0C]">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="text-stone-500 hover:text-[#8C1515]">
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Search Bar */}
                <div>
                  <h3 className="text-xs font-bold text-[#7A0C0C] mb-3 tracking-wider uppercase">
                    Search Products
                  </h3>

                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-stone-400 text-sm" />
                    </div>

                    <input
                      onChange={(e) => setSearch(e.target.value)}
                      type="text"
                      placeholder="Type to search..."
                      className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8DFD1] rounded-lg text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8C1515] transition-all"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="border-t border-[#E8DFD1] pt-5">
                  <h3 className="text-xs font-bold text-[#7A0C0C] mb-3 tracking-wider uppercase">Categories</h3>
                  <div className="space-y-2.5">
                    {['All Categories', 'Accessories', 'Electronics', 'Fashion', 'Home Decor'].map((cat, idx) => (
                      <label key={idx} className="flex items-center cursor-pointer group">
                        <input type="checkbox" className="rounded border-[#E8DFD1] text-[#8C1515] focus:ring-[#8C1515] h-4 w-4 cursor-pointer" />
                        <span className="ml-3 text-sm text-stone-600 group-hover:text-[#7A0C0C] transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="border-t border-[#E8DFD1] pt-5">
                  <h3 className="text-xs font-bold text-[#7A0C0C] mb-3 tracking-wider uppercase">Price Range</h3>
                  <div className="flex items-center justify-between gap-2">
                    <input type="text" placeholder="Min" className="w-full border border-[#E8DFD1] bg-white text-stone-800 rounded-md py-1.5 px-3 text-sm focus:ring-[#8C1515] focus:border-[#8C1515]" />
                    <span className="text-stone-400">-</span>
                    <input type="text" placeholder="Max" className="w-full border border-[#E8DFD1] bg-white text-stone-800 rounded-md py-1.5 px-3 text-sm focus:ring-[#8C1515] focus:border-[#8C1515]" />
                  </div>
                </div>

                {/* Colors Filter */}
                <div className="border-t border-[#E8DFD1] pt-5">
                  <h3 className="text-xs font-bold text-[#7A0C0C] mb-3 tracking-wider uppercase">Colors</h3>
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
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterProduct.map((products) => (
                    <motion.div 
                      key={products.id} 
                      onClick={() => detailPage(products)} 
                      className="group relative bg-white border border-[#E8DFD1] rounded-xl overflow-hidden hover:shadow-xl hover:border-[#D97706]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Image Container - Pure Crisp Display */}
                      <div className="aspect-w-1 aspect-h-1 w-full bg-stone-50 h-60 relative overflow-hidden p-4 flex items-center justify-center">
                        <img
                          src={products.image}
                          alt={products.title}
                          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Hover Action */}
                        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center bg-gradient-to-t from-black/50 to-transparent">
                          <button onClick={(e)=>{e.stopPropagation();
                            isLogin && addToCart(products)}} className="flex items-center justify-center w-full bg-[#8C1515] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#680909] transition-colors text-sm">
                            <FiShoppingCart className="mr-2" /> Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 bg-white border-t border-[#F3EFEA]">
                        <p className="text-xs text-[#B45309] font-medium uppercase tracking-wider mb-1">{products.category}</p>
                        <h3 className="text-sm font-bold text-stone-800 line-clamp-1 group-hover:text-[#8C1515] transition-colors">
                          {products.title}
                        </h3>
                        <div className="flex justify-between items-center mt-3">
                          <p className="text-base font-extrabold text-[#8C1515]">${products.price}</p>
                          <div className="flex items-center text-[#D97706] bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-xs font-bold">
                            ★ {products.rating?.rate}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="mt-12 flex justify-center border-t border-[#E8DFD1] pt-8">
                <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px overflow-hidden" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-3 py-2 border border-[#E8DFD1] bg-white text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors">
                    Previous
                  </a>
                  <a href="#" aria-current="page" className="z-10 bg-[#8C1515] border-[#8C1515] text-white relative inline-flex items-center px-4 py-2 border text-sm font-bold">
                    1
                  </a>
                  <a href="#" className="bg-white border-[#E8DFD1] text-stone-600 hover:bg-stone-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors">
                    2
                  </a>
                  <a href="#" className="bg-white border-[#E8DFD1] text-stone-600 hover:bg-stone-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors">
                    3
                  </a>
                  <a href="#" className="relative inline-flex items-center px-3 py-2 border border-[#E8DFD1] bg-white text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors">
                    Next
                  </a>
                </nav>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </motion.div>
    </>
  );
};

export default ShopPage;