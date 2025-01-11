/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const AdminPublic = ({ children }) => {
  if (sessionStorage.getItem("accessToken")) {
    return <Navigate to="/admin/dashboard" />;
  } else {
    return children;
  }
};

export default AdminPublic;
