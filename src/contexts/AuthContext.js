import React, { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");
        return username ? { username, userId, role } : null;
    });

    const login = (payload) => {
        // payload is response from authService.login
        const data = payload?.data?.data;
        if (data) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("username", data.username);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("role", data.role);
            setUser({ username: data.username, userId: data.userId, role: data.role });
        }
    };

    const logout = async () => {
        await authService.logout();
        localStorage.clear();
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
