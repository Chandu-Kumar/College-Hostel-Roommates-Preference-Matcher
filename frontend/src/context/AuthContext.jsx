import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    const fetchCurrentUser = async () => {

        if (!token) return;

        try {

            const response = await api.get("/auth/me");

            setUser(response.data);

        } catch (error) {

            logout();
        }
    };

    useEffect(() => {

        fetchCurrentUser();

    }, [token]);

    const login = (jwt) => {

        localStorage.setItem("token", jwt);

        setToken(jwt);
    };

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}

export function useAuth() {

    return useContext(AuthContext);
}