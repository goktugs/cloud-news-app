import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const preferencesApi = axios.create({
  baseURL: BASE_URL,
});

preferencesApi.defaults.headers.common["Accept"] = "application/json";

preferencesApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

preferencesApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      const response = await preferencesApi.post("/refresh", {
        refreshToken: refreshToken?.replace(/['"]+/g, ""),
      });
      localStorage.setItem("accessToken", response.data.accessToken);

      return preferencesApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const changePreferencesFn = async ({
  selectedSources,
  selectedCategories,
  selectedAuthors,
}: {
  selectedSources: string[];
  selectedCategories: string[];
  selectedAuthors: string[];
}) => {
  try {
    const userId = localStorage.getItem("userId");

    const preferencesData = {
      selectedSources,
      selectedCategories,
      selectedAuthors,
    };

    const response = await preferencesApi.patch(
      `/api/v1/changeUserPreferences/${userId}`,
      preferencesData
    );

    if (response.status === 200) {
      return { success: true, message: "Tercihler başarıyla güncellendi." };
    } else {
      return { success: false, message: "Tercihler güncellenemedi." };
    }
  } catch (error) {
    console.error("Tercihler güncelleme hatası:", error);
    return {
      success: false,
      message: "Tercihler güncellenirken bir hata oluştu.",
    };
  }
};

export const getPreferencesFn = async () => {
  try {
    const response = await preferencesApi.get(`/api/v1/userPreferences`);

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: "Tercihler getirilemedi." };
    }
  } catch (error) {
    console.error("Tercihler getirme hatası:", error);
    return {
      success: false,
      message: "Tercihler getirilirken bir hata oluştu.",
    };
  }
};
