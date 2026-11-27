import { useCallback, useEffect, useState } from "react";
import { cancelOrder, getMyOrders } from "../services/orderServices";


export const useMyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);
    const [feedback, setFeedback] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getMyOrders()

                if (res.success) {
                    setOrders(res.orders ?? [])
                }

            } catch (error) {

                console.error('Error fetching order history:', error);
                setFeedback({
                    type: 'error',
                    text: 'Failed to load your order history.'
                });

            } finally {
                setLoading(false);
            }
        }
        window.scrollTo(0, 0);
        fetchOrders();

    }, [])

    const handleCancelOrder = useCallback(async (orderId) => {
        setCancellingId(orderId)
        setFeedback({ type: '', text: '' })

        try {
            const res = await cancelOrder(orderId)

            if (res.success) {
                setOrders((prev) => prev.map((order) =>
                    order._id === orderId
                        ? res.order ?? {
                            ...order,
                            orderStatus: 'Cancelled',
                            paymentStatus: 'Failed'
                        }
                        : order
                ))
                setFeedback({
                    type: 'success',
                    text: res.message
                        || 'Order cancelled successfully.'
                })
            }
            return false
        } catch (error) {
            setFeedback({
                type: 'error',
                text: error.response?.data?.message || 'Unable to cancel order. Please try again.'
            });
            return false;
        } finally {
            setCancellingId(null)
        }
    }, [])

    const clearFeedback = useCallback(() => setFeedback({ type: '', text: '' }), []);

    return {
        orders,
        loading,
        cancellingId,
        feedback,
        handleCancelOrder,
        clearFeedback,
    };
}