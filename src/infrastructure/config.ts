/*
Path: src/infrastructure/config.ts
Constantes de configuración para endpoints y variables globales
*/

export const API_ENDPOINTS = {
  //   DASHBOARD: '/datamaq_php/backend/api/v1/dashboard.php',
  DASHBOARD: 'http://localhost:9000/api/v2/dashboard.php', // Cambiado para pruebas rápidas
  HISTOGRAM: '/datamaq_php/backend/api/v1/histogram.php',
  DISPONIBILIDAD: '/datamaq_php/backend/api/v1/disponibilidad.php'
  // Agrega aquí otros endpoints si es necesario
}

// export const VISION_ARTIFICIAL_API_URL = '/api/computer_vision';
export const VISION_ARTIFICIAL_API_URL = 'http://localhost:9000/api/v1/cameras.php';
