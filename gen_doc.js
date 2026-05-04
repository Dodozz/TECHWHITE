const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat, ExternalHyperlink,
  PageBreak
} = require('docx');
const fs = require('fs');

// ── Colors ──
const MAGENTA  = 'FF1F71';
const DARK     = '070B14';
const SURFACE  = '0D1220';
const CYAN_H   = '00B5CC';
const MUTED    = '6B7280';
const WHITE    = 'FFFFFF';
const LIGHT_BG = 'F3F4F6';
const BORDER_C = 'E5E7EB';

// ── Border helper ──
const cellBorder = (color = BORDER_C) => ({
  top:    { style: BorderStyle.SINGLE, size: 1, color },
  bottom: { style: BorderStyle.SINGLE, size: 1, color },
  left:   { style: BorderStyle.SINGLE, size: 1, color },
  right:  { style: BorderStyle.SINGLE, size: 1, color },
});

// ── Section heading ──
function sectionTitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MAGENTA, space: 4 } },
    children: [new TextRun({ text, font: 'Arial', size: 32, bold: true, color: '111827' })],
  });
}

function subTitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 100 },
    children: [new TextRun({ text, font: 'Arial', size: 26, bold: true, color: '1F2937' })],
  });
}

function body(text, options = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    children: [new TextRun({ text, font: 'Arial', size: 22, color: '374151', ...options })],
  });
}

function bullet(text, bold = false) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, font: 'Arial', size: 22, color: '374151', bold })],
  });
}

function spacer() {
  return new Paragraph({ spacing: { before: 0, after: 120 }, children: [new TextRun('')] });
}

function label(text) {
  return new TextRun({ text, font: 'Arial', size: 18, color: MUTED, allCaps: true, bold: true });
}

function accent(text) {
  return new TextRun({ text, font: 'Courier New', size: 20, color: 'BE185D' });
}

// ── Code block as table ──
function codeBlock(lines) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: cellBorder('D1D5DB'),
            width: { size: 9360, type: WidthType.DXA },
            shading: { fill: 'F9FAFB', type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: lines.map(l => new Paragraph({
              spacing: { before: 20, after: 20 },
              children: [new TextRun({ text: l, font: 'Courier New', size: 18, color: '1F2937' })],
            })),
          }),
        ],
      }),
    ],
  });
}

// ── Two-column data table ──
function dataTable(rows, headerRow = null) {
  const border = cellBorder();
  const makeRow = (cells, isHeader = false) =>
    new TableRow({
      children: cells.map((c, i) =>
        new TableCell({
          borders: border,
          width: { size: i === 0 ? 3600 : 5760, type: WidthType.DXA },
          shading: { fill: isHeader ? '1F2937' : (cells === rows[0] && !headerRow ? 'F9FAFB' : WHITE), type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({
            children: [new TextRun({ text: c, font: 'Arial', size: 20, color: isHeader ? WHITE : '374151', bold: isHeader || i === 0 })],
          })],
        })
      ),
    });

  const tableRows = [];
  if (headerRow) tableRows.push(makeRow(headerRow, true));
  rows.forEach((r, idx) =>
    tableRows.push(new TableRow({
      children: r.map((c, i) =>
        new TableCell({
          borders: border,
          width: { size: i === 0 ? 3600 : 5760, type: WidthType.DXA },
          shading: { fill: idx % 2 === 0 ? WHITE : 'F9FAFB', type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({
            children: [new TextRun({ text: c, font: 'Arial', size: 20, color: '374151', bold: i === 0 })],
          })],
        })
      ),
    }))
  );

  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [3600, 5760], rows: tableRows });
}

// ── Highlight box ──
function highlightBox(lines, color = 'EFF6FF', border_color = 'BFDBFE') {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: cellBorder(border_color),
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: color, type: ShadingType.CLEAR },
        margins: { top: 140, bottom: 140, left: 200, right: 200 },
        children: lines.map(l => new Paragraph({
          spacing: { before: 40, after: 40 },
          children: [new TextRun({ text: l, font: 'Arial', size: 22, color: '1E3A5F' })],
        })),
      })],
    })],
  });
}

