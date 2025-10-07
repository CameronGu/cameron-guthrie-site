import { useEffect, useState } from 'react';
import {
  getThemeDefinition,
  themes,
  type ThemeDefinition,
  type ThemeId,
} from '../config/themes';

export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'cjg-theme-id';
const MODE_STORAGE_KEY = 'cjg-theme-mode';

const THEME_MAP = new Map<ThemeId, ThemeDefinition>(themes.map((theme) => [theme.id, theme]));

const DEFAULT_THEME_ID: ThemeId = 'hero';

const getStoredThemeId = (): ThemeId | null => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored && THEME_MAP.has(stored as ThemeId)) {
    return stored as ThemeId;
  }
  return null;
};

const getStoredMode = (): ThemeMode | null => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return null;
};

const prefersDark = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-color-scheme: dark)').matches;

export const themeOptions = themes.map(({ id, label, description }) => ({
  id,
  label,
  description,
}));

export const resolveInitialTheme = () => {
  const themeId = getStoredThemeId() ?? DEFAULT_THEME_ID;
  const mode = getStoredMode() ?? (prefersDark() ? 'dark' : 'light');
  return { themeId, mode };
};

const cssVarEntries = (tokens: ThemeDefinition['light']) => (
  [
    ['--color-bg', tokens.background],
    ['--color-fg', tokens.foreground],
    ['--color-card', tokens.card],
    ['--color-card-fg', tokens.cardForeground],
    ['--color-popover', tokens.popover],
    ['--color-popover-fg', tokens.popoverForeground],
    ['--color-primary', tokens.primary],
    ['--color-primary-fg', tokens.primaryForeground],
    ['--color-secondary', tokens.secondary],
    ['--color-secondary-fg', tokens.secondaryForeground],
    ['--color-muted', tokens.muted],
    ['--color-muted-fg', tokens.mutedForeground],
    ['--color-accent', tokens.accent],
    ['--color-accent-fg', tokens.accentForeground],
    ['--color-destructive', tokens.destructive],
    ['--color-destructive-fg', tokens.destructiveForeground],
    ['--color-border', tokens.border],
    ['--color-input', tokens.input],
    ['--ring', tokens.ring],
  ] as const
);

export const applyTheme = (themeId: ThemeId, mode: ThemeMode) => {
  if (typeof document === 'undefined') return;
  const theme = getThemeDefinition(themeId);
  const tokens = mode === 'dark' ? theme.dark : theme.light;
  const root = document.documentElement;

  cssVarEntries(tokens).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });

  root.style.setProperty('--font-sans', theme.fonts.sans);
  root.style.setProperty('--font-display', theme.fonts.display);
  root.style.setProperty('--font-mono', theme.fonts.mono);
  root.style.setProperty('--radius-base', theme.radius);

  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  root.dataset.theme = themeId;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
    window.localStorage.setItem(MODE_STORAGE_KEY, mode);
  }
};

export const useThemeController = () => {
  const [{ themeId, mode }, setState] = useState(resolveInitialTheme);

  useEffect(() => {
    applyTheme(themeId, mode);
  }, [themeId, mode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (event: MediaQueryListEvent) => {
      setState((prev) => ({ ...prev, mode: event.matches ? 'dark' : 'light' }));
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const setThemeId = (id: ThemeId) => setState((prev) => ({ ...prev, themeId: id }));
  const setMode = (value: ThemeMode) => setState((prev) => ({ ...prev, mode: value }));

  return {
    themeId,
    mode,
    setThemeId,
    setMode,
  };
};

export type { ThemeId } from '../config/themes';
