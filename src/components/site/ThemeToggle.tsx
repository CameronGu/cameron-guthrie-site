import { Moon, Sun } from 'lucide-react';
import { themeOptions, useThemeController, type ThemeId } from '~/lib/theme';

export default function ThemeToggle() {
  const { themeId, mode, setThemeId, setMode } = useThemeController();

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const Icon = mode === 'dark' ? Sun : Moon;
  const label = mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-select" className="sr-only">
        Select theme palette
      </label>
      <select
        id="theme-select"
        value={themeId}
        onChange={(event) => setThemeId(event.target.value as ThemeId)}
        className="inline-flex min-w-[9rem] items-center rounded-full border border-secondary/60 bg-card/80 px-3 py-2 text-sm font-medium text-secondary-foreground shadow-sm supports-[backdrop-filter]:bg-card/65 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Select theme palette"
      >
        {themeOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={toggleMode}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary/60 bg-card/80 text-secondary-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={label}
        title={label}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
