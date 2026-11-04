import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage, FiTruck, FiShoppingBag, FiArrowRight, FiClock } from 'react-icons/fi';
import { getOrderById } from '../../services/orderServices';

const OrderSuccess = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [order, setOrder] = useState(location.state?.order || null);
    const [loading, setLoading] = useState(!location.state?.order);

    useEffect(() => {
        if (!order && id) {
            const fetchOrderDetails = async () => {
                try {
                    const res = await getOrderById(id);
                    if (res.success) {
                        setOrder(res.order);
                    }
                } catch (error) {
                    console.error("Error loading order:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrderDetails();
        }
        window.scrollTo(0, 0);
    }, [id, order]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#120404] text-[#EEEEEE] flex items-center justify-center p-6 w-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#EAD196]"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-[#120404] text-[#EEEEEE] flex flex-col items-center justify-center p-6 text-center w-full">
                <h2 className="text-xl sm:text-2xl font-bold tracking-wide">Order Details Not Found</h2>
                <p className="text-xs sm:text-sm text-[#EEEEEE]/60 mt-2 mb-6">We couldn't retrieve the details for this order.</p>
                <Link
                    to="/shop"
                    className="bg-[#BF3131] hover:bg-[#7D0A0A] text-white px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider transition"
                >
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#120404] text-[#EEEEEE] py-6 sm:py-12 px-3 sm:px-6 lg:px-8 font-sans w-full overflow-x-hidden">
            <div className="max-w-3xl mx-auto space-y-5 sm:space-y-8 w-full">

                {/* Animated Celebration Header */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center space-y-3 sm:space-y-4 bg-[#1A0808] p-4 sm:p-8 mt-15 sm:mt-8 rounded-2xl sm:rounded-3xl border border-[#EAD196]/20 shadow-2xl relative overflow-hidden w-full"
                >
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-[#EAD196]/5 rounded-full blur-2xl pointer-events-none" />

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-14 h-14 sm:w-20 sm:h-20 bg-[#EAD196]/10 rounded-full flex items-center justify-center mx-auto border border-[#EAD196]/30"
                    >
                        <FiCheckCircle className="h-7 w-7 sm:h-10 sm:w-10 text-[#EAD196]" />
                    </motion.div>

                    <div>
                        <span className="inline-block text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#EAD196] bg-[#EAD196]/10 px-2.5 py-1 rounded-full border border-[#EAD196]/20">
                            Order Confirmed
                        </span>
                    </div>

                    <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight px-2">
                        Thank You For Your Order!
                    </h1>
                    <p className="text-xs sm:text-sm text-[#EEEEEE]/70 max-w-md mx-auto px-2">
                        We’ve received your order and are preparing it for shipment. A tracking confirmation will be updated soon.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono text-[#EAD196] w-full">
                        <span className="bg-[#120404] px-3 py-1.5 rounded-lg border border-[#EAD196]/15 w-full sm:w-auto text-center truncate">
                            ORDER ID: #{order._id.slice(-8).toUpperCase()}
                        </span>
                        <span className="bg-[#120404] px-3 py-1.5 rounded-lg border border-[#EAD196]/15 flex items-center justify-center gap-1.5 w-full sm:w-auto">
                            <FiClock className="h-3.5 w-3.5 shrink-0" /> EST. DELIVERY: 3 - 5 DAYS
                        </span>
                    </div>
                </motion.div>

                {/* Order Info & Shipping Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">

                    {/* Shipping Address */}
                    <div className="bg-[#1A0808] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#EAD196]/20 shadow-lg space-y-3 w-full min-w-0">
                        <div className="flex items-center space-x-2 text-[#EAD196] border-b border-[#EAD196]/10 pb-2">
                            <FiTruck className="h-4 w-4 shrink-0" />
                            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#EEEEEE] truncate">Shipping Address</h3>
                        </div>
                        <div className="text-xs text-[#EEEEEE]/80 space-y-1 break-words">
                            <p className="font-bold text-sm text-[#EEEEEE]">{order.shippingAddress?.fullName}</p>
                            <p className="break-words">{order.shippingAddress?.streetAddress}</p>
                            <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                            <p className="font-mono text-[#EAD196] pt-1">Phone: {order.shippingAddress?.phone}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-[#1A0808] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#EAD196]/20 shadow-lg space-y-3 w-full min-w-0">
                        <div className="flex items-center space-x-2 text-[#EAD196] border-b border-[#EAD196]/10 pb-2">
                            <FiPackage className="h-4 w-4 shrink-0" />
                            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#EEEEEE] truncate">Payment Details</h3>
                        </div>
                        <div className="text-xs text-[#EEEEEE]/80 space-y-2">
                            <div className="flex justify-between items-center gap-2">
                                <span>Method:</span>
                                <span className="font-bold text-[#EEEEEE]">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <span>Payment Status:</span>
                                <span className="bg-[#EAD196]/10 text-[#EAD196] px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-[#EAD196]/30">
                                    {order.paymentStatus}
                                </span>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <span>Order Status:</span>
                                <span className="bg-[#BF3131]/20 text-white px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-[#BF3131]/30">
                                    {order.orderStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Items Summary Table */}
                <div className="bg-[#1A0808] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#EAD196]/20 shadow-lg space-y-4 w-full">
                    {(() => {
                        const itemsList = order.orderItems || order.products || order.items || [];

                        return (
                            <>
                                <h3 className="text-xs sm:text-sm font-bold text-[#EEEEEE] border-b border-[#EAD196]/10 pb-3">
                                    Ordered Items ({itemsList.length})
                                </h3>

                                {itemsList.length > 0 ? (
                                    <div className="space-y-3">
                                        {itemsList.map((item, idx) => {
                                            const productObj = typeof item.productId === 'object' ? item.productId : {};
                                            const title = item.title || productObj.title || "Purchased Item";
                                            const quantity = item.quantity || 1;
                                            const price = item.price || productObj.price || 0;
                                            const selectedSize = item.selectedSize || "";

                                            let imageUrl = 'https://via.placeholder.com/80?text=Product';
                                            if (item.image) {
                                                imageUrl = typeof item.image === 'string' ? item.image : item.image.url;
                                            } else if (productObj.images?.length > 0) {
                                                const img = productObj.images[0];
                                                imageUrl = typeof img === 'string' ? img : img.url;
                                            }

                                            return (
                                                <div
                                                    key={item._id || idx}
                                                    className="flex items-center justify-between bg-[#120404]/60 p-2.5 sm:p-3 rounded-xl border border-[#EAD196]/10 gap-2 min-w-0"
                                                >
                                                    <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0 flex-1">
                                                        <img
                                                            src={imageUrl}
                                                            alt={title}
                                                            className="w-11 h-11 sm:w-14 sm:h-14 object-contain rounded-lg bg-white/5 border border-[#EAD196]/10 shrink-0"
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <h4 className="text-xs font-bold text-[#EEEEEE] truncate">{title}</h4>
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
                                ) : (
                                    <p className="text-xs text-[#EEEEEE]/50 py-4 text-center">
                                        No item details found for this order.
                                    </p>
                                )}
                            </>
                        );
                    })()}

                    {/* Pricing Totals */}
                    <div className="border-t border-[#EAD196]/10 pt-4 space-y-2 text-xs font-mono w-full">
                        <div className="flex justify-between items-center text-[#EEEEEE]/70">
                            <span>Items Price</span>
                            <span>PKR {(order.itemsPrice || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-[#EEEEEE]/70">
                            <span>Shipping Fee</span>
                            <span>
                                {order.shippingFee === 0 ? (
                                    <span className="text-[#EAD196]">FREE</span>
                                ) : (
                                    `PKR ${(order.shippingFee || 0).toLocaleString()}`
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-[#EAD196] border-t border-[#EAD196]/20 pt-3">
                            <span>Grand Total</span>
                            <span>PKR {(order.totalAmount || 0).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                    <Link
                        to="/orders"
                        className="w-full sm:flex-1 bg-[#1A0808] hover:bg-[#120404] text-[#EAD196] py-3 sm:py-3.5 px-4 rounded-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-[#EAD196]/30 shadow-lg transition flex items-center justify-center space-x-2"
                    >
                        <span>View All Orders</span>
                        <FiArrowRight className="h-4 w-4 shrink-0" />
                    </Link>

                    <Link
                        to="/shop"
                        className="w-full sm:flex-1 bg-[#BF3131] hover:bg-[#7D0A0A] text-white py-3 sm:py-3.5 px-4 rounded-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-[#BF3131]/30 shadow-lg transition flex items-center justify-center space-x-2"
                    >
                        <FiShoppingBag className="h-4 w-4 shrink-0" />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;