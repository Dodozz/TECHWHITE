# Documentacion completa de TECH/WHITE

## 1. Resumen general

TECH/WHITE es una tienda web tipo e-commerce para hardware gaming, monitores y perifericos. La web esta construida como una SPA estatica en un solo archivo: `TECH-WHITE.html`.

La experiencia principal permite:

- Navegar entre Home, Catalogo, Ofertas, Nosotros, Carrito, Login, Registro, Cuenta, Checkout, Confirmacion y Tracking.
- Explorar productos por categoria, marca, precio y ordenamiento.
- Ver detalle de producto, agregar al carrito y marcar favoritos.
- Simular login/registro, guardar datos de perfil, direcciones y pedidos en `localStorage`.
- Completar un checkout de prototipo con pasos de direccion, envio, pago y revision.
- Usar un Setup Builder que recomienda una combinacion de productos segun presupuesto y uso principal.

La web funciona como prototipo funcional de front-end. No tiene backend real, base de datos, pasarela de pago, autenticacion segura ni integracion real de envio, newsletter o formulario de contacto.

## 2. Como abrir y probar

Archivo principal:

```text
TECH-WHITE.html
```

Modo de uso:

1. Abrir `TECH-WHITE.html` directamente en el navegador.
2. Usar Chrome, Edge o un navegador moderno.
3. Tener conexion a internet si se quieren cargar las fuentes de Google Fonts.

No requiere:

- Instalacion de dependencias.
- `npm install`.
- Servidor local.
- Build o bundler.

Dependencia externa visible:

- Google Fonts: `Bebas Neue`, `Rajdhani`, `Space Mono`.

## 3. Estructura de archivos del proyecto

```text
tech prototipo/
  TECH-WHITE.html
  DOCUMENTACION_TECH_WHITE.md
  audit/
    01-home-top.png
    02-home-cats.png
    03-home-products.png
    cat-monitores.png
    nosotros.png
  uploads/
    Azul Oscuro y Rosa Sencillo Oscuro Tecnologia y Videojuegos Sitio Web La Venta Al Minorista..png
    SKILL.md
  .claude/
    launch.json
    settings.local.json
```

### `TECH-WHITE.html`

Contiene todo el producto:

- Marcado HTML.
- Estilos CSS.
- Datos de productos.
- Logica JavaScript.
- Navegacion interna.
- Estado de carrito, favoritos, usuario, direcciones y pedidos.

### `audit/`

Carpeta con capturas de auditoria visual existentes. Sirve como referencia del estado visual de secciones como home, categorias, productos y nosotros.

### `uploads/`

Contiene una imagen grande de referencia visual y un archivo `SKILL.md`. No esta conectada directamente al HTML actual.

## 4. Arquitectura tecnica

La web esta implementada como una SPA estatica sin framework.

Capas principales:

- HTML: define la estructura de navbar, modales, vistas, footer y contenedores dinamicos.
- CSS: define tokens visuales, layout, componentes, responsive, animaciones y estados.
- JavaScript: maneja datos, navegacion, render dinamico, formularios, carrito, cuenta, checkout y almacenamiento local.

Patron de navegacion:

- Cada pantalla es un `<div class="view" id="view-...">`.
- La funcion `navigate(view, data)` oculta todas las vistas y activa la vista solicitada.
- No usa rutas reales del navegador ni historial con `pushState`.

Persistencia:

- Toda la persistencia es local al navegador usando `localStorage`.
- Si el usuario borra datos del navegador, se pierden carrito, favoritos, usuario, pedidos y direcciones.

## 5. Diseno visual

### Identidad

Marca:

- Nombre: `TECH/WHITE`.
- Categoria: e-commerce gamer/tech.
- Tono visual: oscuro, futurista, editorial, neon.

### Paleta CSS

Variables principales:

```css
--bg:      #070B14;
--surface: #0D1220;
--border:  #1A2340;
--mg:      #FF1F71;
--cy:      #00E5FF;
--txt:     #FFFFFF;
--muted:   #A0AEC0;
--gold:    #FFD700;
```

