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
    FiMapPin
} from 'react-icons/fi';
import { getMyOrders } from '../services/orderServices';

const MyOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getMyOrders();
                if (res.success) {
                    setOrders(res.orders || []);
                }
            } catch (error) {
                console.error("Error fetching order history:", error);
            } finally {
                setLoading(false);
            }
        };
        window.scrollTo(0, 0);

        fetchOrders();
    }, []);

    const toggleExpand = (orderId) => {
        setExpandedOrderId(prev => prev === orderId ? null : orderId);
    };

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return {
                    icon: <FiCheckCircle className="h-3.5 w-3.5 shrink-0" />,
                    style: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                };
            case 'shipped':
                return {
                    icon: <FiTruck className="h-3.5 w-3.5 shrink-0" />,
                    style: 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                };
            case 'cancelled':
                return {
                    icon: <FiXCircle className="h-3.5 w-3.5 shrink-0" />,
                    style: 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                };
            case 'processing':
            default:
                return {
                    icon: <FiClock className="h-3.5 w-3.5 shrink-0" />,
                    style: 'bg-[#EAD196]/15 text-[#EAD196] border-[#EAD196]/30'
                };
        }
    };

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
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen bg-[#120404] text-[#EEEEEE] pt-24 sm:pt-32 pb-12 px-3 sm:px-6 lg:px-8 font-sans w-full overflow-x-hidden">
            <div className="max-w-4xl mx-auto space-y-6 w-full">

                {/* Page Title Header */}
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

                {/* Orders List */}
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
                        {orders.map((order) => {
                            const itemsList = order.orderItems || order.products || order.items || [];
                            const isExpanded = expandedOrderId === order._id;
                            const badge = getStatusBadge(order.orderStatus);
                            const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            });

                            return (
                                <div
                                    key={order._id}
                                    className="bg-[#1A0808] rounded-2xl border border-[#EAD196]/20 shadow-xl overflow-hidden transition-all duration-300 hover:border-[#EAD196]/40 w-full"
                                >
                                    {/* Order Top Summary Bar */}
                                    <div
                                        onClick={() => toggleExpand(order._id)}
                                        className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-white/5 transition"
                                    >
                                        <div className="flex items-center space-x-3 min-w-0">
                                            <div className="p-2.5 rounded-xl bg-[#120404] border border-[#EAD196]/15 shrink-0 text-[#EAD196]">
                                                <FiPackage className="h-5 w-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xs font-mono font-bold text-[#EAD196] truncate">
                                                        #{order._id.slice(-8).toUpperCase()}
                                                    </span>
                                                    <span className="text-[10px] text-[#EEEEEE]/50 font-mono shrink-0">
                                                        • {orderDate}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-[#EEEEEE]/80 mt-0.5 truncate">
                                                    {itemsList.length} {itemsList.length === 1 ? 'item' : 'items'} • PKR {order.totalAmount?.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Status & Toggle Control */}
                                        <div className="flex items-center justify-between sm:justify-end space-x-3 w-full sm:w-auto pt-2.5 sm:pt-0 border-t sm:border-0 border-[#EAD196]/10">
                                            <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${badge.style}`}>
                                                {badge.icon}
                                                <span>{order.orderStatus}</span>
                                            </span>

                                            <button
                                                aria-label="Toggle details"
                                                className="p-1.5 rounded-lg text-[#EEEEEE]/70 hover:text-[#EAD196] bg-white/5 transition shrink-0"
                                            >
                                                {isExpanded ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expandable Order Details Panel */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="border-t border-[#EAD196]/15 bg-[#120404]/60 p-3.5 sm:p-6 space-y-4 sm:space-y-5"
                                            >
                                                {/* Items List */}
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#EAD196]">
                                                        Items in this Order
                                                    </h4>
                                                    <div className="space-y-2.5">
                                                        {itemsList.map((item, idx) => {
                                                            const productObj = typeof item.productId === 'object' ? item.productId : {};
                                                            const title = item.title || productObj.title || "Purchased Product";
                                                            const quantity = item.quantity || 1;
                                                            const price = item.price || productObj.price || 0;
                                                            const selectedSize = item.selectedSize || "";

                                                            let imageUrl = 'https://via.placeholder.com/60?text=Product';
                                                            if (item.image) {
                                                                imageUrl = typeof item.image === 'string' ? item.image : item.image.url;
                                                            } else if (productObj.images?.length > 0) {
                                                                const img = productObj.images[0];
                                                                imageUrl = typeof img === 'string' ? img : img.url;
                                                            }

                                                            return (
                                                                <div
                                                                    key={item._id || idx}
                                                                    className="flex items-center justify-between bg-[#1A0808] p-2.5 sm:p-3 rounded-xl border border-[#EAD196]/10 gap-2 min-w-0"
                                                                >
                                                                    <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0 flex-1">
                                                                        <img
                                                                            src={imageUrl}
                                                                            alt={title}
                                                                            className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-lg bg-white/5 border border-[#EAD196]/10 shrink-0"
                                                                        />
                                                                        <div className="min-w-0 flex-1">
                                                                            <h5 className="text-xs font-bold text-[#EEEEEE] truncate">{title}</h5>
                                                                            <p className="text-[10px] sm:text-[11px] text-[#EAD196] font-mono mt-0.5">
                                                                                {quantity} x PKR {price.toLocaleString()}
                                                                            </p>
                                                                            {selectedSize && (
                                                                                <span className="inline-block text-[9px] font-mono text-[#EEEEEE]/70 bg-white/5 px-1.5 py-0.5 rounded border border-[#EAD196]/20 uppercase tracking-wider mt-1">
                                                                                    Size: {selectedSize}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <span className="text-[11px] sm:text-xs font-bold font-mono text-[#EEEEEE] shrink-0 text-right">
                                                                        PKR {(price * quantity).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Shipping & Payment Summary Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-2 border-t border-[#EAD196]/10 text-xs w-full">
                                                    {/* Shipping Info */}
                                                    <div className="bg-[#1A0808] p-3 sm:p-3.5 rounded-xl border border-[#EAD196]/10 space-y-1.5 min-w-0">
                                                        <div className="flex items-center space-x-1.5 text-[#EAD196] font-mono font-bold uppercase text-[10px]">
                                                            <FiMapPin className="h-3.5 w-3.5 shrink-0" />
                                                            <span className="truncate">Delivery Address</span>
                                                        </div>
                                                        <p className="font-bold text-[#EEEEEE] truncate">{order.shippingAddress?.fullName}</p>
                                                        <p className="text-[#EEEEEE]/70 text-[11px] break-words">{order.shippingAddress?.streetAddress}, {order.shippingAddress?.city}</p>
                                                        <p className="text-[#EAD196] font-mono text-[11px]">Phone: {order.shippingAddress?.phone}</p>
                                                    </div>

                                                    {/* Order Totals Breakdown */}
                                                    <div className="bg-[#1A0808] p-3 sm:p-3.5 rounded-xl border border-[#EAD196]/10 space-y-2 font-mono min-w-0">
                                                        <div className="flex justify-between items-center text-[#EEEEEE]/70 text-[11px]">
                                                            <span>Items Price</span>
                                                            <span>PKR {(order.itemsPrice || 0).toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-[#EEEEEE]/70 text-[11px]">
                                                            <span>Shipping Fee</span>
                                                            <span>{order.shippingFee === 0 ? 'FREE' : `PKR ${order.shippingFee}`}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-[#EEEEEE]/70 text-[11px]">
                                                            <span>Payment Method</span>
                                                            <span className="text-[#EEEEEE] font-bold">{order.paymentMethod}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center font-bold text-[#EAD196] border-t border-[#EAD196]/10 pt-2 text-xs">
                                                            <span>Total Amount</span>
                                                            <span>PKR {(order.totalAmount || 0).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Link to Receipt Screen */}
                                                <div className="pt-2 flex justify-end w-full">
                                                    <button
                                                        onClick={() => navigate(`/order-success/${order._id}`, { state: { order } })}
                                                        className="w-full sm:w-auto bg-[#1A0808] hover:bg-[#120404] text-[#EAD196] px-4 py-2.5 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider border border-[#EAD196]/30 transition flex items-center justify-center space-x-2"
                                                    >
                                                        <span>View Full Order Confirmation</span>
                                                        <FiArrowRight className="h-3.5 w-3.5 shrink-0" />
                                                    </button>
                                                </div>

                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </motion.div>
    );
};

export default MyOrders;