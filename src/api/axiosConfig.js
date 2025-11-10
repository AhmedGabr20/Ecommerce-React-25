import axios from "axios";

// baseURL
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000,
});

// add Authorization header automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// response interceptor: unwrap ApiResponse { status, message, data }
api.interceptors.response.use(
    (response) => {
        // backend
        // لو لازم ترجع data مباشرة:
        if (response.data && response.data.data !== undefined) {
            return response.data; // caller will use .data (wrapper) or .data.data for payload
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