Uso visual:

- `--bg`: fondo global.
- `--surface`: paneles, cards y contenedores.
- `--border`: lineas y separadores.
- `--mg`: acento magenta para CTAs, badges y estados activos.
- `--cy`: acento cyan para elementos tech, estados completados y destacados secundarios.
- `--gold`: estrellas/testimonios.

### Tipografias

- `Bebas Neue`: titulos grandes, logo, headings y numeros destacados.
- `Rajdhani`: texto general, labels y UI principal.
- `Space Mono`: elementos tecnicos, badges, metadata y detalles de sistema.

### Componentes visuales

- Navbar fijo con blur al hacer scroll.
- Hero full viewport con grilla, orbes, brackets, estadisticas y producto destacado.
- Cards de categoria con composicion asimetrica.
- Product cards con iconografia por categoria.
- Badges de producto: `NUEVO` y `OFERTA`.
- Toasts para feedback.
- Modales para Setup Builder.
- Panels para cuenta, checkout y pedidos.

## 6. Responsive

Breakpoints principales:

- `1024px`: reduce grids, oculta floating card del hero, convierte layouts complejos a una columna.
- `768px`: oculta nav links, muestra menu hamburguesa, oculta busqueda desktop, cambia grids de productos.
- `480px`: productos a una columna, menor padding de navbar/secciones.

Breakpoints adicionales para cuenta/checkout:

- `1024px`: cuenta y checkout pasan a una columna.
- `640px`: stepper, order rows, formularios y layouts internos se compactan.

Punto a revisar:

- La busqueda desaparece en mobile (`.search-wrap { display: none; }`), pero no existe una busqueda equivalente dentro del drawer mobile.

## 7. Inventario de vistas

| Vista | ID | Funcion principal | Protegida |
|---|---|---|---|
| Home | `view-home` | Presentacion, categorias, destacados, testimonios, newsletter | No |
| Categoria/Catalogo/Ofertas | `view-category` | Listado, filtros, busqueda, orden y paginacion | No |
| Producto | `view-product` | Detalle de producto, cantidad, favoritos, relacionados | No |
| Carrito | `view-carrito` | Items del carrito, resumen, envio, descuento visual | No |
| Nosotros | `view-nosotros` | Historia, valores, contacto, informacion de tienda | No |
| Login | `view-login` | Acceso simulado | No |
| Registro | `view-register` | Alta simulada de cuenta | No |
| Cuenta | `view-cuenta` | Perfil, pedidos y direcciones | Si |
| Detalle de pedido | `view-detalle-pedido` | Historial detallado de un pedido | Si |
| Checkout | `view-checkout` | Direccion, envio, pago, revision | Si |
| Confirmacion | `view-confirmacion` | Confirmacion posterior a compra | No |
| Tracking | `view-tracking` | Seguimiento simulado de envio | No en ruta directa, pero nace de pedidos |

## 8. Navbar y navegacion

Elementos del navbar:

- Logo `TECH/WHITE`.
- Links: Inicio, Catalogo, Ofertas, Nosotros.
- CTA: Setup Builder.
- Busqueda.
- Carrito con contador.
- Boton de usuario.
- Menu hamburguesa en mobile.

Funciones relacionadas:

- `navigate(view, data)`: cambia de pantalla.
- `toggleSearch()`: abre/cierra buscador desktop.
- `toggleMobile()`: abre/cierra drawer mobile.
- `userBtnClick()`: envia a `cuenta` si hay usuario o a `login` si no hay sesion.
- `refreshAuthClass()`: agrega o quita `body.is-authed`.

Cambio realizado:

- El indicador azul de usuario autenticado se corrigio para que quede alineado sobre la esquina superior derecha del icono de usuario.

## 9. Catalogo de productos

Total actual:

- 20 productos.
- 6 monitores.
- 7 productos de hardware.
- 7 perifericos.
- 6 productos en ofertas, generados automaticamente desde `badge === 'OFERTA'`.

### Monitores

