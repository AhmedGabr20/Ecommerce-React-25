import api from "../api/axiosConfig";

const AUTH_URL = "/auth";

const register = async ({ email, password }) => {
    // يفترض response: { status, message, data: { accessToken?, refreshToken?, username, role } }
    const res = await api.post(`${AUTH_URL}/register`, { email, password });
    return res; // caller will read res.data, res.message
};

const login = async ({ email, password }) => {
    const res = await api.post(`${AUTH_URL}/login`, { email, password });
    // res.data is { status, message, data: { accessToken, refreshToken, username, role } }
    if (res.data && res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        if (res.data.refreshToken) localStorage.setItem("refreshToken", res.data.refreshToken);
        if (res.data.id) localStorage.setItem("userId", res.data.id);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("roles", JSON.stringify(res.data.roles));
    }
    return res;
};

const logout = async () => {
    // optional: call backend logout endpoint to invalidate refresh token
    try {
        const email = localStorage.getItem("username");
        if (email) await api.post(`${AUTH_URL}/logout?username=${encodeURIComponent(email)}`);
    } catch (err) { /* ignore */ }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    localStorage.removeItem("roles");
};

export default {
    register,
    login,
    logout,
};
