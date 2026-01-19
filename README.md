# 🚽 Sanitarios Descatalogados - Catálogo Web

[![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

> Plataforma web especializada en la localización y venta de piezas de recambio para sanitarios descatalogados en España. Catálogo con +80 modelos de marcas como **Roca, Gala, Bellavista, Jacob Delafon, Sangrá, Valadares, Sanitana y Duravit**.

## 🌐 Demo

**Producción:** [https://saneamientos-web.vercel.app](https://saneamientos-web.vercel.app)

## ✨ Características

### 🔍 Catálogo Avanzado

- Filtrado por marca, categoría y modelo
- Especificaciones técnicas detalladas (ancho, fondo, distancia entre tornillos)
- Grupos de compatibilidad para facilitar la búsqueda de recambios
- Colores descatalogados: pergamino, visón, verde, azul, rosa

### 📱 SEO Optimizado

- 300+ redirecciones 301 para migración desde dominio antiguo
- Metadatos dinámicos por producto
- Schema.org estructurado
- URLs canónicas semánticas

### 🎨 Diseño Moderno

- Responsive (mobile-first)
- Dark mode automático
- Glassmorphism y micro-animaciones
- Imágenes generadas por IA para productos sin fotografía

## 🏗️ Arquitectura

```
app/
├── data/
│   ├── productos.json          # Fuente única de verdad (81 modelos)
│   ├── productos.ts            # Servicios de acceso a datos
│   ├── productosUnificados.ts  # Wrapper para catálogo
│   └── products.ts             # [DEPRECADO] Datos legacy
├── catalogo/
│   ├── [marca]/[categoria]/[modelo]/  # Páginas dinámicas SSG
│   └── page.tsx                       # Listado con filtros
├── producto/[id]/              # [LEGACY] Redirigir a /catalogo
├── marca/[brand]/              # Páginas por marca
└── components/
    ├── Header.tsx
    └── Footer.tsx
```

## 📊 Modelo de Datos

### Producto (productos.json)

```typescript
interface Producto {
  id: string;                    // "roca-gondola-0"
  marca: string;                 // "ROCA"
  marcaSlug: string;             // "roca"
  modelo: string;                // "Gondola"
  modeloSlug: string;            // "gondola"
  tipoPrincipal: string;         // "Inodoro tanque bajo"
  categoria: string;             // "inodoros"
  periodo: string;               // "1980-1999"
  situacion: string;             // "Descatalogado"
  caracteristicas: string;       // Descripción
  url: string;                   // "/catalogo/roca/inodoros/gondola"
  specs: ProductSpecs;           // Especificaciones técnicas
}

interface ProductSpecs {
  ancho?: string;                       // "36.0"
  fondo?: string;                       // "42.5"
  distanciaEntreTornillos?: string;     // "16.0" (crítico para compatibilidad)
  formaTaza?: string;                   // "ovalada" | "cuadrada"
  grupoCompatibilidad?: string;         // "16.0 cm"
  colorDisponible?: string[];           // ["blanco", "pergamón"]
  material?: string;
  tipoMecanismo?: string;
}
```

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/saneamientos-web.git
cd saneamientos-web/web

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Ejecutar producción local
npm start
```

## 🔧 Scripts Útiles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor desarrollo (localhost:3000) |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `node scripts/merge-specs-*.js` | Integrar especificaciones desde CSV/JSON |

## 📁 Archivos de Datos

| Archivo | Propósito |
|---------|-----------|
| `productos.json` | Catálogo completo (fuente única de verdad) |
| `REFERENCIA_RAPIDA.txt` | Guía de compatibilidad por distancia entre tornillos |
| `especificaciones_csv.csv` | Datos técnicos importados |
| `PENDIENTES-SPECS.md` | Modelos pendientes de medidas |

## 🎯 Grupos de Compatibilidad

La **distancia entre tornillos** es el dato más importante para encontrar recambios:

| Grupo | Modelos Principales |
|-------|---------------------|
| **11.5 cm** | Bellavista Olympia |
| **12.5 cm** | Valadares Durius |
| **14.0 cm** | Roca Lorentina, Gala Baby |
| **15.5 cm** | Bellavista Record, Gala 2000/Diana/Aurea, JD Struktura |
| **16.0 cm** | Mayoría (Roca, Bellavista, Gala, Sanitana, Valadares) |
| **16.5 cm** | Sangrá Granada antiguo |
| **20.0 cm** | JD Presqu'ile, JD Replay |
| **20.5 cm** | Bellavista Itálica |

## 🌍 SEO y Migración

### Redirecciones 301

El archivo `next.config.ts` contiene 300+ redirecciones para preservar el posicionamiento del dominio antiguo:

```
/empresa-sanitarios-descatalogados → /contacto
/almacen → /catalogo
/sanitarios-roca-descatalogados/inodoro-gondola → /catalogo/roca/inodoros/gondola
```

## 🛠️ Tecnologías

- **Framework:** Next.js 16 (App Router + React Server Components)
- **Lenguaje:** TypeScript 5.x
- **Estilos:** CSS Modules + Variables CSS
- **Deploy:** Vercel (Edge Functions)
- **Contenido:** JSON estático (SSG)

## 📝 Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: descripción'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Propietario - © 2026 Sanitarios Descatalogados

---

**¿Necesitas una pieza descatalogada?** [Contáctanos](https://saneamientos-web.vercel.app/contacto) 📞