| ID | Producto | Marca | Precio | Badge |
|---|---|---:|---:|---|
| `m1` | LG UltraGear 27" 144Hz | LG | $5,499 | NUEVO |
| `m2` | Samsung Odyssey G5 32" Curvo | Samsung | $7,299 | OFERTA |
| `m3` | ASUS ROG Swift 24" 240Hz | ASUS | $9,899 | NUEVO |
| `m4` | AOC 24G2 IPS 144Hz | AOC | $3,799 | - |
| `m5` | BenQ MOBIUZ 27" 165Hz | BenQ | $6,199 | OFERTA |
| `m6` | MSI Optix MAG274QRF | MSI | $8,299 | NUEVO |

### Hardware

| ID | Producto | Marca | Precio | Badge |
|---|---|---:|---:|---|
| `h1` | RTX 4060 Ti 8GB ZOTAC | ZOTAC | $11,999 | OFERTA |
| `h2` | RX 7600 8GB Sapphire | Sapphire | $8,499 | NUEVO |
| `h3` | Intel Core i5-14600K | Intel | $5,299 | NUEVO |
| `h4` | AMD Ryzen 5 7600X | AMD | $4,899 | - |
| `h5` | Corsair Vengeance 32GB DDR5 | Corsair | $2,499 | OFERTA |
| `h6` | Samsung 980 Pro 1TB NVMe | Samsung | $1,899 | OFERTA |
| `h7` | EVGA 650W 80+ Gold | EVGA | $1,599 | - |

### Perifericos

| ID | Producto | Marca | Precio | Badge |
|---|---|---:|---:|---|
| `p1` | Logitech G Pro X Superlight 2 | Logitech | $2,799 | NUEVO |
| `p2` | Razer BlackWidow V3 TKL | Razer | $2,199 | NUEVO |
| `p3` | HyperX Cloud Alpha S | HyperX | $1,899 | OFERTA |
| `p4` | Corsair K70 RGB MK.2 | Corsair | $2,499 | - |
| `p5` | SteelSeries Arctis Nova 7 | SteelSeries | $3,199 | NUEVO |
| `p6` | Razer DeathAdder V3 | Razer | $1,499 | - |
| `p7` | ASUS ROG Scabbard II XL | ASUS | $699 | - |

## 10. Datos y estado

Variables principales:

| Variable | Uso |
|---|---|
| `PRODUCTS` | Catalogo base dividido por categoria |
| `ALL_PRODUCTS` | Lista combinada de productos |
| `PRODUCTS.ofertas` | Productos con badge `OFERTA` |
| `cart` | Items del carrito |
| `favorites` | IDs de productos favoritos |
| `currentView` | Vista activa |
| `currentCategory` | Categoria activa |
| `currentProduct` | Producto actual |
| `filteredProducts` | Resultado actual de filtros |
| `currentPage` | Pagina de catalogo |
| `PER_PAGE` | Cantidad por pagina, actualmente 12 |
| `user` | Usuario simulado |
| `orders` | Pedidos simulados |
| `addresses` | Direcciones guardadas |
| `checkoutState` | Paso, direccion, envio y pago del checkout |

Claves de `localStorage`:

| Clave | Contenido |
|---|---|
| `tw_cart` | Carrito |
| `tw_favs` | Favoritos |
| `tw_user` | Usuario autenticado simulado |
| `tw_orders` | Pedidos |
| `tw_addresses` | Direcciones |

## 11. Flujos principales

### Exploracion y compra

1. Usuario entra a Home.
2. Puede abrir Catalogo, Ofertas o una categoria destacada.
3. Puede filtrar por categoria, precio, marca y orden.
4. Puede abrir detalle de producto.
5. Puede elegir cantidad y agregar al carrito.
6. Puede ir al carrito y continuar a checkout.

### Login y cuenta

1. Usuario pulsa el icono de cuenta.
2. Si no hay sesion, navega a Login.
3. Login crea un usuario local a partir del email.
4. Registro crea usuario local con nombre, email y telefono vacio.
5. Al autenticarse, `body.is-authed` activa el indicador azul del icono de usuario.
6. Cuenta permite editar perfil, consultar pedidos y administrar direcciones.

