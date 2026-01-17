/*
Path: src/interface_adapters/presenter/ChartPresenter.ts
*/

// Mapea el turno a los índices de inicio y fin (inclusive) en el array de 288 valores
function getTurnoRange(turno: string): [number, number] {
  switch (turno) {
    case 'central': // 08:00 a 16:00
      return [96, 191]   // 08:00 = 96*5min, 16:00 = 192*5min (pero fin es 191)
    case 'manana': // 06:00 a 14:00
      return [72, 167]
    case 'tarde': // 14:00 a 22:00
      return [168, 263]
    case 'dia': // 06:00 a 22:00
      return [72, 263]
    case 'completo': // 00:00 a 24:00
    default:
      return [0, 287]
  }
}

/**
 * Transforma los datos crudos del dashboard en opciones para Highcharts
 * - Solo muestra el rango de datos del turno seleccionado
 */
export function formatChartOptions(raw: any, turno: string = 'central'): Record<string, unknown> {
  try {
    const [start, end] = getTurnoRange(turno)
    // Generar categorías de 5 minutos solo para el rango del turno
    const categories = Array.from({ length: end - start + 1 }, (_, i) => {
      const idx = start + i
      const h = Math.floor(idx / 12).toString().padStart(2, '0')
      const m = ((idx % 12) * 5).toString().padStart(2, '0')
      return `${h}:${m}`
    })

    // Helper para obtener serie por nombre y normalizar a 288 valores
    function getSeriesData(name: 'hoy' | 'ayer' | 'semana_anterior'): number[] {
      const serie = raw?.series?.[name]
      const data = Array(288).fill(null)
      if (serie && Array.isArray(serie.data)) {
        for (let i = 0; i < Math.min(serie.data.length, 288); i++) {
          data[i] = serie.data[i]
        }
      }
      // Recorta solo el rango del turno
      return data.slice(start, end + 1)
    }

    // Definir las tres series con colores y etiquetas
    const series = [
      {
        type: 'line',
        name: 'Hoy',
        color: '#d32f2f', // rojo
        data: getSeriesData('hoy'),
        dashStyle: 'Solid',
        marker: { enabled: true, symbol: 'circle', fillColor: '#d32f2f' }
      },
      {
        type: 'line',
        name: 'Ayer',
        color: '#81c784', // verde claro
        data: getSeriesData('ayer'),
        dashStyle: 'ShortDash',
        marker: { enabled: true, symbol: 'circle', fillColor: '#81c784' }
      },
      {
        type: 'line',
        name: 'Semana anterior',
        color: '#283593', // azul marino
        data: getSeriesData('semana_anterior'),
        dashStyle: 'Dot',
        marker: { enabled: true, symbol: 'circle', fillColor: '#283593' }
      }
    ]

    return {
      chart: { type: 'line' },
      title: { text: 'Producción cada 5 minutos' },
      xAxis: {
        categories,
        title: { text: 'Hora' }
      },
      yAxis: {
        title: { text: 'Unidades producidas' }
      },
      series,
      credits: { enabled: false },
      accessibility: { enabled: false }
    }
  } catch (err) {
    console.error('Error al formatear opciones del gráfico:', err)
    // Devolver opciones por defecto para evitar romper la UI
    return {
      chart: { type: 'line' },
      title: { text: 'No hay datos disponibles' },
      series: []
    }
  }
}
