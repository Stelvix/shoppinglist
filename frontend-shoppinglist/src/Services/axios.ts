import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://shoppinglist-gccsahgxcwdcejhh.francecentral-01.azurewebsites.net/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Intercepteur pour injecter automatiquement le token d'authentification
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour rediriger si le token expire
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    const token = localStorage.getItem('token');

    const isAuthRoute = url?.includes('/auth/login') || url?.includes('/auth/register');

    // Ne pas rediriger pour les routes de connexion/inscription, car ces erreurs doivent rester
    // gérées localement par le formulaire.
    // Ne pas non plus déconnecter automatiquement sur un 403 non-explicite, car il peut
    // être lié à une autorisation spécifique ou à une route protégée.
    if (token && !isAuthRoute && status === 401) {
      localStorage.removeItem('token');
      localStorage.setItem('sessionExpired', 'true');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;