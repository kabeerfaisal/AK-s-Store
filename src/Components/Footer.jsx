import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiYoutube, 
  FiMail, 
  FiTruck,
  FiRefreshCw, 
  FiHeadphones 
} from 'react-icons/fi';
import { TbShieldCheckFilled } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-[#EEEEEE] border-t border-[#EAD196]/60 text-[#7D0A0A]">
      
      {/* 1. Value Proposition Highlights */}
      <div className="border-b border-[#EAD196]/40 bg-[#EAD196]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="p-2.5 rounded-full bg-[#7D0A0A]/10 text-[#7D0A0A]">
                <FiTruck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Fast Delivery</h4>
                <p className="text-xs text-[#7D0A0A]/70">Free shipping over $50</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="p-2.5 rounded-full bg-[#7D0A0A]/10 text-[#7D0A0A]">
                <TbShieldCheckFilled className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Secure Payment</h4>
                <p className="text-xs text-[#7D0A0A]/70">100% protected checkout</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="p-2.5 rounded-full bg-[#7D0A0A]/10 text-[#7D0A0A]">
                <FiRefreshCw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Easy Returns</h4>
                <p className="text-xs text-[#7D0A0A]/70">30-day money-back guarantee</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="p-2.5 rounded-full bg-[#7D0A0A]/10 text-[#7D0A0A]">
                <FiHeadphones className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">24/7 Support</h4>
                <p className="text-xs text-[#7D0A0A]/70">Dedicated assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="text-2xl font-black text-[#7D0A0A] tracking-tight inline-block hover:opacity-90 transition">
              AK'S<span className="text-[#BF3131]"> STORE</span>
            </Link>
            <p className="text-[#7D0A0A]/80 text-sm leading-relaxed max-w-sm">
              Your curated destination for premium essentials, everyday gadgets, and seasonal trends delivered directly to your doorstep with quality care.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a 
                href="#" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#EAD196]/30 flex items-center justify-center text-[#7D0A0A] hover:bg-[#BF3131] hover:text-[#EEEEEE] transition-all duration-200"
              >
                <FiFacebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-[#EAD196]/30 flex items-center justify-center text-[#7D0A0A] hover:bg-[#BF3131] hover:text-[#EEEEEE] transition-all duration-200"
              >
                <FiTwitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#EAD196]/30 flex items-center justify-center text-[#7D0A0A] hover:bg-[#BF3131] hover:text-[#EEEEEE] transition-all duration-200"
              >
                <FiInstagram className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[#EAD196]/30 flex items-center justify-center text-[#7D0A0A] hover:bg-[#BF3131] hover:text-[#EEEEEE] transition-all duration-200"
              >
                <FiYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="text-[#7D0A0A] text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#BF3131] pl-2.5">
              Customer Service
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/contact" className="text-[#7D0A0A]/80 hover:text-[#BF3131] hover:translate-x-1 inline-block transition-transform duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-[#7D0A0A]/80 hover:text-[#BF3131] hover:translate-x-1 inline-block transition-transform duration-200">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-[#7D0A0A]/80 hover:text-[#BF3131] hover:translate-x-1 inline-block transition-transform duration-200">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[#7D0A0A]/80 hover:text-[#BF3131] hover:translate-x-1 inline-block transition-transform duration-200">
                  FAQ & Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#7D0A0A] text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#BF3131] pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-[#7D0A0A]/80 hover:text-[#BF3131] hover:translate-x-1 inline-block transition-transform duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-[#7D0A0A]/80 hover:text-[#BF3131] hover:translate-x-1 inline-block transition-transform duration-200">
                  Shop Collection
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-[#7D0A0A]/80 hover:text-[#BF3131] hover:translate-x-1 inline-block transition-transform duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[#7D0A0A]/80 hover:text-[#BF3131] hover:translate-x-1 inline-block transition-transform duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-[#7D0A0A] text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-[#BF3131] pl-2.5">
              Newsletter
            </h3>
            <p className="text-[#7D0A0A]/80 text-sm mb-3">
              Join for exclusive drop announcements and 10% off your first order.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-4 w-4 text-[#7D0A0A]/50" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-9 pr-3 py-2 border border-[#EAD196] rounded-lg bg-white/80 placeholder-[#7D0A0A]/40 text-sm text-[#7D0A0A] focus:outline-none focus:ring-2 focus:ring-[#BF3131] focus:bg-white transition"
                  placeholder="Your email address"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#7D0A0A] text-[#EEEEEE] py-2 rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-[#BF3131] active:scale-[0.99] transition-all duration-200 shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>

        {/* 3. Bottom Bar: Copyright & Payment Badges */}
        <div className="border-t border-[#EAD196]/50 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#7D0A0A]/70 gap-4">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-semibold text-[#7D0A0A]">AK's Store</span>. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-3">
            <span className="font-medium text-[#7D0A0A]">Encrypted Checkout</span>
            <span className="h-3 w-px bg-[#EAD196]"></span>
            <div className="flex space-x-2 font-mono text-[10px] font-bold text-[#7D0A0A]/80 uppercase">
              <span className="px-1.5 py-0.5 bg-white border border-[#EAD196] rounded">Visa</span>
              <span className="px-1.5 py-0.5 bg-white border border-[#EAD196] rounded">Mastercard</span>
              <span className="px-1.5 py-0.5 bg-white border border-[#EAD196] rounded">Stripe</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;