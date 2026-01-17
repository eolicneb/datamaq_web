/*
Path: src/infrastructure/HighchartsAdapter.ts
Adaptador de infraestructura para Highcharts
*/
export const HighchartsAdapter = {
  createChart(container: HTMLDivElement | null, options: Record<string, unknown>) {
    const H = (window as any).Highcharts
    if (!H) {
      console.error("Highcharts no está cargado. Verificá el <script src='https://code.highcharts.com/highcharts.js'> en index.html.")
      return null
    }
    return H.chart(container!, options)
  },
  updateChart(chart: any, options: Record<string, unknown>) {
    if (chart && options) chart.update(options, true, true)
  },
  destroyChart(chart: any) {
    if (chart) chart.destroy()
  }
}
