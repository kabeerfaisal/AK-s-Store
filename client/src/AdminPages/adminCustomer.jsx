import React, { useContext, useState } from "react";
import { Search, Trash2, Eye, Mail, ShoppingBag, X } from "lucide-react";
import { CustomerContext } from "../hooks/customerHook";

function AdminCustomers() {
  const {
    customers,
    loading,
    error,
    actionLoading,
    selectedCustomer,
    customerOrders,
    modalLoading,
    viewCustomerDetails,
    closeCustomerModal,
    changeCustomerRole,
    removeCustomer,
  } = useContext(CustomerContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    await removeCustomer(id);
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || customer.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalUsers = customers.filter((c) => c.role === "user").length;
  const totalAdmins = customers.filter((c) => c.role === "admin").length;
  const googleUsers = customers.filter((c) => c.googleId).length;

  return (
    <div className="p-6 bg-[#FAF8F5] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#8C1515]">Customers Management</h1>
        <p className="text-sm text-gray-600">Manage registered users, roles, and purchase history.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-[#E8DFD1] shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E8DFD1] shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Google OAuth Signups</p>
          <p className="text-2xl font-bold text-[#8C1515] mt-1">{googleUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E8DFD1] shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase">Admin Accounts</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalAdmins}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-[#E8DFD1] shadow-sm mb-6 flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#E8DFD1] rounded-lg focus:outline-none focus:border-[#8C1515]"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 text-sm border border-[#E8DFD1] rounded-lg bg-white text-gray-700 focus:outline-none focus:border-[#8C1515]"
        >
          <option value="all">All Roles</option>
          <option value="user">Customers Only</option>
          <option value="admin">Admins Only</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-[#E8DFD1] shadow-sm overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">Loading customers...</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">No customers found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD1] bg-[#FAF8F5] text-xs font-semibold text-gray-600 uppercase">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Auth Type</th>
                <th className="py-3.5 px-4">Orders</th>
                <th className="py-3.5 px-4">Total Spent</th>
                <th className="py-3.5 px-4">Joined</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD1] text-sm">
              {filteredCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-900">{customer.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {customer.email}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {customer.googleId ? (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        Google
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                        Email
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-800">
                    {customer.totalOrders || 0}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#8C1515]">
                    Rs. {(customer.totalSpent || 0).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-500">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      disabled={actionLoading}
                      value={customer.role}
                      onChange={(e) => changeCustomerRole(customer._id, e.target.value)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer disabled:opacity-50 ${
                        customer.role === "admin"
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => viewCustomerDetails(customer._id)}
                      title="View Order History"
                      className="p-1.5 rounded-lg text-gray-600 hover:text-[#8C1515] hover:bg-[#FAF8F5] transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      disabled={actionLoading}
                      onClick={() => handleDelete(customer._id, customer.name)}
                      title="Delete Customer"
                      className="p-1.5 rounded-lg text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Customer Order History Modal */}
      {(selectedCustomer || modalLoading) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-[#E8DFD1] max-w-lg w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            {modalLoading ? (
              <p className="text-sm text-gray-500 py-8 text-center">Loading customer details...</p>
            ) : (
              <>
                <div className="flex justify-between items-start border-b border-[#E8DFD1] pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#8C1515]">{selectedCustomer.name}</h3>
                    <p className="text-xs text-gray-500">{selectedCustomer.email}</p>
                  </div>
                  <button
                    onClick={closeCustomerModal}
                    className="p-1 text-gray-400 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <h4 className="text-xs font-bold uppercase text-gray-500 mb-3 flex items-center gap-1.5">
                  <ShoppingBag className="h-3.5 w-3.5 text-[#8C1515]" /> Order History ({customerOrders.length})
                </h4>

                {customerOrders.length === 0 ? (
                  <p className="text-sm text-gray-500 py-6 text-center bg-[#FAF8F5] rounded-lg">
                    This customer hasn't placed any orders yet.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {customerOrders.map((order) => (
                      <div
                        key={order._id}
                        className="p-3 rounded-lg border border-[#E8DFD1] bg-[#FAF8F5] flex justify-between items-center text-xs"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">#{order._id.slice(-6).toUpperCase()}</p>
                          <p className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#8C1515]">
                            Rs. {(order.totalAmount || order.totalPrice || 0).toLocaleString()}
                          </p>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-white border border-[#E8DFD1] text-[11px] font-medium capitalize">
                            {order.status || "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCustomers;