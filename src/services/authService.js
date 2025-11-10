import api from "../api/axiosConfig";

const AUTH_URL = "/auth";

const register = async ({ username, password }) => {
    // يفترض response: { status, message, data: { accessToken?, refreshToken?, username, role } }
    const res = await api.post(`${AUTH_URL}/register`, { username, password });
    return res; // caller will read res.data, res.message
};

const login = async ({ username, password }) => {
    const res = await api.post(`${AUTH_URL}/login`, { username, password });
    // res.data is { status, message, data: { accessToken, refreshToken, username, role } }
    if (res.data && res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        if (res.data.refreshToken) localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);
    }
    return res;
};

const logout = async () => {
    // optional: call backend logout endpoint to invalidate refresh token
    try {
        const username = localStorage.getItem("username");
        if (username) await api.post(`${AUTH_URL}/logout?username=${encodeURIComponent(username)}`);
    } catch (err) { /* ignore */ }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
};

export default {
    register,
    login,
    logout,
};
