import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom"; // If you're using React Router
import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  Settings,
  MessageSquare,
  DollarSign,
  BarChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdminLogout from "../logout/AdminLogout";

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Students", path: "/students" },
    { icon: Users, label: "Teachers", path: "/teachers" },
    { icon: GraduationCap, label: "Classes", path: "/classes" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: DollarSign, label: "Payments", path: "/payments" },
    { icon: BarChart, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <motion.div
      initial={{ width: isExpanded ? 240 : 68 }}
      animate={{ width: isExpanded ? 240 : 68 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-slate-800 text-white p-4 relative"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-8 bg-gray-800 p-1 rounded-full"
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Logo Section */}
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <GraduationCap size={20} />
        </div>
        <motion.span
          initial={{ opacity: isExpanded ? 1 : 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2 font-bold text-lg"
        >
          {isExpanded && "School Admin"}
        </motion.span>
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path; // Check if the current path matches

          return (
            <Link to={item.path} key={index}>
              <motion.div
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
                whileHover={{ x: 4 }}
              >
                <item.icon
                  size={20}
                  className={`min-w-[20px] ${isActive ? "text-white" : ""}`}
                />
                <motion.span
                  initial={{ opacity: isExpanded ? 1 : 0 }}
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`ml-3 ${isActive ? "text-white" : ""}`}
                >
                  {isExpanded && item.label}
                </motion.span>
              </motion.div>
            </Link>
          );
        })}
        <AdminLogout />
      </nav>
    </motion.div>
  );
};

export default AdminSidebar;
