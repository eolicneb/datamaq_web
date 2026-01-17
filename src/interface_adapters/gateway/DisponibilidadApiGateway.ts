/*
Path: src/interface_adapters/gateway/DisponibilidadApiGateway.ts
Gateway para obtener datos de disponibilidad desde el backend.
Si la respuesta falla, retorna datos de ejemplo (fallback local).
*/

import type { Disponibilidad } from "../../entities/Disponibilidad"
import { API_ENDPOINTS } from "../../infrastructure/config"
import { DisponibilidadSampleData } from "../../infrastructure/DisponibilidadSampleData"

export async function fetchDisponibilidad(
  params?: { from?: string; to?: string }
): Promise<Disponibilidad> {
  let url: URL
  try {
    url = new URL(API_ENDPOINTS.DISPONIBILIDAD)
    if (params?.from) url.searchParams.set("from", params.from)
    if (params?.to) url.searchParams.set("to", params.to)
  } catch (err) {
    console.error("Error construyendo la URL de disponibilidad:", err)
    console.warn("Usando datos de ejemplo por error de URL.")
    return DisponibilidadSampleData
  }

  try {
    const response = await fetch(url.toString())
    if (!response.ok) throw new Error("Network response was not ok")
    const data = await response.json()

    // Adaptamos en caso de nombres distintos en backend:
    const minutesTotal = data?.period?.minutesTotal
      ?? (data?.period?.totalMinutes ?? data?.total_minutes)

    const availability = data?.availability
      ?? (data?.minutes?.operating && minutesTotal ? data.minutes.operating / minutesTotal : undefined)

    const adapted: Disponibilidad = {
      period: {
        start: data?.period?.start ?? data?.start,
        end: data?.period?.end ?? data?.end,
        minutesTotal
      },
      minutes: {
        operating: data?.minutes?.operating ?? data?.operating_minutes,
        plannedDowntime: data?.minutes?.plannedDowntime ?? data?.planned_minutes,
        unplannedDowntime: data?.minutes?.unplannedDowntime ?? data?.unplanned_minutes,
        unclassifiedDowntime: data?.minutes?.unclassifiedDowntime ?? data?.unclassified_minutes
      },
      availability,
      breakdown: {
        planned: data?.breakdown?.planned,
        unplanned: data?.breakdown?.unplanned,
        unclassified: data?.breakdown?.unclassified
      },
      events: data?.events
    }

    return adapted
  } catch (err) {
    console.error("Error obteniendo datos de disponibilidad:", err)
    console.warn("Usando datos de ejemplo por error de red o formato.")
    return DisponibilidadSampleData
  }
}
