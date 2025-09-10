import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, role, children }) {
  if (!user) {
    return <Navigate to="/" replace />; // not logged in
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />; // wrong role
  }

  return children; // allowed
}
