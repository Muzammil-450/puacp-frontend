import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

// User
import MainDashboard from "../pages/Main/MainPage"; // Main user dashboard
// import UserProfile from "../pages/Main/UserProfile"; // example nested route

// Admin
import AdminDashboard from "../pages/Admin/AdminDashboard";
// import AdminUsers from "../pages/Admin/AdminUsers"; // nested route example
// import AdminSettings from "../pages/Admin/AdminSettings";

// Super Admin
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdminDashboard";
import Announcement from "../pages/SuperAdmin/Announcement";
// import SuperAdminUsers from "../pages/SuperAdmin/Users";
// import SuperAdminSettings from "../pages/SuperAdmin/Settings";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes({ user, setUser }) {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup />} />

      {/* User Dashboard + Nested Routes */}
      <Route
        path="/main/*"
        element={
          <ProtectedRoute user={user} role="user">
            <MainDashboard user={user} />
          </ProtectedRoute>
        }
      >
        {/* <Route path="profile" element={<UserProfile user={user} />} /> */}
        {/* Add more nested user pages here */}
      </Route>

      {/* Admin Dashboard + Nested Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute user={user} role="admin">
            <AdminDashboard user={user} />
          </ProtectedRoute>
        }
      >
        {/* <Route path="users" element={<AdminUsers user={user} />} />
        <Route path="settings" element={<AdminSettings user={user} />} /> */}
        {/* Add more nested admin pages here */}
      </Route>

      {/* Super Admin Dashboard + Nested Routes */}
      <Route
        path="/superadmin/*"
        element={
          <ProtectedRoute user={user} role="superadmin">
            <SuperAdminDashboard user={user} />
          </ProtectedRoute>
        }
      >
        <Route path="announcement" element={<Announcement user={user} />} />
        {/* <Route path="users" element={<SuperAdminUsers user={user} />} />
        <Route path="settings" element={<SuperAdminSettings user={user} />} /> */}
        {/* Add more nested superadmin pages here */}
      </Route>
    </Routes>
  );
}
