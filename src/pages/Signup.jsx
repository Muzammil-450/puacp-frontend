import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);

      // Call backend
      await api.post("/auth/register", { username, email, password , role: "user" });

      alert("Signup successful! You can now log in.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-green-100 to-emerald-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-600">Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6 focus:ring-2 focus:ring-emerald-400"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition disabled:bg-gray-400"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-emerald-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
