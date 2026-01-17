<!--
Path: src/components/produccion/DataMaqPanel.vue
-->

<template>
  <div class="row g-3">
    <div class="col-12 col-md-8">
      <InfoDisplay
        :velocidad="infoDisplayProps.velocidad"
        :formato="infoDisplayProps.formato"
        :anchoBobina="infoDisplayProps.anchoBobina"
        :loading="loading"
      />
      <Dashboard :chart-options="chartOptions" :loading="loading" :error="error" />
      <Botonera @update:params="onUpdateParams" />
    </div>
    <aside class="col-12 col-md-4">
      <DataMaqInfo />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import InfoDisplay from "./InfoDisplay.vue"
import Dashboard from "./Dashboard.vue"
import Botonera from "./Botonera.vue"
import DataMaqInfo from "./DataMaqInfo.vue"
import { useDashboardController } from "../../interface_adapters/controller/DashboardController"
import { getInfoDisplayProps } from "../../interface_adapters/presenter/DataMaqPanelPresenter"

const { dashboard, loading, error, chartOptions, updateParams } = useDashboardController()
const infoDisplayProps = computed(() => getInfoDisplayProps(dashboard.value))

type TurnoType = "central" | "manana" | "tarde" | "dia" | "completo" | undefined

function onUpdateParams(params: { turno: TurnoType; fecha: string }) {
  updateParams(params)
}
</script>
