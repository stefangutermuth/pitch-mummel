// Chart-Definitionen (Chart.js). Drei Charts, per Canvas-ID angebunden:
//   #chart-budget  → Donut  (initBudgetDonut)   — z. B. Kosten-/Budget-Aufteilung
//   #chart-results → Balken (initResultsChart)  — z. B. Kennzahlen / Volumina
//   #chart-trends  → Linie  (initTrendsChart)   — z. B. Verlauf über Zeit
// VORLAGE: Labels/Daten unten anpassen. Charts aktivieren sich beim Folienwechsel.

import {
  Chart,
  DoughnutController,
  ArcElement,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Filler,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

Chart.register(
  DoughnutController, ArcElement,
  BarController, BarElement,
  LineController, LineElement, PointElement, Filler,
  CategoryScale, LinearScale,
  Tooltip, Legend, Title
);

// GUMU Brand Tokens — gespiegelt aus theme.css
const COLORS = {
  primary:   '#5cb8b5', // brand teal
  primaryDk: '#2f7d7a', // brand-deep
  accent:    '#22c55e', // LED green
  accentDk:  '#15803d',
  ink:       '#161a2c', // night
  inkSoft:   '#565d75',
  muted:     '#9aa0b2', // ink-mute
  bgSoft:    '#f0ece2', // stone
  border:    '#e3ddd0'  // line
};

const baseFont = {
  family: "'Rubik', ui-sans-serif, system-ui, sans-serif",
  size: 14,
  weight: 600 as const
};

Chart.defaults.font = baseFont as any;
Chart.defaults.color = COLORS.ink;

const charts = new Map<string, Chart>();

// Donut — z. B. Kosten-/Budget-Aufteilung. VORLAGE: Labels & Daten anpassen.
// Die Summe wird automatisch aus den Daten berechnet (keine Konstante pflegen).
function initBudgetDonut() {
  const el = document.getElementById('chart-budget') as HTMLCanvasElement | null;
  if (!el || charts.has('budget')) return;

  const data = [40, 25, 20, 15];                        // Anteil Content-Säulen in %
  const labels = ['Mummel entsteht', 'Extrem normal', 'Deine Geschichte', 'Machen & Gestalten'];
  const total = data.reduce((a, b) => a + b, 0);

  const chart = new Chart(el, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [COLORS.primary, COLORS.primaryDk, COLORS.muted, COLORS.accent],
        borderColor: '#fff',
        borderWidth: 3,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      animation: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { padding: 14, boxWidth: 14, boxHeight: 14, usePointStyle: true }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed as number;
              const pct = Math.round((v / total) * 100);
              return ` ${ctx.label}: ${pct} %`;
            }
          }
        }
      }
    }
  });
  charts.set('budget', chart);
}

// Balken-Chart — z. B. Kennzahlen / Volumina im Vergleich. VORLAGE: anpassen.
function initResultsChart() {
  const el = document.getElementById('chart-results') as HTMLCanvasElement | null;
  if (!el || charts.has('results')) return;

  const chart = new Chart(el, {
    type: 'bar',
    data: {
      labels: ['Einzelbild', 'Karussell', 'Reel'],
      datasets: [
        {
          label: 'Ø Reichweite pro Beitrag',
          data: [4779, 11573, 14919], // Metricool Instagram-Studie 2026
          backgroundColor: [COLORS.muted, COLORS.primary, COLORS.primaryDk],
          borderRadius: 8,
          barThickness: 30
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      animation: false,
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: COLORS.border },
          ticks: { color: COLORS.muted }
        },
        y: {
          grid: { display: false },
          ticks: { color: COLORS.ink, font: { ...baseFont, weight: 700 } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => ` ${c.parsed.x.toLocaleString('de-DE')}`
          }
        }
      }
    }
  });
  charts.set('results', chart);
}

// Linien-Chart (dunkle Folie geeignet) — z. B. Verlauf über die Zeit, zwei Reihen.
// VORLAGE: Labels & Reihen anpassen.
function initTrendsChart() {
  const el = document.getElementById('chart-trends') as HTMLCanvasElement | null;
  if (!el || charts.has('trends')) return;

  const labels = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  const naturpool    = [9, 10, 15, 18, 22, 33, 40, 27, 14, 10, 9, 9]; // ← Reihe 1 anpassen
  const schwimmteich = [5, 6, 9, 12, 18, 27, 22, 18, 9, 5, 4, 4];     // ← Reihe 2 anpassen

  const ctx = el.getContext('2d');
  let fillNp: any = 'rgba(34,197,94,0.12)';
  if (ctx) {
    const g = ctx.createLinearGradient(0, 0, 0, 220);
    g.addColorStop(0, 'rgba(34,197,94,0.30)');
    g.addColorStop(1, 'rgba(34,197,94,0.02)');
    fillNp = g;
  }

  const chart = new Chart(el, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Reihe A',
          data: naturpool,
          borderColor: COLORS.accent,
          backgroundColor: fillNp,
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: (() => { const m = Math.max(...naturpool); return naturpool.map((v) => (v >= m ? 5 : 0)); })(),
          pointBackgroundColor: COLORS.accent,
          pointBorderColor: '#161a2c',
          pointBorderWidth: 2
        },
        {
          label: 'Reihe B',
          data: schwimmteich,
          borderColor: COLORS.primary,
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { color: 'rgba(255,255,255,0.7)', usePointStyle: true, boxWidth: 10, font: { ...baseFont, size: 11 } }
        },
        tooltip: {
          callbacks: { label: (c) => ` ${c.dataset.label}: ${c.parsed.y.toLocaleString('de-DE')}` }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: 'rgba(255,255,255,0.55)',
            font: { ...baseFont, size: 11 },
            autoSkip: false,
            maxRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.08)' },
          ticks: {
            color: 'rgba(255,255,255,0.45)',
            font: { ...baseFont, size: 10 }
          }
        }
      }
    }
  });
  charts.set('trends', chart);
}

export function activateChartsForSlide(slide: Element | null) {
  if (!slide) return;
  if (slide.querySelector('#chart-budget')) initBudgetDonut();
  if (slide.querySelector('#chart-results')) initResultsChart();
  if (slide.querySelector('#chart-trends')) initTrendsChart();
}

// Re-animiert die Charts auf der gerade aktiven Folie.
// Trick: `chart.reset()` setzt den Anim-Zustand zurück, `chart.update()` spielt erneut.
export function resetChartsForSlide(slide: Element | null) {
  if (!slide) return;
  if (slide.querySelector('#chart-budget')) {
    const c = charts.get('budget');
    if (c) { c.reset(); c.update(); }
  }
  if (slide.querySelector('#chart-results')) {
    const c = charts.get('results');
    if (c) { c.reset(); c.update(); }
  }
  if (slide.querySelector('#chart-trends')) {
    const c = charts.get('trends');
    if (c) { c.reset(); c.update(); }
  }
}
