/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const refreshLogic = async (failedRequest: any) => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            localStorage.removeItem("authToken");
            return Promise.reject("No Refresh Token Found");
        }

        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, { refreshToken });

        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        failedRequest.response.config.headers["Authorization"] = `Bearer ${response.data.token}`;

        return Promise.resolve();
    } catch (error: any) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
    }
};

createAuthRefreshInterceptor(axiosInstance, refreshLogic);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;