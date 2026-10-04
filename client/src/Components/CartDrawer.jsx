import React, { useCallback, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { CartContext } from '../hooks/CartHook';

const CartDrawer = ({ isOpen, onClose }) => {
  // let { state } = useLocation();
  let {cart, cartSubtotal, removeProduct, addToCart, cartDecrement} = useContext(CartContext)


  
  return (
    <AnimatePresence>
      {isOpen && 
      (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#120404]/85 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#1A0808] border-l border-[#EAD196]/20 shadow-2xl flex flex-col text-[#EEEEEE]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#EAD196]/20 bg-[#120404]/50">
                <div className="flex items-center space-x-3">
                  <FiShoppingCart className="h-5 w-5 text-[#EAD196]" />
                  <h2 className="text-lg font-bold tracking-tight text-[#EEEEEE]">Your Shopping Cart</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-[#EEEEEE]/70 hover:text-[#EAD196] hover:bg-white/5 transition"
                  aria-label="Close cart"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Content */}
              <div className="grow overflow-y-auto px-6 py-6 space-y-4">
                {cart.length > 0  ? (
                  cart.map((item)=>{
                    return (
                    <div className="flex items-center space-x-4 bg-[#120404]/60 p-4 rounded-xl border border-[#EAD196]/10 relative group">
                    <div className="w-20 h-20 bg-white/5 rounded-lg p-2 flex items-center justify-center shrink-0 border border-[#EAD196]/10">
                      <img 
                        src={item.Image} 
                        alt={item.title} 
                        className="w-full h-full object-contain mix-blend-luminosity hover:mix-blend-normal transition duration-300" 
                      />
                    </div>
                    <div className="grow min-w-0">
                      <h3 className="text-sm font-bold text-[#EEEEEE] truncate">{item.title}</h3>
                      <p className="text-xs font-semibold text-[#EAD196] mt-1">PKR {item.price}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#EAD196]/30 rounded bg-white/5">
                          <button onClick={()=>cartDecrement(item.id)} className="p-1 text-[#EEEEEE]/70 hover:text-[#EAD196]" aria-label="Decrease quantity">
                            <FiMinus className="h-3 w-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#EEEEEE]">{item.quantity}</span>
                          <button onClick={()=>addToCart(item)} className="p-1 text-[#EEEEEE]/70 hover:text-[#EAD196]" aria-label="Increase quantity">
                            <FiPlus className="h-3 w-3" />
                          </button>
                        </div>
                        <button onClick={()=>removeProduct(item.id)} className="text-[#EEEEEE]/50 hover:text-[#BF3131] transition p-1" aria-label="Remove item">
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>)
                  })
                  
                ) : (
                  <div className="text-center py-20 text-[#EEEEEE]/60 space-y-3">
                    <FiShoppingCart className="h-12 w-12 mx-auto opacity-30 text-[#EAD196]" />
                    <p className="text-sm font-medium">Your cart is currently empty.</p>
                  </div>
                )}
              </div>

              {/* Footer / Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-[#EAD196]/20 px-6 py-6 bg-[#120404]/50 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#EEEEEE]/70">Subtotal</span>
                    <span className="font-bold text-[#EAD196]">PKR {cartSubtotal.toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-[#EEEEEE]/50">Shipping and taxes calculated at checkout.</p>
                  
                  <div className="space-y-2">
                    {/* <Link
                      to="/cart"
                      onClick={onClose}
                      className="w-full bg-transparent text-[#EAD196] hover:bg-[#EAD196] hover:text-[#120404] py-3 rounded-lg font-bold text-xs uppercase tracking-wider border border-[#EAD196]/60 transition-all text-center block"
                    >
                      View Cart
                    </Link> */}
                    <button
                      onClick={onClose}
                      className="w-full bg-[#BF3131] hover:bg-[#7D0A0A] text-[#EEEEEE] py-3 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2 border border-[#BF3131]/30"
                    >
                      <span>Proceed to Checkout</span>
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;