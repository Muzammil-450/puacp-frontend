import { NavLink } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col shadow-lg">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">
        Super Admin
      </h2>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-4">
        <NavLink
  to="/superadmin/announcement"
  className={({ isActive }) =>
    `block p-2 rounded ${isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}`
  }
>
  Announcements
</NavLink>

<NavLink
  to="/superadmin/users"
  className={({ isActive }) =>
    `block p-2 rounded ${isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}`
  }
>
  Manage Users
</NavLink>

<NavLink
  to="/superadmin/settings"
  className={({ isActive }) =>
    `block p-2 rounded ${isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}`
  }
>
  Settings
</NavLink>

      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
