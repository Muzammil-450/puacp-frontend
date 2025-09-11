import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axios";
import logo from "../assets/logo.png"

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const semesters = ["Semester 1", "Semester 2","Semester 3","Semester 4","Semester 5","Semester 6","Semester 7","Semester 8" ];

  const departments = ["Sales", "Marketing", "HR", "Development", "Finance"];
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);

      // Call backend
      await api.post("/auth/register", { username, email, password , role: "user" , semester,department });

      alert("Signup successful! You can now log in.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-50 px-4">
      <div className="backdrop-blur-3xl bg-white/50 shadow-[0_15px_50px_rgba(0,0,0,0.3)] rounded-4xl w-full max-w-md p-6 sm:p-8 border border-gray-100 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        {/* Logo */}
    <div className="flex justify-center my-2">
      <img 
        src={logo} 
        alt="App Logo" 
        className="h-32 w-auto sm:h-36 object-contain block"
      />
    </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">JOIN PUACP NOW</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-400"
        />
        <select
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
  className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-400"
>
  <option className="w-full  grey-200 border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-400" value="" disabled>
    Department
  </option>
  {departments.map((dept, index) => (
    <option
      key={index}
      value={dept}
      className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-400"
    >
      {dept}
    </option>
  ))}
</select>

<select
  value={semester}
  onChange={(e) => setSemester(e.target.value)}
  className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-400"
>
  <option className="w-full  grey-200 border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-400" value="" disabled>
    Semester
  </option>
  {semesters.map((dept, index) => (
    <option
      key={index}
      value={dept}
      className="w-full "
    >
      {dept}
    </option>
  ))}
</select>


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6 focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-3 rounded-xl font-semibold shadow-md hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 text-sm sm:text-base"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-900 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
