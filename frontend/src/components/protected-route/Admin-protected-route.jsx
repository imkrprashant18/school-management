/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuthStore } from "../../store/admin-store/admin-auth-store";
const AdminProtectedRoute = ({ children }) => {
  const { currentAdmin, getCurrentUser } = useAdminAuthStore();
  useEffect(() => {
    if (currentAdmin) {
      getCurrentUser();
    }
  }, [currentAdmin, getCurrentUser]);
  if (sessionStorage.getItem("accessToken")) {
    return children;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

export default AdminProtectedRoute;
