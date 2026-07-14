import axios from "axios";

function parseJwt(token: string | null) {
  if (!token) {
    return null;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function isStoredJwtValid(): boolean {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  const payload = parseJwt(token);
  if (!payload || typeof payload !== 'object' || typeof payload.exp !== 'number') {
    return false;
  }

  return Math.floor(Date.now() / 1000) < payload.exp;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://myshoppinglistapi-hsbwdbhtfcepauf0.francecentral-01.azurewebsites.net/api",
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
      if (!isStoredJwtValid()) {
        localStorage.removeItem('token');
        localStorage.setItem('sessionExpired', 'true');
        window.location.href = '/login';
      } else {
        console.warn('401 reçu alors que le token est encore valide. La session est conservée.');
      }
    }

    return Promise.reject(error);
  }
);

export default api;