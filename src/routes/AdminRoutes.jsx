import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";

export default function AdminRoutes({ user }) {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard user={user} />} />
    </Routes>
  );
}
