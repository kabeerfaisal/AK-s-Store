import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPackage,
    FiClock,
    FiTruck,
    FiCheckCircle,
    FiXCircle,
    FiShoppingBag,
    FiChevronDown,
    FiChevronUp,
    FiArrowRight,
    FiMapPin,
    FiAlertCircle
} from 'react-icons/fi';
import { getMyOrders } from '../services/orderServices';
import { useMyOrders } from '../hooks/myOrdersHook';
import OrderCard from '../Components/user/OrderCard';

const MyOrders = () => {
    const {
        orders,
        loading,
        cancellingId,
        feedback,
        handleCancelOrder,
        clearFeedback,
    } = useMyOrders();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#120404] text-[#EEEEEE] flex items-center justify-center p-6 w-full pt-28">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#EAD196]"></div>
            </div>
        );
    }

    return (
   <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="min-h-screen bg-[#120404] text-[#EEEEEE] pt-24 sm:pt-32 pb-12 px-3 sm:px-6 lg:px-8 font-sans w-full overflow-x-hidden"
        >
            <div className="max-w-4xl mx-auto space-y-6 w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAD196]/20 pb-4">
                    <div>
                        <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-[#EEEEEE]">
                            My Order History
                        </h1>
                        <p className="text-xs text-[#EEEEEE]/60 mt-1">
                            Track, review, and manage your past purchases.
                        </p>
                    </div>
                    <Link
                        to="/shop"
                        className="inline-flex items-center space-x-2 text-xs font-mono text-[#EAD196] hover:underline self-start sm:self-auto"
                    >
                        <FiShoppingBag className="h-4 w-4 shrink-0" />
                        <span>CONTINUE SHOPPING</span>
                    </Link>
                </div>

                {/* Feedback Alert */}
                {feedback.text && (
                    <div
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-mono ${
                            feedback.type === 'success'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        }`}
                    >
                        <div className="flex items-center space-x-2">
                            <FiAlertCircle className="h-4 w-4 shrink-0" />
                            <span>{feedback.text}</span>
                        </div>
                        <button onClick={clearFeedback} className="opacity-70 hover:opacity-100 ml-3">
                            ✕
                        </button>
                    </div>
                )}

                {/* Orders List or Empty State */}
                {orders.length === 0 ? (
                    <div className="text-center py-16 px-4 bg-[#1A0808] rounded-2xl border border-[#EAD196]/20 shadow-xl space-y-4">
                        <FiPackage className="h-14 w-14 text-[#EAD196]/40 mx-auto" />
                        <h3 className="text-lg font-bold">No Orders Found</h3>
                        <p className="text-xs text-[#EEEEEE]/60 max-w-sm mx-auto">
                            You haven't placed any orders yet. Explore our catalog to find items you love!
                        </p>
                        <Link
                            to="/shop"
                            className="inline-block bg-[#BF3131] hover:bg-[#7D0A0A] text-white px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition border border-[#BF3131]/30 shadow-lg"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4 w-full">
                        {orders.map((order) => (
                            <OrderCard
                                key={order._id}
                                order={order}
                                isCancelling={cancellingId === order._id}
                                onCancelOrder={handleCancelOrder}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MyOrders;