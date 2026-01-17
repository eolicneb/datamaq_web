/*
Datos históricos reales para fallback en el dashboard
Ubicación: src/infrastructure/HistoricalDashboardData.ts
*/

export const historicalDashboardData = {
  meta: {
    schema_version: "1.2",
    periodo: "semana",
    inicio: "2024-02-01T00:00:00Z",
    fin: "2024-02-08T00:00:00Z",
    timezone: "America/Argentina/Buenos_Aires"
  },
  series: [
    { t: "2024-02-01T12:05:00Z", hr_counter1: 120, hr_counter2: 110 },
    { t: "2024-02-02T12:00:00Z", hr_counter1: 130, hr_counter2: 115 },
    { t: "2024-02-03T12:00:00Z", hr_counter1: 125, hr_counter2: 120 },
    { t: "2024-02-04T12:00:00Z", hr_counter1: 140, hr_counter2: 130 },
    { t: "2024-02-05T12:00:00Z", hr_counter1: 135, hr_counter2: 125 }
    // ...más datos históricos reales
  ],
  features: {
    velocidad_ultima_bpm: 125
  },
  producto: {
    formato: { width_mm: 120, gusset_mm: 80, height_mm: 260 },
    web_width_mm: 125.0
  }
}
