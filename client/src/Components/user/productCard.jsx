import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { CartContext } from '../../hooks/CartHook';
import { useAuth } from '../../hooks/AuthHook';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const { addTocart } = useContext(CartContext);

  if (!product) return null;

  // Price & Stock Calculations
  const hasDiscount = product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price;
  const finalPrice = hasDiscount ? product.discountPrice : product.price;
  const isOutOfStock = product.stock === 0 || product.status === 'out_of_stock';

  // Primary Image Fallback
  const mainImage = product.images && product.images.length > 0
    ? (product.images.find(img => img.isPrimary)?.url || product.images[0].url)
    : 'https://via.placeholder.com/400x533';

  const handleCardClick = () => {
    navigate(`/shop/product-detail/${product._id}`, { state: product });
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();

    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : '';
    if (!isOutOfStock && isLogin) {
      addTocart({
        productId: product._id,
        quantity: 1,
        selectedSize: defaultSize
      });
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between cursor-pointer bg-[#1A0505]/70 backdrop-blur-sm rounded-2xl border border-[#E8DFD1]/15 hover:border-[#F3C97A]/50 transition-all duration-500 p-3.5 sm:p-4 h-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Dark Image Canvas */}
      <div className="relative aspect-3/4 w-full bg-[#250808]/60 rounded-xl overflow-hidden border border-[#E8DFD1]/10 flex items-center justify-center p-4">

        {/* Floating Luxury Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex justify-between items-start pointer-events-none">
          {hasDiscount ? (
            <span className="bg-[#8C1515] text-white text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-[#F3C97A]/30 shadow-md">
              -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
            </span>
          ) : <div />}

          {product.isFeatured && (
            <span className="bg-[#1A0505]/90 backdrop-blur-md text-[#F3C97A] text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-[#F3C97A]/30">
              Featured
            </span>
          )}
        </div>

        {/* Main Image */}
        <img
          src={mainImage}
          alt={product.title}
          className={`w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
            isOutOfStock ? 'opacity-25 grayscale' : ''
          }`}
        />

        {/* Sold Out Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1A0505]/80 backdrop-blur-xs">
            <span className="bg-[#8C1515] text-white text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded border border-[#F3C97A]/30">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick Add Button */}
        {!isOutOfStock && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-2.5 right-2.5 bg-[#8C1515] hover:bg-[#a81a1a] text-white p-2 sm:px-3 sm:py-2 rounded-lg border border-[#F3C97A]/30 shadow-lg flex items-center justify-center gap-1.5 text-xs font-semibold opacity-100 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 active:scale-95 z-10"
          >
            <FiShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline font-mono tracking-wider uppercase text-[10px]">Add</span>
          </button>
        )}
      </div>

      {/* Info Block */}
      <div className="pt-3.5 pb-1 px-1 flex flex-col justify-between gap-1.5 grow">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-[#F3C97A] uppercase truncate">
              {product.category}
            </span>

            {product.ratings?.average > 0 && (
              <span className="text-[11px] font-semibold text-[#E8DFD1]/80 flex items-center gap-1 shrink-0">
                <FiStar className="text-[#F3C97A] fill-[#F3C97A] h-3 w-3" />
                <span>{product.ratings.average}</span>
              </span>
            )}
          </div>

          <h3 className="text-xs sm:text-sm font-medium text-white line-clamp-1 group-hover:text-[#F3C97A] transition-colors tracking-wide">
            {product.title}
          </h3>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-sm sm:text-base font-bold font-mono text-[#F3C97A]">
            PKR {finalPrice?.toLocaleString()}
          </span>
          {hasDiscount ? (
            <span className="text-xs text-[#E8DFD1]/40 line-through font-mono">
              PKR {product.price?.toLocaleString()}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;