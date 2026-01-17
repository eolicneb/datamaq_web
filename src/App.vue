<!--
Path: src/App.vue
-->

<script setup lang="ts">
import Header from "./components/shared/Header.vue"
import Footer from "./components/shared/Footer.vue"
</script>

<template>
  <Header />
  <div class="main-content-scroll">
    <div class="container my-4">
      <router-view />
    </div>
  </div>
  <Footer />
</template>

