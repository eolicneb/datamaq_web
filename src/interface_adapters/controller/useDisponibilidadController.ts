/*
Path: src/interface_adapters/controller/useDisponibilidadController.ts
Composable/controller para manejar el estado, la carga y los errores de disponibilidad.
*/


import { ref, onMounted } from "vue"
import { GetDisponibilidadData } from "../../use_cases/GetDisponibilidadData"
import { presentDisponibilidadDonut, presentRazonesStacked } from "../presenter/DisponibilidadPresenter"
import type { Disponibilidad } from "../../entities/Disponibilidad"

export function useDisponibilidadController(params?: { from?: string; to?: string }) {
  const disponibilidad = ref<Disponibilidad | undefined>(undefined)
  const chartDonut = ref<any | undefined>(undefined)
  const chartRazones = ref<any | undefined>(undefined)
  const loading = ref(true)
  const error = ref<string | undefined>(undefined)

  async function fetchData() {
    loading.value = true
    error.value = undefined
    try {
      const data = await GetDisponibilidadData(params)
      disponibilidad.value = data
      chartDonut.value = presentDisponibilidadDonut(data)
      chartRazones.value = presentRazonesStacked(data)
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)

  return { disponibilidad, chartDonut, chartRazones, loading, error, fetchData }
}
