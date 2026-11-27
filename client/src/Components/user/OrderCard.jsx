import {
    FiCheckCircle, FiClock, FiTruck, 
    FiXCircle, FiChevronDown, FiChevronUp,
    FiArrowRight, FiMapPin, FiPackage
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";


const CANCELLABLE_STATUSES = ['pending', 'processing'];

const STATUS_CONFIG = {
    delivered: {
        icon: <FiCheckCircle className="h-3.5 w-3.5 shrink-0" />,
        style: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
    shipped: {
        icon: <FiTruck className="h-3.5 w-3.5 shrink-0" />,
        style: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    },
    cancelled: {
        icon: <FiXCircle className="h-3.5 w-3.5 shrink-0" />,
        style: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    },
    default: {
        icon: <FiClock className="h-3.5 w-3.5 shrink-0" />,
        style: 'bg-[#EAD196]/15 text-[#EAD196] border-[#EAD196]/30',
    },
};

const normalizeOrderItem = (item) => {
    const productObj = typeof item.productId === 'object' ? item.productId : {};
    const rawImg = item.image ?? productObj?.images?.[0];
    const imageUrl = typeof rawImg === 'string'
        ? rawImg
        : rawImg?.url || 'https://via.placeholder.com/60?text=Product';

    return {
        title: item.title || productObj?.title || 'Purchased Product',
        quantity: item.quantity ?? 1,
        price: item.price ?? productObj?.price ?? 0,
        selectedSize: item.selectedSize || '',
        imageUrl,
    };
};

const OrderCard = ({ order, isCancelling, onCancelOrder }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);

    const itemsList = order.products ?? [];
    const statusKey = order.orderStatus?.toLowerCase();
    const badge = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.default;
    const isCancellable = CANCELLABLE_STATUSES.includes(statusKey);

    const orderDate = new Date(order.createdAt).toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
        setIsConfirmingCancel(false);
    };

    const confirmCancellation = async () => {
        const success = await onCancelOrder(order._id);
        if (success) setIsConfirmingCancel(false);
    };

    return (
        <div className="bg-[#1A0808] rounded-2xl border border-[#EAD196]/20 shadow-xl overflow-hidden transition-all duration-300 hover:border-[#EAD196]/40 w-full">
            {/* Summary Row */}
            <div
                onClick={handleToggle}
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
                                - {orderDate}
                            </span>
                        </div>
                        <p className="text-xs text-[#EEEEEE]/80 mt-0.5 truncate">
                            {itemsList.length} {itemsList.length === 1 ? 'item' : 'items'} • PKR {order.totalAmount?.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-3 w-full sm:w-auto pt-2.5 sm:pt-0 border-t sm:border-0 border-[#EAD196]/10">
                    <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${badge.style}`}>
                        {badge.icon}
                        <span>{order.orderStatus}</span>
                    </span>

                    <button
                        type="button"
                        aria-label="Toggle details"
                        className="p-1.5 rounded-lg text-[#EEEEEE]/70 hover:text-[#EAD196] bg-white/5 transition shrink-0"
                    >
                        {isExpanded ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            {/* Expandable Details */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-[#EAD196]/15 bg-[#120404]/60 p-3.5 sm:p-6 space-y-4 sm:space-y-5"
                    >
                        {/* Items */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#EAD196]">
                                Items in this Order
                            </h4>
                            <div className="space-y-2.5">
                                {itemsList.map((rawItem, idx) => {
                                    const { title, quantity, price, selectedSize, imageUrl } = normalizeOrderItem(rawItem);
                                    return (
                                        <div
                                            key={rawItem._id || idx}
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

                        {/* Address & Pricing Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-2 border-t border-[#EAD196]/10 text-xs w-full">
                            <div className="bg-[#1A0808] p-3 sm:p-3.5 rounded-xl border border-[#EAD196]/10 space-y-1.5 min-w-0">
                                <div className="flex items-center space-x-1.5 text-[#EAD196] font-mono font-bold uppercase text-[10px]">
                                    <FiMapPin className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate">Delivery Address</span>
                                </div>
                                <p className="font-bold text-[#EEEEEE] truncate">{order.shippingAddress?.fullName}</p>
                                <p className="text-[#EEEEEE]/70 text-[11px] break-words">
                                    {order.shippingAddress?.streetAddress}, {order.shippingAddress?.city}
                                </p>
                                <p className="text-[#EAD196] font-mono text-[11px]">
                                    Phone: {order.shippingAddress?.phone}
                                </p>
                            </div>

                            <div className="bg-[#1A0808] p-3 sm:p-3.5 rounded-xl border border-[#EAD196]/10 space-y-2 font-mono min-w-0">
                                <div className="flex justify-between items-center text-[#EEEEEE]/70 text-[11px]">
                                    <span>Items Price</span>
                                    <span>PKR {(order.itemsPrice ?? 0).toLocaleString()}</span>
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
                                    <span>PKR {(order.totalAmount ?? 0).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
                            <div>
                                {isCancellable && !isConfirmingCancel && (
                                    <button
                                        type="button"
                                        onClick={() => setIsConfirmingCancel(true)}
                                        className="w-full sm:w-auto bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-4 py-2.5 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider border border-rose-500/30 transition flex items-center justify-center space-x-2"
                                    >
                                        <FiXCircle className="h-3.5 w-3.5 shrink-0" />
                                        <span>Cancel Order</span>
                                    </button>
                                )}

                                {isCancellable && isConfirmingCancel && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            disabled={isCancelling}
                                            onClick={confirmCancellation}
                                            className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white px-3.5 py-2.5 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider transition"
                                        >
                                            {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
                                        </button>
                                        <button
                                            type="button"
                                            disabled={isCancelling}
                                            onClick={() => setIsConfirmingCancel(false)}
                                            className="bg-white/5 hover:bg-white/10 text-[#EEEEEE]/80 px-3.5 py-2.5 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider border border-[#EAD196]/20 transition"
                                        >
                                            Keep
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
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
};

export default OrderCard;