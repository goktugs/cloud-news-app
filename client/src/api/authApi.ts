import { ILoginRequest, ILoginResponse, INewsResponse } from "@/types/types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.defaults.headers.common["Accept"] = "application/json";

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      const response = await authApi.post("/refresh", {
        refreshToken: refreshToken?.replace(/['"]+/g, ""),
      });
      localStorage.setItem("accessToken", response.data.accessToken);

      return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const loginUserFn = async (user: ILoginRequest) => {
  const response = await authApi.post<ILoginResponse>("/api/v1/login", user);
  return response.data;
};

export const signUpUserFn = async (user: ILoginRequest) => {
  const response = await authApi.post<ILoginResponse>("/api/v1/signup", user);
  return response.data;
};

export const getAllNewsFn = async ({
  q,
  sources,
  category,
  from,
  to,
}: {
  q: string;
  sources: string;
  category: string;
  from: string;
  to: string;
}) => {
  const response = await authApi.get<INewsResponse>(
    `/api/v1/getAllNews?q=${q}&sources=${sources}&category=${category}&from=${from}&to=${to}`
  );
  return response.data;
};

export const getAllSourcesFn = async () => {
  const response = await authApi.get(`/api/v1/getAllSources`);
  return response.data;
};
