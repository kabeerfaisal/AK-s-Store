import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiShoppingCart, 
  FiStar, 
  FiSliders, 
  FiPackage, 
  FiChevronDown 
} from 'react-icons/fi';
import { CartContext } from '../hooks/CartHook';
import GetProductsByFilter from '../hooks/GetProductsByFilter';

function ProductsByCategory() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const { 
    products, 
    loading, 
    error, 
    sortBy, 
    setSortBy, 
    totalProducts 
  } = GetProductsByFilter({ category: id });

  // Navigate to Detail Page
  const handleDetailPage = (product) => {
    navigate(`/shop/product-detail/${product.id}`, { state: product });
  };

  // Capitalized Category Title for Banner
  const categoryTitle = id 
    ? id.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) 
    : 'Category Collection';

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-900 font-sans antialiased pb-20">
      
      {/* Category Header Banner */}
      <section className="bg-white border-b border-[#E8DFD1] pt-24 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#8C1515] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#8C1515] transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-[#8C1515] font-bold">{categoryTitle}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div>
              <span className="text-xs font-bold text-[#B45309] tracking-[0.2em] uppercase block mb-1">
                Luxury Collection
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
                {categoryTitle}
              </h1>
            </div>

            {/* Total Items Counter Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FAF8F5] px-4 py-2 rounded-xl border border-[#E8DFD1] self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#8C1515]"></span>
              <span className="text-xs font-bold text-stone-800 uppercase tracking-widest">
                {loading ? '...' : `${products.length || totalProducts} Items Available`}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-3.5 sm:p-4 rounded-xl border border-[#E8DFD1] shadow-2xs mb-8">
          
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-stone-600 hover:text-[#8C1515] text-xs sm:text-sm font-semibold transition-colors uppercase tracking-wider"
          >
            <FiArrowLeft className="h-4 w-4" /> All Products
          </Link>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <label htmlFor="sort" className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <FiSliders className="h-3.5 w-3.5" /> Sort By:
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#FAF8F5] border border-[#E8DFD1] text-stone-800 text-xs sm:text-sm font-semibold py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:border-[#8C1515] transition-colors cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Loading State - Skeletons Grid */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-[#E8DFD1]/60 p-3 flex flex-col gap-3 animate-pulse">
                <div className="w-full aspect-3/4 bg-stone-200/60 rounded-lg"></div>
                <div className="h-3 bg-stone-200/60 rounded w-1/3"></div>
                <div className="h-4 bg-stone-200/60 rounded w-3/4"></div>
                <div className="h-4 bg-stone-200/60 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-20 bg-white rounded-2xl border border-red-200 p-8 max-w-lg mx-auto shadow-sm">
            <p className="text-sm font-bold text-red-800 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#8C1515] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#701010] transition-colors"
            >
              Try Reloading
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-24 bg-white rounded-2xl border border-[#E8DFD1] p-8 max-w-md mx-auto shadow-2xs">
            <div className="w-16 h-16 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E8DFD1]">
              <FiPackage className="h-8 w-8 text-[#8C1515]/60" />
            </div>
            <h3 className="text-base font-bold text-stone-900 uppercase tracking-wide mb-1">
              No Products Found
            </h3>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              We currently don't have any items under the "{categoryTitle}" category. Check back soon or explore other collections.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-[#8C1515] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#701010] transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((item) => {
              const hasDiscount = item.discountPrice && item.discountPrice > 0 && item.discountPrice < item.price;
              const finalPrice = hasDiscount ? item.discountPrice : item.price;
              const isOutOfStock = item.stock === 0 || item.status === 'out_of_stock';

              // Image Fallback Setup
              const mainImage = item.images && item.images.length > 0
                ? (item.images.find(img => img.isPrimary)?.url || item.images[0].url)
                : 'https://via.placeholder.com/400x533';

              return (
                <div
                  key={item._id}
                  onClick={() => handleDetailPage(item)}
                  className="group relative flex flex-col justify-between cursor-pointer transition-all duration-300"
                >
                  {/* Studio Canvas Frame (3:4 Ratio) */}
                  <div className="relative aspect-3/4 w-full bg-[#F8F6F0] rounded-xl overflow-hidden border border-[#E8DFD1]/60 group-hover:border-[#8C1515]/40 transition-all duration-500 flex items-center justify-center p-3 sm:p-5">
                    
                    {/* Minimal Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex justify-between items-start pointer-events-none">
                      {hasDiscount ? (
                        <span className="bg-[#8C1515] text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded shadow-2xs">
                          -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}%
                        </span>
                      ) : <div />}

                      {item.isFeatured && (
                        <span className="bg-white/90 backdrop-blur-md text-[#B45309] text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-[#E8DFD1] shadow-2xs">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Image */}
                    <img
                      src={mainImage}
                      alt={item.title}
                      className={`max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-108 ${
                        isOutOfStock ? 'opacity-30 grayscale' : ''
                      }`}
                    />

                    {/* Out of Stock Overlay */}
                    {isOutOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-stone-900/20 backdrop-blur-[2px]">
                        <span className="bg-stone-900 text-white text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded shadow-md">
                          Sold Out
                        </span>
                      </div>
                    )}

                    {/* Floating Quick Add Button */}
                    {!isOutOfStock && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-[#8C1515] hover:bg-[#680909] text-white p-2 sm:px-3 sm:py-2 rounded-lg shadow-md flex items-center justify-center gap-1.5 text-xs font-semibold sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 active:scale-95 z-10"
                      >
                        <FiShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline tracking-wider uppercase text-[11px]">Add</span>
                      </button>
                    )}
                  </div>

                  {/* Product Details Block */}
                  <div className="pt-2.5 pb-1 px-1 flex flex-col justify-between gap-1">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] tracking-[0.18em] font-bold text-[#B45309] uppercase truncate">
                          {item.category}
                        </span>

                        {/* Clean Rating Badge */}
                        {item.ratings?.average > 0 && (
                          <span className="text-[11px] font-semibold text-stone-600 flex items-center gap-0.5 shrink-0">
                            <span className="text-amber-500">★</span>
                            <span>{item.ratings.average}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs sm:text-sm font-semibold text-stone-800 line-clamp-1 group-hover:text-[#8C1515] transition-colors tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-sm sm:text-base font-extrabold text-[#8C1515]">
                        PKR {finalPrice?.toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-stone-400 line-through font-normal">
                          PKR {item.price?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}

export default ProductsByCategory;