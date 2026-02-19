// src/auth/AuthProvider.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthTokens {
  access_token: string;
  refresh_token: string;
  roles?: string[];
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<any>;
  logout: () => void;
  getAccessToken: () => string | null;
  getRoles: () => string[];
  getEmail: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "auth_tokens";

function parseJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return {};
  }
}

// Get API URL from environment
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (tokens) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [tokens]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error("Login failed");
    }
    const data = await res.json();
    const decoded = parseJwt(data.access_token);
    setTokens({ ...data, roles: decoded.roles, email: decoded.email });
  };

  // Register function for user registration
  const register = async (email: string, password: string, name: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, role: "user" }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  };

  const logout = () => {
    setTokens(null);
  };

  const getAccessToken = () => tokens?.access_token || null;
  const getRoles = () => tokens?.roles || [];
  const getEmail = () => tokens?.email || null;

  return (
    <AuthContext.Provider
      value={{
        tokens,
        isAuthenticated: !!tokens,
        login,
        register,
        logout,
        getAccessToken,
        getRoles,
        getEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
