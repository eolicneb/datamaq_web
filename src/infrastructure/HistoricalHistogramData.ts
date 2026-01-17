/*
Path: src/infrastructure/HistoricalHistogramData.ts
Datos históricos de ejemplo para el histograma (fallback local)
*/

export const historicalHistogramData = {
  meta: {
    title: 'Histograma de Producción (Histórico)',
    date: '2025-09-01',
    fuente: 'local'
  },
  bins: [
    { label: '0', value: 43665 },
    { label: '1-5', value: 550 },
    { label: '5-11', value: 165 },
    { label: '10-15', value: 70 },
    { label: '15-20', value: 60 },
    { label: '20-25', value: 95 },
    { label: '25-30', value: 75 },
    { label: '30-35', value: 55 },
    { label: '35-40', value: 60 },
    { label: '40-45', value: 5 },
    { label: '50-55', value: 5 }
  ],
  features: [
    { key: 'máquina', value: 'A1' },
    { key: 'turno', value: 'Noche' }
  ],
  producto: 'Producto X'
}
