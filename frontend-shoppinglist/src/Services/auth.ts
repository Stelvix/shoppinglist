import api from './axios';
import type { LoginFormValues, SignupFormValues, User } from '../types';

/**
 * Fonction utilitaire pour décoder un JWT sans bibliothèque externe.
 */
function parseJwt(token: string) {
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

function isTokenValid(token: string | null): boolean {
  if (!token) {
    return false;
  }

  const payload = parseJwt(token);
  if (!payload || typeof payload !== 'object' || typeof payload.exp !== 'number') {
    return false;
  }

  return Math.floor(Date.now() / 1000) < payload.exp;
}

export const authService = {
  /**
   * Connexion de l'utilisateur. Le backend retourne directement le token JWT sous forme de chaîne de caractères.
   */
  async login(credentials: LoginFormValues): Promise<string> {
    const response = await api.post<string>('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });

    const token = response.data;

    if (!token) {
      throw new Error('Token manquant dans la réponse serveur');
    }

    localStorage.setItem('token', token);

    return token;
  },

  /**
   * Inscription d'un utilisateur. Le backend retourne un message de confirmation.
   */
  async signup(details: SignupFormValues): Promise<string> {
    const { firstName, lastName, email, password } = details;
    const response = await api.post<string>('/auth/register', {
      name: firstName,
      lname: lastName,
      email,
      password,
      pseudo: email.split('@')[0] // Pseudo généré à partir de l'email
    });

    return response.data;
  },

  /**
   * Récupère les détails de l'utilisateur connecté depuis le backend.
   */
  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      const response = await api.get<User>('/users/me');
      return response.data;
    } catch (error: unknown) {
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status === 401 || status === 403) {
        if (!this.isAuthenticated()) {
          throw new Error('Utilisateur connecté introuvable. Veuillez vous reconnecter.', { cause: error });
        }
        throw new Error('Problème d’authentification. Veuillez réessayer ou vous reconnecter.', { cause: error });
      }

      console.error('Erreur lors de la récupération de l’utilisateur connecté', error);
      throw new Error('Impossible de charger le profil utilisateur. Vérifiez votre connexion.', { cause: error });
    }
  },

  /**
   * Déconnexion de l'utilisateur (suppression du token).
   */
  logout(): void {
    localStorage.removeItem('token');
  },

  /**
   * Vérifie si l'utilisateur est connecté et que le token JWT n'est pas expiré.
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return isTokenValid(token);
  }
};

export default authService;