### Checkout

1. Requiere usuario autenticado.
2. Requiere carrito con productos.
3. Paso 1: seleccion/agregado de direccion y metodo de envio.
4. Paso 2: metodo de pago simulado.
5. Paso 3: revision y confirmacion.
6. Al confirmar, se genera un pedido `TW-...`, se guarda en `tw_orders` y se vacia el carrito.

### Pedidos y tracking

1. Los pedidos se guardan localmente.
2. La cuenta lista pedidos del usuario local.
3. El detalle muestra productos, envio, pago y acciones.
4. Tracking muestra estados simulados con una linea de progreso.

### Setup Builder

1. Usuario abre el modal desde el navbar.
2. Ingresa presupuesto.
3. Elige uso principal: gaming, streaming, creator o work.
4. El algoritmo reparte el presupuesto por categoria.
5. Selecciona productos cercanos a cada asignacion.
6. Permite agregar toda la recomendacion al carrito.

## 12. Funciones JavaScript por modulo

### Navegacion

- `navigate(view, data)`
- `requireAuth(targetView, data)`
- `userBtnClick()`

### Productos y catalogo

- `productBg(cat)`
- `catIcon(cat)`
- `renderProductCard(p, small)`
- `loadFeatured()`
- `baseProductsFor(view, preselectCat)`
- `loadCategory(view, preselectCat)`
- `onCatFilterChange()`
- `applyFilters()`
- `renderCategoryProducts()`
- `setView(v)`

### Detalle de producto

- `loadProductDetail(id)`
- `changeQty(delta)`
- `switchThumb(idx, el)`
- `toggleFavDetail(id)`

### Carrito

- `addToCart(id, qty)`
- `removeFromCart(id)`
- `updateCartQty(id, delta)`
- `saveCart()`
- `updateBadge()`
- `renderCart()`
- `updateSummary()`
- `applyDiscount()`

### Favoritos

- `toggleFav(id, btn)`

### UI general

- `showToast(msg)`
- `sendContact()`
- `subscribeNewsletter()`
- `toggleSearch()`
- `toggleMobile()`
- `initReveal()`
- `initMarquee()`

### Setup Builder

- `openBuilder()`
- `closeBuilder()`
- `bNext(step)`
- `bSelectUse(id)`
- `bGenerate()`
- `bAddAllToCart()`

### Auth y cuenta

- `saveUser()`
- `saveOrders()`
- `saveAddresses()`
- `refreshAuthClass()`
- `doLogin()`
- `doRegister()`
- `doLogout()`
- `renderAccount()`
- `showAccountTab(tab)`
- `renderProfileTab()`
- `saveProfile()`
- `renderOrdersTab()`
- `renderAddressesTab()`
- `toggleAddressForm()`
- `addAddress()`
- `setDefaultAddress(id)`
- `deleteAddress(id)`

### Pedido, tracking y checkout

- `orderStatus(o)`
- `formatDate(ts)`
- `renderOrderDetail(id)`
- `paymentLabel(key)`
- `reorder(orderId)`
- `renderConfirmacion(orderId)`
- `renderTracking(orderId)`
- `initCheckout()`
- `renderCheckoutStepper()`
- `renderCheckoutSummary()`
- `renderCheckoutBody()`
- `renderShippingStep()`
- `ckToggleAddrForm()`
- `ckSaveNewAddr()`
- `selectCheckoutAddr(id)`
- `selectShipping(s)`
- `selectPayment(p)`
- `renderPaymentStep()`
- `renderReviewStep()`
- `ckGoStep(n)`
- `submitCheckout()`
- `escapeHtml(s)`

## 13. Validaciones actuales

Existen validaciones basicas:

- Login requiere email y password no vacios.
- Registro requiere nombre, email, password, confirmacion y terminos.
- Registro valida que passwords coincidan.
- Contacto requiere nombre, email y mensaje.
- Newsletter valida presencia de `@`.
- Checkout exige direccion antes de avanzar al pago.
- Checkout exige direccion antes de confirmar.

