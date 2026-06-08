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

const accents = [
  { id: 'forest', label: 'Forest', light: '#1F4D3F', dark: '#5BBF8A' },
  { id: 'cobalt', label: 'Cobalt', light: '#1E40FF', dark: '#7C8CFF' },
  { id: 'cinnabar', label: 'Cinnabar', light: '#E04E1F', dark: '#FF7A4A' },
  { id: 'magenta', label: 'Magenta', light: '#E6005C', dark: '#FF6BA0' },
  { id: 'lime', label: 'Lime', light: '#7A9100', dark: '#C8FF00' },
  { id: 'amber', label: 'Amber', light: '#B86E2F', dark: '#E6B27A' },
];

const displays = [
  { id: 'bricolage', label: 'Bricolage' },
  { id: 'boldonse', label: 'Boldonse' },
];

export default function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('light');
  const [accent, setAccent] = useState('forest');
  const [display, setDisplay] = useState('bricolage');

  useEffect(() => {
    if (window.EM?.prefs) {
      setMode(window.EM.prefs.mode || 'light');
      setAccent(window.EM.prefs.accent || 'forest');
      setDisplay(window.EM.prefs.display || 'bricolage');
    }

    function handlePrefs(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail.mode) setMode(detail.mode);
      if (detail.accent) setAccent(detail.accent);
      if (detail.display) setDisplay(detail.display);
    }
    window.addEventListener('em:prefs', handlePrefs);
    return () => window.removeEventListener('em:prefs', handlePrefs);
  }, []);

  const save = useCallback((p: Record<string, string>) => {
    window.EM?.save(p);
    if (p.mode) setMode(p.mode);
    if (p.accent) setAccent(p.accent);
    if (p.display) setDisplay(p.display);
  }, []);

  return (
    <>
      <button
        className="tweaks-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Apri pannello personalizzazione"
        type="button"
      >
        <span className="icon" />
      </button>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 44,
          }}
          onClick={() => setOpen(false)}
        />
      )}

      <div
        style={{
          position: 'fixed',
          right: open ? 0 : '-320px',
          top: 0,
          bottom: 0,
          width: 300,
          zIndex: 46,
          background: 'var(--surface)',
          borderLeft: '1px solid var(--line)',
          boxShadow: open ? '-8px 0 40px rgba(0,0,0,.12)' : 'none',
          transition: 'right 300ms cubic-bezier(.2,.7,.2,1)',
          overflowY: 'auto',
          padding: '32px 24px',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 32,
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'calc(20px * var(--display-scale))', margin: 0 }}>
            Personalizza
          </h3>
          <button
            onClick={() => setOpen(false)}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              border: '1px solid var(--line)', background: 'transparent',
              color: 'var(--ink)', display: 'grid', placeItems: 'center',
              cursor: 'pointer', fontSize: 16,
            }}
            aria-label="Chiudi pannello"
            type="button"
          >
            &times;
          </button>
        </div>

        {/* Mode */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
            color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em',
            display: 'block', marginBottom: 12,
          }}>
            Tema
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['light', 'dark'].map(m => (
              <button
                key={m}
                onClick={() => save({ mode: m })}
                type="button"
                style={{
                  flex: 1, height: 40, borderRadius: 10,
                  border: `1px solid ${mode === m ? 'var(--ink)' : 'var(--line)'}`,
                  background: mode === m ? 'var(--ink)' : 'transparent',
                  color: mode === m ? 'var(--bg)' : 'var(--ink)',
                  fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
              >
                {m === 'light' ? 'Chiaro' : 'Scuro'}
              </button>
            ))}
          </div>
        </div>

        {/* Font display */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
            color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em',
            display: 'block', marginBottom: 12,
          }}>
            Font titoli
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {displays.map(d => (
              <button
                key={d.id}
                onClick={() => save({ display: d.id })}
                type="button"
                style={{
                  flex: 1, height: 40, borderRadius: 10,
                  border: `1px solid ${display === d.id ? 'var(--ink)' : 'var(--line)'}`,
                  background: display === d.id ? 'var(--ink)' : 'transparent',
                  color: display === d.id ? 'var(--bg)' : 'var(--ink)',
                  fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent colors */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
            color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em',
            display: 'block', marginBottom: 12,
          }}>
            Colore accento
          </label>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
          }}>
            {accents.map(a => (
              <button
                key={a.id}
                onClick={() => save({ accent: a.id })}
                type="button"
                style={{
                  height: 44, borderRadius: 10,
                  border: `2px solid ${accent === a.id ? (mode === 'dark' ? a.dark : a.light) : 'var(--line)'}`,
                  background: accent === a.id ? `${mode === 'dark' ? a.dark : a.light}18` : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
              >
                <span style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: mode === 'dark' ? a.dark : a.light,
                }} />
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
                  color: 'var(--ink)',
                }}>
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{
          padding: '16px 18px', borderRadius: 12,
          background: 'var(--bg-2)', border: '1px solid var(--line)',
          fontSize: 13, color: 'var(--muted)', lineHeight: 1.55,
        }}>
          Le preferenze vengono salvate nel tuo browser e applicate automaticamente alla prossima visita.
        </div>
      </div>
    </>
  );
}
