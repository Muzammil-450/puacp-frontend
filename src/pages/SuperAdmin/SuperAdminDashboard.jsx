import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function SuperAdminDashboard({ user }) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const location = useLocation();

  // Determine if we are on the base dashboard route
  const isDashboardHome = location.pathname === "/superadmin";

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, {user?.name}
        </h1>

        {/* Nested routes will render here */}
        <Outlet />

        {/* Show default dashboard cards only if we are on /superadmin */}
        {isDashboardHome && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-bold">Total Users</h2>
              <p className="text-2xl mt-2">152</p>
            </div>

            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-bold">Active Sessions</h2>
              <p className="text-2xl mt-2">34</p>
            </div>

            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-bold">Reports</h2>
              <p className="text-2xl mt-2">12</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
