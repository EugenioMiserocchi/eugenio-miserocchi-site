import { useState, type FormEvent } from 'react';

const WEBHOOK_URL = 'https://hook.eu2.make.com/bajcqivlkiad78qvaibdcloi165xu548';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      nome: (form.elements.namedItem('nome') as HTMLInputElement).value.trim(),
      azienda: (form.elements.namedItem('azienda') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      telefono: (form.elements.namedItem('telefono') as HTMLInputElement).value.trim(),
      obiettivo: (form.elements.namedItem('obiettivo') as HTMLTextAreaElement).value.trim(),
      budget: (form.elements.namedItem('budget') as HTMLInputElement).value.trim(),
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
    } catch (err) {
      setErrorMsg('Qualcosa è andato storto. Riprova o scrivimi direttamente a info@eugeniomiserocchi.it');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        padding: '48px 36px',
        textAlign: 'center',
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'color-mix(in oklab, var(--pos) 18%, transparent)',
          color: 'var(--pos)',
          display: 'grid', placeItems: 'center',
          margin: '0 auto 20px', fontSize: 24, fontWeight: 700,
        }}>&#10003;</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'calc(24px * var(--display-scale))', marginBottom: 12, color: 'var(--ink)' }}>
          Messaggio inviato
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>
          Riceverai una risposta entro 24 ore lavorative. Ti rispondo io, direttamente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="nome" className="form-label">Nome e cognome *</label>
        <input
          type="text"
          id="nome"
          name="nome"
          className="form-input"
          required
          autoComplete="name"
          placeholder="Il tuo nome completo"
        />
      </div>

      <div className="form-group">
        <label htmlFor="azienda" className="form-label">Azienda / Attività</label>
        <input
          type="text"
          id="azienda"
          name="azienda"
          className="form-input"
          autoComplete="organization"
          placeholder="Nome azienda o attività (opzionale per freelancer)"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          required
          autoComplete="email"
          placeholder="la-tua@email.it"
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefono" className="form-label">Telefono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          className="form-input"
          autoComplete="tel"
          placeholder="+39 ..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="obiettivo" className="form-label">Obiettivo principale *</label>
        <textarea
          id="obiettivo"
          name="obiettivo"
          className="form-textarea"
          required
          rows={4}
          placeholder="Descrivi brevemente cosa vuoi ottenere: un sito nuovo, un'automazione, un problema da risolvere..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="budget" className="form-label">Budget indicativo</label>
        <input
          type="text"
          id="budget"
          name="budget"
          className="form-input"
          placeholder="Es. 2.000–5.000 €, oppure 'da definire'"
        />
      </div>

      {status === 'error' && (
        <div style={{
          padding: '14px 18px',
          background: 'color-mix(in oklab, var(--neg) 12%, transparent)',
          border: '1px solid color-mix(in oklab, var(--neg) 30%, transparent)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--neg)',
          fontSize: 14,
          marginBottom: 24,
          lineHeight: 1.5,
        }}>
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'loading'}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {status === 'loading' ? 'Invio in corso...' : 'Invia messaggio'}
        {status !== 'loading' && (
          <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        )}
      </button>
    </form>
  );
}
