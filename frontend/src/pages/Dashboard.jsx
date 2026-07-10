import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import StatCard from "../components/StatCard";

function Dashboard() {

    const { user } = useAuth();

    return (

        <MainLayout>

            {/* Hero */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl">

                <h1 className="text-4xl font-bold">

                    Welcome, {user?.name} 👋

                </h1>

                <p className="mt-3 text-blue-100 text-lg">

                    Complete your profile and discover your ideal hostel roommate.

                </p>

            </div>

            {/* Cards */}

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">

                <StatCard
                    icon="👤"
                    title="Profile"
                    status="Completed ✅"
                    color="text-green-600"
                    to="/profile"
                />

                <StatCard
                    icon="🛏"
                    title="Preferences"
                    status="Completed ✅"
                    color="text-green-600"
                    to="/preferences"
                />

                <StatCard
                    icon="🎯"
                    title="Hobbies"
                    status="Completed ✅"
                    color="text-green-600"
                    to="/hobbies"
                />

                <StatCard
                    icon="❤️"
                    title="Matches"
                    status="Coming Soon"
                    color="text-orange-500"
                />

                <StatCard
                    icon="📨"
                    title="Requests"
                    status="Coming Soon"
                    color="text-orange-500"
                />

            </div>

            {/* Quick Actions */}

            <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Quick Actions

                </h2>

                <div className="flex flex-wrap gap-4">

                    <Link
                        to="/profile"
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        👤 Edit Profile
                    </Link>

                    <Link
                        to="/preferences"
                        className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
                    >
                        🛏 Preferences
                    </Link>

                    <Link
                        to="/hobbies"
                        className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
                    >
                        🎯 Hobbies
                    </Link>

                    <button
                        className="bg-gray-500 text-white px-6 py-3 rounded-xl cursor-not-allowed opacity-70"
                    >
                        ❤️ Matches (Coming Soon)
                    </button>

                </div>

            </div>

        </MainLayout>

    );

}

export default Dashboard;