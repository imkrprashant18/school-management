import { useState } from "react";
import { useThemeStore } from "../../store/theme-store"; // Assuming you have a theme store
import { useAdminLoginStore } from "../../store/admin-store/admin-login-store";
import Input from "../input/Input";
import Buttons from "../buttons/Buttons";
import { useNavigate } from "react-router-dom";
const AdminForm = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();
  const { login, isLoading, error } = useAdminLoginStore();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2
        className={`text-3xl font-bold text-center mb-8 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Admin Login
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          placeholder="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

        <Input
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}

        <Buttons btnName={isLoading ? "Login...." : "Login"} type="submit" />
      </form>
    </>
  );
};

export default AdminForm;
