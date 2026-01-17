/*
Path: src/use_cases/GetHistogramData.ts
Caso de uso para obtener los datos del histograma
*/

import { fetchHistogramData } from '../interface_adapters/gateway/HistogramApiGateway.ts'
import type { Histogram } from '../entities/Histogram'

export async function getHistogramData(): Promise<Histogram> {
  const raw = await fetchHistogramData()
  // Adaptar los datos crudos a la entidad Histogram
  const histogram: Histogram = {
    meta: {
      title: raw?.meta?.title ?? '',
      date: raw?.meta?.date ?? '',
      ...raw?.meta
    },
    bins: Array.isArray(raw?.bins)
      ? raw.bins.map((b: any) => ({
          label: b.label ?? '',
          value: typeof b.value === 'number' ? b.value : 0,
          ...b
        }))
      : [],
    features: Array.isArray(raw?.features)
      ? raw.features.map((f: any) => ({
          key: f.key ?? '',
          value: f.value ?? ''
        }))
      : [],
    producto: raw?.producto ?? ''
  }
  return histogram
}
