/*
Path: src/router/index.ts
*/

import { createRouter, createWebHistory } from 'vue-router';
import DataMaqPanel from '../components/produccion/DataMaqPanel.vue';
import DisponibilidadPanel from '../components/disponibilidad//DisponibilidadPanel.vue';
import RendimientoPanel from '../components/rendimiento/RendimientoPanel.vue';
import HistogramaPanel from '../components/histograma/HistogramaPanel.vue';
import VisionArtificialPanel from '../components/vision-artificial/VisionArtificialPanel.vue';

const routes = [
  { path: '/', name: 'Produccion', component: DataMaqPanel },
  { path: '/vision-artificial', name: 'VisionArtificial', component: VisionArtificialPanel },
  { path: '/disponibilidad', name: 'Disponibilidad', component: DisponibilidadPanel },
  { path: '/rendimiento', name: 'Rendimiento', component: RendimientoPanel },
  { path: '/histograma', name: 'Histograma', component: HistogramaPanel },
];

const router = createRouter({
  history: createWebHistory('/datamaq_vue/dist/'), // <-- Agrega el base aquí
  routes,
});

export default router;
