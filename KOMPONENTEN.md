# Komponenten-Referenz

Copy-Paste-Markup für alle Bausteine des Decks. Alle Klassen sind in `src/theme.css` definiert.
Live-Ansicht: Kapitel „⚙ Komponenten" im Deck (vor Versand löschen).

---

## Grundgerüst

```html
<!-- Kapitel (eigene Pille in der Leiste) -->
<section data-title="Kapitelname">
  <h2>Überschrift</h2>
</section>

<!-- Kapitel mit Unterfolien -->
<section data-title="Kapitelname">
  <section><h2>Folie 1</h2></section>
  <section><h2>Folie 2</h2></section>
</section>

<!-- Dunkle Folie (löst Dark-Theme aus — genau dieser Hex-Wert) -->
<section data-background-color="#161a2c"> … </section>

<!-- Einblendung / Animation -->
<div class="fragment">erscheint auf Tastendruck</div>
<div class="fragment fade-up">…</div>
<div class="fragment fade-right">…</div>

<!-- Speaker-Notes (Taste S) -->
<aside class="notes">Sprechtext …</aside>
```

Standard-Bausteine je Folie: `<span class="eyebrow">Kapitel · Label</span>`, `<h2>`,
`<p class="muted">`, `<p class="muted micro">` (Fußnote), `.accent` / `.primary` für farbige Wörter.

## Layout

```html
<div class="two-col" style="grid-template-columns: 1fr 1fr; gap: 32px; align-items: start;">
  <div>…links…</div>
  <div>…rechts…</div>
</div>
```

## Karten · KPIs · Hinweise · Listen

```html
<div class="card-grid cols-3">  <!-- oder cols-4 -->
  <div class="card fragment"><div class="icon">●</div><h3>Titel</h3><p>Text.</p></div>
</div>

<div class="kpi-row">
  <div class="kpi"><div class="value">123</div><div class="label">Kennzahl</div></div>
</div>

<div class="note-box"><strong>Hinweis:</strong> betonte Kernaussage.</div>

<ul class="checklist"><li>Häkchen-Punkt</li></ul>

<div class="keywords"><span class="pill">Stichwort</span></div>
```

## Vergleich (gegenüberstellung)

```html
<div class="compare">
  <div class="you"><h3>Variante A</h3><ul><li>Vorteil</li></ul></div>
  <div class="them"><h3>Variante B</h3><ul><li>Nachteil</li></ul></div>
</div>
```

## Funnel (Trichter)

```html
<div class="funnel-viz">
  <div class="funnel-row fragment fade-right" style="--w: 100%;">
    <div class="bar"><span class="num">1</span><span class="label">Stufe</span></div>
    <div class="value"><strong>1.000</strong><span>Einheit</span></div>
  </div>
  <div class="funnel-drop fragment">Quote ≈ 30 %</div>
  <div class="funnel-row fragment fade-right highlight" style="--w: 60%;">…</div>
  <!-- weitere Zeilen: highlight / success für Betonung -->
</div>
```

## ROI- / Rechen-Flow

```html
<div class="roi-flow">
  <div class="roi-step fragment fade-up"><div class="roi-value">A</div><div class="roi-label">Start</div></div>
  <div class="roi-arrow fragment">→</div>  <!-- oder + / − / = -->
  <div class="roi-step accent fragment fade-up"><div class="roi-value">B</div><div class="roi-label">Schritt</div></div>
  <div class="roi-arrow fragment">=</div>
  <div class="roi-step success fragment fade-up"><div class="roi-value">C</div><div class="roi-label">Ergebnis</div></div>
</div>
<div class="roi-math fragment">
  <div class="roi-math-line"><span class="roi-math-label">Label</span><span class="roi-math-eq">Formel = <strong>Wert</strong></span></div>
</div>
```

## Matrix (Bridge)

```html
<div class="bridge">
  <div class="bridge-head"><div></div><div class="bh">Spalte 1</div><div class="bh">Spalte 2</div></div>
  <div class="bridge-row">
    <div class="rh"><span class="dot google"></span>Zeile</div>
    <div class="cell on strong"></div><div class="cell on"></div>
  </div>
</div>
```
Zellen: `.cell` (leer), `.cell.on` (hell), `.cell.on.strong` (voll). Punkt-Farben: `dot google/meta/retarget/product/you`.

## Zeitplan (Gantt)

```html
<div class="gantt">
  <div class="gantt-head"><div class="gantt-label"></div>
    <div class="gantt-weeks"><span>1</span><span>2</span><span>3</span><span>4</span></div></div>
  <div class="gantt-row fragment fade-up">
    <div class="gantt-label"><strong>Phase</strong><span>Beschreibung</span></div>
    <div class="gantt-track">
      <div class="gantt-bar setup" style="--start:0; --span:2;">Label</div>
      <div class="gantt-milestone" style="--at:2;" title="Meilenstein"></div>
    </div>
  </div>
</div>
```
Balken-Farbklassen: `setup` · `testing` · `scale` · `review` · `wrap`. `--start`/`--span` = Spalten-Index/Breite.

## Phone-Mockup (Multi-Step / Konfigurator / Rechner)

```html
<div class="phone-stage">
  <div class="phone-mockup phone-step-1">
    <div class="phone-screen">
      <div class="ps-topbar"><span class="ps-signal">●●●</span><span class="ps-time">9:41</span><span class="ps-battery"></span></div>
      <div class="ps-brand"><span class="ps-logo">●</span><span class="ps-brand-name">Marke</span></div>
      <div class="ps-progress"><div class="ps-progress-bar" style="width:50%;"></div><div class="ps-progress-text">Schritt 2 von 4</div></div>
      <h4 class="ps-question">Frage?</h4>
      <div class="ps-options">
        <div class="ps-option active">Option<span class="ps-check">✓</span></div>
        <div class="ps-option">Option</div>
      </div>
      <button class="ps-cta-btn">Weiter →</button>
    </div>
  </div>
  <!-- Zweiter Screen für Ergebnis: .phone-mockup.phone-step-2 mit .ps-result-hero / .ps-trust -->
</div>
```

## Diverses

```html
<!-- Großes Statement (meist auf dunkler Folie) -->
<h2 class="hero-statement wide">Aussage mit <span class="accent">Betonung</span>.</h2>

<!-- Countdown / Label-Karte -->
<div class="countdown-card"><div class="cd-label">Label</div><div class="cd-date">Datum</div></div>

<!-- Badges -->
<div class="partner-badges"><span class="partner-badge"><span class="dot"></span>Badge</span></div>

<!-- Datenschutz-/Feature-Pills -->
<div class="privacy-row">
  <div class="privacy-pill"><span class="privacy-icon">✓</span><div><strong>Titel</strong><span>Text.</span></div></div>
</div>

<!-- Wortmarke als Logo-Platzhalter (Titelfolie) -->
<span class="logo logo-wuw wordmark">Kundenname</span>
```

## Charts (Chart.js)

Canvas ins HTML, Daten in `src/charts.ts`:

```html
<div class="chart-wrap donut"><canvas id="chart-budget"></canvas></div>   <!-- Donut  -->
<div class="chart-wrap bars"><canvas id="chart-results"></canvas></div>   <!-- Balken -->
<div class="chart-wrap trends"><canvas id="chart-trends"></canvas></div>  <!-- Linie (dunkle Folie) -->
```

In `src/charts.ts` die Labels/Daten der jeweiligen `init…()`-Funktion anpassen (mit `← anpassen` markiert).
Die Donut-Summe wird automatisch berechnet.
