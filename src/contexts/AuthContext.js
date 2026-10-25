import React, { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const email = localStorage.getItem("email");
        const userId = localStorage.getItem("userId");
        const roles = JSON.parse(localStorage.getItem("roles")) || [];
        return email ? { email, userId, roles } : null;
    });

    const login = (payload) => {
        // payload is response from authService.login
        const data = payload?.data?.data;
        if (data) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("email", data.email);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("roles", JSON.stringify(data.roles));
            setUser({ email: data.email, userId: data.userId, roles: data.roles });
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
