<!--
Path: src/components/produccion/Dashboard.vue
-->

<script setup lang="ts">
import Chart from "./Chart.vue"
const props = defineProps<{
  chartOptions: Record<string, unknown> | null
  loading: boolean
  error: unknown
}>()
</script>

<template>
  <div v-if="props.loading">Cargando...</div>
  <div v-else-if="props.error">Error: {{ props.error }}</div>
  <div v-else class="dashboard-fullscreen">
    <Chart v-if="props.chartOptions" :options="props.chartOptions" />
  </div>
</template>

