import Cookies from 'js-cookie';

const TOKEN_KEY = 'cancha_libre_token';
const USER_KEY = 'cancha_libre_user';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export function saveAuth(token: string, user: AuthUser) {
  if (typeof window === 'undefined') return;
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return Cookies.get(TOKEN_KEY) || null;
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  Cookies.remove(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}