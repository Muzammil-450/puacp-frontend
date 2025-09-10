import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/Main/MainPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/main"
          element={
            <ProtectedRoute user={user} role="user">
              <MainPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute user={user} role="superadmin">
              <SuperAdminDashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
