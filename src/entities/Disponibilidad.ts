/*
Entidad de dominio para los datos de disponibilidad (gráfico de torta)
Ubicación: src/entities/Disponibilidad.ts
*/

export type ParoTipo = "PROGRAMADO" | "NO_PROGRAMADO"

// Nuevo tipo para paro sin clasificar
export type ParoTipoExtendido = ParoTipo | "SIN_CLASIFICAR"

export type RazonParoProgramado =
  | "SETUP_CAMBIO_FORMATO"
  | "MANTENIMIENTO_PLANIFICADO"
  | "CAPACITACION"
  | "REUNION"
  | "SIN_ORDEN_TRABAJO"

export type RazonParoNoProgramado =
  | "ROTURA"
  | "FALTA_MATERIA_PRIMA"
  | "FALTA_MAQUINISTA"
  | "FALTA_DOTACION"
  | "ESPERA_CALIDAD"
  | "CORTE_ENERGIA"
  | "OTROS"

export type RazonParo = RazonParoProgramado | RazonParoNoProgramado

// Nueva razón para paro sin clasificar
export type RazonParoSinClasificar = "SIN_CLASIFICAR"
export type RazonParoExtendido = RazonParo | RazonParoSinClasificar

export interface ParoEvent {
  start: string // ISO
  end: string   // ISO
  minutes: number
  tipo: ParoTipoExtendido
  razon: RazonParoExtendido
  notes?: string
}

export interface Disponibilidad {
  period: { start: string; end: string; minutesTotal: number }
  minutes: {
    operating: number
    plannedDowntime: number
    unplannedDowntime: number
    unclassifiedDowntime?: number // nuevo campo para paro sin clasificar
  }
  availability: number // operating / minutesTotal (0..1)
  breakdown?: {
    planned?: Partial<Record<RazonParoProgramado, number>> // minutos por razón
    unplanned?: Partial<Record<RazonParoNoProgramado, number>>
    unclassified?: number // minutos sin clasificar
  }
  events?: ParoEvent[] // opcional: para auditoría fina
}
