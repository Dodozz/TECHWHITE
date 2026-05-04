# TECH/WHITE — Documentación Técnica

> Versión actualizada · Mayo 2026

---

## Tabla de Contenidos

1. [Información General](#1-información-general)
2. [Arquitectura Técnica](#2-arquitectura-técnica)
3. [Sistema de Diseño](#3-sistema-de-diseño)
4. [Estructura de Navegación](#4-estructura-de-navegación)
5. [Catálogo de Productos](#5-catálogo-de-productos)
6. [Sistema de Carrito](#6-sistema-de-carrito)
7. [Flujo de Checkout](#7-flujo-de-checkout)
8. [Sistema de Autenticación](#8-sistema-de-autenticación)
9. [Hub de Cuenta](#9-hub-de-cuenta)
10. [Setup Builder](#10-setup-builder)
11. [Secciones Implementadas](#11-secciones-implementadas)
12. [Referencia de Funciones JavaScript](#12-referencia-de-funciones-javascript)
13. [Gestión de Estado](#13-gestión-de-estado)
14. [Diseño Responsive](#14-diseño-responsive)
15. [Configuración de Despliegue](#15-configuración-de-despliegue)
16. [Seguridad y Validación](#16-seguridad-y-validación)
17. [Accesibilidad](#17-accesibilidad)
18. [Rendimiento](#18-rendimiento)
19. [Troubleshooting](#19-troubleshooting)
20. [QA Checklist](#20-qa-checklist)
21. [Limitaciones Conocidas](#21-limitaciones-conocidas)
22. [Roadmap](#22-roadmap)

---

## 1. Información General

| Campo | Detalle |
|-------|---------|
| **Nombre** | TECH/WHITE |
| **Tipo** | E-commerce SPA (prototipo frontend) |
| **Idioma** | Español (México) |
| **Público** | Entusiastas de gaming, hardware y periféricos |
| **Archivo principal** | `TECH-WHITE.html` (~6,115 líneas) |
| **Líneas HTML** | ~3,492 |
| **Líneas CSS** | ~2,000 (inline `<style>`) |
| **Líneas JavaScript** | ~1,300 (inline `<script>`) |
| **Productos** | 20 (6 monitores + 7 hardware + 7 periféricos) |
| **Vistas** | 14 pantallas SPA |
| **Backend** | Ninguno (prototipo frontend-only) |
| **Persistencia** | localStorage |

---

## 2. Arquitectura Técnica

### Estructura Single-File

Todo el código está contenido en un solo archivo HTML:

```
TECH-WHITE.html
├── <head>
│   └── Meta tags, título, Google Fonts
├── <style>
│   ├── Variables CSS (:root)
│   ├── Reset & tipografía base
│   ├── Navbar (fijo, blur on scroll)
│   ├── Componentes (cards, botones, badges, modales, formularios)
│   ├── Animaciones y transiciones
│   ├── Media queries responsive
│   └── Scrollbar personalizado
├── <body>
│   ├── Navbar (#navbar)
│   ├── Hero section (grilla, orbes, stats, producto destacado)
│   ├── Modales (Setup Builder, Newsletter)
│   ├── 14 vistas (div.view con id="view-*")
│   ├── Footer
│   └── Toast container
└── <script>
    ├── Datos de productos (PRODUCTS, ALL_PRODUCTS)
    ├── Estado global (cart, favorites, user, orders, addresses)
    ├── Navegación SPA (navigate())
    ├── Renderizado de componentes
    ├── Lógica de carrito y checkout
    ├── Auth simulada y cuenta
    ├── Setup Builder
    ├── Utilidades (toast, escapeHtml, IntersectionObserver)
    └── Init (DOMContentLoaded)
```

### Stack Tecnológico

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Markup | HTML5 semántico | Sin templates ni componentes externos |
| Estilos | CSS3 + Custom Properties | Variables para tema, sin preprocesador |
| Lógica | JavaScript ES6+ vanilla | Sin framework, sin bundler |
| Fuentes | Google Fonts CDN | 3 familias tipográficas |
| Persistencia | Web Storage API | localStorage para todo el estado del usuario |
| Servidor local | `npx serve . -l 3000` | Archivos estáticos, sin build step |
| Deploy | Vercel | Hosting estático con rewrites |

### Dependencias Externas

- **Google Fonts** — `Bebas Neue`, `Rajdhani`, `Space Mono` (cargadas via `@import`)
- No hay dependencias npm, librerías JS externas ni CDNs adicionales

---

## 3. Sistema de Diseño

### Paleta de Colores

| Variable | Hex | Uso |
|----------|-----|-----|
| `--bg` | `#070B14` | Fondo principal (negro profundo) |
| `--surface` | `#0D1220` | Cards, paneles, superficies |
| `--border` | `#1A2340` | Bordes, líneas de grilla |
| `--mg` | `#FF1F71` | Magenta — CTAs, badges, estados activos, logo slash |
| `--cy` | `#00E5FF` | Cyan — Acentos tech, completado, tracking |
| `--txt` | `#FFFFFF` | Texto principal |
| `--muted` | `#A0AEC0` | Texto secundario, placeholders |
| `--gold` | `#FFD700` | Estrellas de rating, testimonios |

### Tipografía

| Fuente | Uso | Pesos |
|--------|-----|-------|
| **Bebas Neue** | Logo, títulos hero, headings grandes, precios | Regular |
| **Rajdhani** | Cuerpo, UI labels, botones, navegación | 300–700 |
| **Space Mono** | Badges, metadata técnica, IDs de pedido | 400, 700 |

### Componentes Visuales

| Componente | Descripción |
|-----------|-------------|
| **Product Card** | Imagen con gradiente radial por categoría, badge NUEVO/OFERTA, botón favorito, precio, specs, botón agregar |
| **Badge NUEVO** | Fondo `--cy`, texto oscuro |
| **Badge OFERTA** | Fondo `--mg`, texto blanco |
| **Toast** | Notificación flotante inferior, auto-dismiss 2.6s |
| **Modal** | Overlay oscuro con blur, card centrada, animación fade+scale |
| **Stepper** | Nodos numerados con líneas conectoras, estados: activo/hecho/pendiente |
| **Timeline** | Nodos verticales para tracking, con estados done/current/pending |

### Gradientes por Categoría

```css
/* Monitores — cyan */
radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,255,0.15) 0%, rgba(13,18,32,0) 70%)

/* Hardware — magenta */
radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,31,113,0.15) 0%, rgba(13,18,32,0) 70%)

/* Periféricos — púrpura */
radial-gradient(ellipse 80% 60% at 50% 50%, rgba(100,31,255,0.15) 0%, rgba(13,18,32,0) 70%)
```

### Animaciones

| Animación | Aplicación | Descripción |
|-----------|-----------|-------------|
| `grain` | `body::after` | Textura noise superpuesta al 5% opacidad |
| `marquee` | Banner inferior hero | Scroll horizontal infinito |
| `orb-float` | Orbes hero | Flotación suave con blur |
| `fadeInUp` | `.reveal.visible` | Entrada con translate + opacidad |
| `bounce` | Badge del carrito | Escala up/down al agregar producto |
| `slideIn` | `.cart-item` | Entrada lateral de items en carrito |
| `slideOut` | `.cart-item.removing` | Salida lateral al eliminar |
| `blur-on-scroll` | Navbar | `backdrop-filter: blur(20px)` al scrollear > 20px |

### Efectos Especiales

- **Grain overlay** — SVG noise filter con `feTurbulence`, fijado al viewport
- **Scrollbar personalizado** — 4px width, thumb magenta sobre track negro
- **Hover en product cards** — `translateY(-4px)` con sombra `--mg`
- **Imagen de producto hover** — `scale(1.08)` con `drop-shadow` cyan

---

## 4. Estructura de Navegación

### Vistas Disponibles

La SPA tiene 14+ vistas, controladas por la función `navigate(view, data)`:

| Vista | ID del DOM | Descripción | Auth |
|-------|-----------|-------------|------|
| `home` | `view-home` | Página principal, hero, destacados | No |
| `catalogo` | `view-category` | Catálogo general (todas las categorías) | No |
| `monitores` | `view-category` | Filtrado por monitores | No |
| `hardware` | `view-category` | Filtrado por hardware | No |
| `perifericos` | `view-category` | Filtrado por periféricos | No |
| `ofertas` | `view-category` | Filtrado por productos con badge OFERTA | No |
| `product` | `view-product` | Detalle de producto individual | No |
| `carrito` | `view-carrito` | Carrito de compras | No |
| `checkout` | `view-checkout` | Proceso de pago (3 pasos) | Sí |
| `login` | `view-login` | Inicio de sesión | No |
| `register` | `view-register` | Registro de cuenta | No |
| `cuenta` | `view-cuenta` | Hub de cuenta (perfil, pedidos, direcciones) | Sí |
| `confirmacion` | `view-confirmacion` | Confirmación post-compra | No |
| `tracking` | `view-tracking` | Rastreo de envío con timeline | No |
| `detalle-pedido` | `view-detalle-pedido` | Detalle completo de un pedido | Sí |
| `shipping` | `view-shipping` | Info de envíos | No |
| `devoluciones` | `view-devoluciones` | Política de devoluciones | No |
| `privacidad` | `view-privacidad` | Política de privacidad | No |
| `nosotros` | `view-nosotros` | Sobre nosotros / contacto | No |

### Lógica de Navegación

```
navigate(view, data)
  ├── Oculta todas las vistas (.view)
  ├── Actualiza nav-links (clase .active)
  ├── Scroll to top
  └── setTimeout(50ms)
      ├── Si es categoría → loadCategory(view)
      ├── Si es product → loadProductDetail(data)
      ├── Si es carrito → renderCart()
      ├── Si es cuenta/checkout → requireAuth() → render
      ├── Si es confirmacion → renderConfirmacion(data)
      ├── Si es tracking → renderTracking(data)
      └── Activa vista target + initReveal()
```

### Protección de Rutas

Las vistas `cuenta`, `checkout` y `detalle-pedido` requieren autenticación. Si el usuario no está logueado, `requireAuth()` redirige a `login` y almacena el destino original en `pendingReturnTo` para regresar después del login.

---

## 5. Catálogo de Productos

### Inventario Completo

#### Monitores (6 productos)

| ID | Nombre | Specs | Precio | Marca | Badge |
|----|--------|-------|--------|-------|-------|
| m1 | LG UltraGear 27" 144Hz | 144Hz · 1ms · 1080p · IPS | $5,499 | LG | NUEVO |
| m2 | Samsung Odyssey G5 32" Curvo | 165Hz · 1ms · WQHD · VA | $7,299 | Samsung | OFERTA |
| m3 | ASUS ROG Swift 24" 240Hz | 240Hz · 0.5ms · 1080p | $9,899 | ASUS | NUEVO |
| m4 | AOC 24G2 IPS 144Hz | 144Hz · 1ms · IPS · FreeSync | $3,799 | AOC | — |
| m5 | BenQ MOBIUZ 27" 165Hz | 165Hz · 1ms · HDR400 · IPS | $6,199 | BenQ | OFERTA |
| m6 | MSI Optix MAG274QRF | 165Hz · 1ms · WQHD · IPS | $8,299 | MSI | NUEVO |

#### Hardware (7 productos)

| ID | Nombre | Specs | Precio | Marca | Badge |
|----|--------|-------|--------|-------|-------|
| h1 | RTX 4060 Ti 8GB ZOTAC | 4352 CUDA · 8GB GDDR6 · 2535MHz | $11,999 | ZOTAC | OFERTA |
| h2 | RX 7600 8GB Sapphire | 2048 SP · 8GB GDDR6 · FSR 3 | $8,499 | Sapphire | NUEVO |
| h3 | Intel Core i5-14600K | 14 núcleos · 24 hilos · 5.3GHz | $5,299 | Intel | NUEVO |
| h4 | AMD Ryzen 5 7600X | 6C/12T · 5.3GHz · AM5 | $4,899 | AMD | — |
| h5 | Corsair Vengeance 32GB DDR5 | 32GB · DDR5-5600 · CL36 | $2,499 | Corsair | OFERTA |
| h6 | Samsung 980 Pro 1TB NVMe | 1TB · PCIe 4.0 · 7000MB/s | $1,899 | Samsung | OFERTA |
| h7 | EVGA 650W 80+ Gold | 650W · 80+ Gold · Semi-modular | $1,599 | EVGA | — |

#### Periféricos (7 productos)

| ID | Nombre | Specs | Precio | Marca | Badge |
|----|--------|-------|--------|-------|-------|
| p1 | Logitech G Pro X Superlight 2 | 32000 DPI · 95g · LIGHTSPEED | $2,799 | Logitech | NUEVO |
| p2 | Razer BlackWidow V3 TKL | Green Switch · TKL · RGB Chroma | $2,199 | Razer | NUEVO |
| p3 | HyperX Cloud Alpha S | 7.1 Virtual · 3.5mm · 38Ω | $1,899 | HyperX | OFERTA |
| p4 | Corsair K70 RGB MK.2 | Cherry MX Red · Full-size · RGB | $2,499 | Corsair | — |
| p5 | SteelSeries Arctis Nova 7 | Wireless · 2.4GHz · 38h batería | $3,199 | SteelSeries | NUEVO |
| p6 | Razer DeathAdder V3 | 30000 DPI · 59g · USB-C | $1,499 | Razer | — |
| p7 | ASUS ROG Scabbard II XL | XL 900x400mm · Anti-fray · Impermeable | $699 | ASUS | — |

### Estructura de Datos de Producto

```javascript
{
  id: 'h1',                    // Identificador único
  name: 'RTX 4060 Ti 8GB',    // Nombre display
  specs: '4352 CUDA · 8GB',   // Specs resumidas
  price: 11999,               // Precio en MXN
  brand: 'ZOTAC',             // Marca
  badge: 'OFERTA',            // 'NUEVO' | 'OFERTA' | undefined
  originalPrice: 14999,       // Precio original (solo si badge='OFERTA')
  cat: 'hardware',            // Categoría
  desc: 'Descripción larga',  // Descripción completa
  tech: [                     // Especificaciones técnicas (array de pares)
    ['Arquitectura', 'Ada Lovelace'],
    ['CUDA Cores', '4352'],
    ...
  ]
}
```

### Categoría de Ofertas

La categoría `ofertas` se genera dinámicamente filtrando productos con `badge === 'OFERTA'`:

```javascript
PRODUCTS.ofertas = ALL_PRODUCTS.filter(p => p.badge === 'OFERTA');
```

Actualmente: m2, m5, h1, h5, h6, p3 (6 productos en oferta).

### Filtros del Catálogo

| Filtro | Tipo | Descripción |
|--------|------|-------------|
| Categoría | Radio buttons | all, monitores, hardware, perifericos, ofertas |
| Precio | Rango numérico | Mín / Máx (input text) |
| Marca | Checkboxes | Derivadas dinámicamente de los productos visibles |
| Búsqueda | Texto libre | Busca en `name` y `specs` |
| Ordenar | Select | Precio ↑, Precio ↓, Más nuevos |

Paginación: 12 productos por página (`PER_PAGE = 12`).

### Imágenes de Producto

Las imágenes se asignan por categoría y nombre del producto en `catIcon(p)`:

| Categoría | Lógica | Imagen |
|-----------|--------|--------|
| Monitores | Siempre | `uploads/monitor.png` |
| Hardware | Contiene "RTX", "RX", "GeForce", "Radeon" | `uploads/gpu.png` |
| Hardware | Resto | `uploads/cpu.png` |
| Periféricos | Contiene "teclado", "Corsair", "Keyboard" | `uploads/keyboard.png` |
| Periféricos | Contiene "mouse", "DeathAdder" | `uploads/mouse.png` |
| Periféricos | Resto | `uploads/headset.png` |

---

## 6. Sistema de Carrito

### Flujo del Carrito

```
addToCart(id, qty)
  ├── Busca producto en ALL_PRODUCTS
  ├── Si existe en cart → incrementa qty
  ├── Si no existe → push {id, qty}
  ├── saveCart() → localStorage
  ├── updateBadge() → actualiza contador con animación bounce
  └── showToast() → confirmación visual
```

### Funciones del Carrito

| Función | Descripción |
|---------|-------------|
| `addToCart(id, qty)` | Agrega producto al carrito (o incrementa cantidad) |
| `removeFromCart(id)` | Elimina con animación slideOut (300ms delay) |
| `updateCartQty(id, delta)` | Modifica cantidad (mínimo 1) |
| `saveCart()` | Persiste en `localStorage.tw_cart` |
| `updateBadge()` | Actualiza badge numérico con animación bounce |
| `renderCart()` | Renderiza lista de items y resumen |
| `updateSummary()` | Calcula subtotal, envío y total |
| `applyDiscount()` | Valida códigos de descuento |

### Códigos de Descuento

| Código | Comportamiento |
|--------|---------------|
| `SETUP10` | Muestra toast "10% off aplicado" (visual únicamente) |
| `TW10` | Mismo efecto que SETUP10 |
| Otro | Toast "Código no válido. Prueba SETUP10" |

> **Nota:** Los códigos de descuento son visuales. No modifican los totales calculados. Es una limitación conocida del prototipo.

### Envío

- **Gratis** si el subtotal ≥ $1,500
- **$150** si el subtotal < $1,500
- **Express** $199 (seleccionable en checkout)

---

## 7. Flujo de Checkout

### Stepper de 3 Pasos

```
Paso 1: Envío            Paso 2: Pago           Paso 3: Revisar
┌──────────────────┐    ┌──────────────────┐   ┌──────────────────┐
│ Dirección de     │    │ Método de pago:  │   │ Resumen completo │
│ envío (lista o   │    │ · Tarjeta        │   │ con dirección,   │
│ agregar nueva)   │    │ · OXXO           │   │ pago, items y    │
│                  │    │ · MercadoPago    │   │ totales          │
│ Método de envío: │    │                  │   │                  │
│ · Estándar       │    │ Form de tarjeta  │   │ Botón CONFIRMAR  │
│ · Express ($199) │    │ (si aplica)      │   │                  │
└──────────────────┘    └──────────────────┘   └──────────────────┘
```

### Estado del Checkout

```javascript
checkoutState = {
  step: 1,           // Paso actual (1, 2 o 3)
  addressId: null,   // ID de dirección seleccionada
  shipping: 'std',   // 'std' | 'express'
  payment: 'tarjeta' // 'tarjeta' | 'oxxo' | 'mp'
}
```

### Métodos de Pago

| Método | Label | Descripción |
|--------|-------|-------------|
| `tarjeta` | Tarjeta de crédito/débito | VISA · Mastercard · AMEX (formulario visual, sin procesamiento) |
| `oxxo` | OXXO | Pago en efectivo, vence en 48h |
| `mp` | MercadoPago | Saldo o tarjeta · 12 MSI disponibles |

### Confirmación del Pedido

Al confirmar (`submitCheckout()`):

1. Genera ID único: `TW-` + timestamp en base36
2. Crea objeto de pedido con items, totales, dirección y método de pago
3. Guarda en `orders` → localStorage
4. Vacía el carrito
5. Navega a vista de confirmación con ETA estimada (2-5 días)

---

## 8. Sistema de Autenticación

### Flujo de Login

```
doLogin()
  ├── Valida email y password (existencia, no validación real)
  ├── Crea objeto user { email, name: email.split('@')[0], phone }
  ├── saveUser() → localStorage.tw_user
  ├── refreshAuthClass() → body.is-authed
  ├── Toast "Bienvenid@, {nombre}"
  └── Redirige a pendingReturnTo o 'cuenta'
```

### Flujo de Registro

```
doRegister()
  ├── Valida: nombre, email, contraseñas coincidan, términos aceptados
  ├── Crea objeto user { email, name, phone: '' }
  ├── saveUser() → localStorage.tw_user
  ├── Toast "Cuenta creada · Bienvenid@"
  └── Redirige a pendingReturnTo o 'cuenta'
```

### Indicador Visual de Sesión

Cuando el usuario está autenticado, `body` recibe la clase `is-authed`, que activa un punto azul (dot) sobre el ícono de usuario en el navbar.

### Logout

`doLogout()` — Limpia `user`, elimina `tw_user` de localStorage, refresca clase, toast y navega a home.

> **Limitaciones:** No hay validación real de contraseñas, hash ni backend. La contraseña no se almacena. El login acepta cualquier email/password no vacíos.

---

## 9. Hub de Cuenta

### Tabs del Hub

| Tab | Función | Contenido |
|-----|---------|-----------|
| `perfil` | `renderProfileTab()` | Formulario editable: nombre, email, teléfono |
| `pedidos` | `renderOrdersTab()` | Lista de pedidos con estado, fecha, total, links a detalle y tracking |
| `direcciones` | `renderAddressesTab()` | Lista de direcciones, marcar predeterminada, eliminar, agregar nueva |

### Estructura de Dirección

```javascript
{
  id: 'a' + Date.now(),  // ID único basado en timestamp
  alias: 'Casa',          // Nombre descriptivo
  calle: 'Av. Reforma 1', // Calle y número
  colonia: 'Centro',      // Colonia
  ciudad: 'CDMX',         // Ciudad / Estado
  cp: '06600',             // Código postal
  telefono: '55 1234 5678',// Teléfono
  isDefault: true          // ¿Es la predeterminada?
}
```

### Estados de Pedido

Los estados se calculan dinámicamente basados en el tiempo transcurrido desde la creación (`orderStatus(o)`):

| Días desde creación | Estado | Clase CSS | Step |
|---------------------|--------|-----------|------|
| 0–2 días | Procesando | `.processing` | 1 |
| 2–3 días | Enviado | `.shipped` | 2 |
| 3+ días | Entregado | `.delivered` | 3 |

### Vista de Tracking

Muestra una timeline vertical con 4 nodos (Pedido recibido → Procesando → Enviado → Entregado) y datos simulados del courier (DHL Express MX).

---

## 10. Setup Builder

### Descripción

Feature exclusiva que recomienda un build completo basado en presupuesto y caso de uso. Funciona en 3 pasos dentro de un modal.

### Flujo

```
Paso 1: Seleccionar caso de uso (4 opciones)
Paso 2: Ingresar presupuesto ($5,000 – $50,000 MXN)
Paso 3: Ver resultado con recomendaciones y "Agregar todo al carrito"
```

### Casos de Uso

| ID | Nombre | Descripción | Prioridad |
|----|--------|-------------|-----------|
| `gaming` | Gaming Competitivo | Alto FPS, baja latencia | Hardware > Monitores > Periféricos |
| `streaming` | Streaming + Gaming | Encoding + performance | Hardware > Periféricos > Monitores |
| `creator` | Creador de Contenido | Edición video/foto/3D | Monitores > Hardware > Periféricos |
| `work` | Productividad / WFH | Multitarea profesional | Monitores > Periféricos > Hardware |

### Algoritmo de Asignación

El presupuesto se distribuye por porcentaje según el caso de uso:

| Caso | Hardware | Monitores | Periféricos |
|------|----------|-----------|-------------|
| Gaming | 55% | 25% | 20% |
| Streaming | 50% | 20% | 30% |
| Creator | 40% | 45% | 15% |
| Work | 20% | 45% | 35% |

Para cada categoría:
1. Calcula `target = presupuesto × porcentaje`
2. Ordena productos por cercanía al target (`Math.abs(precio - target)`)
3. Selecciona el producto más cercano

El resultado muestra los 3 productos recomendados, el total, y si queda margen o se excede el presupuesto.

---

## 11. Secciones Implementadas

### 11.1 Hero Section

- Grilla decorativa con líneas de borde
- Orbes flotantes con animación `orb-float`
- Estadísticas animadas (20+ productos, 4 categorías, envío gratis, soporte)
- Producto destacado (RTX 4060 Ti — `h1`)
- Marquee horizontal con items rotando
- CTA principal hacia catálogo
- CTA secundario para Setup Builder

### 11.2 Featured Showcase

Muestra 6 productos destacados en la home (excluyendo h1 que ya aparece en el hero). Renderiza con `loadFeatured()` usando `renderProductCard()`.

### 11.3 Banner de Ofertas

Sección visual con CTA hacia la categoría de ofertas. Muestra contador de productos en oferta.

### 11.4 Testimonios

3 testimonios con:
- Rating de estrellas (★)
- Texto del review
- Nombre y rol del reviewer
- Estilo editorial con comillas tipográficas

### 11.5 Newsletter

- Input de email con validación básica (`includes('@')`)
- Función `subscribeNewsletter()` — solo muestra toast de confirmación
- No envía emails reales

### 11.6 Página "Nosotros"

- Sección de misión y visión
- Stats de la empresa
- Formulario de contacto (`sendContact()`) — validación de campos, toast de éxito, sin envío real

### 11.7 Vista de Confirmación

Post-checkout, muestra:
- ID del pedido (formato `TW-XXXXXXX`)
- ETA estimada (2-5 días desde la compra)
- Total cobrado
- Nota sobre email de confirmación
- CTA para ver detalle o seguir comprando

### 11.8 Vista de Tracking

Timeline vertical con 4 estados y datos simulados de courier DHL.

### 11.9 Páginas Legales

- Envíos (`view-shipping`)
- Devoluciones (`view-devoluciones`)
- Privacidad (`view-privacidad`)

### 11.10 Detalle de Pedido

Vista completa de un pedido con:
- Items comprados con cantidades y precios
- Dirección de envío
- Método de pago
- Totales (subtotal, envío, total)
- Botón "Rastrear envío"
- Botón "Volver a comprar" (`reorder()` — agrega todos los items al carrito)

---

## 12. Referencia de Funciones JavaScript

### Navegación

| Función | Parámetros | Descripción |
|---------|-----------|-------------|
| `navigate(view, data)` | `view`: string, `data`: any | Navega a una vista SPA |
| `requireAuth(targetView, data)` | `targetView`: string | Verifica auth, redirige a login si no |
| `initReveal()` | — | Activa IntersectionObserver en `.reveal` |

### Productos y Catálogo

| Función | Parámetros | Descripción |
|---------|-----------|-------------|
| `renderProductCard(p, small)` | `p`: product, `small`: bool | Genera HTML de card de producto |
| `loadFeatured()` | — | Carga 6 productos destacados en home |
| `loadCategory(view, preselectCat)` | `view`: string | Carga vista de categoría con filtros |
| `baseProductsFor(view, preselectCat)` | `view`: string | Retorna array base de productos |
| `applyFilters()` | — | Aplica filtros de precio, marca, búsqueda, orden |
| `renderCategoryProducts()` | — | Renderiza grilla paginada |
| `onCatFilterChange()` | — | Handler de cambio de radio de categoría |
| `setView(v)` | `v`: 'grid' \| 'list' | Toggle vista grilla/lista |
| `loadProductDetail(id)` | `id`: string | Carga detalle completo de producto |
| `changeQty(delta)` | `delta`: number | Modifica cantidad en detalle |
| `switchThumb(idx, el)` | `idx`: number | Cambia thumbnail activo |
| `productBg(cat)` | `cat`: string | Retorna gradiente CSS por categoría |
| `catIcon(p)` | `p`: product | Retorna HTML de imagen por tipo |

### Carrito

| Función | Parámetros | Descripción |
|---------|-----------|-------------|
| `addToCart(id, qty)` | `id`: string, `qty`: number | Agrega al carrito |
| `removeFromCart(id)` | `id`: string | Elimina del carrito con animación |
| `updateCartQty(id, delta)` | `id`: string, `delta`: number | Modifica cantidad |
| `saveCart()` | — | Persiste carrito en localStorage |
| `updateBadge()` | — | Actualiza badge del carrito |
| `renderCart()` | — | Renderiza vista del carrito |
| `updateSummary()` | — | Calcula y muestra totales |
| `applyDiscount()` | — | Valida código de descuento |

### Favoritos

| Función | Parámetros | Descripción |
|---------|-----------|-------------|
| `toggleFav(id, btn)` | `id`: string, `btn`: element | Toggle favorito |
| `toggleFavDetail(id)` | `id`: string | Toggle desde vista de detalle |

### Autenticación y Cuenta

| Función | Parámetros | Descripción |
|---------|-----------|-------------|
| `doLogin()` | — | Procesa login |
| `doRegister()` | — | Procesa registro |
| `doLogout()` | — | Cierra sesión |
| `saveUser()` | — | Persiste usuario en localStorage |
| `refreshAuthClass()` | — | Toggle `body.is-authed` |
| `userBtnClick()` | — | Click en ícono de usuario |
| `renderAccount()` | — | Renderiza hub de cuenta |
| `showAccountTab(tab)` | `tab`: string | Cambia tab activo |
| `renderProfileTab()` | — | HTML del tab perfil |
| `renderOrdersTab()` | — | HTML del tab pedidos |
| `renderAddressesTab()` | — | HTML del tab direcciones |
| `saveProfile()` | — | Guarda cambios de perfil |
| `addAddress()` | — | Agrega nueva dirección |
| `setDefaultAddress(id)` | `id`: string | Marca dirección como default |
| `deleteAddress(id)` | `id`: string | Elimina dirección |
| `toggleAddressForm()` | — | Toggle formulario de nueva dirección |

### Checkout

| Función | Parámetros | Descripción |
|---------|-----------|-------------|
| `initCheckout()` | — | Inicializa estado del checkout |
| `renderCheckoutStepper()` | — | Renderiza stepper visual |
| `renderCheckoutSummary()` | — | Renderiza resumen lateral |
| `renderCheckoutBody()` | — | Renderiza paso actual |
| `renderShippingStep()` | — | HTML del paso 1 (envío) |
| `renderPaymentStep()` | — | HTML del paso 2 (pago) |
| `renderReviewStep()` | — | HTML del paso 3 (revisión) |
| `ckGoStep(n)` | `n`: number | Navega a paso N del checkout |
| `submitCheckout()` | — | Confirma pedido y genera orden |
| `selectCheckoutAddr(id)` | `id`: string | Selecciona dirección en checkout |
| `selectShipping(s)` | `s`: string | Selecciona método de envío |
| `selectPayment(p)` | `p`: string | Selecciona método de pago |
| `ckToggleAddrForm()` | — | Toggle form dirección en checkout |
| `ckSaveNewAddr()` | — | Guarda dirección desde checkout |

### Pedidos y Tracking

| Función | Parámetros | Descripción |
|---------|-----------|-------------|
| `orderStatus(o)` | `o`: order | Calcula estado del pedido por tiempo |
| `formatDate(ts)` | `ts`: number | Formato fecha legible (es-MX) |
| `renderOrderDetail(id)` | `id`: string | Renderiza detalle de pedido |
| `renderConfirmacion(orderId)` | `orderId`: string | Renderiza confirmación |
| `renderTracking(orderId)` | `orderId`: string | Renderiza tracking con timeline |
| `paymentLabel(key)` | `key`: string | Label legible del método de pago |
| `reorder(orderId)` | `orderId`: string | Re-agrega items de un pedido al carrito |

### Setup Builder

| Función | Parámetros | Descripción |
|---------|-----------|-------------|
| `openBuilder()` | — | Abre modal del builder |
| `closeBuilder()` | — | Cierra modal |
| `bNext(step)` | `step`: number | Navega a paso del builder |
| `bSelectUse(id)` | `id`: string | Selecciona caso de uso |
| `bGenerate()` | — | Ejecuta algoritmo de recomendación |
| `bAddAllToCart()` | — | Agrega todos los picks al carrito |

### Utilidades

| Función | Parámetros | Descripción |
|---------|-----------|-------------|
| `showToast(msg)` | `msg`: string | Muestra notificación flotante (2.6s) |
| `escapeHtml(s)` | `s`: string | Sanitiza HTML para prevenir XSS |
| `toggleSearch()` | — | Abre/cierra barra de búsqueda |
| `toggleMobile()` | — | Abre/cierra menú mobile |
| `initMarquee()` | — | Genera contenido del marquee horizontal |
| `sendContact()` | — | Procesa formulario de contacto |
| `subscribeNewsletter()` | — | Procesa suscripción newsletter |

### Inicialización

```javascript
DOMContentLoaded → {
  initMarquee()      // Genera marquee text
  loadFeatured()     // Carga productos destacados
  updateBadge()      // Restaura badge del carrito
  initReveal()       // Activa scroll reveal
  refreshAuthClass() // Restaura estado de auth
}
```

---

## 13. Gestión de Estado

### Variables Globales

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `PRODUCTS` | Object | Catálogo organizado por categoría |
| `ALL_PRODUCTS` | Array | Todos los productos (flat) |
| `cart` | Array | Items en el carrito `[{id, qty}]` |
| `favorites` | Array | IDs de productos favoritos |
| `currentView` | String | Vista actual |
| `currentCategory` | String | Categoría actual del catálogo |
| `currentProduct` | String | ID del producto en detalle |
| `filteredProducts` | Array | Productos filtrados en catálogo |
| `currentPage` | Number | Página actual de paginación |
| `PER_PAGE` | Number | Constante: 12 |
| `user` | Object\|null | Usuario autenticado |
| `orders` | Array | Historial de pedidos |
| `addresses` | Array | Direcciones guardadas |
| `pendingReturnTo` | Object\|null | Destino post-login |
| `checkoutState` | Object | Estado del proceso de checkout |
| `bUseCase` | String\|null | Caso de uso seleccionado en builder |
| `bLastPicks` | Array | Última recomendación del builder |
| `confirmLastId` | String\|null | ID del último pedido confirmado |
| `activeAccountTab` | String | Tab activo en hub de cuenta |
| `USE_CASES` | Array | Configuración de casos de uso del builder |

### Claves de localStorage

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `tw_cart` | JSON Array | Carrito: `[{id: 'h1', qty: 2}, ...]` |
| `tw_favs` | JSON Array | Favoritos: `['h1', 'p3', ...]` |
| `tw_user` | JSON Object\|null | Usuario: `{name, email, phone}` |
| `tw_orders` | JSON Array | Pedidos: `[{id, date, items, total, ...}]` |
| `tw_addresses` | JSON Array | Direcciones: `[{id, alias, calle, ...}]` |

### Flujo de Persistencia

```
Acción del usuario
  → Modifica variable global
  → Llama función save*()
  → JSON.stringify() → localStorage.setItem()
  → Re-render del componente afectado

Carga de página
  → JSON.parse(localStorage.getItem()) || default
  → Variables globales inicializadas
  → DOMContentLoaded → render inicial
```

---

## 14. Diseño Responsive

### Breakpoints

| Breakpoint | Cambios Principales |
|-----------|-------------------|
| **≤ 1024px** | Grid de productos reduce columnas, oculta elementos flotantes del hero |
| **≤ 768px** | Hamburger menu activo, oculta nav-links y búsqueda desktop, drawer mobile, grid 2 columnas |
| **≤ 640px** | Checkout y cuenta se compactan, grids a 1 columna en formularios |
| **≤ 480px** | Grid de productos a 1 columna, padding reducido, tipografía más compacta |

### Navegación Mobile

- **Hamburger** — Ícono de 3 barras en `nav-right`, visible ≤ 768px
- **Overlay** — Fondo oscuro semi-transparente con `toggleMobile()`
- **Drawer** — Panel lateral con links de navegación, botón de cerrar
- **Búsqueda** — No disponible en mobile (feature gap conocido)

### Comportamiento de Grid

```css
/* Desktop (> 1024px) */
.product-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }

/* Tablet (≤ 768px) */
.product-grid { grid-template-columns: repeat(2, 1fr); }

/* Mobile (≤ 480px) */
.product-grid { grid-template-columns: 1fr; }
```

---

## 15. Configuración de Despliegue

### Vercel

```json
{
  "name": "tech-prototipo",
  "rewrites": [
    { "source": "/", "destination": "/TECH-WHITE.html" }
  ]
}
```

- **Project ID:** `prj_b8uOYIw8zvwUt2eoRXjPfapp4u38`
- **Team/Org ID:** `team_hp7l2o0FIaucfpnUMDVd3vmL`
- La raíz `/` redirige a `TECH-WHITE.html`
- El resto de archivos se sirven directamente (`PORTFOLIO.html`, `VOID.html`, `uploads/*`)

### Desarrollo Local

```bash
# Opción 1: Servidor estático
npx serve . -l 3000

# Opción 2: Abrir directamente
# Doble click en TECH-WHITE.html (funciona sin servidor)
```

No requiere `npm install`, build step ni compilación.

---

## 16. Seguridad y Validación

### Medidas Implementadas

| Medida | Implementación |
|--------|---------------|
| **XSS prevention** | `escapeHtml(s)` — sanitiza `& < > " '` en contenido dinámico |
| **Validación de formularios** | Checks de campos vacíos, formato de email básico (`includes('@')`) |
| **Autocomplete off** | Campos de tarjeta de crédito deshabilitados |
| **Aviso de prototipo** | Card-warning en checkout: "No uses tarjeta real" |

### Consideraciones

- **Contraseñas no se almacenan** — El login acepta cualquier valor no vacío
- **Sin HTTPS enforcement** — Dependiente del hosting (Vercel lo provee)
- **Sin CSRF/CORS** — No hay backend que proteger
- **localStorage sin encriptación** — Los datos del usuario son accesibles desde DevTools
- **Sin rate limiting** — No hay backend para implementarlo

---

## 17. Accesibilidad

### Estado Actual

| Aspecto | Estado |
|---------|--------|
| Contraste de colores | Parcial — texto `--muted` puede no cumplir WCAG AA sobre `--bg` |
| Focus visible | Parcial — Algunos botones tienen outline, otros no |
| Semántica HTML | Parcial — Usa `div` donde `button`, `nav`, `main` serían más apropiados |
| ARIA labels | Mínimo — Falta en íconos SVG, modales, estados dinámicos |
| Navegación por teclado | Limitado — Onclick en divs no son accesibles por teclado |
| Screen readers | No testeado |
| Reducción de movimiento | No implementado (`prefers-reduced-motion`) |
| Zoom / texto grande | No testeado |

### Mejoras Recomendadas

- Agregar `role`, `aria-label`, `aria-expanded` a elementos interactivos
- Reemplazar `div onclick` con `<button>` o `<a>` semánticos
- Implementar `prefers-reduced-motion` para desactivar animaciones
- Agregar `skip to content` link
- Mejorar contraste del texto `--muted` sobre fondos oscuros
- Trap focus en modales (Setup Builder, Newsletter)

---

## 18. Rendimiento

### Métricas del Archivo

| Métrica | Valor |
|---------|-------|
| Tamaño total HTML | ~260 KB |
| Líneas de código | ~6,115 |
| CSS inline | ~2,000 líneas |
| JS inline | ~1,300 líneas |
| Imágenes de producto | 6 PNGs (~16 MB total en `/uploads`) |
| Google Fonts | 3 familias (carga externa) |

### Consideraciones

- **Single-file** — Todo el CSS/JS se carga sincrónicamente, sin code splitting
- **Sin lazy loading** — Las imágenes de productos se cargan con el DOM
- **Google Fonts CDN** — Dependencia de red, sin fallback local
- **SVG inline** — Los íconos están inlined (no usan sprite sheet)
- **IntersectionObserver** — Usado para reveal animations (eficiente)
- **Event delegation** — Limitado, la mayoría de handlers son inline `onclick`

### Optimizaciones Posibles

- Separar CSS/JS en archivos externos con `defer`/`async`
- Implementar lazy loading de imágenes (`loading="lazy"`)
- Comprimir imágenes de producto (actualmente ~16 MB)
- Preconnect a Google Fonts (`<link rel="preconnect">`)
- Usar sprite SVG para íconos repetidos
- Implementar service worker para cache offline

---

## 19. Troubleshooting

### Problemas Comunes

| Problema | Causa | Solución |
|----------|-------|----------|
| El carrito se vacía al recargar | localStorage deshabilitado o modo incógnito estricto | Verificar que localStorage esté habilitado |
| Los productos no se ven | Imágenes en `uploads/` no encontradas | Verificar que las imágenes existan y las rutas sean correctas |
| El checkout no permite avanzar | No hay dirección guardada | Agregar dirección en paso 1 o en hub de cuenta |
| Login no funciona | — | Cualquier email con `@` y contraseña no vacía debería funcionar |
| Búsqueda no aparece en mobile | Feature gap conocido | La búsqueda solo existe en desktop (> 768px) |
| Códigos de descuento no aplican | Comportamiento intencional del prototipo | Los códigos solo muestran toast visual, no modifican totales |
| La página carga lento | Imágenes pesadas, Google Fonts | Comprimir imágenes, usar `font-display: swap` |
| Toast no desaparece | Bug raro de timing | Auto-dismiss configurado a 2.6s, recargar página |

### Cómo Limpiar Estado

```javascript
// Limpiar todo el estado de la aplicación
localStorage.removeItem('tw_cart');
localStorage.removeItem('tw_favs');
localStorage.removeItem('tw_user');
localStorage.removeItem('tw_orders');
localStorage.removeItem('tw_addresses');
location.reload();
```

---

## 20. QA Checklist

### Navegación y UI

- [ ] Navbar fija con blur al scrollear
- [ ] Logo navega a home
- [ ] Links de navegación cambian de vista
- [ ] Menú hamburger funciona en mobile
- [ ] Drawer se cierra al navegar
- [ ] Scroll to top al cambiar de vista
- [ ] Breadcrumbs funcionales en detalle y categorías

### Productos

- [ ] Catálogo muestra 20 productos
- [ ] Filtro por categoría funciona
- [ ] Filtro por precio funciona
- [ ] Filtro por marca funciona
- [ ] Búsqueda por nombre/specs funciona
- [ ] Ordenamiento precio ASC/DESC funciona
- [ ] Paginación funciona (12 por página)
- [ ] Toggle grid/list funciona
- [ ] Detalle de producto carga correctamente
- [ ] Specs técnicas se muestran en tabla
- [ ] Thumbnails cambian al clickear
- [ ] Productos relacionados se muestran

### Carrito

- [ ] Agregar producto incrementa badge
- [ ] Agregar duplicado incrementa cantidad
- [ ] Modificar cantidad en carrito funciona
- [ ] Eliminar producto con animación
- [ ] Subtotal se calcula correctamente
- [ ] Envío gratis si subtotal ≥ $1,500
- [ ] Envío $150 si subtotal < $1,500
- [ ] Carrito persiste al recargar

### Checkout

- [ ] Requiere autenticación
- [ ] Stepper visual avanza correctamente
- [ ] Selección de dirección funciona
- [ ] Agregar nueva dirección en checkout
- [ ] Selección de envío actualiza costos
- [ ] 3 métodos de pago seleccionables
- [ ] Revisión muestra resumen completo
- [ ] Confirmar genera pedido y vacía carrito
- [ ] Vista de confirmación muestra datos

### Auth y Cuenta

- [ ] Login con email/password funciona
- [ ] Registro con validación de campos
- [ ] Indicador visual de sesión activa
- [ ] Logout limpia estado
- [ ] Perfil editable y guardable
- [ ] Agregar/eliminar direcciones
- [ ] Marcar dirección predeterminada
- [ ] Historial de pedidos visible
- [ ] Detalle de pedido con items y totales
- [ ] Tracking con timeline visual
- [ ] "Volver a comprar" funciona

### Setup Builder

- [ ] Modal se abre y cierra correctamente
- [ ] 4 casos de uso seleccionables
- [ ] Slider de presupuesto funciona
- [ ] Genera recomendación coherente
- [ ] "Agregar todo al carrito" funciona
- [ ] Navega al carrito después de agregar

---

## 21. Limitaciones Conocidas

### No Implementado (Prototipo)

| Feature | Estado | Prioridad |
|---------|--------|-----------|
| Backend / API | No existe | Alta |
| Base de datos | No existe | Alta |
| Procesamiento de pagos real | Solo visual | Alta |
| Autenticación real (hash, JWT) | Solo localStorage | Alta |
| Email transaccional | No existe | Media |
| Gestión de inventario / stock | No existe | Media |
| Vista de favoritos dedicada | Datos se guardan, no hay UI | Media |
| Búsqueda mobile | Oculta en ≤ 768px | Media |
| Descuentos funcionales | Solo toast visual | Baja |
| Reviews / ratings reales | Hardcoded (24 reseñas, 4-5 estrellas) | Baja |
| Comparador de productos | No existe | Baja |
| Wishlist compartible | No existe | Baja |
| SEO (meta tags, schema.org, sitemap) | No implementado | Baja |
| Páginas legales completas | Contenido placeholder | Baja |
| Internacionalización (i18n) | Solo español | Baja |
| PWA / Service Worker | No implementado | Baja |
| Tests automatizados | No existen | Media |

---

## 22. Roadmap

### Fase 1 — Producción Mínima

- [ ] Separar HTML/CSS/JS en archivos independientes
- [ ] Implementar backend (Node.js / API REST)
- [ ] Base de datos para productos, usuarios, pedidos
- [ ] Autenticación real con hash de contraseñas
- [ ] Integración de pagos (Stripe, MercadoPago)
- [ ] Email transaccional (confirmaciones, recuperación)

### Fase 2 — Features Completas

- [ ] Vista de favoritos dedicada
- [ ] Búsqueda funcional en mobile
- [ ] Descuentos reales con cálculo de totales
- [ ] Gestión de inventario y stock
- [ ] Reviews y ratings por usuario
- [ ] Comparador de productos

### Fase 3 — Optimización

- [ ] SEO completo (meta, schema.org, sitemap, SSR)
- [ ] Performance (lazy loading, code splitting, image optimization)
- [ ] Accesibilidad WCAG AA completa
- [ ] PWA con service worker y cache offline
- [ ] Tests unitarios y E2E
- [ ] Internacionalización

---

> Documentación generada para el proyecto TECH/WHITE.
> Última actualización: Mayo 2026.
