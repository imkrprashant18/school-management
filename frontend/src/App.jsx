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
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
