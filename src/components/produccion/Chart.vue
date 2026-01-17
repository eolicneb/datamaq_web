<!--
Path: src/components/produccion/Chart.vue
-->

<script setup lang="ts">
import { useChartController } from "../../interface_adapters/controller/ChartController"

const props = defineProps<{ options: Record<string, unknown> }>()
const { container } = useChartController(props)
</script>

<template>
  <div ref="container" class="chart-fullscreen"></div>
</template>
