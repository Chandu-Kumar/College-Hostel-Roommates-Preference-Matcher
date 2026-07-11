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

                    Manage your profile, discover compatible roommates, and send room requests — all in one place.

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
                    status="Available ✅"
                    color="text-green-600"
                    to="/matches"
                />
                <StatCard
                    icon="📨"
                    title="Requests"
                    status="Available ✅"
                    color="text-green-600"
                    to="/room-requests"
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

                    <Link
                        to="/matches"
                        className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
                    >
                        ❤️ View Matches
                    </Link>

                    <Link
                        to="/room-requests"
                        className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition"
                    >
                        📨 Room Requests
                    </Link>

                </div>

            </div>

        </MainLayout>

    );

}

export default Dashboard;