Limitaciones:

- No hay validacion fuerte de email.
- No hay validacion real de contrasena segura.
- No hay validacion real de tarjeta.
- No hay validacion de CP, telefono o direccion.
- No hay proteccion contra abuso de formularios porque no existe backend.

## 14. Seguridad

Estado actual:

- Prototipo front-end.
- Auth simulada con `localStorage`.
- Password de login/registro no se verifica contra servidor.
- Los datos de pago no se transmiten, pero el formulario existe visualmente.
- `escapeHtml()` se usa en varias salidas dinamicas para reducir inyeccion HTML en datos de usuario.

Faltante para produccion:

- Autenticacion real con sesiones seguras.
- Backend con permisos por usuario.
- Hashing de passwords si se maneja auth propia.
- HTTPS obligatorio.
- CSRF/CORS segun arquitectura final.
- Validacion server-side de pedidos, stock, precios y descuentos.
- Tokenizacion de pagos con proveedor certificado.
- Politica de privacidad y tratamiento de datos.

## 15. SEO y contenido

Actual:

- Existe `<title>`.
- La web usa contenido visible y headings.
- No hay rutas reales por producto o categoria.

Faltante:

- Meta description.
- Open Graph y Twitter Cards.
- Favicon.
- Schema.org para producto, organizacion y breadcrumb.
- URLs unicas por producto/categoria.
- Sitemap y robots.txt si se publica como sitio completo.
- Textos legales: terminos, privacidad, cambios/devoluciones, garantia y envio.

## 16. Accesibilidad

Actual:

- Algunos botones tienen `aria-label`, como el boton de usuario.
- Los inputs tienen labels visibles en formularios principales.
- Colores tienen buen contraste en la mayoria del fondo oscuro.

Faltante:

- Estados `focus-visible` consistentes en botones y cards clicables.
- Cierre de modal con Escape.
- Focus trap dentro del Setup Builder.
- Roles/atributos ARIA para modal.
- Labels en botones de icono como busqueda, carrito y favoritos.
- Navegacion por teclado completa en cards y tabs.
- Evitar que todo dependa de `onclick` en elementos no semanticos.

## 17. Performance

Actual:

- No hay framework ni bundle pesado.
- Mucho UI se renderiza con strings HTML simples.
- Iconos SVG inline evitan dependencias.

Riesgos:

- Todo el CSS, HTML y JS vive en un solo archivo de mas de 4,000 lineas.
- Las fuentes externas bloquean parte de la presentacion si la red falla.
- No hay lazy loading real de imagenes porque casi todo son gradientes/iconos.
- Si el catalogo crece mucho, filtrar/renderizar todo en cliente puede sentirse pesado.

## 18. Faltantes evidentes detectados

### Criticos antes de produccion

- Backend real para usuarios, productos, pedidos, direcciones y stock.
- Autenticacion real y segura.
- Base de datos.
- Pasarela de pago real.
- Validacion de precios, descuentos y stock en servidor.
- Panel administrativo para cargar productos, precios, inventario y pedidos.
- Manejo real de emails: confirmacion de pedido, recuperacion de contrasena, newsletter.
- Integracion real de envios o al menos reglas de envio centralizadas.

### UX y producto

- Pagina dedicada de favoritos; hoy se guardan favoritos pero no hay vista para consultarlos.
- Busqueda en mobile; actualmente el buscador desktop se oculta.
- Descuento funcional; `SETUP10` y `TW10` solo muestran toast, no modifican el total.
- Estados de carga, error y exito mas claros en checkout y formularios.
- Recuperacion de contrasena real.
- Edicion/eliminacion de cuenta.
- Historial de tracking mas realista.
- Confirmacion visual mas robusta cuando un producto ya esta en carrito.
- Stock visible por producto.
- Imagenes reales de productos.
- Reviews reales por producto.
- Comparador de productos.

### Contenido y confianza

