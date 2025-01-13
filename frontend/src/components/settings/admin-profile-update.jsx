import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAdminAuthStore } from "../../store/admin-store/admin-auth-store";
import { useAdminProfileStore } from "../../store/admin-store/admin-update-profile";

export default function AdminProfileUpdate() {
  const { currentAdmin } = useAdminAuthStore();
  const { updateProfile, isLoading, profileData } = useAdminProfileStore();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentAdmin || profileData) {
      setFormData({
        email: currentAdmin?.data?.email || profileData?.data?.email || "",
        fullName:
          currentAdmin?.data?.fullName || profileData?.data?.fullName || "",
        image: null,
      });
      setImagePreview(
        currentAdmin?.data?.image || profileData?.data?.image || null
      );
    }
  }, [currentAdmin, profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size should not exceed 5MB.");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName) {
      setError("Email and Full Name are required.");
      return;
    }

    const data = new FormData();
    data.append("email", formData.email);
    data.append("fullName", formData.fullName);
    if (formData.image) data.append("image", formData.image);

    try {
      await updateProfile(data);
      window.location.reload();
      setError("");
    } catch (error) {
      console.log(error);
      setError("An error occurred while updating the profile.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-800"
    >
      <div className="w-[400px] bg-white dark:bg-slate-700 shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <p className="text-center dark:text-white text-md font-semibold">
            {currentAdmin?.data?.username}
          </p>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Update your profile
          </h2>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
              />
              <div className="mt-2 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-slate-600"
                >
                  Choose Image
                </button>
                {imagePreview && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
