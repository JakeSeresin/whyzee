export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('favorites') ?? '';
    return raw.split(',').filter(Boolean);
  } catch {
    return [];
  }
}

export function setFavorites(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('favorites', ids.join(','));
  } catch { /* ignore */ }
}

export function getRecent(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('recent') ?? '';
    return raw.split(',').filter(Boolean).slice(0, 30);
  } catch {
    return [];
  }
}

export function addRecent(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getRecent();
    const filtered = current.filter(r => r !== id);
    const updated = [id, ...filtered].slice(0, 30);
    localStorage.setItem('recent', updated.join(','));
  } catch { /* ignore */ }
}

export function clearFavorites(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem('favorites'); } catch { /* ignore */ }
}

export function clearRecent(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem('recent'); } catch { /* ignore */ }
}

export function getSetting<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export function setSetting<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* ignore */ }
}
