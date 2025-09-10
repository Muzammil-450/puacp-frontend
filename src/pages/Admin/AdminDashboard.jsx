export default function AdminDashboard({ user }) {
  return (
    <div className="h-screen flex items-center justify-center bg-yellow-100">
      <h1 className="text-3xl font-bold">Hello {user.username}, Admin Dashboard</h1>
    </div>
  );
}
