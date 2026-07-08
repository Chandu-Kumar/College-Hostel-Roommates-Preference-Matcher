import { useState } from "react";
import api from "../api/api";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", response.data.access_token);

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center">
          🏠 Hostel Matcher
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Find Your Perfect Roommate
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            Register
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;