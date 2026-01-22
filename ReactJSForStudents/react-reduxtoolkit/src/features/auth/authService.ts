// A tiny "fake backend" using localStorage to store users + sessions.
// This is only for demo purposes and NOT secure — do not use in production.

export interface StoredUser {
  id: string;
  username: string;
  password: string; // plain text here for demo only
}

export interface AuthResult {
  user: { id: string; username: string };
  token: string;
}

const USERS_KEY = 'demo_auth_users';
const SESSION_KEY = 'demo_auth_session';

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as StoredUser[]) : [];
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(token: string, userId: string) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token, userId }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function registerService(username: string, password: string): Promise<AuthResult> {
  await delay(500); // simulate network
  const users = readUsers();

  if (users.find((u) => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error('Username already taken');
  }

  const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const newUser: StoredUser = { id, username, password };
  users.push(newUser);
  writeUsers(users);

  const token = generateToken(id);
  saveSession(token, id);

  return { user: { id, username }, token };
}

export async function loginService(username: string, password: string): Promise<AuthResult> {
  await delay(400);
  const users = readUsers();
  const found = users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password,
  );
  if (!found) throw new Error('Invalid username or password');

  const token = generateToken(found.id);
  saveSession(token, found.id);

  return { user: { id: found.id, username: found.username }, token };
}

export async function logoutService(): Promise<void> {
  await delay(100);
  clearSession();
}

export function getCurrentSession(): AuthResult | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const { token, userId } = JSON.parse(raw) as { token: string; userId: string };
    const users = readUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) {
      clearSession();
      return null;
    }
    return { user: { id: user.id, username: user.username }, token };
  } catch {
    return null;
  }
}

function generateToken(userId: string) {
  return `${userId}:${Math.random().toString(36).slice(2, 10)}`;
}