/*
Caso de uso para obtener los datos de disponibilidad usando el gateway.
Permite aplicar reglas de negocio si es necesario.
Ubicación: src/use_cases/GetDisponibilidadData.ts
*/

import type { Disponibilidad } from "../entities/Disponibilidad"
import { fetchDisponibilidad } from "../interface_adapters/gateway/DisponibilidadApiGateway"

export async function GetDisponibilidadData(
  params?: { from?: string; to?: string }
): Promise<Disponibilidad> {
  const dto = await fetchDisponibilidad(params)

  // Sanity checks + derivados mínimos:
  const av = dto.availability ?? (dto.minutes.operating / dto.period.minutesTotal)
  return {
    ...dto,
    availability: av
  }
}
