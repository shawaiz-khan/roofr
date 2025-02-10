import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use(async (config) => {
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await api.get("/api/auth/refresh-token");
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token expired. Logging out...");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;