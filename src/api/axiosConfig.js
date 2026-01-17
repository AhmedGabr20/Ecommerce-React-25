import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
    const access = localStorage.getItem("accessToken");
    if (access) config.headers.Authorization = `Bearer ${access}`;
    return config;
});

api.interceptors.response.use(
    res => res.data,
    async (error) => {
        const original = error.config;

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;

            try {
                const refresh = localStorage.getItem("refreshToken");
                const res = await axios.post("http://localhost:8080/api/auth/refresh?refreshToken=" + refresh);

                const newAccess = res?.data?.data?.accessToken ?? res?.data?.accessToken;
                localStorage.setItem("accessToken", newAccess);

                original.headers.Authorization = `Bearer ${newAccess}`;
                return api(original);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
