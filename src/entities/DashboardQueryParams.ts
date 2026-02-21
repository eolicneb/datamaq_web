/*
Path: src/entities/DashboardQueryParams.ts
Value Object para los parámetros de consulta del dashboard
- El campo 'turno' también se utiliza en frontend para recortar el rango de datos mostrado en el gráfico.
*/

export interface DashboardQueryParams {
  fecha: string // formato YYYY-MM-DD
  turno: 'central' | 'manana' | 'tarde' | 'dia' | 'completo' // También usado para filtrar el rango de datos en frontend
  label: 'vel_upm' | 'edge_position' | 'buttler_diameter' | 'buttler_width' | null
}

export function isValidDashboardQueryParams(params: any): params is DashboardQueryParams {
  const validTurnos = ['central', 'manana', 'tarde', 'dia', 'completo']
  const validLabels = ['vel_upm', 'edge_position', 'buttler_diameter', 'buttler_width', null]
  return (
    typeof params === 'object' &&
    typeof params.fecha === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(params.fecha) &&
    validTurnos.includes(params.turno) &&
    validLabels.includes(params.label)
  )
}
