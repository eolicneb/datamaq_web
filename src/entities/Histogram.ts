/*
Path: src/entities/Histogram.ts
Modelo de dominio para los datos del histograma
*/

export interface HistogramMeta {
  title: string
  date: string
  [key: string]: unknown
}

export interface HistogramBin {
  label: string
  value: number
  [key: string]: unknown
}

export interface HistogramFeature {
  key: string
  value: string | number
}

export interface Histogram {
  meta: HistogramMeta
  bins: HistogramBin[]
  features?: HistogramFeature[]
  producto?: string
}
