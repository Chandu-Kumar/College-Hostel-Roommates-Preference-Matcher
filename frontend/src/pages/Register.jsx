import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/registerService";

import { toast } from "sonner";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            console.log("toast line reached");

            toast.error("Passwords do not match ❌");

            return;

        }

        try {

            setLoading(true);

            await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            console.log("toast line reached");

            toast.success("Account Created Successfully ✅");

            navigate("/");

        } catch (error) {

            console.error(error);

            console.log("toast line reached");

            toast.error(
                error.response?.data?.detail ||
                "Registration Failed ❌"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-6">

            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">

                {/* Left */}

                <div className="hidden lg:block text-white">

                    <h1 className="text-6xl font-extrabold">

                        🏠 Hostel Matcher

                    </h1>

                    <p className="text-xl text-blue-100 mt-6 leading-relaxed">

                        Create your account and find your perfect
                        hostel roommate.

                    </p>

                    <div className="mt-10 space-y-5">

                        <div className="bg-white/10 rounded-xl p-5 backdrop-blur">

                            <h3 className="font-bold text-lg">

                                🎯 Smart Matching

                            </h3>

                            <p className="text-blue-100 mt-2">

                                AI-based compatibility score.

                            </p>

                        </div>

                        <div className="bg-white/10 rounded-xl p-5 backdrop-blur">

                            <h3 className="font-bold text-lg">

                                ❤️ Preference Based

                            </h3>

                            <p className="text-blue-100 mt-2">

                                Lifestyle & hobby matching.

                            </p>

                        </div>

                        <div className="bg-white/10 rounded-xl p-5 backdrop-blur">

                            <h3 className="font-bold text-lg">

                                📨 Safe Room Requests

                            </h3>

                            <p className="text-blue-100 mt-2">

                                Secure roommate request system.

                            </p>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="bg-white rounded-3xl shadow-2xl p-10">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">

                            Create Account

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Join Hostel Matcher today.

                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        <div>

                            <label className="font-semibold">

                                👤 Full Name

                            </label>

                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                📧 Email

                            </label>

                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                🔒 Password

                            </label>

                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                🔒 Confirm Password

                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="w-full mt-2 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold transition"
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Account →"}

                        </button>

                    </form>

                    <p className="text-center mt-8 text-gray-500">

                        Already have an account?{" "}

                        <Link
                            to="/"
                            className="text-blue-600 font-semibold hover:underline"
                        >

                            Sign In

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;