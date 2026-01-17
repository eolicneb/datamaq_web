/*
Path: src/use_cases/GetDashboardData.ts
*/

import { fetchDashboardData } from '../interface_adapters/gateway/DashboardApiGateway'
import type { Dashboard, DashboardSeries } from '../entities/Dashboard'
import type { DashboardQueryParams } from '../entities/DashboardQueryParams'

export async function getDashboardData(params: DashboardQueryParams): Promise<Dashboard> {
  const raw = await fetchDashboardData(params)
  try {
    let series: { hoy: DashboardSeries; ayer: DashboardSeries; semana_anterior: DashboardSeries }
    if (Array.isArray(raw?.series) && raw.series.length && raw.series[0].t) {
      series = buildSeriesFromHourly(raw.series)
    } else {
      series = {
        hoy: findSeries('hoy'),
        ayer: findSeries('ayer'),
        semana_anterior: findSeries('semana_anterior')
      }
    }

    const dashboard: Dashboard = {
      meta: {
        title: raw?.meta?.title ?? '',
        date: raw?.meta?.date ?? '',
        ...raw?.meta
      },
      series,
      features: Array.isArray(raw?.features)
        ? raw.features.map((f: any) => ({
            key: f.key ?? '',
            value: f.value ?? ''
          }))
        : [],
      producto: raw?.producto ?? '',
      velocidad: raw?.velocidad ?? '',
      formato: raw?.formato ?? '',
      anchoBobina: raw?.anchoBobina ?? ''
    }
    return dashboard
  } catch (err) {
    console.error('Error al transformar los datos del dashboard:', err)
    console.warn('Datos crudos recibidos:', raw ?? null)
    return {
      meta: { title: '', date: '' },
      series: {
        hoy: { name: 'hoy', data: [] },
        ayer: { name: 'ayer', data: [] },
        semana_anterior: { name: 'semana_anterior', data: [] }
      },
      features: [],
      producto: ''
    }
  }

  // Si el formato es array de objetos por hora (histórico), construir las tres series
  function buildSeriesFromHourly(rawSeries: any[]): { hoy: DashboardSeries; ayer: DashboardSeries; semana_anterior: DashboardSeries } {
    // Suponiendo que cada objeto tiene t (timestamp), hr_counter1, hr_counter2, etc.
    // Para granularidad de 5 minutos, se esperan 288 elementos
    const hoyData = Array(288).fill(null)
    const ayerData = Array(288).fill(null)
    const semanaAnteriorData = Array(288).fill(null)
    for (let i = 0; i < Math.min(rawSeries.length, 288); i++) {
      hoyData[i] = rawSeries[i]?.hr_counter1 ?? null
      ayerData[i] = rawSeries[i]?.hr_counter2 ?? null
      semanaAnteriorData[i] = ((rawSeries[i]?.hr_counter1 ?? 0) + (rawSeries[i]?.hr_counter2 ?? 0)) || null
    }
    return {
      hoy: { name: 'hoy', data: hoyData },
      ayer: { name: 'ayer', data: ayerData },
      semana_anterior: { name: 'semana_anterior', data: semanaAnteriorData }
    }
  }

  // Si el formato es array de series con nombre, usar el mapeo original
  function findSeries(name: 'hoy' | 'ayer' | 'semana_anterior'): DashboardSeries {
    // Soporta formato objeto (series: { hoy: {data: [...]}, ... })
    if (raw?.series && raw.series[name] && Array.isArray(raw.series[name].data)) {
      return {
        name,
        data: raw.series[name].data,
        ...raw.series[name]
      }
    }
    // Formato array de series con nombre (legacy)
    if (Array.isArray(raw?.series) && raw.series.length && raw.series[0].name) {
      const serie = raw.series.find((s: any) => s.name === name)
      const data = Array(288).fill(null)
      if (Array.isArray(serie?.data)) {
        for (let i = 0; i < Math.min(serie.data.length, 288); i++) {
          data[i] = serie.data[i]
        }
      }
      return {
        name,
        data,
        ...serie
      }
    }
    // Si no existe, devolver vacío
    return { name, data: Array(288).fill(null) }
  }

  let series: { hoy: DashboardSeries; ayer: DashboardSeries; semana_anterior: DashboardSeries }
  if (Array.isArray(raw?.series) && raw.series.length && raw.series[0].t) {
    // Formato histórico: array de objetos por hora
    series = buildSeriesFromHourly(raw.series)
  } else {
    // Formato array de series con nombre
    series = {
      hoy: findSeries('hoy'),
      ayer: findSeries('ayer'),
      semana_anterior: findSeries('semana_anterior')
    }
  }

  const dashboard: Dashboard = {
    meta: {
      title: raw?.meta?.title ?? '',
      date: raw?.meta?.date ?? '',
      ...raw?.meta
    },
    series,
    features: Array.isArray(raw?.features)
      ? raw.features.map((f: any) => ({
          key: f.key ?? '',
          value: f.value ?? ''
        }))
      : [],
    producto: raw?.producto ?? '',
    velocidad: raw?.velocidad ?? '',
    formato: raw?.formato ?? '',
    anchoBobina: raw?.anchoBobina ?? ''
  }
  return dashboard
}
