/*
Path: src/interface_adapters/controller/HistogramController.ts
Composición para manejar el estado y lógica del histograma
*/

import { ref, onMounted } from 'vue'
import { getHistogramData } from '../../use_cases/GetHistogramData'
import type { Histogram } from '../../entities/Histogram'

export function useHistogramController() {
  const histogram = ref<Histogram | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      histogram.value = await getHistogramData()
    } catch (e: any) {
      error.value = e?.message || 'Error al cargar histograma'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)

  return {
    histogram,
    loading,
    error,
    fetchData
  }
}
