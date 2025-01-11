/* eslint-disable react/prop-types */
import AdminSidebar from "../sidebar/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="w-screen flex ">
      <AdminSidebar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
