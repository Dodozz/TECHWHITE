# TECH/WHITE

```
╔════════════════════════════════════════╗
║  ████████╗███████╗ ██████╗██╗  ██╗    ║
║  ╚══██╔══╝██╔════╝██╔════╝██║  ██║    ║
║     ██║   █████╗  ██║     ███████║    ║
║     ██║   ██╔══╝  ██║     ██╔══██║    ║
║     ██║   ███████╗╚██████╗██║  ██║    ║
║     ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝    ║
║          /WHITE                        ║
╚════════════════════════════════════════╝
```

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## Descripción

**TECH/WHITE** es un prototipo de e-commerce enfocado en hardware gaming, monitores y periféricos. Es una Single Page Application (SPA) construida completamente con HTML, CSS y JavaScript vanilla — sin frameworks ni dependencias externas.

El proyecto incluye catálogo de 20 productos, carrito de compras, checkout de 3 pasos, sistema de autenticación simulado, hub de cuenta con perfil/direcciones/pedidos, un Setup Builder inteligente que recomienda builds según presupuesto y caso de uso, y más.

Este repositorio también contiene dos páginas adicionales: un portafolio personal y una página experimental de diseño.

---

## Tech Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 + CSS3 + JavaScript ES6+ (vanilla, sin frameworks) |
| Tipografía | Google Fonts (Bebas Neue, Rajdhani, Space Mono) |
| Persistencia | localStorage (carrito, favoritos, usuario, pedidos, direcciones) |
| Servidor local | `npx serve` (archivos estáticos) |
| Despliegue | Vercel (hosting estático con rewrites) |

---

## Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/Dodozz/TECHWHITE.git
cd TECHWHITE

# Iniciar servidor local
npx serve . -l 3000

# Abrir en el navegador
# http://localhost:3000
```

También puedes abrir `TECH-WHITE.html` directamente en el navegador sin servidor.

---

## Estructura del Proyecto

```
tech-prototipo/
├── TECH-WHITE.html              # App principal — e-commerce SPA (6,100+ líneas)
├── PORTFOLIO.html               # Portafolio personal DODOZ
├── VOID.html                    # Página experimental de diseño
├── DOCUMENTACION_TECH_WHITE.md  # Documentación técnica completa
├── README.md                    # Este archivo
├── vercel.json                  # Configuración de despliegue Vercel
├── uploads/                     # Imágenes de productos y assets
│   ├── monitor.png, gpu.png, cpu.png
│   ├── keyboard.png, mouse.png, headset.png
│   └── cat_*.png
└── audit/                       # Screenshots de auditoría visual
```

---

## Páginas del Proyecto

### TECH/WHITE — E-Commerce Gaming

La página principal. Una tienda completa de hardware gaming con:

- **Catálogo** — 20 productos en 3 categorías (monitores, hardware, periféricos) con filtros, búsqueda, ordenamiento y paginación
- **Carrito de Compras** — Agregar/eliminar productos, cantidades, códigos de descuento, envío gratis a partir de $1,500
- **Checkout** — Flujo de 3 pasos: dirección → envío → pago → resumen
- **Cuenta** — Login/registro simulado, perfil editable, direcciones guardadas, historial de pedidos con tracking
- **Setup Builder** — Recomendador inteligente de builds según presupuesto ($5K–$50K) y caso de uso (gaming, streaming, creador, trabajo)
- **Diseño** — Estética dark/futurista con paleta magenta (#FF1F71), cyan (#00E5FF) y oro (#FFD700) sobre negro profundo (#070B14)

### PORTFOLIO — Portafolio DODOZ

Página personal de portafolio con estética minimalista. Incluye secciones de hero, proyectos, habilidades y contacto. Efectos de scroll reveal y tipografía editorial.

### VOID — Página Experimental

Proyecto experimental de diseño con paleta cream/rust/sage. Explora layouts creativos, transiciones y efectos visuales no convencionales.

---

## Despliegue

El proyecto está configurado para despliegue en **Vercel** como hosting estático.

```json
{
  "name": "tech-prototipo",
  "rewrites": [
    { "source": "/", "destination": "/TECH-WHITE.html" }
  ]
}
```

La raíz (`/`) redirige automáticamente a `TECH-WHITE.html`.

---

## Documentación

La documentación técnica completa del proyecto se encuentra en [`DOCUMENTACION_TECH_WHITE.md`](DOCUMENTACION_TECH_WHITE.md), que cubre:

- Arquitectura técnica y sistema de diseño
- Catálogo de productos y estructura de datos
- Todos los flujos de usuario (navegación, auth, carrito, checkout)
- Referencia completa de funciones JavaScript
- Gestión de estado y localStorage
- Diseño responsive y breakpoints
- Troubleshooting, QA checklist y roadmap

---

## Autor

**Dodoz** — Coder & Student

---
