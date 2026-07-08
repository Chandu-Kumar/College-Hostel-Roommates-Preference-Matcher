import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Navbar() {

    // const { logout } = useAuth();

    const navigate = useNavigate();

    

    const handleLogout = () => {

        logout();

        navigate("/");
    };

    const { user, logout } = useAuth();

    return (

        <nav className="bg-slate-900 text-white shadow-lg">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <div className="flex items-center gap-6">

                    <h1 className="text-2xl font-bold text-blue-400">
                            🏠 Hostel Matcher
                    </h1>

                    {user && (
                        <span className="text-gray-300">
                            Welcome, {user.name} 👋
                        </span>
                    )}

                </div>

                <div className="flex gap-6 items-center">

                    <Link to="/dashboard">Dashboard</Link>

                    <Link to="/matches">Matches</Link>

                    <Link to="/profile">Profile</Link>

                    <Link to="/preferences">Preferences</Link>

                    <Link to="/room-requests">Requests</Link>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;