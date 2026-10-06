import React, { useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import Navbar from '../Components/user/NavBar';
import Footer from '../Components/user/Footer';
import { CartContext } from '../hooks/CartHook';

function ProductDetail() {
  const { state } = useLocation();
  let {addToCart} = useContext(CartContext)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Agar user direct URL se aaye aur state na ho, toh error se bachne ke liye:
  if (!state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <h2 className="text-2xl font-bold text-[#7A0C0C] mb-4">Product not found!</h2>
        <Link to="/" className="text-[#8C1515] hover:underline flex items-center">
          <FiArrowLeft className="mr-2" /> Go back to Shop
        </Link>
      </div>
    );
  }

  return (
<div className="bg-[#120404] min-h-screen flex flex-col font-sans text-[#EEEEEE]">
      {/* <Navbar /> */}
      <main className="grow">
        <motion.div 
          className="max-w-6xl mx-auto px-4 py-12 pt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Back Button */}
          <Link 
            to="/shop" 
            className="inline-flex items-center text-[#EEEEEE]/70 hover:text-[#EAD196] mb-8 transition-colors font-medium text-sm"
          >
            <FiArrowLeft className="mr-2" /> Back to Products
          </Link>

          <div className="bg-[#1A0808]/90 rounded-2xl shadow-2xl border border-[#EAD196]/20 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-12">
              
              {/* Left: Product Image */}
              <div className="flex justify-center items-center bg-[#120404]/80 border border-[#EAD196]/10 rounded-xl p-8 h-[300px] md:h-[500px] overflow-hidden group cursor-pointer">
                <img 
                  src={state?.image} 
                  alt={state?.title} 
                  className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.7) transform group-hover:scale-110 transition-transform duration-500 ease-out]" 
                />
              </div>

              {/* Right: Product Details */}
              <div className="flex flex-col justify-center">
                
                <p className="text-xs font-bold text-[#EAD196] uppercase tracking-widest mb-2">
                  {state?.category}
                </p>
                
                <h1 className="text-2xl md:text-4xl font-black text-[#EEEEEE] leading-tight mb-4 tracking-tight">
                  {state?.title}
                </h1>

                {/* Rating Section */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex text-[#EAD196] font-bold text-lg">
                    ★ {state?.rating?.rate || "0.0"}
                  </div>
                  <span className="text-[#EEEEEE]/60 text-sm font-medium">
                    ({state?.rating?.count || 0} reviews)
                  </span>
                </div>

                {/* Price */}
                <h2 className="text-3xl font-extrabold text-[#EAD196] mb-6 tracking-tight">
                  PKR {state?.price}
                </h2>

                {/* Description */}
                <div className="prose prose-sm md:prose-base text-[#EEEEEE]/80 mb-8">
                  <p className="leading-relaxed">
                    {state?.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  {/* Primary Add to Cart Button */}
                  <button onClick={()=>addToCart(state)} className="flex-1 bg-[#BF3131] hover:bg-[#7D0A0A] text-[#EEEEEE] font-bold py-3.5 px-6 rounded-lg shadow-lg transition-all duration-200 flex justify-center items-center uppercase text-xs tracking-wider border border-[#BF3131]/30">
                    <FiShoppingCart className="mr-2 text-lg" /> Add to Cart
                  </button>
                  {/* Secondary Buy Now Button */}
                  <button className="flex-1 bg-transparent text-[#EAD196] hover:bg-[#EAD196] hover:text-[#120404] font-bold py-3.5 px-6 rounded-lg transition-all duration-200 border border-[#EAD196]/60 uppercase text-xs tracking-wider">
                    Buy Now
                  </button>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default ProductDetail;