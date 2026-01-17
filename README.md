# 🚿 Saneamientos Descatalogados - Web Application

Portal e-commerce para sanitarios descatalogados de marcas premium.

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Mejoras Futuras](#-mejoras-futuras-roadmap)

---

## 🛠 Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 16.x | Framework React con SSR/SSG |
| React | 19.x | UI Components |
| TypeScript | 5.x | Type safety |
| Zod | 3.x | Validación de schemas |
| Jest | 30.x | Testing framework |
| Testing Library | 16.x | React component testing |
| CSS Modules | - | Estilos aislados por componente |

---

## 🚀 Instalación

### Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd web

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env.local

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```
app/
├── api/
│   └── contact/
│       └── route.ts         # API endpoint para formulario de contacto
├── catalogo/
│   ├── [categoria]/
│   │   └── page.tsx         # Página dinámica por categoría
│   └── page.tsx             # Catálogo principal con filtros
├── categorias/
│   └── page.tsx             # Grid de todas las categorías
├── components/
│   ├── Header.tsx           # Barra de navegación
│   ├── Footer.tsx           # Pie de página
│   └── *.module.css         # Estilos de componentes
├── consultar-stock/
│   └── page.tsx             # Formulario de consulta de stock
├── contacto/
│   └── page.tsx             # Página de contacto con mapa y reseñas
├── data/
│   ├── products.ts          # Datos de productos (mock)
│   └── reviews.ts           # Reseñas de clientes
├── lib/
│   ├── rarity.ts            # Utilidades de rareza de productos
│   ├── validation.ts        # Schemas Zod y sanitización
│   └── __tests__/           # Tests unitarios
│       ├── rarity.test.ts
│       └── validation.test.ts
├── marca/
│   └── [brand]/page.tsx     # Productos por marca
├── marcas/
│   └── page.tsx             # Listado de marcas
├── producto/
│   └── [id]/page.tsx        # Detalle de producto
├── error.tsx                # Error boundary global
├── globals.css              # Variables CSS y estilos globales
├── layout.tsx               # Layout principal
└── page.tsx                 # Página de inicio (Hero)
```

---

## 🔐 Variables de Entorno

Crear archivo `.env.local` con:

```env
# Webhook n8n para formulario de contacto
N8N_CONTACT_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/xxx

# (Opcional) Para producción
NODE_ENV=production
```

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `npm run dev` | Servidor de desarrollo con hot reload |
| `build` | `npm run build` | Compilación para producción |
| `start` | `npm run start` | Iniciar servidor de producción |
| `lint` | `npm run lint` | Ejecutar ESLint |
| `test` | `npm test` | Ejecutar tests una vez |
| `test:watch` | `npm run test:watch` | Tests en modo watch |
| `test:coverage` | `npm run test:coverage` | Tests con reporte de cobertura |

---

## 🌐 API Endpoints

### POST `/api/contact`

Envía datos del formulario de contacto al webhook n8n.

**Request Body:**

```json
{
  "name": "string (2-100 chars)",
  "email": "string (email válido)",
  "message": "string (10-2000 chars)",
  "hasImage": "Sí | No (opcional)"
}
```

**Responses:**

| Status | Descripción |
|--------|-------------|
| 200 | Solicitud enviada correctamente |
| 400 | Datos inválidos (errores de validación) |
| 429 | Rate limit excedido (máx 5 req/min) |
| 500 | Error interno del servidor |

---

## 🧪 Testing

El proyecto usa **Jest** + **Testing Library** para tests unitarios.

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch (desarrollo)
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

### Tests Incluidos

- **`lib/__tests__/validation.test.ts`** - Tests de validación Zod y sanitización XSS
- **`lib/__tests__/rarity.test.ts`** - Tests de funciones de rareza

**Cobertura actual**: 38 tests pasando

---

## 🚀 Despliegue

### Docker (Recomendado para VPS)

```bash
# Construir imagen
docker build -t saneamientos-web .

# Ejecutar contenedor
docker run -p 3000:3000 -e N8N_CONTACT_WEBHOOK_URL=xxx saneamientos-web
```

### Vercel (Alternativa serverless)

```bash
npx vercel --prod
```

---

## 📊 Categorías y Marcas

### Categorías de Productos

| Categoría | Ruta | Descripción |
|-----------|------|-------------|
| Inodoros | `/catalogo/inodoros` | Inodoros completos, cisternas, mecanismos |
| Bidets | `/catalogo/bidets` | Bidets de suelo y suspendidos |
| Lavabos | `/catalogo/lavabos` | Lavabos de pedestal, encastre, sobre encimera |
| Platos de Ducha | `/catalogo/plato-ducha` | Platos extraplanos y antideslizantes |
| Mamparas | `/catalogo/mamparas` | Mamparas correderas, abatibles, fijas |
| Accesorios | `/catalogo/accesorios` | Grifería, toalleros, complementos |

### Marcas Soportadas

- **Roca** - Líder español en sanitarios
- **Gala** - Marca premium española
- **Bellavista** - Diseño clásico
- **Jacob Delafon** - Marca francesa de lujo
- **Sangrá** - Opciones económicas de calidad

---

## 🔮 Mejoras Futuras (Roadmap)

### 🔴 Alta Prioridad

#### 1. Base de Datos para Productos

**Estado actual**: Los productos están hardcodeados en `app/data/products.ts` (693 líneas).

**Cómo implementar**:

- Opción A: **Headless CMS** (Sanity.io, Strapi, Contentful)
  - Mejor para contenido gestionado por no-desarrolladores
  - Panel de administración visual
  - Imágenes optimizadas automáticamente
  
- Opción B: **Base de datos propia** (PostgreSQL/MySQL + Prisma)
  - Mayor control sobre los datos
  - Requiere desarrollo de panel de admin
  - Mejor para integración con inventario existente

**Archivos a modificar**:

- `app/data/products.ts` → Migrar a API calls
- `app/producto/[id]/page.tsx` → fetch dinámico
- `app/catalogo/page.tsx` → fetch con filtros

---

#### 2. Rate Limiting Distribuido

**Estado actual**: Rate limiting en memoria (`Map` en `api/contact/route.ts`).

**Problema**: No funciona en serverless (cada instancia tiene su propio estado).

**Cómo implementar**:

- Usar **Upstash Redis** (serverless Redis)
- O **Redis tradicional** con `ioredis`

```typescript
// Ejemplo con Upstash
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"),
});
```

**Archivos a modificar**:

- `app/api/contact/route.ts` → Reemplazar `rateLimitMap`

---

### 🟡 Media Prioridad

#### 3. Carrito de Compras + Stripe

**Estado actual**: No hay funcionalidad de carrito. Los usuarios deben consultar stock por formulario.

**Cómo implementar**:

1. Crear contexto React para estado del carrito
2. Persistir en localStorage / cookies
3. Integrar [Stripe Checkout](https://stripe.com/docs/checkout)
4. Webhook para confirmar pedidos

**Archivos a crear**:

- `app/contexts/CartContext.tsx`
- `app/components/CartButton.tsx`
- `app/carrito/page.tsx`
- `app/api/checkout/route.ts`

---

#### 4. Internacionalización (i18n)

**Estado actual**: Todos los textos están hardcodeados en español.

**Cómo implementar**:

- Usar `next-intl` o `next-i18next`
- Extraer strings a archivos de traducción
- Añadir selector de idioma

**Archivos a crear**:

- `messages/es.json`
- `messages/en.json`
- `app/[locale]/layout.tsx`

---

### 🟢 Baja Prioridad

#### 5. Logger Estructurado

**Estado actual**: `console.log/error` en desarrollo.

**Cómo implementar**:

- Usar `pino` para logs estructurados
- Integrar con servicio de logs (Datadog, LogRocket)

---

#### 6. Tests de Integración

**Estado actual**: Solo tests unitarios para `lib/`.

**Cómo implementar**:

- Añadir tests para componentes React
- Tests E2E con Playwright
- Mocking de APIs

---

## 📝 Licencia

Proyecto privado - Todos los derechos reservados.

---

## 👨‍💻 Desarrollo

Para contribuir:

1. Crear rama desde `main`
2. Implementar cambios
3. Ejecutar `npm run lint` y `npm test`
4. Crear Pull Request

---

*Última actualización: Enero 2026*
