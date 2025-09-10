import { Routes, Route } from "react-router-dom";
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdminDashboard";

export default function SuperAdminRoutes({ user }) {
  return (
    <Routes>
      <Route path="/superadmin" element={<SuperAdminDashboard user={user} />} />
    </Routes>
  );
}
