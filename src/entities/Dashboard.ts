/*
Path: src/entities/Dashboard.ts
Modelo de dominio para los datos del dashboard
*/

export interface DashboardMeta {
  title: string
  date: string
  [key: string]: unknown
}


/**
 * DashboardSeries representa una serie temporal de producción.
 * Ahora se espera que el array 'data' contenga 288 valores (uno por cada intervalo de 5 minutos en 24 horas).
 */
export interface DashboardSeries {
  name: 'hoy' | 'ayer' | 'semana_anterior'
  /**
   * Array de 288 valores: cada elemento representa la producción en un intervalo de 5 minutos.
   * Ejemplo: data[0] = 00:00, data[1] = 00:05, ..., data[287] = 23:55
   */
  data: number[]
  [key: string]: unknown
}

export interface DashboardFeature {
  key: string
  value: string | number
}



export interface DashboardSeriesMap {
  hoy: DashboardSeries
  ayer: DashboardSeries
  semana_anterior: DashboardSeries
}

export interface Dashboard {
  meta: DashboardMeta
  series: DashboardSeriesMap
  features?: DashboardFeature[]
  producto?: string
  velocidad?: number | string
  formato?: string
  anchoBobina?: number | string
}
