# 🔍 CODE REVIEW - Tech Lead Analysis

**Proyecto:** Sanitarios Descatalogados Web  
**Reviewer:** Senior Tech Lead  
**Fecha:** 2026-01-19  
**Nivel de Severidad:** 🔴 Crítico | 🟠 Alto | 🟡 Medio | 🟢 Bajo

---

## 📋 RESUMEN EJECUTIVO

| Área | Puntuación | Estado |
|------|------------|--------|
| Arquitectura | 6/10 | 🟠 Requiere refactorización |
| Código | 7/10 | 🟡 Aceptable con mejoras |
| SEO | 9/10 | 🟢 Excelente |
| Seguridad | 7/10 | 🟡 Aceptable |
| Performance | 8/10 | 🟢 Bueno |
| Mantenibilidad | 5/10 | 🔴 Crítico |

---

## 🔴 CRÍTICO - DEUDA TÉCNICA

### 1. Duplicación de Fuentes de Datos

**Archivos afectados:**

- `app/data/products.ts` (706 líneas - LEGACY)
- `app/data/productos.json` (2833 líneas - FUENTE VERDAD)
- `app/data/productosUnificados.ts` (75 líneas - WRAPPER)

**Problema:**

```typescript
// products.ts - DATOS DUPLICADOS Y DESACTUALIZADOS
export const products: Product[] = [
    { id: 'roca-1', name: 'Inodoro Victoria Salida Suelo', ... }
];

// productosUnificados.ts - INTENTA UNIFICAR PERO AÑADE COMPLEJIDAD
export const productosUnificados = transformarProductos();
export const products = productosUnificados; // ¿Cuál products se usa?
```

**Solución:**

```typescript
// ✅ ELIMINAR products.ts completamente
// ✅ Usar SOLO productos.json como fuente única
// ✅ Crear tipos en un archivo separado: types/producto.ts

// app/data/index.ts
export * from './productos';
export type { Producto, ProductSpecs } from './types';
```

---

### 2. Variable `rarity` Sin Lógica

**Archivo:** `productosUnificados.ts:50`

```typescript
// ❌ ACTUAL - Siempre es 3, variable inútil
let rarity: 1 | 2 | 3 | 4 | 5 = 3;
productos.push({
    rarity: rarity, // Siempre 3
});
```

**Solución:**

```typescript
// ✅ CALCULAR BASADO EN DATOS REALES
function calcularRareza(modelo: ModeloProducto): 1 | 2 | 3 | 4 | 5 {
    // Basado en periodo de fabricación
    const añoFin = parseInt(modelo.periodo?.split('-')[1] || '2000');
    if (añoFin < 1980) return 5;
    if (añoFin < 1990) return 4;
    if (añoFin < 2000) return 3;
    if (añoFin < 2010) return 2;
    return 1;
}
```

---

## 🟠 ALTO - PROBLEMAS DE ARQUITECTURA

### 3. Tipado Incompleto del JSON

**Archivo:** `productos.ts`

```typescript
// ❌ ACTUAL - Tipo any implícito
Object.values(productosData.marcas).forEach((marcaData: {
    modelos?: Array<{
        id: string;
        marca: string;
        // ... tipos inline, difíciles de mantener
    }>
}) => { ... });
```

**Solución:**

```typescript
// ✅ DEFINIR TIPOS EN ARCHIVO SEPARADO
// types/producto.ts
export interface MarcaData {
    nombre: string;
    slug: string;
    modelos: ProductoJSON[];
}

export interface ProductosJSON {
    marcas: Record<string, MarcaData>;
}

// productos.ts
import productosData from './productos.json';
import type { ProductosJSON } from '../types';

const data = productosData as ProductosJSON;
```

---

### 4. Falta de Validación de Datos

**Problema:** No hay validación del JSON al importarlo.

```typescript
// ❌ ACTUAL - Si el JSON está mal, la app explota
import productosData from './productos.json';

// ✅ SOLUCIÓN - Validar con Zod
import { z } from 'zod';

const ProductoSchema = z.object({
    id: z.string(),
    marca: z.string(),
    modelo: z.string(),
    specs: z.object({
        ancho: z.string().nullable().optional(),
        fondo: z.string().nullable().optional(),
        distanciaEntreTornillos: z.string().nullable().optional(),
    }).optional(),
});

const productosValidados = ProductoSchema.array().parse(getAllProductos());
```

---

## 🟡 MEDIO - CODE SMELLS

### 5. Magic Strings por Doquier

