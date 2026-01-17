/*
Path: src/interface_adapters/gateway/HistogramApiGateway.ts
Gateway para obtener datos del histograma, con fallback a datos históricos
*/

import { API_ENDPOINTS } from '../../infrastructure/config'
import { historicalHistogramData } from '../../infrastructure/HistoricalHistogramData.ts'

export async function fetchHistogramData(): Promise<any> {
  try {
    const response = await fetch(API_ENDPOINTS.HISTOGRAM)
    if (!response.ok) throw new Error('Error al obtener datos del histograma')
    return await response.json()
  } catch (e) {
    // Fallback: retorna datos históricos si falla la conexión
    return historicalHistogramData
  }
}
