import { Outlet } from "react-router-dom";
import UserNavbar from "../Components/user/NavBar";
import UserFooter from "../Components/user/Footer";


const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <UserNavbar />

      <main>
        <Outlet />
      </main>

      <UserFooter />
    </div>
  );
};

export default UserLayout;