```typescript
// ❌ ACTUAL
categoria === 'inodoros'
image: `/productos/${modelo.marca.toLowerCase()}_${modelo.modelo.toLowerCase()}.png`

// ✅ CONSTANTES
export const CATEGORIAS = {
    INODOROS: 'inodoros',
    BIDETS: 'bidets',
    LAVABOS: 'lavabos',
} as const;

export const getImagePath = (marca: string, modelo: string): string => 
    `/productos/${slugify(marca)}_${slugify(modelo)}.png`;
```

---

### 6. Componente de Página Demasiado Grande

**Archivo:** `catalogo/[marca]/[categoria]/[modelo]/page.tsx` (375 líneas)

**Problema:** Un solo componente hace TODO:

- Fetch de datos
- Generación de metadata
- Renderizado de UI
- Lógica de negocio

**Solución:**

```typescript
// ✅ SEPARAR EN COMPONENTES
// components/producto/ProductoHeader.tsx
// components/producto/ProductoSpecs.tsx
// components/producto/ProductosRelacionados.tsx
// components/producto/WhatsAppCTA.tsx

// page.tsx - Solo orquestación
export default async function ProductoPage({ params }) {
    const producto = await getProducto(params);
    
    return (
        <main>
            <ProductoHeader producto={producto} />
            <ProductoSpecs specs={producto.specs} />
            <WhatsAppCTA modelo={producto.modelo} />
            <ProductosRelacionados marca={producto.marca} />
        </main>
    );
}
```

---

### 7. Estilos CSS Duplicados

**Problema:** Mismos estilos en múltiples archivos CSS modules.

```css
/* page.module.css (repetido en 5+ archivos) */
.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: calc(var(--header-height) + 2rem) 2rem 4rem;
}
```

**Solución:**

```css
/* styles/shared.module.css */
.container { ... }
.card { ... }
.grid { ... }

/* O usar CSS layer base */
@layer base {
    .container { ... }
}
```

---

## 🟢 BAJO - MEJORAS MENORES

### 8. Console.log en Producción

```typescript
// ❌ Scripts con console.log
console.log(`✅ ${specData.brand} ${specData.model}`);

// ✅ Usar logger condicional
const log = process.env.NODE_ENV === 'development' ? console.log : () => {};
```

### 9. Comentarios Obvios

```typescript
// ❌ Comentario innecesario
// Generar ruta de imagen basada en marca y modelo
const imagePath = `/productos/${rel.marcaSlug}_${rel.modeloSlug}.png`;

// ✅ El código es obvio, quitar comentario o explicar el POR QUÉ
// Patrón: {marca}_{modelo}.png - sincronizado con scripts/generate-images.js
const imagePath = getProductImagePath(rel);
```

---

## 📊 EDGE CASES NO MANEJADOS

| Caso | Estado | Riesgo |
|------|--------|--------|
| Producto sin imagen | ⚠️ Parcial | Imagen rota en UI |
| Modelo con caracteres especiales | ❌ No manejado | URLs rotas |
| specs completamente null | ✅ Manejado | - |
| Marca sin modelos | ⚠️ Parcial | Página vacía |
| JSON malformado | ❌ No manejado | App crash |

---

## 🛡️ VULNERABILIDADES

### 1. XSS Potencial

```typescript
// Si producto.caracteristicas viene de fuente externa
<p>{producto.caracteristicas}</p>

// ✅ Sanitizar si viene de API externa
import DOMPurify from 'dompurify';
<p>{DOMPurify.sanitize(producto.caracteristicas)}</p>
```

### 2. Redirecciones Abiertas

Las 300+ redirecciones en `next.config.ts` están hardcodeadas - CORRECTO.
No hay riesgo de open redirect.

---

## ✅ PUNTOS POSITIVOS

1. **SSG bien implementado** - `generateStaticParams` correcto
2. **SEO excelente** - Metadatos dinámicos, canonical URLs
3. **Redirecciones 301 completas** - Preserva link juice
4. **CSS Variables** - Sistema de diseño consistente
5. **TypeScript** - Tipado en mayoría del código
6. **Estructura de carpetas** - App Router bien organizado

---

## 📝 PLAN DE ACCIÓN

| Prioridad | Tarea | Esfuerzo |
|-----------|-------|----------|
| 🔴 P0 | Eliminar `products.ts` duplicado | 2h |
| 🔴 P0 | Crear tipos centralizados | 1h |
| 🟠 P1 | Dividir componente ProductoPage | 4h |
| 🟠 P1 | Añadir validación Zod | 2h |
| 🟡 P2 | Extraer estilos compartidos | 2h |
| 🟡 P2 | Calcular rareza dinámicamente | 1h |
| 🟢 P3 | Añadir tests unitarios | 8h |
| 🟢 P3 | Documentar funciones públicas | 2h |

---

**Firma:**  
*Senior Tech Lead*  
*"Ship fast, but ship right."*
