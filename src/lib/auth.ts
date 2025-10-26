import { storage } from './storage';

const TOKEN_KEY = 'auth.token';

export async function getToken(): Promise<string | null> {
  try { return (await storage.getString(TOKEN_KEY)) ?? null; } catch { return null; }
}
export async function setToken(t: string) {
  try { await storage.set(TOKEN_KEY, t); } catch {}
}
export async function clearToken() {
  try { await storage.delete(TOKEN_KEY); } catch {}
}
