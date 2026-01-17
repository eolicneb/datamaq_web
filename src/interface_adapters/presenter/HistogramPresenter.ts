/*
Path: src/interface_adapters/presenter/HistogramPresenter.ts
Presentador para adaptar los datos del histograma al formato requerido por el componente de gráfico
*/

import type { Histogram } from '../../entities/Histogram'

export function presentHistogram(histogram: Histogram) {
  return {
    chart: {
      type: 'line',
      backgroundColor: '#fff'
    },
    title: {
      text: histogram.meta.title || 'Histograma'
    },
    xAxis: {
      categories: histogram.bins.map(bin => bin.label),
      title: { text: 'Bolsas por minuto' }
    },
    yAxis: {
      min: 1,
      type: 'logarithmic', // Escala logarítmica base 10
      title: { text: 'Tiempo (min, escala log₁₀)' },
      labels: {
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string | number {
          // Muestra valores legibles para minutos, horas, días
          if (this.value === 1) return '1 min'
          if (this.value === 60) return '1 h'
          if (this.value === 1440) return '1 día'
          return this.value
        }
      }
    },
    series: [
      {
        name: histogram.meta.title || 'Histograma',
        data: histogram.bins.map(bin => bin.value)
      }
    ]
  }
}
