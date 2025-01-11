import { motion } from "framer-motion";
import { Mail, Briefcase, Calendar } from "lucide-react";
import { useAdminAuthStore } from "../../store/admin-store/admin-auth-store";
import { useEffect } from "react";
import Text from "@carefully-coded/react-text-gradient";
const AdminProfileSection = () => {
  const { currentAdmin, getCurrentUser } = useAdminAuthStore();
  useEffect(() => {
    if (!currentAdmin) {
      getCurrentUser();
    }
  }, [currentAdmin, getCurrentUser]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto border bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden dark:border-gray-700"
    >
      <div className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src={currentAdmin?.data?.image}
              alt="Admin Profile"
              className="w-full h-full border-4 border-green-400 rounded-full object-cover"
            />
          </div>
          <Text
            gradient={{
              from: "#818CF8",
              to: "#5B21B6",
              type: "linear",
              degree: 90,
            }}
            style={{ fontSize: "2rem" }}
          >
            {currentAdmin?.data?.username?.toUpperCase()}
          </Text>
          <p className="text-green-600 dark:text-green-400 mt-1">Admin</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span>{currentAdmin?.data?.email}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <Briefcase className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span>{currentAdmin?.data?.fullName}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span>
              {new Date(currentAdmin?.data?.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminProfileSection;
