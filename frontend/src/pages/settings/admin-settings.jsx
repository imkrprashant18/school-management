import AdminLayout from "../../components/Layout/AdminLayout";
import AdminProfileUpdate from "../../components/settings/admin-profile-update";

const AdminSettings = () => {
  return (
    <>
      <AdminLayout>
        <div className="flex w-full border-l-2 bg-white dark:bg-slate-800 justify-center items-center h-screen overflow-x-hidden">
          <AdminProfileUpdate />
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminSettings;
