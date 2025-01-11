/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/theme-store";

const Input = ({ value, onChange, type, placeholder }) => {
  const { isDarkMode } = useThemeStore();
  return (
    <div>
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-lg outline-none transition-colors ${
          isDarkMode
            ? "bg-gray-700 text-white placeholder-gray-400 focus:bg-gray-600"
            : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-gray-200"
        }`}
        required
      />
    </div>
  );
};

export default Input;
