import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    const navClass = ({ isActive }) =>
        `px-3 py-2 rounded-lg transition ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-slate-800"
        }`;

    return (

        <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}

                <div className="flex items-center gap-8">

                    <div>

                        <h1 className="text-2xl font-bold text-blue-400">
                            🏠 Hostel Matcher
                        </h1>

                        <p className="text-xs text-gray-400">
                            Find Your Ideal Roommate
                        </p>

                    </div>

                    <div className="hidden lg:flex gap-2">

                        <NavLink
                            to="/dashboard"
                            className={navClass}
                        >
                            🏠 Dashboard
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={navClass}
                        >
                            👤 Profile
                        </NavLink>

                        <NavLink
                            to="/preferences"
                            className={navClass}
                        >
                            🛏 Preferences
                        </NavLink>

                        <NavLink
                            to="/hobbies"
                            className={navClass}
                        >
                            🎯 Hobbies
                        </NavLink>

                        <NavLink
                            to="/matches"
                            className={navClass}
                        >
                            ❤️ Matches
                        </NavLink>

                        <NavLink
                            to="/room-requests"
                            className={navClass}
                        >
                            📨 Requests
                        </NavLink>

                    </div>

                </div>

                {/* Right Side */}

                <div className="flex items-center gap-4">

                    <div className="hidden md:block text-right">

                        <p className="text-sm text-gray-400">
                            Welcome
                        </p>

                        <p className="text-white font-semibold">
                            {user?.name}
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;