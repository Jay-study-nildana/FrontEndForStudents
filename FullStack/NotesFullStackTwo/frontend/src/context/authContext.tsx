import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { register as apiRegister, login as apiLogin } from '../services/auth';
import type {
  RegisterPayload,
  UserResponse,
  LoginPayload,
  LoginResponse
} from '../services/auth';

type AuthState = {
  token: string | null;
  user: UserResponse | null;
};

type AuthContextType = {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<UserResponse>;
  logout: () => void;
};

const STORAGE_TOKEN_KEY = 'auth.token';
const STORAGE_USER_KEY = 'auth.user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function parseJwtPayload(token: string): { exp?: number; [k: string]: any } | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ token: null, user: null });
  const logoutTimerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (logoutTimerRef.current !== null) {
      window.clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const scheduleAutoLogout = useCallback((token: string) => {
    clearTimer();
    const payload = parseJwtPayload(token);
    if (!payload?.exp) return;
    const expiresAt = payload.exp * 1000;
    const ms = expiresAt - Date.now();
    if (ms <= 0) {
      // token already expired
      logout();
      return;
    }
    logoutTimerRef.current = window.setTimeout(() => {
      logout();
    }, ms);
  }, []);

  const persist = useCallback((token: string | null, user: UserResponse | null) => {
    if (token) {
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    }
    if (user) {
      try {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      } catch {
        localStorage.removeItem(STORAGE_USER_KEY);
      }
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const res: LoginResponse = await apiLogin(payload);
    const token = res.accessToken;
    const user = res.user;
    setState({ token, user });
    persist(token, user);
    scheduleAutoLogout(token);
  }, [persist, scheduleAutoLogout]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const user = await apiRegister(payload);
    // register returns the created user but no token; do not auto-login
    return user;
  }, []);

  const logout = useCallback(() => {
    clearTimer();
    setState({ token: null, user: null });
    persist(null, null);
  }, [persist]);

  // rehydrate on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem(STORAGE_TOKEN_KEY);
      const userJson = localStorage.getItem(STORAGE_USER_KEY);
      if (token && userJson) {
        const user = JSON.parse(userJson) as UserResponse;
        const payload = parseJwtPayload(token);
        if (payload?.exp && payload.exp * 1000 > Date.now()) {
          setState({ token, user });
          scheduleAutoLogout(token);
        } else {
          // expired
          persist(null, null);
        }
      } else {
        persist(null, null);
      }
    } catch {
      persist(null, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextType = {
    user: state.user,
    token: state.token,
    isAuthenticated: Boolean(state.token && state.user),
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;