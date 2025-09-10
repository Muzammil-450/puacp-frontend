export default function SuperAdminDashboard({ user }) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; // or use navigate("/")
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome, {user.name}</h1>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
