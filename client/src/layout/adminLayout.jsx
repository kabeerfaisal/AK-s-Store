import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* <AdminSidebar /> */}

      <div className="lg:pl-64">

        {/* <AdminNavbar /> */}

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
