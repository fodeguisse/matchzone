import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data?.message || "Erreur inconnue");
  }
);

export const getCsrfToken = async () => {
  try {
    const response = await axios.get("/csrf-token", { withCredentials: true });
    return response.data.csrfToken;
  } catch (err) {
    console.error("Erreur CSRF :", err);
    throw new Error("Impossible de récupérer le token CSRF.");
  }
};

// Requête GET
export const getData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Erreur GET :", error);
    throw error;
  }
};

// Requête POST
export const postData = async (endpoint, data) => {
  try {
    const csrfToken = await getCsrfToken();
    const response = await axiosInstance.post(endpoint, data, {
      headers: {
        "CSRF-Token": csrfToken,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur POST :", error);
    throw error;
  }
};
