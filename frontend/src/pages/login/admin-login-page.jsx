import { useThemeStore } from "../../store/theme-store";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun, LogIn } from "lucide-react";
import AdminForm from "../../components/login/admin-form";
const AdminLoginPage = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-200 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isDarkMode
              ? "bg-gray-800 text-yellow-400"
              : "bg-white text-gray-800"
          } shadow-lg`}
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex justify-center mb-8"
          >
            <LogIn
              className={`w-12 h-12 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
          </motion.div>
          <AdminForm />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`mt-6 text-center flex justify-between  text-sm`}
          >
            <Link
              to="/student/login"
              className="bg-sky-500 p-2 rounded-xl text-white"
            >
              Student Login
            </Link>
            <Link
              to="/parent/login"
              className="bg-sky-500 p-2 rounded-xl text-white"
            >
              Parent Login
            </Link>
            <Link
              to="/teacher/login"
              className="bg-sky-500 p-2 rounded-xl text-white"
            >
              Teacher Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLoginPage;
