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

    // Si on reçoit un 401 (Non autorisé) ou 403 (Interdit) sur une route protégée
    if (!isAuthRoute && (status === 401 || status === 403)) {
      // Nettoyage immédiat de la session
      localStorage.removeItem('token');
      localStorage.setItem('sessionExpired', 'true');
      
      // Redirection vers la page de connexion
      // On utilise window.location pour forcer un reset complet de l'état React en cas de corruption de session
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;