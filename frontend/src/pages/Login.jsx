import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/api";
import { useAuth } from "../context/AuthContext";

import { toast } from "sonner";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const formData = new URLSearchParams();

            formData.append("username", email);

            formData.append("password", password);

            const response = await api.post(
                "/auth/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            login(response.data.access_token);

            navigate("/dashboard");

        } catch {

            

            toast.error("Invalid Email or Password",{duration: 4000});

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-6">

            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Section */}

                <div className="hidden lg:block text-white">

                    <h1 className="text-6xl font-extrabold">

                        🏠 Hostel Matcher

                    </h1>

                    <p className="text-xl text-blue-100 mt-6 leading-relaxed">

                        Find your ideal hostel roommate based on
                        preferences, hobbies and compatibility.

                    </p>

                    <div className="mt-10 space-y-5">

                        <div className="bg-white/10 backdrop-blur rounded-xl p-5">

                            <h3 className="font-bold text-lg">

                                🎯 Smart Matching

                            </h3>

                            <p className="text-blue-100 mt-2">

                                AI-inspired compatibility scoring based on your lifestyle.

                            </p>

                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-xl p-5">

                            <h3 className="font-bold text-lg">

                                ❤️ Preference Based

                            </h3>

                            <p className="text-blue-100 mt-2">

                                Match roommates using sleep, study, food and budget preferences.

                            </p>

                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-xl p-5">

                            <h3 className="font-bold text-lg">

                                📨 Safe Room Requests

                            </h3>

                            <p className="text-blue-100 mt-2">

                                Send, receive and manage room requests securely.

                            </p>

                        </div>

                    </div>

                </div>

                {/* Login Card */}

                <div className="bg-white rounded-3xl shadow-2xl p-10">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">

                            Welcome Back 👋

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Sign in to continue.

                        </p>

                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="mt-10 space-y-6"
                    >

                        <div>

                            <label className="block font-semibold mb-2">

                                📧 Email

                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>

                        <div>

                            <label className="block font-semibold mb-2">

                                🔒 Password

                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold transition"
                        >

                            {loading ? "Signing In..." : "Sign In →"}

                        </button>

                    </form>

                    <p className="text-center text-gray-500 mt-8">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-blue-600 font-semibold hover:underline"
                        >

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;