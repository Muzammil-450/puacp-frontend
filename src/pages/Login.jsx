import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axios";
import logo from "../assets/logo.png";

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
      console.log(res.data.data)
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
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-50 px-4">
  {/* Glassmorphic Card */}
  <div className="backdrop-blur-3xl bg-white/50 shadow-[0_15px_50px_rgba(0,0,0,0.3)] rounded-4xl w-full max-w-md p-6 sm:p-8 border border-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
    
    {/* Logo */}
    <div className="flex justify-center my-2">
      <img 
        src= {logo} 
        alt="App Logo" 
        className="h-40 w-auto sm:h-36 object-contain block"
      />
    </div>

    {/* Heading */}
    <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-center text-blue-900 font-sans">
      Welcome Back
    </h1>

    <p className="text-center text-gray-600 mb-4 text-sm sm:text-base font-sans">
      Login to access PUACP.
    </p>

    {/* Email */}
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none text-sm sm:text-base transition"
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full border border-gray-200 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none text-sm sm:text-base transition"
    />

    {/* Primary Button */}
    <button
      onClick={handleLogin}
      disabled={loading}
      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-3 rounded-xl font-semibold shadow-md hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 text-sm sm:text-base"
    >
      {loading ? "Logging in..." : "Login"}
    </button>


    {/* Footer */}
    <p className="mt-4 text-center text-gray-700 text-xs sm:text-sm">
      Don’t have an account?{" "}
      <Link
        to="/signup"
        className="font-semibold text-blue-600 hover:underline"
      >
        Create an account
      </Link>
    </p>

    {/* Small IT Branding */}
    <p className="mt-2 text-center text-xs sm:text-sm text-gray-500">
      Secure access powered by <span className="text-blue-500 font-semibold">PUACP</span>
    </p>
  </div>
</div>

  );
}
