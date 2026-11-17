# Pitch · GUMU × Mummel

Präsentation der GUMU Werbeagentur für Mummel: Marketing- und Community-Strategie bis zum Verkaufsstart 2027.
Erstellt aus der GUMU-Pitch-Vorlage (Reveal.js 5 · Vite · TypeScript · Chart.js).

**Live:** https://stefangutermuth.github.io/pitch-mummel/

## Lokal starten

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # statischer Build nach dist/
```

## Deploy

`.github/workflows/deploy.yml` baut bei jedem Push auf `main` und veröffentlicht auf GitHub Pages.
Einmalig im Repo: **Settings → Pages → Source = „GitHub Actions"**.

## Hinweise

- Öffentliche Fassung: ohne vertrauliche Angaben aus Kundenunterlagen, `noindex` gesetzt.
- Charts: Content-Säulen (Donut) und Listengröße je Fundingziel (Balken) in `src/charts.ts`.
- Steuerung: → / ← blättern, ↑ / ↓ Kapitel, `O` Übersicht, `S` Speaker-View, `?` Hilfe.
- PDF: URL mit `?print-pdf` öffnen → Drucken → Als PDF, Querformat, Hintergrundgrafiken an.