// ═══════════════════════════════════
// DOCUMENT BUILD
// ═══════════════════════════════════
const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
      },
    ],
  },
  styles: {
    default: { document: { run: { font: 'Arial', size: 22, color: '374151' } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: 'Arial', color: '111827' },
        paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, font: 'Arial', color: '1F2937' },
        paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MAGENTA, space: 4 } },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'TECH/WHITE', font: 'Arial', size: 20, bold: true, color: MAGENTA }),
            new TextRun({ text: '  —  Cómo fue creada la app web', font: 'Arial', size: 20, color: MUTED }),
          ],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: BORDER_C, space: 4 } },
          spacing: { before: 80 },
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: 'Página ', font: 'Arial', size: 18, color: MUTED }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 18, color: MUTED }),
            new TextRun({ text: ' — TECH/WHITE · Dodoz', font: 'Arial', size: 18, color: MUTED }),
          ],
        })],
      }),
    },
    children: [

      // ─── COVER ───────────────────────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1440, after: 160 },
        children: [new TextRun({ text: 'TECH/WHITE', font: 'Arial', size: 72, bold: true, color: MAGENTA })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: 'Cómo fue creada la app web', font: 'Arial', size: 32, color: '4B5563' })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: 'Documentación del proceso de desarrollo', font: 'Arial', size: 24, color: MUTED, italics: true })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 0 },
        border: { top: { style: BorderStyle.SINGLE, size: 2, color: BORDER_C, space: 4 } },
        children: [new TextRun({ text: 'Autor: Dodoz  ·  Mayo 2026  ·  Versión 1.0', font: 'Arial', size: 20, color: MUTED })],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ─── 1. RESUMEN EJECUTIVO ────────────────────────────────────────────
      sectionTitle('1. Resumen Ejecutivo'),
      body('TECH/WHITE es un prototipo de e-commerce para hardware gaming, monitores y periféricos. Fue construido completamente con tecnologías web nativas (HTML, CSS y JavaScript vanilla) sin depender de ningún framework o librería externa.'),
      spacer(),
      highlightBox([
        'Objetivo: Demostrar que es posible construir una SPA completa y visualmente premium',
        'sin frameworks, sin build tools y sin dependencias npm en runtime.',
        '',
        'Resultado: Una aplicación funcional de +6,000 líneas con 20 productos, carrito,',
        'checkout de 3 pasos, autenticación simulada, hub de cuenta y Setup Builder.',
      ]),
      spacer(),
      body('El proyecto sirve como portafolio técnico y como base para una futura versión con backend real. Está desplegado en Vercel como hosting estático.'),
      spacer(),

      // ─── 2. CONCEPTO Y PROPUESTA DE VALOR ───────────────────────────────
      sectionTitle('2. Concepto y Propuesta de Valor'),
      subTitle('2.1 Idea Original'),
      body('La idea surgió de querer construir un e-commerce gaming que se sintiera como una tienda real de alta gama — sin los compromisos visuales típicos de los plantillas genéricos. El reto: hacerlo 100% vanilla.'),
      spacer(),
      subTitle('2.2 Decisiones de Concepto'),
      dataTable([
        ['Público objetivo', 'Gamers y entusiastas de hardware en México'],
        ['Idioma', 'Español (México) — precios en MXN'],
        ['Nicho', 'Monitores, hardware (GPU/CPU/RAM/SSD/PSU) y periféricos (mouse/teclado/headset)'],
        ['Posicionamiento', 'Tienda dark/futurista, premium, editorial — no genérica'],
        ['Alcance inicial', 'Prototipo frontend-only, sin backend'],
      ], ['Decisión', 'Detalle']),
      spacer(),
      subTitle('2.3 Nombre y Branding'),
      body('El nombre "TECH/WHITE" combina tecnología con un toque de pureza visual. La barra "/" en magenta (#FF1F71) funciona como elemento de marca en el logo y como separador visual en toda la interfaz.'),
      spacer(),

      // ─── 3. STACK TÉCNICO ────────────────────────────────────────────────
      sectionTitle('3. Stack Técnico y Decisiones de Arquitectura'),
      subTitle('3.1 Por Qué Vanilla'),
      body('La decisión de no usar React, Vue o Svelte fue intencional y deliberada:'),
      spacer(),
      bullet('Control total del output HTML/CSS sin capa de abstracción'),
      bullet('Sin proceso de build, sin node_modules en el proyecto'),
      bullet('Archivo único deployable directamente a cualquier CDN'),
      bullet('Demostrar dominio de los fundamentos web antes de usar frameworks'),
      bullet('Carga instantánea sin runtime de framework (sin chunk splitting, sin hydration)'),
      spacer(),
      subTitle('3.2 Arquitectura SPA en Un Solo Archivo'),
      body('Todo el proyecto vive en TECH-WHITE.html: ~3,500 líneas de HTML, ~2,000 de CSS y ~1,300 de JavaScript. La razón:'),
      spacer(),
      bullet('Deploy trivial: subir un archivo y funciona'),
      bullet('Sin problemas de CORS ni rutas relativas entre archivos'),
      bullet('Ideal para prototipos que se demuestran en cualquier entorno'),
      spacer(),
      codeBlock([
        'TECH-WHITE.html   (260 KB)',
        '├── <head>        Google Fonts, meta tags',
        '├── <style>       ~2,000 líneas CSS inline',
        '├── <body>        Navbar, hero, 14 vistas SPA, footer, modales',
        '└── <script>      ~1,300 líneas JS inline',
      ]),
      spacer(),
      subTitle('3.3 Herramientas de Desarrollo'),
      dataTable([
        ['Editor', 'Visual Studio Code'],
        ['Servidor local', 'npx serve . -l 3000 (archivos estáticos)'],
        ['Version control', 'Git + GitHub (repo: Dodozz/TECHWHITE)'],
        ['Deploy', 'Vercel (hosting estático, free tier)'],
        ['Tipografías', 'Google Fonts CDN (Bebas Neue, Rajdhani, Space Mono)'],
        ['Node.js', 'Solo para npx serve — no en runtime de la app'],
      ], ['Herramienta', 'Detalle']),
      spacer(),

      // ─── 4. DISEÑO VISUAL ────────────────────────────────────────────────
      new Paragraph({ children: [new PageBreak()] }),
      sectionTitle('4. Proceso de Diseño Visual'),
      subTitle('4.1 Identidad Visual'),
      body('El sistema de diseño se definió antes de escribir una sola línea de código, estableciendo 7 variables CSS en :root que gobiernan toda la interfaz:'),
      spacer(),
      dataTable([
        ['--bg', '#070B14', 'Negro profundo — fondo principal'],
        ['--surface', '#0D1220', 'Superficies, cards, paneles'],
        ['--border', '#1A2340', 'Líneas de grilla y bordes'],
        ['--mg', '#FF1F71', 'Magenta — CTAs, badges, logo, activos'],
        ['--cy', '#00E5FF', 'Cyan — acentos tech y completado'],
        ['--txt', '#FFFFFF', 'Texto principal'],
        ['--muted', '#A0AEC0', 'Texto secundario'],
      ].map(r => [r[0], r[1] + '  ·  ' + r[2]]),
        ['Variable CSS', 'Valor y uso']),
      spacer(),
      subTitle('4.2 Tipografía'),
      body('Se seleccionaron 3 fuentes de Google Fonts con roles muy específicos:'),
      spacer(),
      bullet('Bebas Neue — Display/hero, logo, precios grandes. Geométrica condensada, máximo impacto'),
      bullet('Rajdhani — Cuerpo de texto, botones, labels. Legible en todos los pesos (300–700)'),
      bullet('Space Mono — Metadatos técnicos, badges, IDs de pedido. Refuerza la estética tech'),
      spacer(),
      subTitle('4.3 Efectos y Animaciones'),
      body('Se implementaron efectos visuales que elevan la percepción sin frameworks de animación:'),
      spacer(),
      dataTable([
        ['Grain overlay', 'SVG feTurbulence noise al 5% — textura de pantalla sobre toda la app'],
        ['Orb float', 'Pseudo-elementos con blur y animación CSS keyframes flotando en el hero'],
        ['Blur on scroll', 'backdrop-filter: blur(20px) en navbar al scrollear > 20px'],
        ['Reveal on scroll', 'IntersectionObserver activa clase .visible con fadeInUp en elementos'],
        ['Gradientes radiales', 'Por categoría: cyan (monitores), magenta (hardware), púrpura (periféricos)'],
        ['Product card hover', 'translateY(-4px) + sombra magenta — feedback premium al hover'],
        ['Cart badge bounce', 'Animación scale keyframe al agregar producto'],
      ], ['Efecto', 'Implementación']),
      spacer(),

      // ─── 5. DESARROLLO DE FEATURES ───────────────────────────────────────
      sectionTitle('5. Desarrollo de las Funcionalidades'),
      subTitle('5.1 Sistema de Navegación SPA'),
      body('El mayor reto de una SPA vanilla es la navegación. Se implementó una función central navigate(view, data) que:'),
      spacer(),
      bullet('Oculta todas las vistas con clase .view'),
      bullet('Activa la vista destino añadiendo la clase .active'),
      bullet('Actualiza los links del navbar con la clase .active'),
      bullet('Hace scroll to top'),
      bullet('Llama a la función de render específica de cada vista'),
      bullet('Protege rutas que requieren auth via requireAuth()'),
      spacer(),
      codeBlock([
        'navigate("product", "h1")  // navega al detalle del producto h1',
        'navigate("checkout")       // requiere auth — redirige a login si no está',
        'navigate("catalogo", { categoria: "monitores" })  // con data',
      ]),
      spacer(),
      subTitle('5.2 Catálogo de Productos'),
      body('El catálogo se diseñó como un objeto JavaScript con 3 categorías (20 productos en total). Cada producto tiene:'),
      spacer(),
      bullet('ID único, nombre, specs resumidas, precio en MXN, marca, badge, descripción larga'),
      bullet('Array tech[][] de especificaciones detalladas para la vista de detalle'),
      bullet('originalPrice para productos en oferta (calcula el descuento visual)'),
      spacer(),
      body('Los filtros (categoría, precio, marca, búsqueda, orden) se aplican en tiempo real con applyFilters(), que re-renderiza la grilla con paginación (12 productos por página).'),
      spacer(),
      subTitle('5.3 Carrito y Persistencia'),
      body('Todo el estado del usuario se persiste en localStorage con prefijo tw_:'),
      spacer(),
      dataTable([
        ['tw_cart', '[{id, qty}]', 'Items y cantidades del carrito'],
        ['tw_favs', '["h1", "p3"]', 'IDs de productos favoritos'],
        ['tw_user', '{name, email, phone}', 'Datos del usuario autenticado'],
        ['tw_orders', '[{id, date, items, total...}]', 'Historial de pedidos'],
        ['tw_addresses', '[{id, alias, calle...}]', 'Direcciones guardadas'],
      ], ['Clave', 'Tipo', 'Contenido']).constructor === Table
        ? dataTable([
            ['tw_cart', '[{id, qty}]  —  Items y cantidades del carrito'],
            ['tw_favs', '["h1", "p3"]  —  IDs de productos favoritos'],
            ['tw_user', '{name, email, phone}  —  Datos del usuario'],
            ['tw_orders', '[{id, date, items, total...}]  —  Historial de pedidos'],
            ['tw_addresses', '[{id, alias, calle...}]  —  Direcciones guardadas'],
          ], ['Clave localStorage', 'Estructura y uso'])
        : new Paragraph({ children: [] }),
      spacer(),
      subTitle('5.4 Checkout de 3 Pasos'),
      body('El flujo de checkout se implementó como un stepper de 3 pasos dentro de una sola vista, manteniendo el estado en el objeto checkoutState:'),
      spacer(),
      bullet('Paso 1: Dirección de envío (lista guardada o agregar nueva) + método (estándar/express)'),
      bullet('Paso 2: Método de pago (tarjeta / OXXO / MercadoPago) con formulario visual'),
      bullet('Paso 3: Revisión completa — dirección, pago, items, totales'),
      bullet('Confirmar: genera ID TW-XXXXXXX, guarda pedido, vacía carrito, navega a confirmación'),
      spacer(),
      subTitle('5.5 Setup Builder — El Feature Estrella'),
      body('El Setup Builder es la funcionalidad más innovadora. Recomienda un build completo basado en presupuesto y caso de uso, usando un algoritmo de asignación por porcentajes:'),
      spacer(),
      dataTable([
        ['Gaming Competitivo', 'Hardware 55% + Monitores 25% + Periféricos 20%'],
        ['Streaming + Gaming', 'Hardware 50% + Periféricos 30% + Monitores 20%'],
        ['Creador de Contenido', 'Monitores 45% + Hardware 40% + Periféricos 15%'],
        ['Productividad / WFH', 'Monitores 45% + Periféricos 35% + Hardware 20%'],
      ], ['Caso de Uso', 'Distribución del Presupuesto']),
      spacer(),
      body('Para cada categoría, el algoritmo busca el producto cuyo precio es más cercano al target asignado, usando Math.abs(precio - target) como criterio de cercanía.'),
      spacer(),

      // ─── 6. RETOS Y SOLUCIONES ───────────────────────────────────────────
      new Paragraph({ children: [new PageBreak()] }),
      sectionTitle('6. Retos Técnicos y Soluciones'),
      subTitle('6.1 Renderizado Dinámico sin Virtual DOM'),
      body('Sin React, todo el DOM se actualiza con innerHTML en funciones de render. El reto fue evitar memory leaks y mantener event listeners activos.'),
      spacer(),
      body('Solución: Inline onclick handlers en el HTML generado. Cada re-render re-inyecta los handlers. Simple, predecible, sin estado "zombie".'),
      spacer(),
      subTitle('6.2 Prevención de XSS'),
      body('Al inyectar datos del usuario (nombre, dirección) directamente en innerHTML, se crea riesgo de XSS. Se implementó una función escapeHtml() que sanitiza los 5 caracteres críticos:'),
      spacer(),
      codeBlock([
        "function escapeHtml(s) {",
        "  return String(s ?? '').replace(/[&<>\"']/g, c => ({",
        "    '&':'&amp;', '<':'&lt;', '>':'&gt;',",
        "    '\"':'&quot;', \"'\":'&#39;'",
        "  }[c]));",
        "}",
      ]),
      spacer(),
      subTitle('6.3 Protección de Rutas'),
      body('Las vistas checkout, cuenta y detalle-pedido requieren autenticación. La solución fue una función requireAuth() que:'),
      spacer(),
      bullet('Verifica si existe el objeto user'),
      bullet('Si no existe, guarda el destino en pendingReturnTo'),
      bullet('Redirige al login'),
      bullet('Al loguearse exitosamente, navega al destino original'),
      spacer(),
      subTitle('6.4 Estado de Pedidos Sin Backend'),
      body('Los pedidos necesitan mostrar estados (Procesando, Enviado, Entregado) sin backend. La solución fue calcular el estado dinámicamente basado en el tiempo transcurrido desde la compra:'),
      spacer(),
      bullet('0–2 días desde la compra: "Procesando"'),
      bullet('2–3 días: "Enviado"'),
      bullet('3+ días: "Entregado"'),
      spacer(),
      body('Esto permite que los pedidos "avancen de estado" automáticamente con el paso del tiempo, dando una ilusión convincente de sistema real.'),
      spacer(),
      subTitle('6.5 Responsive Sin Framework CSS'),
      body('Todo el diseño responsive se logró con 4 breakpoints usando solo media queries:'),
      spacer(),
      bullet('≤ 1024px: Reduce columnas del grid, oculta elementos decorativos del hero'),
      bullet('≤ 768px: Activa menú hamburger, oculta navbar links y búsqueda, grid de 2 columnas'),
      bullet('≤ 640px: Checkout y cuenta se compactan a layout vertical'),
      bullet('≤ 480px: Grid de 1 columna, tipografía reducida, padding compacto'),
      spacer(),

      // ─── 7. ESTRUCTURA DEL PROYECTO ─────────────────────────────────────
      sectionTitle('7. Estructura del Proyecto'),
      body('El repositorio contiene 3 aplicaciones independientes y los archivos de soporte:'),
      spacer(),
      codeBlock([
        'TECHWHITE/',
        '├── TECH-WHITE.html        # E-commerce SPA — 260 KB, 6,115 líneas',
        '├── PORTFOLIO.html         # Portafolio personal DODOZ — 40 KB',
        '├── VOID.html              # Página experimental creativa — 36 KB',
        '├── README.md              # Documentación del repositorio',
        '├── DOCUMENTACION_TECH_WHITE.md  # Referencia técnica completa',
        '├── vercel.json            # Config de despliegue',
        '├── uploads/               # Imágenes de productos (6 PNGs)',
        '│   ├── monitor.png, gpu.png, cpu.png',
        '│   └── keyboard.png, mouse.png, headset.png',
        '└── audit/                 # Screenshots de auditoría visual',
      ]),
      spacer(),
      dataTable([
        ['TECH-WHITE.html', '260 KB / 6,115 líneas — App principal'],
        ['PORTFOLIO.html', '40 KB / ~1,200 líneas — Portafolio DODOZ'],
        ['VOID.html', '36 KB / ~1,180 líneas — Experimental (cream/rust/sage)'],
        ['uploads/', '~16 MB — 6 imágenes PNG de productos'],
      ], ['Archivo / Directorio', 'Tamaño y propósito']),
      spacer(),

      // ─── 8. DESPLIEGUE ────────────────────────────────────────────────────
      new Paragraph({ children: [new PageBreak()] }),
      sectionTitle('8. Proceso de Despliegue en Vercel'),
      body('El despliegue se configuró para que la raíz "/" del dominio sirva directamente TECH-WHITE.html, mientras que las otras páginas son accesibles por su nombre de archivo.'),
      spacer(),
      codeBlock([
        '{',
        '  "name": "tech-prototipo",',
        '  "rewrites": [',
        '    { "source": "/", "destination": "/TECH-WHITE.html" }',
        '  ]',
        '}',
      ]),
      spacer(),
      body('Vercel detecta automáticamente que es un proyecto estático (no hay package.json ni build command) y sirve los archivos directamente desde su CDN global. El proceso de deploy:'),
      spacer(),
      bullet('Push a la rama main del repositorio en GitHub'),
      bullet('Vercel detecta el push automáticamente (integración GitHub)'),
      bullet('Build: ninguno (archivos estáticos)'),
      bullet('Deploy: distribución inmediata a CDN global'),
      bullet('HTTPS: automático, certificado TLS incluido'),
      spacer(),
      highlightBox([
        'Tiempo de deploy: < 30 segundos desde el push al live.',
        'Costo: $0 — Vercel free tier es suficiente para hosting estático.',
      ], 'FFF7ED', 'FED7AA'),
      spacer(),

      // ─── 9. CONTROL DE VERSIONES ─────────────────────────────────────────
      sectionTitle('9. Control de Versiones'),
      body('El proyecto usa Git con GitHub. Historial de commits principales:'),
      spacer(),
      dataTable([
        ['c907534', 'Initial commit'],
        ['f959cf8', 'Mejoras en producto destacado: layout flexbox y animaciones premium'],
        ['f361334', 'Fix: imágenes de catálogo rellenando espacio + imágenes generadas'],
        ['2e9cc16', 'feat: add TECH-WHITE e-commerce, Dodoz portfolio, and VOID page'],
        ['cc556ff', 'merge: resolve conflicts keeping local version'],
        ['0865fa3', 'chore: add find-skills agent skill and skills lock file'],
        ['4a5df7d', 'docs: add README and consolidate technical documentation'],
      ], ['Commit', 'Descripción']),
      spacer(),

      // ─── 10. LIMITACIONES Y NEXT STEPS ──────────────────────────────────
      sectionTitle('10. Limitaciones del Prototipo y Próximos Pasos'),
      subTitle('10.1 Limitaciones Actuales'),
      body('Al ser un prototipo frontend-only, varias funcionalidades son simuladas:'),
      spacer(),
      bullet('Sin backend: no hay API, base de datos ni servidor real'),
      bullet('Autenticación simulada: acepta cualquier email/password (sin hash, sin JWT)'),
      bullet('Pagos visuales: los formularios de tarjeta no procesan transacciones reales'),
      bullet('Descuentos: los códigos SETUP10/TW10 muestran toast pero no modifican totales'),
      bullet('Email: newsletter y confirmaciones no envían emails reales'),
      bullet('Inventario: no hay control de stock real'),
      bullet('Búsqueda: no disponible en mobile (feature gap conocido)'),
      spacer(),
      subTitle('10.2 Roadmap de Próximas Fases'),
      spacer(),
      body('Fase 1 — Producción Mínima:', { bold: true }),
      bullet('Separar en archivos HTML/CSS/JS + bundler (Vite)'),
      bullet('Backend con Node.js + Express + PostgreSQL'),
      bullet('Autenticación real (bcrypt + JWT + refresh tokens)'),
      bullet('Integración de pagos: Stripe o MercadoPago'),
      bullet('Email transaccional (confirmaciones, recuperación de contraseña)'),
      spacer(),
      body('Fase 2 — Features Completas:', { bold: true }),
      bullet('Vista de favoritos dedicada'),
      bullet('Búsqueda funcional en mobile'),
      bullet('Descuentos reales con cálculo de totales'),
      bullet('Reviews y ratings reales por usuario'),
      bullet('Gestión de inventario y stock'),
      spacer(),
      body('Fase 3 — Optimización:', { bold: true }),
      bullet('SEO completo (meta tags, schema.org, sitemap, SSR)'),
      bullet('Performance: lazy loading, code splitting, compresión de imágenes'),
      bullet('Accesibilidad WCAG AA completa'),
      bullet('PWA con service worker y caché offline'),
      bullet('Tests unitarios y E2E'),
      spacer(),

      // ─── CIERRE ───────────────────────────────────────────────────────────
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1440, after: 240 },
        border: {
          top: { style: BorderStyle.SINGLE, size: 6, color: MAGENTA, space: 8 },
          bottom: { style: BorderStyle.SINGLE, size: 6, color: MAGENTA, space: 8 },
        },
        children: [new TextRun({ text: 'Resumen Final', font: 'Arial', size: 28, bold: true, color: MAGENTA })],
      }),
      spacer(),
      highlightBox([
        'TECH/WHITE demuestra que una SPA e-commerce completa y visualmente premium',
        'puede construirse sin ningún framework — solo con HTML, CSS y JavaScript vanilla.',
        '',
        'El proyecto es funcional, responsive, deployado en producción y extensible.',
        'Representa una base sólida para evolucionar hacia una plataforma real.',
      ], 'FFF1F2', 'FECDD3'),
      spacer(),
      body('Construido con JavaScript nativo, desplegado en Vercel, documentado exhaustivamente.', { bold: true, color: '374151' }),
      spacer(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 0 },
        children: [new TextRun({ text: 'TECH/WHITE  ·  Dodoz  ·  2026', font: 'Arial', size: 20, color: MUTED, italics: true })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('COMO_FUE_CREADA_TECHWHITE.docx', buffer);
  console.log('OK — generado: COMO_FUE_CREADA_TECHWHITE.docx');
}).catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
