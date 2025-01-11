import { LogOut } from "lucide-react";
import useAdminLogoutStore from "../../store/admin-store/admin-logout-store";
import { useNavigate } from "react-router-dom";
const AdminLogout = () => {
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
        className="w-full px-4  cursor-pointer  flex  items-center  gap-4"
      >
        <LogOut size={20} />
        <h1 className=" dark:text-white text-md font-semibold">Logout</h1>
      </div>
    </>
  );
};

export default AdminLogout;
