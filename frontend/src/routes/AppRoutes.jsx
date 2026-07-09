import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

import Profile from "../pages/Profile";

import Preferences from "../pages/Preferences";

import Hobbies from "../pages/Hobbies";

// const Hobbies = () => <h1>Hobbies Page</h1>;

function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/preferences"
                element={
                    <ProtectedRoute>
                        <Preferences />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/hobbies"
                element={
                    <ProtectedRoute>
                    <Hobbies />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default AppRoutes;