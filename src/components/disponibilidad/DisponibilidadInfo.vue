<!-- Path: src/components/disponibilidad/DisponibilidadInfo.vue -->
<template>
  <section aria-label="Información de disponibilidad">

    <details class="mb-2">
      <summary class="fw-semibold">Definiciones</summary>
      <dl class="mb-0 small mt-2">
        <dt>Tiempo operativo</dt>
        <dd>Minutos con señal de máquina corriendo.</dd>

        <dt>Paro programado</dt>
        <dd>Detenciones planificadas (setup/cambio de formato, mantenimiento planificado, capacitación, reunión, sin orden de trabajo).</dd>

        <dt>Paro no programado</dt>
        <dd>Detenciones imprevistas (rotura, falta de materia prima, falta de maquinista/dotación, espera de calidad, corte de energía, otros).</dd>

        <dt>Disponibilidad</dt>
        <dd>Operativo / tiempo total del período.</dd>
      </dl>
    </details>

    <details>
      <summary class="fw-semibold">Convenciones de clasificación</summary>
      <ul class="mb-0 small mt-2">
        <li>
          “Falta de ventas / sin orden de trabajo”: por defecto se considera <strong>programado</strong>.
        </li>
        <li>
          “Cambio de formato” se registra como <strong>programado</strong> (SMED); si fue emergente, documentar la excepción.
        </li>
        <li>Usá “Otros” solo con nota breve; revisalo semanalmente para reclasificar.</li>
      </ul>
    </details>

    <!-- Texto institucional (fallback si no hay datos) -->
    <p class="mt-3">
      La disponibilidad en los procesos productivos de Madygraf es clave para garantizar la continuidad y eficiencia del trabajo colectivo.
      Un monitoreo constante permite identificar rápidamente paradas, cuellos de botella y oportunidades de mejora, facilitando la intervención
      temprana y la optimización de recursos. Compartir esta información en tiempo real fortalece la transparencia y la colaboración, permitiendo
      que las decisiones se tomen de manera informada y consensuada.
    </p>
  </section>
</template>
