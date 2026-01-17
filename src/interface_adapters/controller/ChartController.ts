/*
Path: src/interface_adapters/controller/ChartController.ts
*/

import { ref } from "vue"
import { formatChartOptions } from "../presenter/ChartPresenter"
import { useHighchartsComposable } from "../presenter/HighchartsComposable"

export function useChartController(props?: { options?: Record<string, unknown> }) {
  // Estado y métodos para App.vue
  const title = ref("Producción por hora")
  const options = ref(formatChartOptions({
    chart: { type: "line" },
    title: { text: "Velocidad de producción" },
    xAxis: { categories: ["08:00","09:00","10:00","11:00","12:00"] },
    yAxis: { title: { text: "Unidades / h" } },
    series: [
      { type: "line", name: "Línea A", data: [120,135,128,142,150] },
      { type: "line", name: "Línea B", data: [100,110,125,130,145] }
    ],
    credits: { enabled: false },
    accessibility: { enabled: false }
  }))

  function changeXAxis(newCategories: string[]) {
    options.value.xAxis = { categories: newCategories }
  }

  // Para Chart.vue, usa el composable de presentación
  const { container } = useHighchartsComposable(props?.options ?? options.value)

  return { title, options, changeXAxis, container }
}
