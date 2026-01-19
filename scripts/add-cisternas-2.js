/**
 * Script para añadir cisternas Bellavista y Sangrá
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

const cisternasData = [
    // BELLAVISTA
    { brand: "bellavista", modelo: "Arcadia Cisterna", periodo: "1990-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Arcadia"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "bellavista", modelo: "Itálica Cisterna", periodo: "1975-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Itálica"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "bellavista", modelo: "Magna Cisterna", periodo: "1995-2008", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Magna"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "bellavista", modelo: "Lara Cisterna", periodo: "1980-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Lara"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "bellavista", modelo: "Record Cisterna", periodo: "1980-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Record"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "bellavista", modelo: "Capri Cisterna", periodo: "1980-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Capri"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "bellavista", modelo: "Nerja Cisterna", periodo: "1985-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Nerja"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "bellavista", modelo: "Olympia Cisterna", periodo: "1995-2008", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Olympia"], colorDisponible: ["blanco", "pergamino"] } },

    // SANGRÁ
    { brand: "sangra", modelo: "Alcora Cisterna", periodo: "1980-2007", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Alcora"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "sangra", modelo: "Bahía Cisterna", periodo: "1985-2007", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Bahía"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "sangra", modelo: "Domo Cisterna", periodo: "1990-2007", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Domo"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "sangra", modelo: "Boreal Cisterna", periodo: "1985-2007", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Boreal"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "sangra", modelo: "Granada Cisterna", periodo: "1975-2007", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Granada"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "sangra", modelo: "Isis Cisterna", periodo: "1980-2007", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Isis"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "sangra", modelo: "Proa Cisterna", periodo: "1985-2007", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Proa"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "sangra", modelo: "Siena Cisterna", periodo: "1990-2007", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Siena"], colorDisponible: ["blanco", "pergamino"] } },
    { brand: "sangra", modelo: "Taiga Cisterna", periodo: "1990-2007", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Taiga"], colorDisponible: ["blanco", "pergamino"] } },
];

const marcaConfig = {
    bellavista: { nombre: "BELLAVISTA", slug: "bellavista" },
    sangra: { nombre: "Sangrá", slug: "sangra" },
};

function slugify(str) { return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_').replace(/[().\/]/g, ''); }

let added = 0;

for (const cist of cisternasData) {
    const config = marcaConfig[cist.brand];
    const marca = productos.marcas[cist.brand];
    if (!marca) continue;

    const exists = marca.modelos?.some(m => m.modelo.toLowerCase() === cist.modelo.toLowerCase());
    if (exists) { console.log(`⏭️ Ya existe: ${cist.modelo}`); continue; }

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
