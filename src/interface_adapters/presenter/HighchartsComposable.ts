/*
Path: src/interface_adapters/presenter/HighchartsComposable.ts
*/

import { ref, onMounted, onBeforeUnmount, watch, toRaw } from "vue"
import { HighchartsGateway } from "../gateway/HighchartsGateway"

export function useHighchartsComposable(options: Record<string, unknown>) {
  const container = ref<HTMLDivElement | null>(null)
  let chart: any

  onMounted(() => {
    chart = HighchartsGateway.createChart(container.value, toRaw(options))
  })

  watch(
    () => options,
    (opts) => {
      if (chart && opts) HighchartsGateway.updateChart(chart, toRaw(opts))
    },
    { deep: true }
  )

  onBeforeUnmount(() => {
    if (chart) HighchartsGateway.destroyChart(chart)
  })

  return { container }
}