- Direccion real de tienda; ahora aparece `Calle XXXXX, CDMX`.
- Politicas de garantia, cambios y devoluciones.
- Terminos y condiciones.
- Politica de privacidad.
- Aviso de cookies si se agregan analytics o tracking.
- Datos fiscales o razon social si se vendera formalmente.
- Preguntas frecuentes.
- Canales de soporte con horarios.

### Tecnico y mantenimiento

- Repositorio Git inicializado.
- Separar el HTML unico en archivos/modulos.
- Crear estructura de componentes si el proyecto crece.
- Tests de flujos clave: carrito, checkout, auth, filtros y direcciones.
- Formateo/linting.
- Documentar despliegue.
- Agregar control de versiones para cambios.
- Manejo de rutas reales con historial del navegador.

## 19. Auditoria puntual del indicador azul de usuario

Problema detectado:

- El punto azul de sesion estaba definido como `body.is-authed .user-btn::after`.
- Antes se posicionaba con `top: 6px` y `right: 6px`.
- Como el boton mide visualmente 20px de icono mas padding, ese offset colocaba el punto demasiado hacia adentro del icono.

Solucion aplicada:

- Se dio dimension estable al boton de usuario: `28px x 28px`.
- Se centro el SVG dentro del boton.
- Se reposiciono el indicador a `top: 1px` y `right: 1px`.
- Se agrego borde oscuro para separarlo del icono/fondo.
- Se agrego `pointer-events: none` para que el pseudo-elemento no interfiera con clicks.

Resultado esperado:

- Al iniciar sesion o registrarse, el punto azul queda anclado a la esquina superior derecha del icono de usuario.
- No invade el centro del icono.
- No cambia el layout del navbar.

## 20. Checklist de QA manual

### Navegacion

- Abrir Home.
- Entrar a Catalogo.
- Entrar a Ofertas.
- Entrar a Nosotros.
- Abrir/cerrar menu mobile en ancho menor a 768px.
- Abrir/cerrar Setup Builder.

### Catalogo

- Filtrar por categoria.
- Filtrar por precio.
- Filtrar por marca.
- Ordenar por precio ascendente/descendente.
- Buscar producto desde el input desktop.
- Cambiar grid/lista.
- Probar paginacion si el catalogo crece.

### Producto y carrito

- Abrir detalle de producto.
- Cambiar cantidad.
- Agregar al carrito.
- Ver contador del carrito.
- Cambiar cantidad desde carrito.
- Eliminar producto.
- Confirmar envio gratis sobre $1,500.
- Probar codigo `SETUP10` y `TW10`.

### Auth y cuenta

- Abrir boton de usuario sin sesion.
- Hacer login.
- Confirmar que aparece el punto azul correctamente alineado.
- Entrar a Cuenta.
- Editar nombre/email/telefono.
- Agregar direccion.
- Marcar direccion predeterminada.
- Eliminar direccion.
- Cerrar sesion y confirmar que desaparece el punto azul.

### Checkout

- Intentar checkout sin sesion.
- Iniciar sesion y volver al checkout.
- Agregar direccion.
- Elegir envio estandar/express.
- Elegir metodo de pago.
- Revisar pedido.
- Confirmar pedido.
- Confirmar que el carrito se vacia.
- Ver pedido en Cuenta.
- Abrir detalle y tracking.

## 21. Recomendacion de siguientes pasos

Prioridad alta:

- Hacer funcional el descuento para que afecte el total.
- Agregar vista de favoritos.
- Agregar buscador mobile.
- Reemplazar direccion placeholder.
- Agregar paginas legales basicas.
- Inicializar Git para proteger el historial de cambios.

Prioridad media:

- Separar datos de productos del HTML.
- Convertir secciones repetidas en componentes o funciones mas aisladas.
- Mejorar accesibilidad del modal y botones de icono.
- Agregar imagenes reales de productos.
- Crear pruebas manuales documentadas por flujo.

Prioridad produccion:

- Backend, base de datos, auth real, pagos reales, inventario y emails transaccionales.

