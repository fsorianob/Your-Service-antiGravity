---
exported: 2026-03-04T00:16:24.172Z
source: NotebookLM
type: report
title: "Manual Definitivo de Estructuración y Diseño Frontend: Directrices Estratégicas para el Subagente de Programación"
---

# Manual Definitivo de Estructuración y Diseño Frontend: Directrices Estratégicas para el Subagente de Programación

导出时间: 3/3/2026, 9:16:24 p.m.

---

# Manual Definitivo de Estructuración y Diseño Frontend: Directrices Estratégicas para el Subagente de Programación

## 1\. Filosofía de Diseño del Proyecto: Estética Moderna y Prioridad Mobile-First

La adopción de una arquitectura **Mobile-First** y la metodología de **Vibe Coding** es una directriz técnica imperativa, no una sugerencia estética. Según los estándares de 2025-2026, la indexación de Google es exclusivamente Mobile-First desde octubre de 2023, lo que convierte a la versión móvil en la autoridad única para el SEO. El Subagente SHALL priorizar la restricción inicial de pantallas <599px para optimizar el _Time to Interactive_ (TTI) y garantizar 60 FPS estables, eliminando la deuda cognitiva y el ruido visual antes de escalar mediante modificadores de prefijo (`md:`, `lg:`).

**Principios Estéticos y Estructura Modular:**

**Minimalismo Funcional y "Cloud Dancer":** Se DEBE utilizar una paleta neutra basada en el tono "Cloud Dancer" (off-white) para reducir la fatiga visual. El espacio negativo no es vacío, es una herramienta de jerarquía.

**Arquitectura Bento Grid con Container Queries:** El Subagente implementará celdas modulares responsivas. REGLA TÉCNICA: Es obligatorio el uso de **Container Queries** (`@container`) y unidades `cqi` en lugar de depender únicamente del viewport. Esto garantiza que los componentes sean verdaderamente portables y respondan al tamaño de su contenedor padre, no solo de la pantalla (Soporte global: 93.92%).

**Materialidad (Glassmorphism):** La profundidad se establecerá mediante paneles de "frosted glass" (fondo con `backdrop-blur`) y bordes de 1px con baja opacidad. Esta técnica DEBE usarse para indicar la posición del usuario en la arquitectura del sitio sin sacrificar la legibilidad.

**Flujo de Trabajo Agentic AI:**El "Vibe Coding" se define como un bucle iterativo donde el Subagente ejecuta tareas de programación complejas bajo instrucciones de lenguaje natural, integrando validaciones automáticas para transformar prototipos en software de grado de producción en segundos.

## 2\. Arquitectura de Tipografía y Rítmica Vertical

La tipografía es el componente de UI más crítico para la conversión y accesibilidad (WCAG 2.1). El Subagente SHALL abandonar el uso de tamaños estáticos en favor de la **Tipografía Fluida**.

**Fórmula de Escalado Fluido (MANDATORIO):**Para garantizar que el texto responda tanto al tamaño de la pantalla como al zoom del usuario (WCAG 1.4.4), el Subagente DEBE aplicar la siguiente fórmula base en el elemento raíz:`font-size: clamp(1em, 17px + 0.24vw, 1.125em);`_Razón técnica:_ El uso de `em` en los límites de `clamp()` asegura que el texto sea escalable ante preferencias de usuario, evitando la "hostilidad" de las unidades de viewport puras.

**Jerarquía Sistémica y Función** `pow()`**:**El Subagente generará la escala tipográfica utilizando la lógica de potencias matemáticas para mantener la armonía visual (Ratios: Major Second 1.125 o Perfect Fourth 1.33).

**H1:**`text-clamp` (calculado entre 2.5rem y 3.5rem).

**H2:**`text-clamp` (calculado entre 1.75rem y 2.5rem).

**H3:**`text-clamp` (calculado entre 1.25rem y 1.6rem).

**Párrafo:** Base mínima de **1rem (16px)**.

**Legibilidad y Reglas de Contenedor:**

**Límite de Medida:** Los contenedores de texto SHALL estar restringidos a un máximo de **75 caracteres** (`max-w-[75ch]`) para prevenir la fatiga ocular.

**Interlineado Rítmico:**`leading-relaxed` (1.5-1.7) para cuerpo de texto; `leading-tight` (1.1-1.35) para encabezados.

**Espaciado de Bloque:** El Subagente SHALL aplicar la técnica de ruptura mediante `space-y-8` (múltiplo de 8px) para separar párrafos.

## 3\. Estándares de Media: LCP y Estabilidad del Diseño

La optimización de media es crítica para el _Largest Contentful Paint_ (LCP). Se prohíbe el uso de formatos legados sin fallback.

**Optimización de Formatos y Carga:**

**Uso de** `<picture>`**:** Es obligatorio servir **AVIF** o **WebP** mediante el elemento `<picture>`, logrando reducciones de peso de hasta un 95%.

**Lazy Loading:** Implementar `loading="lazy"` para toda media fuera del _above-the-fold_.

**Prevención de Layout Shifts (CLS):**

El Subagente SHALL declarar dimensiones explícitas (`width` y `height`) y utilizar clases de Tailwind como `aspect-video` o `aspect-square`. Esto reserva el espacio en el DOM antes de la descarga del recurso.

**Estética de Contenedores:**

Aplicar consistentemente `rounded-2xl` y `shadow-md`. Toda imagen en grids SHALL utilizar `object-cover` para evitar distorsiones.

## 4\. Catálogo de Técnicas Tailwind: Stack Tecnológico y Snippets

**STACK OBLIGATORIO:** El Subagente SHALL utilizar **React 19 + TypeScript + Vite** (o Turbopack). El uso de Create React App (CRA) es motivo de rechazo inmediato por obsolescencia.

**Layout de Cuadrícula Auto-adaptable:**

**Contenedor de Lectura Maestro:**

**Sistema de Temas (Low-Contrast Dark Mode):**

## 5\. Checklist Cero-Fallas: Protocolo de Validación Pre-Inserción

El Subagente SHALL ejecutar esta validación antes de realizar cualquier commit. El incumplimiento de un solo punto resultará en la invalidación del componente.

**Unicidad del H1:** ¿Existe exactamente un (1) solo H1 en la página?

**Lógica "Internal ≤ External":** ¿Son las márgenes externas (`margin`) mayores o iguales al relleno interno (`padding`) del elemento? (Regla de Proximidad de Gestalt).

**Accesibilidad de Tap:** ¿Todos los elementos interactivos tienen un área mínima de **44px x 44px**?

**Regla WCAG 1.4.4 (Boundary):** ¿Es el tamaño máximo de fuente ≤ 2.5 veces el tamaño mínimo? (Garantiza cumplimiento de zoom de hasta 200%).

**Tabular Numerals:** ¿Se ha aplicado la clase `font-mono` o `tabular-nums` en tablas de datos o contadores numéricos para alineación vertical?

**Validación de Rítmica Vertical:** ¿Todos los valores de espaciado son múltiplos de **8px** (o 4px para micro-ajustes)?

**Alt-Text y Aspect-Ratio:** ¿Toda imagen tiene atributo `alt` descriptivo y una relación de aspecto definida para evitar _Layout Shifts_?

**Jerarquía Lógica:** ¿Se respeta la secuencia H1 > H2 > H3 sin saltos de nivel?

**CONCLUSIÓN:** Cualquier desviación de estas directrices técnicas resultará en una degradación del rendimiento SEO y de la usabilidad. La precisión en la implementación de Container Queries y Fluid Typography es el estándar mínimo aceptable.