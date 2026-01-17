<!--
Path: src/components/disponibilidad//DisponibilidadPanel.vue
-->

<template>
  <div class="row g-3">
    <div class="col-12 col-lg-8">
      <h2>Disponibilidad</h2>
      <div v-if="loading">Cargando...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <template v-else>
    <highcharts :options="chartDonut" class="mb-3" />
    <highcharts :options="chartRazones" />
      </template>
    </div>

    <aside class="col-12 col-lg-4">
      <DisponibilidadInfo />
      <div class="mt-3 small text-muted">
        <p>
          Definiciones: OEE = Disponibilidad × Rendimiento × Calidad.
          Disponibilidad a partir de señal binaria periódica y comparación tiempo operativo vs total.
        </p>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import DisponibilidadInfo from "./DisponibilidadInfo.vue"
import { useDisponibilidadController } from "../../interface_adapters/controller/useDisponibilidadController"
// Si usás HighchartsVue global, no hace falta importarlo acá.
const { chartDonut, chartRazones, loading, error } = useDisponibilidadController()
</script>
