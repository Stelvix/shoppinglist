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
  } catch (e) {
    return null;
  }
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
      throw new Error("Token manquant dans la réponse serveur");
    }
    localStorage.setItem('token', token)
    
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
   * Récupère les détails de l'utilisateur connecté en décodant l'email du token 
   * et en recherchant l'utilisateur correspondant dans l'API.
   */
  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded = parseJwt(token);
    if (!decoded || !decoded.sub) return null;

    const email = decoded.sub;

    // Récupère la liste de tous les utilisateurs pour trouver celui connecté
    const response = await api.get<User[]>('/users');
    const currentUser = response.data.find((u: User) => u.email === email);
    
    return currentUser || null;
  },

  /**
   * Déconnexion de l'utilisateur (suppression du token).
   */
  logout(): void {
    localStorage.removeItem('token');
  },

  /**
   * Vérifie si l'utilisateur est connecté (présence du token).
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};

export default authService;
