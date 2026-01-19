/**
 * Script para añadir cisternas Jacob Delafon a productos.json
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

const cisternasData = [
    // JACOB DELAFON
    { brand: "jacobdelafon", modelo: "Odeon Clásico Cisterna", periodo: "1970-2000", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Odeon clásico"], colorDisponible: ["blanco"] } },
    { brand: "jacobdelafon", modelo: "Odeon Up Cisterna", periodo: "2000-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Odeon Up"], colorDisponible: ["blanco"] } },
    { brand: "jacobdelafon", modelo: "Antares Cisterna", periodo: "1985-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Antares"], colorDisponible: ["blanco"] } },
    { brand: "jacobdelafon", modelo: "Astros Cisterna", periodo: "1990-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Astros"], colorDisponible: ["blanco"] } },
    { brand: "jacobdelafon", modelo: "Freelance Cisterna", periodo: "1995-2008", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Freelance"], colorDisponible: ["blanco"] } },
    { brand: "jacobdelafon", modelo: "Portrait Cisterna", periodo: "2000-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Portrait"], colorDisponible: ["blanco"] } },
    { brand: "jacobdelafon", modelo: "Escale Cisterna", periodo: "2005-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Escale"], colorDisponible: ["blanco"] } },
    { brand: "jacobdelafon", modelo: "Ove Cisterna", periodo: "2005-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Ove"], colorDisponible: ["blanco"] } },
    { brand: "jacobdelafon", modelo: "Struktura Cisterna", periodo: "2008-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Struktura"], colorDisponible: ["blanco"] } },
];

const marcaConfig = {
    jacobdelafon: { nombre: "JACOB DELAFON", slug: "jacobdelafon" },
};

function slugify(str) { return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_').replace(/[().\/]/g, ''); }

let added = 0;

for (const cist of cisternasData) {
    const config = marcaConfig[cist.brand];
    const marca = productos.marcas[cist.brand];
    if (!marca) continue;

    // Verificar si ya existe (aproximado)
    const exists = marca.modelos?.some(m => m.modelo.toLowerCase() === cist.modelo.toLowerCase());
    if (exists) { console.log(`⏭️ Ya existe: ${cist.modelo}`); continue; }

    // Calcular ID
    let maxId = 0;
    marca.modelos?.forEach(m => { const match = m.id.match(/-(\d+)$/); if (match && parseInt(match[1]) > maxId) maxId = parseInt(match[1]); });

    const modeloSlug = slugify(cist.modelo);
    marca.modelos.push({
        id: `${config.slug}-${modeloSlug}-${maxId + 1}`,
        marca: config.nombre, marcaSlug: config.slug, modelo: cist.modelo, modeloSlug,
        tipoPrincipal: "Cisterna", categoria: "cisternas", periodo: cist.periodo, situacion: "Descatalogado",
        caracteristicas: `Cisterna ${cist.modelo} de ${config.nombre}`,
        url: `/catalogo/${config.slug}/cisternas/${modeloSlug}`,
        specs: cist.specs
    });
    console.log(`✅ Añadido: ${cist.modelo}`);
    added++;
}

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');
console.log(`\n✅ Total cisternas añadidas: ${added}`);
