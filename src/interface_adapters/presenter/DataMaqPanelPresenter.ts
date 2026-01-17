/*
Path: src/interface_adapters/presenter/DataMaqPanelPresenter.ts
Responsabilidad: Transformar los datos del dashboard en props listos para la UI de DataMaqPanel.vue
*/

import type { Dashboard } from '../../entities/Dashboard'

export function getInfoDisplayProps(dashboard: Dashboard | null) {
  const velocidad =
    dashboard?.velocidad?.toString() ??
    dashboard?.features?.find(f => f.key === 'velocidad_ultima_bpm')?.value?.toString() ??
    ''

  let formato = ''
  let anchoBobina = ''

  if (dashboard?.formato) {
    formato = dashboard.formato.toString()
  } else if (dashboard?.producto && typeof dashboard.producto === 'object') {
    const prod: any = dashboard.producto
    if (prod.formato) {
      formato = `${prod.formato.height_mm ?? ''} X ${prod.formato.width_mm ?? ''} X ${prod.formato.gusset_mm ?? ''}`
    }
  }

  if (dashboard?.anchoBobina) {
    anchoBobina = dashboard.anchoBobina.toString()
  } else if (dashboard?.producto && typeof dashboard.producto === 'object') {
    const prod: any = dashboard.producto
    if (prod.web_width_mm) {
      anchoBobina = prod.web_width_mm.toString()
    }
  }

  return {
    velocidad,
    formato,
    anchoBobina,
  }
}
