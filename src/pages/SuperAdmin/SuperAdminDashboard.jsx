export default function SuperAdminDashboard({ user }) {
  return (
    <div className="h-screen flex items-center justify-center bg-red-100">
      <h1 className="text-3xl font-bold">Hello {user.username}, Super Admin Dashboard</h1>
    </div>
  );
}
