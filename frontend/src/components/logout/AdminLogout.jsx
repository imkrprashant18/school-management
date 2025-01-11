/* eslint-disable react/prop-types */
import { LogOut } from "lucide-react";
import useAdminLogoutStore from "../../store/admin-store/admin-logout-store";
import { useNavigate } from "react-router-dom";

const AdminLogout = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAdminLogoutStore();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <>
      <div
        onClick={handleLogout}
        className="w-full px-4  absolute bottom-6 right-1  cursor-pointer  flex  items-center  gap-4"
      >
        {isSidebarOpen ? (
          <>
            <LogOut size={20} className="" />
            <h1 className="dark:text-white text-md font-semibold">Logout</h1>
          </>
        ) : (
          <LogOut size={20} />
        )}
      </div>
    </>
  );
};

export default AdminLogout;
