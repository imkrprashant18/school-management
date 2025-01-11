/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/theme-store";

const Buttons = ({ type, onClick, btnName }) => {
  const { isDarkMode } = useThemeStore();
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type={type}
        onClick={onClick}
        className={`w-full py-3 rounded-lg font-semibold text-white ${
          isDarkMode
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-blue-600 hover:bg-blue-700"
        } transition-colors`}
      >
        {btnName}
      </motion.button>
    </>
  );
};

export default Buttons;
