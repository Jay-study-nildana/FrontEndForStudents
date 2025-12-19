const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/+$/, '');
const API_BASE = `${BASE}/api`;

export class APIError extends Error {
  status?: number;
  body?: any;
  constructor(message: string, status?: number, body?: any) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.body = body;
  }
}

async function handleResponse(res: Response): Promise<any | null> {
  const contentType = res.headers.get('content-type') || '';
  if (res.status === 204) return null;

  let body: any = null;
  try {
    if (contentType.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }
  } catch {
    body = null;
  }

  if (!res.ok) {
    const message = body && typeof body === 'object' && 'error' in body ? body.error : res.statusText || 'Request failed';
    throw new APIError(message, res.status, body);
  }
  return body;
}

function defaultHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json'
  };
}

function buildUrl(path: string): string {
  return API_BASE + path;
}

export type RegisterPayload = {
  email: string;
  password: string;
  name?: string;
};

export type UserResponse = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  roles?: string[];
};

type Opts = { signal?: AbortSignal };

/**
 * Register a new user
 * curl example:
 * POST /api/auth/register
 * body: { email, password, name }
 *
 * Example response:
 * {
 *   "id": 2,
 *   "email": "user@example.com",
 *   "name": "Jane Doe",
 *   "createdAt": "2025-12-18T07:18:03.808Z"
 * }
 */
export async function register(payload: RegisterPayload, opts: Opts = {}): Promise<UserResponse> {
  const res = await fetch(buildUrl('/auth/register'), {
    method: 'POST',
    headers: defaultHeaders(),
    body: JSON.stringify(payload),
    signal: opts.signal
  });
  return handleResponse(res);
}

/* -------------------------
   Login
   curl example:
   POST /api/auth/login
   body: { email, password }

   Example response:
   {
     "accessToken": "...",
     "user": { id, email, name, roles: [...] }
   }
-------------------------- */
export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    roles?: string[];
    createdAt: string;
  };
};

export async function login(payload: LoginPayload, opts: Opts = {}): Promise<LoginResponse> {
  const res = await fetch(buildUrl('/auth/login'), {
    method: 'POST',
    headers: defaultHeaders(),
    body: JSON.stringify(payload),
    signal: opts.signal
  });
  return handleResponse(res);
}

export default {
  register,
  login
};