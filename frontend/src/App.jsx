import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fallback from "./components/home-page/Fallback";

// Lazy load the HomePage component
const HomePage = lazy(() => import("./pages/home/home"));
// admin-pages
const AdminLoginPage = lazy(() => import("./pages/login/admin-login-page"));
const AdminDashboard = lazy(() => import("./pages/dashboard/Admin-dashboard"));
const AdminPublicRoute = lazy(() =>
  import("./components/public-route/admin-public-route")
);
const AdminProtectedRoute = lazy(() =>
  import("./components/protected-route/Admin-protected-route")
);
const AdminProfile = lazy(() => import("./pages/profile/Admin-profile"));
const AdminSettings = lazy(() => import("./pages/settings/admin-settings"));
const GetAllStudents = lazy(() =>
  import("./pages/admin-students/get-all-students")
);
const GetAllStudentsById = lazy(() =>
  import("./pages/admin-students/get-all-students-by-id")
);
function App() {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <AdminPublicRoute>
                <HomePage />
              </AdminPublicRoute>
            }
          />
          {/* admin */}
          <Route
            path="/admin/login"
            element={
              <AdminPublicRoute>
                <AdminLoginPage />
              </AdminPublicRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminProtectedRoute>
                <AdminProfile />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminSettings />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <AdminProtectedRoute>
                <GetAllStudents />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/student/:id"
            element={
              <AdminProtectedRoute>
                <GetAllStudentsById />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
