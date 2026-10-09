import React, { useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroCarousel from '../Components/user/Carouseltemp';
import { ApiContext } from '../hooks/ApiHook';
import { CartContext } from '../hooks/CartHook';
import { useAuth } from '../hooks/AuthHook';

const HomePage = () => {
  const navigate = useNavigate()
  const {isLogin} = useAuth()
  function detailPage(data) {
    navigate(`/shop/product-detail/${data.id}`, { state: data });
  }
  let {products} = useContext(ApiContext)
  let {addToCart} = useContext(CartContext)

  return (
<>
  {/* <Navbar /> */}
  <motion.div
    className="min-h-screen flex flex-col bg-[#1A0505] text-[#E8DFD1] selection:bg-[#8C1515] selection:text-white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <main className="grow pt-16">
      <HeroCarousel />

      {/* 2. Featured Categories — Editorial Archive Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10 border-b border-[#E8DFD1]/15 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F3C97A] block mb-2">
              — Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
              Shop by Category
            </h2>
          </div>
          <span className="hidden sm:block text-xs font-mono text-[#E8DFD1]/50 uppercase tracking-widest">
            [ 04 Main Collections ]
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {['Outerwear', 'Denim', 'Dresses', 'Accessories'].map((category, index) => (
            <div
              key={category}
              className="group relative h-56 sm:h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer border border-[#E8DFD1]/15 bg-[#1A0505] hover:border-[#F3C97A]/50 transition-all duration-500 shadow-xl"
            >
              {/* Category Image with Hover Zoom */}
              <img
                src={`https://picsum.photos/600/800?random=${index + 10}`}
                alt={category}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.1] group-hover:scale-110 group-hover:brightness-100 transition-all duration-700 ease-out"
              />
              
              {/* Dark Gradient Mask for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0505] via-[#1A0505]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
              
              {/* Top Index Marker */}
              <div className="absolute top-4 left-4 z-10 font-mono text-xs text-[#F3C97A] opacity-80">
                0{index + 1}
              </div>

              {/* Bottom Label & Arrow */}
              <div className="absolute left-4 right-4 bottom-4 z-10 flex items-center justify-between">
                <span className="text-white font-serif text-xl sm:text-2xl tracking-wide drop-shadow-md group-hover:text-[#F3C97A] transition-colors duration-300">
                  {category}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#8C1515] group-hover:border-[#8C1515] transition-all duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Popular Products Grid — Streetwear / Vintage Drop Style */}
      <section className="bg-black/30 border-t border-[#E8DFD1]/15 py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#E8DFD1]/15 pb-5 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#8C1515]/20 border border-[#8C1515]/40 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3C97A] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F3C97A]">
                  Weekly Archive Drop
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
                Just In
              </h2>
            </div>
            <p className="text-[#E8DFD1]/60 text-xs sm:text-sm font-mono tracking-wider">
              // 1-OF-1 VINTAGE & CURATED PIECES
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 ">
            {products.slice(0,4).map((product) => (
              <div
                onClick={() => detailPage(product)}
                key={product.id}
                className="group h-100 cursor-pointer rounded-2xl bg-[#1A0505]/60 border border-[#E8DFD1]/15 p-3.5 hover:border-[#F3C97A]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#8C1515]/20 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Image Container with Streetwear Overlays */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/50 border border-[#E8DFD1]/10">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05] group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                  />
                  
                  {/* Thrift Vintage Badge Overlay */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-[#1A0505]/80 backdrop-blur-md border border-[#E8DFD1]/20 text-[#F3C97A]">
                      1-of-1
                    </span>
                  </div>

                  {/* Glassmorphic Cart Button */}
                  <button onClick={(e)=>{e.stopPropagation()
                    isLogin && addToCart(product)} }
                  disabled={!isLogin}
                    aria-label="Add to cart"
                    className="absolute right-3 bottom-3 z-10 flex items-center justify-center w-11 h-11 rounded-xl bg-[#1A0505]/85 backdrop-blur-md border border-[#E8DFD1]/25 text-[#F3C97A] opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#8C1515] hover:text-white hover:border-[#8C1515] hover:scale-105 shadow-xl"
                  >
                    <FiShoppingCart className="text-lg" />
                  </button>
                </div>

                {/* Card Meta & Details */}
                <div className="pt-4 px-1 flex flex-col justify-between grow">
                  <div>
                    <h3 className="text-sm sm:text-base text-white font-medium line-clamp-1 group-hover:text-[#F3C97A] transition-colors duration-200">
                      {product.title}
                    </h3>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between border-t border-[#E8DFD1]/10 pt-2.5">
                    <p className="text-lg font-serif font-semibold text-[#F3C97A]">
                      {product.price}
                    </p>
                    <span className="text-[11px] font-mono text-[#E8DFD1]/50 uppercase tracking-widest group-hover:text-white transition-colors">
                      View Item →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>

    {/* <Footer /> */}
  </motion.div>

</>
  );
};

export default HomePage;