import AdminLayout from "../../components/Layout/AdminLayout";
import AdminProfileSection from "../../components/profile-section/admin-profile-section";

const AdminProfile = () => {
  return (
    <>
      <AdminLayout>
        <div className="w-full border-l-2 border-gray-400 bg-white dark:bg-gray-800 h-screen flex items-center justify-center">
          <AdminProfileSection />
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminProfile;
