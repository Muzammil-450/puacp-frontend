import { Outlet, useLocation } from "react-router-dom";

export default function MainPage({ user }) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const location = useLocation();
  const isHome = location.pathname === "/main";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Nested routes will render here */}
      <Outlet />

      {/* Default content only on /main */}
      {isHome && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-lg font-bold">Your Stats</h2>
            <p className="text-2xl mt-2">42</p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-lg font-bold">Active Sessions</h2>
            <p className="text-2xl mt-2">7</p>
          </div>
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-lg font-bold">Tasks</h2>
            <p className="text-2xl mt-2">13</p>
          </div>
        </div>
      )}
    </div>
  );
}
