import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiArrowLeft, 
  FiCheck, 
  FiTruck, 
  FiShield, 
  FiMinus, 
  FiPlus, 
  FiStar 
} from 'react-icons/fi';
import { CartContext } from '../hooks/CartHook';

function ProductDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(state || null);
  const [loading, setLoading] = useState(!state);
  const [error, setError] = useState('');

  // States for interactive selection
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProductData = async () => {
      // Skip API call if we already have full state from route transition
      if (state) {
        setProduct(state);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const response = await getProductById(id);

        if (response?.success && response?.product) {
          setProduct(response.product);
        } else if (response?._id) {
          setProduct(response);
        } else {
          setError('Product not found or unavailable.');
        }
      } catch (err) {
        setError(err.message || 'Error fetching product details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id, state]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product.images && product.images.length > 0) {
      const primary = state.images.find(img => img.isPrimary)?.url || product.images[0].url;
      setSelectedImage(primary);
    }
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  // Fallback if accessed without router state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-stone-500 mb-6">The item you are looking for is unavailable or link has expired.</p>
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 bg-[#8C1515] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#701010] transition-colors"
        >
          <FiArrowLeft /> Return to Shop
        </Link>
      </div>
    );
  }

  // Pricing & Stock Calculations
  const hasDiscount = product.discountPrice && product.discountPrice < product.price && product.discountPrice > 0  ;
  const finalPrice = hasDiscount ? product.discountPrice : product.price;
  const isOutOfStock = product.stock === 0 || product.status === 'out_of_stock';

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({
      ...state,
      selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-900 font-sans antialiased pb-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
        
        {/* Navigation Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-6 flex items-center justify-between"
        >
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-stone-500 hover:text-[#8C1515] transition-colors text-xs sm:text-sm font-medium uppercase tracking-wider"
          >
            <FiArrowLeft className="h-4 w-4" /> Back to Products
          </Link>

          <span className="text-xs text-stone-400 font-mono">
            SKU: {product.sku || 'N/A'}
          </span>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-2xl border border-[#E8DFD1] p-4 sm:p-8 shadow-sm">
          
          {/* LEFT: Image Gallery (7 Cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnail Strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-125 shrink-0 scrollbar-thin">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img.url)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-[#FAF8F5] ${
                      selectedImage === img.url 
                        ? 'border-[#8C1515] shadow-xs scale-95' 
                        : 'border-[#E8DFD1] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image Stage */}
            <div className="relative flex-1 aspect-3/4 max-h-137.5 bg-[#FAF8F5] rounded-xl overflow-hidden border border-[#E8DFD1]/60 flex items-center justify-center p-6 group">
              <img 
                src={selectedImage || 'https://via.placeholder.com/500'} 
                alt={product.title} 
                className={`max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 ${
                  isOutOfStock ? 'opacity-30 grayscale' : ''
                }`}
              />

              {/* Status Overlay Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isFeatured && (
                  <span className="bg-white/90 backdrop-blur-md text-[#B45309] border border-[#E8DFD1] text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-widest shadow-2xs">
                    Featured
                  </span>
                )}
                {hasDiscount ? (
                  <span className="bg-[#8C1515] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-widest shadow-2xs">
                    -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                ) : null}
              </div>

              {isOutOfStock && (
                <span className="absolute bg-stone-900 text-white text-xs font-semibold px-4 py-1.5 rounded uppercase tracking-widest shadow-md">
                  Sold Out
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: Product Details (5 Cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Category & Collection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#B45309] uppercase tracking-[0.2em]">
                  {product.category}
                </span>
                {product.collectionName && (
                  <span className="text-xs text-stone-400 font-medium tracking-wide">
                    {product.collectionName}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
                {product.title}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FCD34D]/40 text-xs font-bold">
                  <FiStar className="fill-[#D97706] mr-1 h-3.5 w-3.5" />
                  <span>{product.ratings?.average || product.rating?.rate || "0.0"}</span>
                </div>
                <span className="text-xs text-stone-400">
                  ({product.ratings?.count || product.rating?.count || 0} reviews)
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD1]/80 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#8C1515]">
                PKR {finalPrice?.toLocaleString()}
              </span>
              {hasDiscount ? (
                <span className="text-base text-stone-400 line-through font-medium">
                  PKR {product.price?.toLocaleString()}
                </span>
              ): null}
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-b border-stone-100 py-4">
              {product.description || 'Crafted with premium materials and signature craftsmanship. Perfect addition to your luxury wardrobe.'}
            </div>

            {/* Sizes Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Select Size
                  </label>
                  <span className="text-[11px] text-[#8C1515] font-semibold cursor-pointer hover:underline">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#8C1515] text-white border-[#8C1515] shadow-xs'
                          : 'bg-white text-stone-700 border-[#E8DFD1] hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                
                {/* Quantity Control */}
                <div className="flex items-center border border-[#E8DFD1] rounded-lg bg-[#FAF8F5]">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-2.5 text-stone-600 hover:text-stone-900"
                    disabled={isOutOfStock}
                  >
                    <FiMinus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-stone-800">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-2.5 text-stone-600 hover:text-stone-900"
                    disabled={isOutOfStock}
                  >
                    <FiPlus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Primary Add To Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md ${
                    isOutOfStock 
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : added 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-[#8C1515] hover:bg-[#701010] text-white active:scale-[0.99]'
                  }`}
                >
                  {added ? (
                    <>
                      <FiCheck className="h-4 w-4" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <FiShoppingCart className="h-4 w-4" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Luxury Value Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E8DFD1]/60 text-stone-600">
              <div className="flex items-center gap-2.5 text-xs">
                <FiTruck className="text-[#8C1515] h-4 w-4 shrink-0" />
                <span>Express Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <FiShield className="text-[#8C1515] h-4 w-4 shrink-0" />
                <span>100% Authentic Guaranteed</span>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

export default ProductDetail;