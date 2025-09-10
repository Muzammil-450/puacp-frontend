import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, role, children }) {
  // If user not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user exists but role mismatch
  if (role && user.role !== role) {
    // You can send them to a "not authorized" page instead
    return <Navigate to="/unauthorized" replace />;
  }

  // All good → render page
  return children;
}
