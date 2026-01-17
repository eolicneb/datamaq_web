# API_DOCUMENTATION.md
## API V1 – DataMaq Gateway

### Endpoints principales

#### 1. `GET /datamaq_php/backend/api/v1/dashboard.php`

**Descripción:**  
Devuelve métricas de producción, series temporales y metadatos normalizados.

**Ejemplo de respuesta:**
```json
{
  "meta": {
    "schema_version": "1.2",
    "periodo": "semana",
    "inicio": "2024-02-15T00:00:00Z",
    "fin": "2024-02-22T00:00:00Z",
    "timezone": "America/Argentina/Buenos_Aires"
  },
  "series": [
    { "t": "2024-02-15T12:05:00Z", "hr_counter1": 0, "hr_counter2": 0 },
    { "t": "2024-02-22T12:00:00Z", "hr_counter1": 0, "hr_counter2": 0 }
  ],
  "features": {
    "velocidad_ultima_bpm": 0
  },
  "producto": {
    "formato": { "width_mm": 120, "gusset_mm": 80, "height_mm": 260 },
    "web_width_mm": 125.0
  }
}
```

**Campos:**

- `meta`: Metadatos del payload.
  - `schema_version` (string): versión del contrato.
  - `periodo` (string): ventana temporal (`semana`, `turno`, `hora`).
  - `inicio` / `fin` (ISO-8601): rango de fechas.
  - `timezone` (string): zona horaria.
- `series`: Array de muestras temporales.
  - `t` (ISO-8601): timestamp UTC.
  - `hr_counter1`, `hr_counter2` (number): contadores.
- `features`: Métricas agregadas.
  - `velocidad_ultima_bpm` (number): velocidad calculada.
- `producto`: Info de producto.
  - `formato`: objeto con medidas (`width_mm`, `gusset_mm`, `height_mm`).
  - `web_width_mm`: ancho de bobina.

---

