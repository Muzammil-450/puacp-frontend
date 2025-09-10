import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/Main/MainPage";

export default function UserRoutes({ user }) {
  return (
    <Routes>
      <Route path="/main" element={<MainPage user={user} />} />
    </Routes>
  );
}
