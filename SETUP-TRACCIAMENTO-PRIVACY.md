# Setup Tracciamento & Privacy eugeniomiserocchi.it

Guida operativa per attivare lo stack installato nel codice. Il sito è già
predisposto: serve solo creare gli account, recuperare gli ID e incollarli in
`.env`. Finché `.env` è vuoto, **niente viene caricato** (nessun tracker, nessun
banner) e il sito funziona normalmente.

> Architettura: **Cookiebot** (banner + consenso) → **Google Consent Mode v2**
> (default `denied`) → **GTM** (contenitore) → dentro GTM vivono **GA4** e
> **Microsoft Clarity**. Nessun tag analytics parte prima del consenso.

---

## 1. Variabili d'ambiente

1. Copia `.env.example` in `.env` (stessa cartella `site/`).
2. Compila i due valori (istruzioni sotto per ottenerli):

```
PUBLIC_GTM_ID=GTM-K9FHG48X
PUBLIC_COOKIEBOT_CBID=04dddb6e-bc51-4984-804a-7eb3409ec76b
```

> Già compilato nel file `.env`. GA4 (`G-8XTQ04SZPQ`) e Clarity (`x6cs6oloxt`)
> NON vanno in `.env` né nel sito: si configurano come tag dentro GTM (sotto).

`.env` è già in `.gitignore`: gli ID non finiscono nel repo. Dopo ogni modifica a
`.env` serve un nuovo `npm run build` + redeploy.

---

## 2. Google Tag Manager (il contenitore)

1. Vai su <https://tagmanager.google.com> → crea Account + Container di tipo **Web**.
2. Copia l'ID `GTM-XXXXXXX` → mettilo in `PUBLIC_GTM_ID`.
3. Lo snippet GTM è **già nel sito** (`Analytics.astro`): non incollare il codice
   GTM a mano da nessuna parte.

---

## 3. Google Analytics 4 (dentro GTM)

1. Crea una proprietà GA4 su <https://analytics.google.com> → ottieni il
   Measurement ID `G-XXXXXXXXXX`.
2. In GTM crea un tag **"Google Tag" / GA4 Configuration** con quel `G-...`,
   trigger **All Pages**.
3. In *Tag → Consent Settings* lascia il comportamento di default (GA4 rispetta
   automaticamente `analytics_storage` del Consent Mode).
4. Collega GA4 ↔ Search Console (già verificata) da GA4 → Admin → Product Links.

### Eventi/conversioni consigliati (in GTM)

- **Invio form** trigger su click del bottone "Invia messaggio" o, meglio, evento
  custom dopo il successo. (Possiamo aggiungere un `dataLayer.push` nel form se
  vuoi tracciarlo in modo affidabile.)
- **Click email / telefono** trigger su link `mailto:` e `tel:`.

---

## 4. Microsoft Clarity (dentro GTM)

1. Crea un progetto su <https://clarity.microsoft.com> → ottieni il **Project ID**.
2. In GTM aggiungi il tag template **"Microsoft Clarity"** (dalla Community
   Template Gallery) con il Project ID, trigger **All Pages**.
3. In *Consent Settings* del tag richiedi `analytics_storage` (così parte solo
   dopo consenso statistico).

---

## 5. Cookiebot (banner + consenso)

1. Registrati su <https://www.cookiebot.com> (piano **Free**, fino a 50 sottopagine
   un solo dominio).
2. Aggiungi il dominio `eugeniomiserocchi.it` e avvia la scansione.
3. Copia il **CBID** (Settings → Your Cookiebot scripts) → mettilo in
   `PUBLIC_COOKIEBOT_CBID`.
4. Lo script Cookiebot e la traduzione del consenso in Consent Mode sono **già nel
   sito** (`Analytics.astro`): non incollare script Cookiebot altrove.
5. In Cookiebot → *Settings*: attiva **GDPR/CCPA** e lascia che gestisca i banner;
   la dichiarazione cookie compare in automatico su `/cookie`.

> Nota: usiamo `data-blockingmode="manual"` perché il blocco preventivo è gestito
> dal Consent Mode v2 + dai Consent Settings dei tag in GTM. Non cambiare in
> `auto`, altrimenti Cookiebot bloccherebbe lo stesso GTM e i segnali di consenso
> non partirebbero.

---

## 6. Ordine di go-live

1. Crea GTM, GA4, Clarity, Cookiebot e configura i tag come sopra.
2. Compila `.env`.
3. `npm run build` → redeploy su Hostinger (carica il contenuto di `dist/`).
4. Verifica:
   - il banner Cookiebot compare al primo accesso;
   - con **Tag Assistant** (GTM Preview) GA4/Clarity partono **solo dopo** consenso;
   - su `/cookie` appare la tabella dei cookie;
   - i link Privacy/Cookie nel footer funzionano.

---

## 7. Pagine legali — da completare

- `/privacy` e `/cookie` sono **bozze tecniche** tarate sugli strumenti reali
  (Hostinger, Make, Google, Microsoft, Cybot). Da rivedere prima della
  pubblicazione:
  - in `src/pages/privacy.astro` compila i campi tra `[ ]` (indirizzo completo,
    mesi di conservazione);
  - fai validare il testo a un consulente: non è un parere legale.
- Il form (`ContactForm.tsx`) ora richiede la **spunta di consenso privacy**
  obbligatoria con link a `/privacy`.

---

## Note che superano il vecchio DEPLOY.md

- La sezione 6 del `DEPLOY.md` ("aggiungi GA4 a mano nel BaseLayout") è
  **superata**: GA4 ora passa da GTM con Consent Mode. Non incollare lo snippet
  `gtag.js` nel layout.
- Il form **non** usa più Netlify (file morto rimosso): gira su webhook Make.com
  (regione EU), dichiarato nella privacy come responsabile del trattamento.
