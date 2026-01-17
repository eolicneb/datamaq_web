/*
Path: src/entities/Chart.ts
Modelo de dominio para los datos de gráficos
*/

export interface ChartAxis {
  title: string
  categories?: string[]
}

export interface ChartSeries {
  name: string
  data: number[]
  type?: string
}

export interface ChartOptions {
  chartType: string
  title: string
  xAxis: ChartAxis
  yAxis: ChartAxis
  series: ChartSeries[]
  [key: string]: unknown
}

export interface Chart {
  options: ChartOptions
}
