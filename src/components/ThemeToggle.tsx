import { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    EM: {
      prefs: Record<string, string>;
      save: (p: Record<string, string>) => void;
      setPrefs: (p: Record<string, string>) => void;
    };
  }
}

export default function ThemeToggle() {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    if (window.EM?.prefs?.mode) setMode(window.EM.prefs.mode);

    function handlePrefs(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail.mode) setMode(detail.mode);
    }
    window.addEventListener('em:prefs', handlePrefs);
    return () => window.removeEventListener('em:prefs', handlePrefs);
  }, []);

  const isDark = mode === 'dark';

  const toggle = useCallback(() => {
    const next = isDark ? 'light' : 'dark';
    window.EM?.save({ mode: next });
    setMode(next);
  }, [isDark]);

  return (
    <button
      className="theme-flag"
      onClick={toggle}
      aria-label={isDark ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
      aria-pressed={isDark}
      type="button"
    >
      <span className="theme-flag-icons" aria-hidden="true">
        <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </span>
    </button>
  );
}
