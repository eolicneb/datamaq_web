<!--
Path: src/components/VisionArtificialPanel.vue
-->

<script setup>
import { ref, onMounted, watch } from 'vue'
import VisionArtificialInfo from "./VisionArtificialInfo.vue"
import { VisionArtificialController } from '../../interface_adapters/controller/VisionArtificialController'

const controller = new VisionArtificialController()

const streams = ref([])
const selectedStream = ref(null)
const streamUrl = ref('')
const snapshotUrl = ref('')
const loading = ref(false)
const error = ref('')
const usarFiltro = ref(true) // switch para filtro

// Obtiene la lista de streams disponibles usando el controlador
async function fetchStreams() {
  loading.value = true
  error.value = ''
  try {
    streams.value = await controller.getStreams()
    if (streams.value.length > 0) {
      selectStream(streams.value[0])
    }
  } catch (e) {
    error.value = e.message
    console.error('Error en fetchStreams:', e)
  } finally {
    loading.value = false
  }
}

function getStreamUrl(stream) {
  return controller.getStreamUrl(stream, usarFiltro.value)
}

function selectStream(stream) {
  selectedStream.value = stream
  streamUrl.value = getStreamUrl(stream)
  snapshotUrl.value = ''
}

// Actualiza el streamUrl cuando cambia el switch de filtro
watch([selectedStream, usarFiltro], ([stream]) => {
  streamUrl.value = getStreamUrl(stream)
})

async function takeSnapshot() {
  if (!selectedStream.value) return
  loading.value = true
  error.value = ''
  try {
    snapshotUrl.value = await controller.takeSnapshot(selectedStream.value)
  } catch (e) {
    error.value = e.message
    console.error('Error en takeSnapshot:', e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchStreams)
</script>

<template>
  <div class="row g-3">
    <div class="col-12 col-md-8">
      <h2>Visión Artificial</h2>
      <div v-if="loading">Cargando...</div>
      <div v-if="error" style="color: red;">{{ error }}</div>
      <div v-if="streams.length > 0">
        <label for="stream-select">Fuente:</label>
        <select id="stream-select" v-model="selectedStream" @change="selectStream(selectedStream)" class="form-select mb-2">
          <option v-for="s in streams" :key="s.tipo + '-' + s.index" :value="s">
            {{ s.name || s.tipo + ' ' + s.index }}
          </option>
        </select>
        <div v-if="streamUrl">
          <h3>Stream</h3>
          <img :src="streamUrl" alt="Stream" class="img-fluid border mb-2" />
          <div class="form-check form-switch mt-2">
            <input class="form-check-input" type="checkbox" id="filtro-switch" v-model="usarFiltro">
            <label class="form-check-label" for="filtro-switch">Filtro</label>
          </div>
        </div>
        <button @click="takeSnapshot" :disabled="loading || !selectedStream" class="btn btn-primary mt-2">Tomar Snapshot</button>
        <div v-if="snapshotUrl">
          <h3>Snapshot</h3>
          <img :src="snapshotUrl" alt="Snapshot" class="img-fluid border" />
        </div>
      </div>
      <div v-else-if="!loading && !error">No hay streams disponibles.</div>
    </div>
    <aside class="col-12 col-md-4">
      <VisionArtificialInfo />
    </aside>
  </div>
</template>
