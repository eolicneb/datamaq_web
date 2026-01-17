<!--
Path: src/components/shared/Header.vue
-->

<script setup>
import { onMounted } from 'vue';

function closeMenu() {
  const navbarCollapse = document.getElementById('navbarSupportedContent');
  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    // Bootstrap 5: usa Collapse JS
    const collapse = window.bootstrap?.Collapse
      ? window.bootstrap.Collapse.getInstance(navbarCollapse)
      : null;
    if (collapse) {
      collapse.hide();
    } else {
      // Fallback: remueve la clase 'show'
      navbarCollapse.classList.remove('show');
    }
  }
}

onMounted(() => {
  // Asegura que Bootstrap JS esté disponible
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">DATAMAQ</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><router-link class="nav-link" to="/" @click="closeMenu">Gráfico de Producción</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/vision-artificial" @click="closeMenu">Visión Artificial</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/disponibilidad" @click="closeMenu">Disponibilidad</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/rendimiento" @click="closeMenu">Rendimiento</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/histograma" @click="closeMenu">Histograma</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
