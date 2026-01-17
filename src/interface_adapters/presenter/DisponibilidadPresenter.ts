/*
Presenter para adaptar los datos de disponibilidad al formato de gráfico de torta (Highcharts).
Ubicación: src/interface_adapters/presenter/DisponibilidadPresenter.ts
*/

import type { Disponibilidad } from "../../entities/Disponibilidad"

export function presentDisponibilidadDonut(model: Disponibilidad) {
  const series = [
    { name: "Operativo", y: model.minutes.operating, color: "#28a745" },         // verde
    { name: "Paro programado", y: model.minutes.plannedDowntime, color: "#ffc107" }, // amarillo
    { name: "Paro no programado", y: model.minutes.unplannedDowntime, color: "#dc3545" }, // rojo
    model.minutes.unclassifiedDowntime !== undefined
      ? { name: "Paro sin clasificar", y: model.minutes.unclassifiedDowntime, color: "#6c757d" } // gris
      : null
  ].filter(Boolean)

  return {
    chart: { type: "pie" },
    title: { text: "Distribución de tiempo (turno)" },
    subtitle: { text: `Disponibilidad = ${(model.availability * 100).toFixed(1)}%` },
    plotOptions: {
      pie: { innerSize: "60%", dataLabels: { enabled: true, format: "{point.name}: {point.y} min" } }
    },
    series: [{ name: "Minutos", data: series }]
  }
}

export function presentRazonesStacked(model: Disponibilidad) {
  const planned = model.breakdown?.planned ?? {}
  const unplanned = model.breakdown?.unplanned ?? {}
  const unclassified = model.breakdown?.unclassified ?? 0

  const categorias = [
    "SETUP_CAMBIO_FORMATO","MANTENIMIENTO_PLANIFICADO","CAPACITACION","REUNION","SIN_ORDEN_TRABAJO",
    "ROTURA","FALTA_MATERIA_PRIMA","FALTA_MAQUINISTA","FALTA_DOTACION","ESPERA_CALIDAD","CORTE_ENERGIA","OTROS",
    "SIN_CLASIFICAR"
  ]

  const serieProgramado = categorias.map(c => planned[c as keyof typeof planned] ?? 0)
  const serieNoProgramado = categorias.map(c => unplanned[c as keyof typeof unplanned] ?? 0)
  const serieSinClasificar = categorias.map(c => c === "SIN_CLASIFICAR" ? unclassified : 0)

  return {
    chart: { type: "column" },
    title: { text: "Razones de paro (minutos)" },
    xAxis: { categories: categorias, labels: { rotation: -35 } },
    yAxis: { min: 0, title: { text: "Minutos" }, stackLabels: { enabled: true } },
    plotOptions: { column: { stacking: "normal", dataLabels: { enabled: true } } },
    series: [
      { name: "Programado", data: serieProgramado, color: "#ffc107" },    // amarillo
      { name: "No programado", data: serieNoProgramado, color: "#dc3545" }, // rojo
      { name: "Sin clasificar", data: serieSinClasificar, color: "#6c757d" } // gris
    ]
  }
}
