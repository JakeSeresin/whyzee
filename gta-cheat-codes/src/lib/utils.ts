export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const PLATFORM_LABELS = {
  pc: 'PC',
  ps: 'PlayStation',
  xbox: 'Xbox',
} as const;
