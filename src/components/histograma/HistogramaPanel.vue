<!--
Path: src/components/histograma/HistogramaPanel.vue
-->


<script setup lang="ts">
import { computed } from "vue"
import HistogramaInfo from "./HistogramaInfo.vue"
import Chart from "../produccion/Chart.vue"
import { useHistogramController } from "../../interface_adapters/controller/HistogramController"
import { presentHistogram } from "../../interface_adapters/presenter/HistogramPresenter"

const { histogram, loading, error } = useHistogramController()
const chartOptions = computed(() => histogram.value ? presentHistogram(histogram.value) : null)
</script>

<template>
  <div class="row g-3">
    <div class="col-12 col-md-8">
      <h2>Histograma</h2>
      <div v-if="loading">Cargando...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <Chart v-else-if="chartOptions" :options="chartOptions" />
    </div>
    <aside class="col-12 col-md-4">
      <HistogramaInfo />
    </aside>
  </div>
</template>
