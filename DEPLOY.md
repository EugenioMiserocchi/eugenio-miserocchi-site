# Deploy Guide — eugeniomiserocchi.it

## 1. Font Satoshi — Self-hosting (da fare prima del deploy)

Il font Satoshi (usato per il body text) non è disponibile su npm/Fontsource.
Va scaricato manualmente e aggiunto al progetto.

### Passaggi:

1. Vai su https://www.fontshare.com/fonts/satoshi
2. Scarica il font (formato WOFF2)
3. Crea la cartella `public/fonts/`
4. Copia i file WOFF2 dentro `public/fonts/`:
   - `Satoshi-Regular.woff2`
   - `Satoshi-Medium.woff2`
   - `Satoshi-Bold.woff2`

5. Aggiungi queste regole @font-face all'inizio di `src/styles/global.css`
   (dopo gli import di Fontsource, prima di `@tailwind base`):

```css
@font-face {
  font-family: "Satoshi";
  src: url("/fonts/Satoshi-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Satoshi";
  src: url("/fonts/Satoshi-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Satoshi";
  src: url("/fonts/Satoshi-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

> Fino a quando non aggiungi il font, il sito userà il fallback di sistema
> (ui-sans-serif, system-ui) che è comunque molto leggibile.

---

## 2. Foto / Immagini

Le immagini placeholder nel sito (portrait, servizi, hero) vanno sostituite
con le tue foto reali. I tag `imgholder-tag` indicano il nome suggerito per
ogni immagine. Metti le immagini in `public/img/` e aggiorna i riferimenti
nei file .astro corrispondenti.

---

## 3. Build

```bash
cd agency/clients/eugenio-miserocchi/site
npm run build
```

L'output finisce in `dist/`. Questa è la cartella da caricare su Hostinger.

---

## 4. Deploy su Hostinger

### Opzione A: File Manager

1. Accedi al pannello Hostinger → File Manager
2. Vai nella cartella `public_html` del dominio eugeniomiserocchi.it
3. Cancella il contenuto esistente (backup prima se vuoi)
4. Carica tutto il contenuto della cartella `dist/`
5. Assicurati che `.htaccess` sia presente nella root

### Opzione B: FTP/SFTP

1. Usa un client FTP (FileZilla, Cyberduck)
2. Connettiti con le credenziali Hostinger
3. Carica il contenuto di `dist/` in `public_html/`

### Verifica post-deploy

- [ ] Homepage carica correttamente
- [ ] Dark/light mode funziona
- [ ] Tweaks panel si apre e cambia i colori
- [ ] Form contatto invia correttamente (controlla Make.com)
- [ ] Tutti i link interni funzionano
- [ ] /case-studies fa redirect 301 a /casi-studio
- [ ] Pagina 404 personalizzata appare su URL inesistenti
- [ ] HTTPS attivo e funzionante

---

## 5. Google Search Console

1. Vai su https://search.google.com/search-console
2. Aggiungi proprietà → Inserisci `https://eugeniomiserocchi.it`
3. Verifica la proprietà:
   - **Metodo consigliato:** record DNS TXT (da Hostinger → DNS Zone Editor)
   - Oppure: scarica il file HTML di verifica e mettilo in `public/` → rebuild → redeploy
4. Dopo la verifica:
   - Vai su Sitemap → Inserisci `sitemap-index.xml` → Invia
   - Vai su Indicizzazione → Pagine → Verifica che tutte le pagine vengano trovate
   - Richiedi indicizzazione per le pagine principali

---

## 6. Google Analytics 4

1. Vai su https://analytics.google.com
2. Crea un account/proprietà per eugeniomiserocchi.it
3. Ottieni il tag di misurazione (G-XXXXXXXXXX)
4. Aggiungi lo script nel `<head>` di `BaseLayout.astro`:

```html
<!-- Google Analytics -->
<script is:inline async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

5. Rebuild e redeploy

---

## 7. Schema.org — Verifica

Dopo il deploy, verifica i dati strutturati:

1. Vai su https://search.google.com/test/rich-results
2. Testa ogni pagina principale:
   - Homepage → LocalBusiness
   - /servizi → WebPage
   - /chi-sono → Person
   - /casi-studio → CollectionPage
   - /contatti → ContactPage
   - /insights/[slug] → Article

---

## 8. Checklist finale

- [ ] Satoshi font aggiunto
- [ ] Foto reali sostituite ai placeholder
- [ ] Build senza errori
- [ ] Deploy su Hostinger completato
- [ ] HTTPS attivo
- [ ] Google Search Console configurato
- [ ] Sitemap inviata
- [ ] Google Analytics installato
- [ ] Schema.org validato
- [ ] Form contatto testato end-to-end
- [ ] Lighthouse: Performance 95+, Accessibility 95+, SEO 100
- [ ] Redirect 301 da /case-studies funzionante
