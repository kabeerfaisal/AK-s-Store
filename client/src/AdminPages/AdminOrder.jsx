import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Package,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '../services/orderServices';

const STATUS_OPTIONS = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async (status = selectedStatus) => {
    setLoading(true);
    try {
      const res = await getAllOrders(status);
      console.log("Admin Orders API Response:", res);

      // Defensive Extraction: Direct res.orders ya res.data.orders handle karta hai
      const fetchedOrders = res?.orders || res?.data?.orders || (Array.isArray(res) ? res : []);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      alert("Failed to load orders. Please check console & admin permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(selectedStatus);
  }, [selectedStatus]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await updateOrderStatus(orderId, { orderStatus: newStatus });
      if (res?.success) {
        const updatedObj = res.order || res.data?.order;
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, ...updatedObj, orderStatus: newStatus } : o));
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedId(prev => prev === orderId ? null : orderId);
  };

  // Search Filter
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    const orderIdMatch = order._id?.toLowerCase().includes(searchLower);
    const nameMatch = order.shippingAddress?.fullName?.toLowerCase().includes(searchLower);
    const phoneMatch = order.shippingAddress?.phone?.includes(searchTerm);
    const cityMatch = order.shippingAddress?.city?.toLowerCase().includes(searchLower);
    return orderIdMatch || nameMatch || phoneMatch || cityMatch;
  });

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'processing':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Order Fulfillment</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage customer shipments, track revenue, and update status.</p>
        </div>

        <button
          onClick={() => fetchOrders(selectedStatus)}
          className="inline-flex items-center gap-2 self-start sm:self-auto rounded-lg bg-white border border-[#E8DFD1] px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#FAF8F5] transition-colors shadow-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#8C1515] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E8DFD1] shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Order ID, Name, Phone, City..."
            className="w-full rounded-lg bg-[#FAF8F5] border border-[#E8DFD1] py-2 pl-9 pr-4 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-gray-400 shrink-0" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-48 rounded-lg bg-[#FAF8F5] border border-[#E8DFD1] py-2 px-3 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1515]"
          >
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st === 'All' ? 'All Statuses' : st}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-xl border border-[#E8DFD1] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#FAF8F5] text-gray-600 border-b border-[#E8DFD1]">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Total Amount</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Fulfillment</th>
                <th className="px-6 py-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD1]">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8C1515] border-t-gray-100" />
                      <p className="mt-4 text-sm text-gray-500">Loading order records...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const itemsList = order.orderItems || order.products || [];
                  const isExpanded = expandedId === order._id;
                  const isUpdating = updatingId === order._id;

                  return (
                    <React.Fragment key={order._id}>
                      <tr className="hover:bg-gray-50/80 transition-colors">
                        
                        {/* Order ID */}
                        <td className="px-6 py-4 font-mono text-xs font-semibold text-[#8C1515]">
                          #{order._id.slice(-8).toUpperCase()}
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-4">
                          <div>
                            <span className="font-semibold text-gray-900 block">
                              {order.shippingAddress?.fullName || 'Guest Customer'}
                            </span>
                            <span className="text-xs text-gray-400 block">
                              {order.shippingAddress?.city} • {order.shippingAddress?.phone}
                            </span>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-xs text-gray-600 font-mono">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>

                        {/* Items Count */}
                        <td className="px-6 py-4 text-gray-600">
                          {itemsList.length} {itemsList.length === 1 ? 'item' : 'items'}
                        </td>

                        {/* Total Amount */}
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          PKR {order.totalAmount?.toLocaleString()}
                        </td>

                        {/* Payment Method & Status */}
                        <td className="px-6 py-4">
                          <span className="inline-block text-xs font-medium text-gray-700 bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E8DFD1]">
                            {order.paymentMethod} ({order.paymentStatus})
                          </span>
                        </td>

                        {/* Order Status Selector */}
                        <td className="px-6 py-4">
                          <select
                            disabled={isUpdating}
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className={`px-2.5 py-1 text-xs font-semibold rounded-full border capitalize cursor-pointer focus:outline-none ${getStatusBadge(order.orderStatus)}`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Action Toggle Expand */}
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="p-1.5 text-gray-500 hover:text-[#8C1515] hover:bg-gray-100 rounded-md transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </button>
                        </td>

                      </tr>

                      {/* Expandable Order Details Row */}
                      {isExpanded && (
                        <tr className="bg-[#FAF8F5]/60">
                          <td colSpan="8" className="px-6 py-5 border-t border-b border-[#E8DFD1]">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                              
                              {/* Address */}
                              <div className="bg-white p-4 rounded-lg border border-[#E8DFD1] space-y-1.5 shadow-sm">
                                <h4 className="font-semibold text-gray-900 flex items-center gap-1.5 mb-2 text-xs uppercase tracking-wider">
                                  <MapPin className="h-3.5 w-3.5 text-[#8C1515]" /> Shipping Info
                                </h4>
                                <p className="font-semibold text-gray-800">{order.shippingAddress?.fullName}</p>
                                <p className="text-gray-600">{order.shippingAddress?.streetAddress}</p>
                                <p className="text-gray-600">{order.shippingAddress?.city}, Postal: {order.shippingAddress?.postalCode}</p>
                                <p className="text-[#8C1515] font-mono pt-1">Phone: {order.shippingAddress?.phone}</p>
                              </div>

                              {/* Price Breakdown */}
                              <div className="bg-white p-4 rounded-lg border border-[#E8DFD1] space-y-2 shadow-sm font-mono">
                                <h4 className="font-semibold text-gray-900 flex items-center gap-1.5 mb-2 text-xs font-sans uppercase tracking-wider">
                                  <CreditCard className="h-3.5 w-3.5 text-[#8C1515]" /> Payment Breakdown
                                </h4>
                                <div className="flex justify-between text-gray-600">
                                  <span>Subtotal Items:</span>
                                  <span>PKR {(order.itemsPrice || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                  <span>Shipping Fee:</span>
                                  <span>{order.shippingFee === 0 ? 'FREE' : `PKR ${order.shippingFee}`}</span>
                                </div>
                                <div className="flex justify-between font-bold text-[#8C1515] border-t border-[#E8DFD1] pt-2 text-xs">
                                  <span>Total Bill:</span>
                                  <span>PKR {(order.totalAmount || 0).toLocaleString()}</span>
                                </div>
                              </div>

                              {/* Line Items List */}
                              <div className="bg-white p-4 rounded-lg border border-[#E8DFD1] space-y-2 shadow-sm">
                                <h4 className="font-semibold text-gray-900 flex items-center gap-1.5 mb-2 text-xs uppercase tracking-wider">
                                  <Package className="h-3.5 w-3.5 text-[#8C1515]" /> Ordered Products
                                </h4>
                                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                  {itemsList.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-[#FAF8F5] p-2 rounded border border-[#E8DFD1]">
                                      <div className="flex items-center space-x-2.5 min-w-0">
                                        <img
                                          src={item.image || 'https://via.placeholder.com/40'}
                                          alt={item.title}
                                          className="w-8 h-8 object-cover rounded bg-white border border-[#E8DFD1] shrink-0"
                                        />
                                        <div className="min-w-0">
                                          <p className="font-semibold text-gray-900 truncate text-[11px]">{item.title}</p>
                                          <p className="text-[10px] text-gray-500 font-mono">
                                            {item.quantity} x PKR {item.price?.toLocaleString()} {item.selectedSize && `(${item.selectedSize})`}
                                          </p>
                                        </div>
                                      </div>
                                      <span className="font-mono text-[11px] font-semibold text-gray-800 shrink-0">
                                        PKR {(item.price * item.quantity).toLocaleString()}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    <Package className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="font-medium text-gray-700">No orders found matching status</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8DFD1] bg-[#FAF8F5] text-xs text-gray-500 flex justify-between items-center">
          <span>Showing {filteredOrders.length} order records</span>
          <span className="font-mono text-gray-400">AK'S STORE ADMIN PANEL</span>
        </div>
      </div>

    </div>
  );
}

export default AdminOrders;