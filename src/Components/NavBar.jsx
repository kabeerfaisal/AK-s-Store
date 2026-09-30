import React, { useContext, useState } from 'react';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer'; // 1. Import your CartDrawer component
import { loginContext } from '../hooks/loginhook';
import { CartContext } from '../hooks/CartHook';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let context = useContext(loginContext)
  const recievedEmail = localStorage.getItem('email')

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  let {cart} = useContext(CartContext)

  const [isCartOpen, setIsCartOpen] = useState(false);
  const onCartClick = () => setIsCartOpen(true);

  return (
    <>
      <nav className="bg-[#EEEEEE]/95 backdrop-blur-md border-b border-[#EAD196]/30 shadow-sm w-full fixed top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* 1. Brand / Logo */}
            <div className="shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-black text-[#7D0A0A] tracking-tight hover:opacity-90 transition-opacity">
                AK'S<span className="text-[#BF3131]"> STORE</span>
              </Link>
            </div>

            {/* 2. Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
              <Link to="/" className="text-[#7D0A0A] hover:text-[#BF3131] transition duration-200 py-1 border-b-2 border-transparent hover:border-[#BF3131]">
                Home
              </Link>
              <Link to="/shop" className="text-[#7D0A0A] hover:text-[#BF3131] transition duration-200 py-1 border-b-2 border-transparent hover:border-[#BF3131]">
                Shop
              </Link>
              <Link to="/about" className="text-[#7D0A0A] hover:text-[#BF3131] transition duration-200 py-1 border-b-2 border-transparent hover:border-[#BF3131]">
                About Us
              </Link>
              <Link to="/contact" className="text-[#7D0A0A] hover:text-[#BF3131] transition duration-200 py-1 border-b-2 border-transparent hover:border-[#BF3131]">
                Contact
              </Link>
            </div>

            {/* 3. Desktop Actions (User & Cart) */}
            <div className="hidden md:flex items-center space-x-5">
              {!context.isLogin ? (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-sm font-semibold text-[#7D0A0A] border border-[#7D0A0A] px-4 py-1.5 rounded-full hover:bg-[#7D0A0A] hover:text-[#EEEEEE] transition duration-200"
                >
                  <FiUser className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              ) : (
                <div className="flex items-center space-x-3 bg-[#EAD196]/30 px-3 py-1.5 rounded-full border border-[#EAD196]/60">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#7D0A0A] text-[#EEEEEE] flex items-center justify-center font-bold text-xs uppercase">
                      {(recievedEmail || 'G')[0]}
                    </div>
                    <span className="text-xs font-semibold text-[#7D0A0A] max-w-[120px] truncate">
                      {recievedEmail}
                    </span>
                  </div>
                  <button
                    onClick={context.logout}
                    className="text-[#7D0A0A] hover:text-[#BF3131] hover:bg-red-100/50 p-1 rounded-full transition duration-200"
                    title="Logout"
                  >
                    <FiLogOut className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Desktop Cart Button */}
              <button
                onClick={onCartClick}
                className="text-[#7D0A0A] hover:text-[#BF3131] p-2 rounded-full hover:bg-[#EAD196]/20 transition duration-200 relative cursor-pointer"
                aria-label="Shopping Cart"
              >
                <FiShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-[#BF3131] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                  {cart.length}
                </span>
              </button>
            </div>

            {/* 4. Mobile Controls (Cart & Hamburger) */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Cart Button */}
              <button
                onClick={onCartClick}
                className="text-[#7D0A0A] hover:text-[#BF3131] p-1.5 relative cursor-pointer"
                aria-label="Shopping Cart"
              >
                <FiShoppingCart className="h-6 w-6" />
                <span className="absolute top-0 right-0 bg-[#BF3131] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              </button>

              <button
                onClick={toggleMenu}
                className="text-[#7D0A0A] hover:text-[#BF3131] p-1.5 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-[#EEEEEE] border-b border-[#EAD196]/40 shadow-xl overflow-hidden"
            >
              <div className="px-4 pt-3 pb-3 space-y-1">
                <Link to="/" onClick={toggleMenu} className="block px-3 py-2 rounded-lg text-base font-medium text-[#7D0A0A] hover:bg-[#EAD196]/30 hover:text-[#BF3131] transition">Home</Link>
                <Link to="/shop" onClick={toggleMenu} className="block px-3 py-2 rounded-lg text-base font-medium text-[#7D0A0A] hover:bg-[#EAD196]/30 hover:text-[#BF3131] transition">Shop</Link>
                <Link to="/about" onClick={toggleMenu} className="block px-3 py-2 rounded-lg text-base font-medium text-[#7D0A0A] hover:bg-[#EAD196]/30 hover:text-[#BF3131] transition">About Us</Link>
                <Link to="/contact" onClick={toggleMenu} className="block px-3 py-2 rounded-lg text-base font-medium text-[#7D0A0A] hover:bg-[#EAD196]/30 hover:text-[#BF3131] transition">Contact</Link>
              </div>

              <div className="pt-3 pb-4 border-t border-[#EAD196]/40 px-4">
                {!context.isLogin ? (
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="flex items-center justify-center space-x-2 w-full text-center text-sm font-semibold text-[#7D0A0A] border border-[#7D0A0A] py-2 rounded-lg hover:bg-[#7D0A0A] hover:text-[#EEEEEE] transition"
                  >
                    <FiUser className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between bg-[#EAD196]/20 p-3 rounded-lg border border-[#EAD196]/40">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#7D0A0A] text-[#EEEEEE] flex items-center justify-center font-bold text-xs uppercase">
                        {(recievedEmail || 'G')[0]}
                      </div>
                      <span className="text-sm font-medium text-[#7D0A0A] truncate max-w-[180px]">
                        {recievedEmail || 'Guest'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        context.logout();
                        toggleMenu();
                      }}
                      className="flex items-center space-x-1 text-xs font-semibold text-[#BF3131] hover:bg-red-100/50 px-2.5 py-1.5 rounded-md transition"
                    >
                      <FiLogOut className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 3. Render CartDrawer directly inside the Navbar */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;