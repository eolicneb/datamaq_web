/*
Path: src/interface_adapters/gateway/HighchartsGateway.ts
*/

import { HighchartsAdapter } from "../../infrastructure/HighchartsAdapter"

export const HighchartsGateway = {
  createChart(container: HTMLDivElement | null, options: Record<string, unknown>) {
    return HighchartsAdapter.createChart(container, options)
  },
  updateChart(chart: any, options: Record<string, unknown>) {
    HighchartsAdapter.updateChart(chart, options)
  },
  destroyChart(chart: any) {
    HighchartsAdapter.destroyChart(chart)
  }
}
