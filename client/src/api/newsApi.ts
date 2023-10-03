import { IHeadlinesresponse, INewsResponse } from "@/types/types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const newsApi = axios.create({
  baseURL: BASE_URL,
});

newsApi.defaults.headers.common["Accept"] = "application/json";

newsApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

newsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      const response = await newsApi.post("/refresh", {
        refreshToken: refreshToken?.replace(/['"]+/g, ""),
      });
      localStorage.setItem("accessToken", response.data.accessToken);

      return newsApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const getAllNewsFn = async ({
  q,
  sources,
  category,
  from,
  to,
  page,
}: {
  q?: string;
  sources?: string;
  category?: string;
  from?: string;
  to?: string;
  page?: number;
}) => {
  const response = await newsApi.get<INewsResponse>(
    `/api/v1/getAllNews?q=${q}&sources=${sources}&category=${category}&from=${from}&to=${to}&page=${page}`
  );
  return response.data;
};

export const getAllSourcesFn = async () => {
  const response = await newsApi.get(`/api/v1/getAllSources`);
  return response.data;
};

export const getAllHeadlinesFn = async ({
  q,
  sources,
  category,
  page,
}: {
  q?: string;
  sources?: string;
  category?: string;
  page?: number;
}) => {
  const response = await newsApi.get<IHeadlinesresponse>(
    `/api/v1/getAllHeadlines?q=${q}&sources=${sources}&category=${category}&page=${page}`
  );
  return response.data;
};
