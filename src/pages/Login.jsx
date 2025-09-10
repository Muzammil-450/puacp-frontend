import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axios";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      // Call backend
      const res = await api.post("/auth/login", { email, password });

      // Example response: { username, role, token }
      const loggedUser = res.data.data;
      setUser(loggedUser);

      // Save token
      // Save whole user object
localStorage.setItem("user", JSON.stringify(loggedUser));

      localStorage.setItem("token", loggedUser.token);

      // Navigate based on role
      if (loggedUser.role === "user") navigate("/main");
      if (loggedUser.role === "admin") navigate("/admin");
      if (loggedUser.role === "superadmin") navigate("/superadmin");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6 focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
