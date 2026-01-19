/**
 * Script para añadir cisternas a productos.json
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

const cisternasData = [
    // GALA Cisternas
    { brand: "gala", modelo: "Elia Cisterna", periodo: "1970-2000", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Elia"], colorDisponible: ["blanco", "pergamón"] } },
    { brand: "gala", modelo: "Klea Cisterna", periodo: "1990-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Klea"], colorDisponible: ["blanco"] } },
    { brand: "gala", modelo: "Street Cisterna", periodo: "1995-2008", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Street"], colorDisponible: ["blanco"] } },
    { brand: "gala", modelo: "Gala 2000 Cisterna", periodo: "1998-2008", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Gala 2000"], colorDisponible: ["blanco", "pergamón"] } },
    { brand: "gala", modelo: "Aurea Cisterna", periodo: "2000-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Aurea"], colorDisponible: ["blanco", "pergamón"] } },
    { brand: "gala", modelo: "Loa Cisterna", periodo: "1980-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Loa"], colorDisponible: ["blanco", "pergamón"] } },
    { brand: "gala", modelo: "Nostalgia Cisterna", periodo: "1985-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Nostalgia"], colorDisponible: ["blanco", "pergamón"] } },
    { brand: "gala", modelo: "Bacara Cisterna", periodo: "1990-2008", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Bacara"], colorDisponible: ["blanco", "pergamón"] } },
    { brand: "gala", modelo: "Diana Cisterna", periodo: "1980-2000", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Diana"], colorDisponible: ["blanco", "pergamón"] } },

    // SANITANA Cisternas
    { brand: "sanitana", modelo: "Regina Cisterna", periodo: "1980-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Regina"], colorDisponible: ["blanco"] } },
    { brand: "sanitana", modelo: "Munique Cisterna", periodo: "1990-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Munique", "Munich"], colorDisponible: ["blanco"] } },
    { brand: "sanitana", modelo: "Colonia Cisterna", periodo: "1985-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Colonia"], colorDisponible: ["blanco"] } },
    { brand: "sanitana", modelo: "Kapa Cisterna", periodo: "1995-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Kapa"], colorDisponible: ["blanco"] } },
    { brand: "sanitana", modelo: "Imperial Cisterna", periodo: "1980-2000", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Imperial"], colorDisponible: ["blanco"] } },
    { brand: "sanitana", modelo: "Coral Cisterna", periodo: "1985-2005", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Coral"], colorDisponible: ["blanco"] } },
    { brand: "sanitana", modelo: "Nexo Cisterna", periodo: "2000-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["Nexo"], colorDisponible: ["blanco"] } },
    { brand: "sanitana", modelo: "Mobil PMR Cisterna", periodo: "2005-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["Mobil PMR"], colorDisponible: ["blanco"] } },
    { brand: "sanitana", modelo: "Lisboa Cisterna", periodo: "1990-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "simple", compatibleConModelosWc: ["Lisboa"], colorDisponible: ["blanco"] } },

    // VALADARES Cisternas
    { brand: "valadares", modelo: "Nautilus Cisterna", periodo: "1995-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Nautilus"], colorDisponible: ["blanco"] } },
    { brand: "valadares", modelo: "Tagus Cisterna", periodo: "1990-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Tagus"], colorDisponible: ["blanco"] } },
    { brand: "valadares", modelo: "Oporto Cisterna", periodo: "1985-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Oporto"], colorDisponible: ["blanco"] } },
    { brand: "valadares", modelo: "Opus Cisterna", periodo: "1995-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Opus"], colorDisponible: ["blanco"] } },
    { brand: "valadares", modelo: "Oceanus Cisterna", periodo: "1990-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Oceanus"], colorDisponible: ["blanco"] } },
    { brand: "valadares", modelo: "Durius Cisterna", periodo: "1985-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Durius"], colorDisponible: ["blanco"] } },
    { brand: "valadares", modelo: "Egg Cisterna", periodo: "2000-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["Egg"], colorDisponible: ["blanco"] } },
    { brand: "valadares", modelo: "Thema Cisterna", periodo: "1995-2010", specs: { tipoCisterna: "tanque bajo", material: "porcelana", compatibleConModelosWc: ["Thema"], colorDisponible: ["blanco"] } },

    // DURAVIT Cisternas
    { brand: "duravit", modelo: "Darling New Cisterna", periodo: "2005-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["Darling New"], colorDisponible: ["blanco alpino"] } },
    { brand: "duravit", modelo: "Happy D Original Cisterna", periodo: "2000-2008", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["Happy D"], colorDisponible: ["blanco alpino"] } },
    { brand: "duravit", modelo: "Happy D.2 Cisterna", periodo: "2008-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["Happy D.2"], colorDisponible: ["blanco alpino"] } },
    { brand: "duravit", modelo: "D-Code Cisterna", periodo: "1995-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["D-Code"], colorDisponible: ["blanco"] } },
    { brand: "duravit", modelo: "Starck 2 Cisterna", periodo: "2000-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["Starck 2"], colorDisponible: ["blanco alpino"] } },
    { brand: "duravit", modelo: "Starck 3 Cisterna", periodo: "2000-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["Starck 3"], colorDisponible: ["blanco alpino"] } },
    { brand: "duravit", modelo: "ME by Starck Cisterna", periodo: "2010-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["ME by Starck"], colorDisponible: ["blanco alpino"] } },
    { brand: "duravit", modelo: "Vero Cisterna", periodo: "2000-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["Vero"], colorDisponible: ["blanco alpino"] } },
    { brand: "duravit", modelo: "Vero Air Cisterna", periodo: "2010-2015", specs: { tipoCisterna: "tanque bajo", material: "porcelana", tipoDescarga: "doble", compatibleConModelosWc: ["Vero Air"], colorDisponible: ["blanco alpino"] } },
];

const marcaConfig = {
    gala: { nombre: "GALA", slug: "gala" },
    sanitana: { nombre: "Sanitana", slug: "sanitana" },
    valadares: { nombre: "Valadares", slug: "valadares" },
    duravit: { nombre: "Duravit", slug: "duravit" },
};

function slugify(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_').replace(/[().\/]/g, '');
}

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
        marca: config.nombre,
        marcaSlug: config.slug,
        modelo: cist.modelo,
        modeloSlug: modeloSlug,
        tipoPrincipal: "Cisterna",
        categoria: "cisternas",
        periodo: cist.periodo,
        situacion: "Descatalogado",
        caracteristicas: `Cisterna ${cist.modelo} de ${config.nombre}`,
        url: `/catalogo/${config.slug}/cisternas/${modeloSlug}`,
        specs: cist.specs
    });
    console.log(`✅ Añadido: ${cist.modelo}`);
    added++;
}

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');
console.log(`\n✅ Total cisternas añadidas: ${added}`);
