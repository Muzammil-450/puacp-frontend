import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login setUser={setUser} />} />

        {/* Protected user routes */}
        {user?.role === "user" && <Route path="/*" element={<UserRoutes user={user} />} />}

        {/* Protected admin routes */}
        {user?.role === "admin" && <Route path="/*" element={<AdminRoutes user={user} />} />}

        {/* Protected super admin routes */}
        {user?.role === "superadmin" && <Route path="/*" element={<SuperAdminRoutes user={user} />} />}

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
