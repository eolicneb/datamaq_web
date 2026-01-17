<!--
Path: src/components/Botonera.vue
-->

<template>
  <div class="botonera-flex">
    <div class="botonera-group">
      <label for="turno-select" class="botonera-label">Turno:</label>
      <select id="turno-select" v-model="turno" class="botonera-select" @change="emitChange">
        <option value="central">Central (08-16)</option>
        <option value="manana">Mañana (06-14)</option>
        <option value="tarde">Tarde (14-22)</option>
        <option value="dia">Día (06-22)</option>
        <option value="completo">Completo (00-24)</option>
      </select>
    </div>
    <div class="botonera-group">
      <label for="fecha-input" class="botonera-label">Fecha:</label>
      <input id="fecha-input" type="date" v-model="fecha" class="botonera-input" @change="emitChange" />
    </div>
  </div>
</template>
<style scoped>
.botonera-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  padding: 1rem 0;
}
.botonera-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.botonera-label {
  font-weight: 500;
  margin-right: 0.25rem;
}
.botonera-select, .botonera-input {
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  border: 1px solid #bbb;
  border-radius: 4px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const turno = ref('central')
const fecha = ref(new Date().toISOString().slice(0, 10))
const emit = defineEmits(['update:params'])

function emitChange() {
  emit('update:params', { turno: turno.value, fecha: fecha.value })
}
</script>
