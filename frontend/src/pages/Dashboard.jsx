import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

import StatCard from "../components/StatCard";

import { Link } from "react-router-dom";

function Dashboard() {

    const { user } = useAuth();

    return (

        <MainLayout>

            <h1 className="text-4xl font-bold">

                Welcome, {user?.name} 👋

            </h1>

            <p className="text-gray-500 mt-2">

                Manage your roommate profile from here.

            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                <StatCard
                    icon="👤"
                    title="Profile"
                    status="Completed ✅"
                    color="text-green-600"
                />

                <StatCard
                    icon="🛏"
                    title="Preferences"
                    status="Completed ✅"
                    color="text-green-600"
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

            <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Quick Actions

                </h2>

                <div className="flex flex-wrap gap-4">

                    <Link
                        to="/profile"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Edit Profile
                    </Link>

                    <Link
                        to="/preferences"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        Edit Preferences
                    </Link>

                    <button
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg cursor-not-allowed opacity-70"
                    >
                        Find Matches
                    </button>

                </div>

            </div>

        </MainLayout>

    );

}

export default Dashboard;