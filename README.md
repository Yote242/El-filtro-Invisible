# El Filtro Invisible: Brecha de Género en STEM (LATAM & Caribe)

![Datatón 2026](https://img.shields.io/badge/Datatón-2026-0f766e?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**El Filtro Invisible** es un dashboard interactivo de análisis de datos desarrollado para visualizar y predecir la brecha de género en las 50 carreras profesionales con mayor retorno económico en América Latina y el Caribe. El proyecto busca evidenciar cómo el talento femenino se "filtra" o desaparece a medida que avanzamos desde la matrícula académica hacia los puestos de alta dirección.

---

## Características Principales

* **Análisis Histórico (2015-2023):** Visualización de la evolución de la matrícula y egreso por género.
* **Dashboard Interactivo:** Filtros dinámicos por país y año para una exploración granular.
* **Modelado Predictivo (ML):** Proyecciones hacia el 2030 basadas en tendencias actuales para auditar el cumplimiento de los ODS.
* **Exportación de Reportes:** Sistema de captura de gráficas en alta definición (HD) para uso en políticas públicas.
* **Diseño Responsive:** Optimizado para consulta en dispositivos móviles y escritorio.

---

## Stack Tecnológico

### Front-End
* **Framework:** Next.js 14 (App Router)
* **Estilos:** Tailwind CSS + Shadcn/UI
* **Gráficas:** Recharts (SVG Driven)
* **Iconografía:** Lucide React

### Data & Análisis
* **Procesamiento de datos:** Python (Pandas/NumPy)
* **Almacenamiento:** Arquitectura JAMstack basada en archivos JSON optimizados.
* **Captura de imagen:** html-to-image (Renderizado efímero de alta resolución).

---

## Equipo de Trabajo
* Gudelia Pilar Pérez Conde
* Gerardo Saucedo Pérez
* Jorge Eduardo Berber Carretero
* Luis Fernando Romero Coyotecatl

---

## Estructura del Proyecto

```text
├── app/
│   ├── layout.tsx       # Estructura base
│   └── page.tsx         # Dashboard Principal (Contenedor Maestro)
├── components/
│   ├── ChartBrecha.tsx  # Lógica de Recharts e interactividad
│   ├── ChartPrediccion.tsx # Implementación de proyecciones ML
│   └── ui/              # Componentes base (Buttons, Cards, Badges)
├── public/
│   └── data/            # Capa de Datos (Archivos JSON procesados)
└── tailwind.config.ts   # Configuración de diseño y paleta de colores
