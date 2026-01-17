<!--
Path: src/components/InfoDisplay.vue
-->

<script setup lang="ts">
const props = defineProps<{
  velocidad: string
  formato: string
  anchoBobina: string
  loading?: boolean
}>()
</script>

<template>
  <div class="card my-3 custom-bg">
    <div class="card-body text-center rounded">
      <p class="fs-1 mb-0">Velocidad {{ props.velocidad }} unidades por minuto</p>
      <p class="fs-1 mb-0">Formato {{ props.formato }}</p>
      <p class="fs-1 mb-0">Ancho Bobina {{ props.anchoBobina }}mm</p>
    </div>
  </div>
</template>

<style scoped>
.custom-bg {
  background-color: rgba(240, 240, 240, .5);
}
</style>
