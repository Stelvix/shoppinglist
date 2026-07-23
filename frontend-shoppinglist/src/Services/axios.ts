import axios from "axios";

const api = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Intercepteur pour injecter automatiquement le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as typeof config.headers;
  }

  return config;
});

// Intercepteur pour rediriger si le token expire
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    
    const isAuthRoute = url?.includes('/auth/login') || url?.includes('/auth/register');

     // 401 -> Token invalide/expiré
 if (!isAuthRoute && status === 401) {

      console.warn("Session expirée.");

      localStorage.removeItem("token");
      localStorage.setItem("sessionExpired", "true");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

     // 403 -> Pas les permissions
     if (!isAuthRoute && status === 403) {

      console.warn("Accès refusé.");}


    return Promise.reject(error);
  }
);

export default api;