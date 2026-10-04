import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import { motion } from 'framer-motion';
import Navbar from './NavBar';
import Footer from './Footer';

const RequireLogin = () => {
    return (
        <>
        <Navbar/>
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4 py-12 mt-12.5 md:mt-15 lg:mt-0">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-[#E8DFD1] p-8 text-center">

                {/* Icon Container */}
                <div className="w-20 h-20 bg-[#8C1515]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#8C1515]/20">
                    <FaLock className="w-10 h-10 text-[#8C1515]" />
                </div>

                {/* Text Content */}
                <h2 className="text-2xl font-bold text-[#8C1515] mb-3">
                    Login Required
                </h2>
                <p className="text-gray-600 mb-8">
                    To view our Shop and About Us pages, you need to be a registered member. Please log in or create an account to continue.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                    <Link
                        to="/login"
                        className="w-full bg-[#8C1515] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#701010] shadow-sm transition-colors"
                    >
                        Go to Login
                    </Link>

                    <Link
                        to="/"
                        className="w-full bg-white text-[#7D0A0A] font-semibold py-3 px-4 rounded-lg border border-[#E8DFD1] hover:bg-[#FAF8F5] transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>

            </div>
        </motion.div>
        <Footer/>
        </>
    );
};

export default RequireLogin;