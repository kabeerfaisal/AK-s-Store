import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthHook'; // Adjust path

function AdminProtectedRoute() {
  const { user, loading } = useAuth(); 
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8C1515] border-t-transparent"></div>
          <p className="text-sm font-medium text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // 4. Agar DB se role 'admin' mil gaya -> Access Granted!
  return <Outlet />;
}

export default AdminProtectedRoute;