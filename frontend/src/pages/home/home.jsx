import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  Award,
  ArrowRight,
  Moon,
  SunDim,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeStore } from "../../store/theme-store";

const HomePage = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: BookOpen,
      title: "Smart Curriculum",
      description: "Comprehensive digital curriculum management",
    },
    {
      icon: Users,
      title: "Student Portal",
      description: "Seamless communication between students and teachers",
    },
    {
      icon: Calendar,
      title: "Schedule Management",
      description: "Efficient timetable and event planning",
    },
    {
      icon: Award,
      title: "Performance Tracking",
      description: "Detailed analytics and progress monitoring",
    },
  ];

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 to-white"
      }`}
    >
      {/* Hero Section */}
      <header className="container mx-auto p-4">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">SchoolVerse</span>
          </div>
          <div className="flex gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 hover:text-gray-900"
              onClick={toggleTheme} // Toggle theme on button click
            >
              {isDarkMode ? (
                <SunDim className="text-white" size={20} />
              ) : (
                <Moon size={20} />
              )}
            </motion.button>
            <Link to="/admin/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 px-8 items-center">
          <motion.div initial="initial" animate="animate" variants={fadeIn}>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Transform Your School Management
            </h1>
            <p className="text-xl mb-8">
              Streamline administration, enhance learning experiences, and build
              stronger educational communities with our comprehensive management
              system.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Start Today <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
              alt="Students using digital devices"
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Our platform provides all the tools necessary for modern educational
            management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={` ${
                isDarkMode ? "bg-slate-800" : "bg-white"
              } p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-sky-800 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of schools already using EduManage to improve their
            educational operations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
