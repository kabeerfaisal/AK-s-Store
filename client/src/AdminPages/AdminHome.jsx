import React from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Calendar
} from 'lucide-react';

function AdminDashboard() {
  // Mock Data for Stat Cards
  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', trend: '+20.1%', isPositive: true, icon: DollarSign },
    { title: 'Total Orders', value: '1,205', trend: '+15.2%', isPositive: true, icon: ShoppingCart },
    { title: 'Active Customers', value: '842', trend: '+4.5%', isPositive: true, icon: Users },
    { title: 'Conversion Rate', value: '3.24%', trend: '-1.2%', isPositive: false, icon: TrendingUp },
  ];

  // Mock Data for Recent Orders
  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', date: 'Oct 6, 2026', amount: '$120.50', status: 'Completed' },
    { id: 'ORD-002', customer: 'Sarah Smith', date: 'Oct 6, 2026', amount: '$45.00', status: 'Pending' },
    { id: 'ORD-003', customer: 'Mike Johnson', date: 'Oct 5, 2026', amount: '$299.99', status: 'Processing' },
    { id: 'ORD-004', customer: 'Emily Brown', date: 'Oct 5, 2026', amount: '$85.20', status: 'Completed' },
    { id: 'ORD-005', customer: 'Chris Wilson', date: 'Oct 4, 2026', amount: '$12.99', status: 'Cancelled' },
  ];

  // Helper function for status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending': return 'bg-[#FAF8F5] text-[#D97706] border-[#D97706]/30'; // Gold theme
      case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-[#E8DFD1] px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-600">
          <Calendar className="h-4 w-4 text-[#8C1515]" />
          <span>Oct 6, 2026</span>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl border border-[#E8DFD1] shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-lg">
                  <Icon className="h-5 w-5 text-[#8C1515]" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={`flex items-center font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                  {stat.trend}
                </span>
                <span className="text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid (Table & Chart Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders Table (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E8DFD1] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E8DFD1] flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm font-medium text-[#8C1515] hover:text-[#701010] transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#FAF8F5] text-gray-500 border-b border-[#E8DFD1]">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFD1]">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-[#8C1515] transition-colors">
                        <MoreVertical className="h-5 w-5 ml-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics/Activity Placeholder (Takes 1 column) */}
        <div className="bg-white rounded-xl border border-[#E8DFD1] shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Traffic Source</h2>
            <button className="text-gray-400 hover:text-[#8C1515] transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
          
          {/* Simple CSS-based bar chart placeholder */}
          <div className="flex-1 flex flex-col justify-center space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Organic Search</span>
                <span className="text-gray-500">45%</span>
              </div>
              <div className="w-full bg-[#FAF8F5] rounded-full h-2">
                <div className="bg-[#8C1515] h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Direct</span>
                <span className="text-gray-500">30%</span>
              </div>
              <div className="w-full bg-[#FAF8F5] rounded-full h-2">
                <div className="bg-[#D97706] h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Social Media</span>
                <span className="text-gray-500">15%</span>
              </div>
              <div className="w-full bg-[#FAF8F5] rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Referral</span>
                <span className="text-gray-500">10%</span>
              </div>
              <div className="w-full bg-[#FAF8F5] rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-[#E8DFD1]">
            <button className="w-full text-center text-sm font-medium text-[#8C1515] hover:text-[#701010] transition-colors">
              View Detailed Analytics
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;