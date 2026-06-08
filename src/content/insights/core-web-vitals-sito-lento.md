---
title: "Core Web Vitals: perché il tuo sito lento ti costa clienti"
description: "Google ha reso le performance un fattore di ranking. Ma il problema vero è che un sito lento comunica inaffidabilità e fa perdere conversioni."
date: "2026-02-15"
readTime: "5 min"
category: "Performance Web"
categorySlug: "performance"
---

Apri un sito. La pagina ci mette tre secondi a caricare. Il testo salta mentre scorre un banner. Il bottone su cui stavi per cliccare si sposta all'improvviso. Chiudi il tab e vai altrove.

Questo scenario, che tutti abbiamo vissuto, è esattamente ciò che Google misura con i **Core Web Vitals**. E dal 2021 li usa come fattore di ranking. Ma il problema vero non è il ranking: è che un sito lento **comunica inaffidabilità** e fa perdere conversioni prima ancora che l'utente legga una parola.

## I tre numeri che contano

I Core Web Vitals sono tre metriche che misurano l'esperienza reale dell'utente.

**LCP (Largest Contentful Paint)** misura quanto tempo ci vuole perché l'elemento più grande della viewport diventi visibile. Google vuole meno di 2.5 secondi. In pratica: quanto velocemente il tuo utente vede qualcosa di significativo? Se il tuo hero image ci mette 4 secondi a comparire, hai già perso l'attenzione.

**INP (Interaction to Next Paint)** ha sostituito il vecchio FID nel 2024 e misura la reattività del sito alle interazioni. Quando un utente clicca un bottone, quanto tempo passa prima che il sito risponda visivamente? La soglia è 200 millisecondi. Oltre, il sito sembra "incollato", non reattivo.

**CLS (Cumulative Layout Shift)** misura la stabilità visiva. Quante volte gli elementi della pagina si spostano durante il caricamento? Quel banner che appare all'improvviso e ti fa cliccare sul link sbagliato? Quello è CLS. Google vuole un valore sotto 0.1.

## L'impatto sul business è concreto

Non parlo di teoria. I numeri sono documentati.

Amazon ha calcolato che **ogni 100 millisecondi** di latenza aggiuntiva costa l'1% delle vendite. Walmart ha visto che **ogni secondo** di miglioramento nel tempo di caricamento aumenta le conversioni del 2%. Google stessa ha dimostrato che il 53% degli utenti mobile abbandona un sito che ci mette più di 3 secondi a caricare.

Questi sono dati di colossi, ma il principio scala perfettamente. Se sei un freelancer con un portfolio online e la tua pagina ci mette 5 secondi a caricare, il potenziale cliente è già passato a un concorrente. Se hai un e-commerce di nicchia, ogni secondo di ritardo è fatturato che non vedrai mai.

Il sito lento non è solo un problema tecnico. È un problema di percezione: **la velocità comunica professionalità**. Un sito che carica istantaneamente dice "qui c'è qualcuno che sa quello che fa". Un sito lento dice il contrario.

## Le cause più comuni che trovo

Quando faccio un audit delle performance, i colpevoli sono quasi sempre gli stessi.

**Immagini non ottimizzate.** È il 2026, ma trovo ancora siti con immagini PNG da 3MB dove basterebbe un WebP da 80KB. Niente lazy loading, niente dimensioni responsive, niente compressione. È il singolo intervento con il ROI più alto: spesso basta ottimizzare le immagini per dimezzare il tempo di caricamento.

**Troppo JavaScript.** Plugin WordPress che caricano 15 script in pagina. Analytics, widget social, chat, slider, animazioni. Ogni script è una richiesta HTTP, ogni richiesta è tempo. Ho visto siti con 4MB di JavaScript dove ne servivano 200KB. Il browser deve scaricare, parsare ed eseguire tutto quel codice prima che la pagina diventi interattiva.

**Nessuna strategia di caching.** Il browser scarica le stesse risorse a ogni visita perché nessuno ha configurato gli header di cache. I font si ricaricano a ogni pagina. Le immagini non vengono servite da un CDN. Errori banali con soluzioni banali che nessuno implementa.

**Hosting inadeguato.** Un shared hosting da 3 euro al mese per un sito con 10.000 visite mensili. Il server risponde in 800ms prima ancora di iniziare a costruire la pagina. È come mettere un motore di un motorino in una macchina da corsa: non importa quanto ottimizzi il resto.

**Web font mal gestiti.** Font personalizzati caricati senza font-display: swap, senza preload, magari in formato WOFF invece che WOFF2. Il testo diventa invisibile per 2-3 secondi mentre il font si scarica. L'utente vede una pagina bianca e se ne va.

## Cosa faccio concretamente

Quando un cliente mi porta un sito con problemi di performance, seguo un processo sistematico.

**Prima misuro.** PageSpeed Insights, WebPageTest, Chrome DevTools. Raccolgo i Core Web Vitals reali (dati di campo, non solo quelli di laboratorio). Identifico i colli di bottiglia specifici, non quelli generici.

**Poi prioritizzo.** Non ha senso ottimizzare il CSS se il problema è un'immagine hero da 5MB. Lavoro per impatto: prima le cose che spostano di più l'ago, poi i dettagli.

**Interventi tipici** che mi trovo a fare: conversione immagini in formato moderno (WebP/AVIF) con dimensioni responsive, eliminazione del JavaScript non necessario, implementazione di lazy loading, configurazione corretta del caching e dei CDN, ottimizzazione dei web font, preconnect e preload delle risorse critiche, eventuale migrazione hosting.

**Infine misuro di nuovo.** Confronto i numeri prima e dopo. Documento il miglioramento. Perché se non misuri, non puoi dimostrare il valore dell'intervento.

## Un investimento, non un costo

Ottimizzare le performance del sito non è un esercizio tecnico fine a sé stesso. È un investimento con un ritorno misurabile: più conversioni, miglior posizionamento, migliore percezione del brand.

Se il tuo sito ci mette più di 3 secondi a caricare, stai perdendo clienti ogni giorno. Non domani, non in teoria: oggi, adesso, mentre leggi questo articolo.

La buona notizia è che spesso i miglioramenti più significativi arrivano dagli interventi più semplici. Non serve riscrivere tutto da zero: serve un'analisi seria e interventi mirati.
