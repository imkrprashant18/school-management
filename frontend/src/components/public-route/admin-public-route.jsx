/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const AdminPublic = ({ children }) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    return <Navigate to="/admin/dashboard" />;
  } else {
    return children;
  }
};

export default AdminPublic;
