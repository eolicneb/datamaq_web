/*
Path: src/interface_adapters/controller/DashboardController.ts
*/


import { ref, watch } from 'vue'
import { getDashboardData } from '../../use_cases/GetDashboardData'
import { formatChartOptions } from '../presenter/ChartPresenter'
import type { DashboardQueryParams } from '../../entities/DashboardQueryParams'

// El presentador ahora se encarga de transformar los datos en opciones para el gráfico

export function useDashboardController(initialParams?: Partial<DashboardQueryParams>) {
  const dashboard = ref<any>(null)
  const chartOptions = ref<Record<string, unknown> | null>(null)
  const loading = ref(false)
  const error = ref<unknown>(null)

  // Estado reactivo para los parámetros
  const params = ref<DashboardQueryParams>({
    fecha: initialParams?.fecha || new Date().toISOString().slice(0, 10),
    turno: initialParams?.turno || 'central'
  })

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const data = await getDashboardData(params.value)
      dashboard.value = data
      // Pasa el turno a formatChartOptions
      chartOptions.value = formatChartOptions(data, params.value.turno)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // Refrescar datos cuando cambian los parámetros
  watch(params, fetchData, { immediate: true, deep: true })

  // Método para actualizar los parámetros desde la UI
  function updateParams(newParams: Partial<DashboardQueryParams>) {
    params.value = { ...params.value, ...newParams }
  }

  return { dashboard, chartOptions, loading, error, params, updateParams }
}
