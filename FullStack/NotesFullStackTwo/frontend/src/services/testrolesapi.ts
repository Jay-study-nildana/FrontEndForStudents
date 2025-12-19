import { useCallback } from 'react';
import { useAuth } from '../context/authContext';

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
    Accept: '*/*',
    'Content-Type': 'application/json'
  };
}

function buildUrl(path: string): string {
  return API_BASE + path;
}

type Opts = { signal?: AbortSignal };

/* stateless public call - can be used anywhere */
export async function getTestrolesPublic(opts: Opts = {}): Promise<string> {
  const res = await fetch(buildUrl('/testroles/public'), {
    method: 'GET',
    headers: defaultHeaders(),
    signal: opts.signal
  });
  return handleResponse(res);
}

/* auth-aware API helpers exposed via a hook that reads token from AuthContext */
export function useTestrolesApi() {
  const { token } = useAuth();

  const getTestrolesAuthOnly = useCallback(
    async (opts: Opts = {}): Promise<string> => {
      if (!token) {
        throw new APIError('No auth token available', 401);
      }
      const headers = { ...defaultHeaders(), Authorization: `Bearer ${token}` };
      const res = await fetch(buildUrl('/testroles/auth-only'), {
        method: 'GET',
        headers,
        signal: opts.signal
      });
      return handleResponse(res);
    },
    [token]
  );

  const getTestrolesAdminOnly = useCallback(
    async (opts: Opts = {}): Promise<string> => {
      if (!token) {
        throw new APIError('No auth token available', 401);
      }
      const headers = { ...defaultHeaders(), Authorization: `Bearer ${token}` };
      const res = await fetch(buildUrl('/testroles/admin-only'), {
        method: 'GET',
        headers,
        signal: opts.signal
      });
      return handleResponse(res);
    },
    [token]
  );

  return {
    getTestrolesPublic,
    getTestrolesAuthOnly,
    getTestrolesAdminOnly
  };
}

export default {
  getTestrolesPublic,
  useTestrolesApi
};