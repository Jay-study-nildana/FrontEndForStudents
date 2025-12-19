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

type Opts = { signal?: AbortSignal };

export async function getNotes(opts: Opts = {}): Promise<any> {
  const res = await fetch(buildUrl('/notes'), {
    method: 'GET',
    headers: defaultHeaders(),
    signal: opts.signal
  });
  return handleResponse(res);
}

export async function getNote(id: string, opts: Opts = {}): Promise<any> {
  const res = await fetch(buildUrl(`/notes/${encodeURIComponent(id)}`), {
    method: 'GET',
    headers: defaultHeaders(),
    signal: opts.signal
  });
  return handleResponse(res);
}

export async function createNote(payload: any, opts: Opts = {}): Promise<any> {
  const res = await fetch(buildUrl('/notes'), {
    method: 'POST',
    headers: defaultHeaders(),
    body: JSON.stringify(payload),
    signal: opts.signal
  });
  return handleResponse(res);
}

export async function updateNote(id: string, payload: any, opts: Opts = {}): Promise<any> {
  const res = await fetch(buildUrl(`/notes/${encodeURIComponent(id)}`), {
    method: 'PUT',
    headers: defaultHeaders(),
    body: JSON.stringify(payload),
    signal: opts.signal
  });
  return handleResponse(res);
}

export async function deleteNote(id: string, opts: Opts = {}): Promise<any> {
  const res = await fetch(buildUrl(`/notes/${encodeURIComponent(id)}`), {
    method: 'DELETE',
    headers: defaultHeaders(),
    signal: opts.signal
  });
  return handleResponse(res);
}

export default {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
};