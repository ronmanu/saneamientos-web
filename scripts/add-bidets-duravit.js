/**
 * Script para añadir bidets de Duravit a productos.json
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

const bidetsDuravit = [
    { model: "Darling New Pie", specs: { ancho: "36.5", fondo: "57.0" }, tipo: "Bidé de suelo" },
    { model: "Darling New Suspendido", specs: { ancho: "37.0", fondo: "54.0" }, tipo: "Bidé suspendido" },
    { model: "Happy D Original", specs: {}, tipo: "Bidé de suelo" },
    { model: "Happy D.2 Pie", specs: { ancho: "36.5", fondo: "57.0" }, tipo: "Bidé de suelo" },
    { model: "Happy D.2 Suspendido", specs: { ancho: "35.5", fondo: "54.0" }, tipo: "Bidé suspendido" },
    { model: "D-Code Pie", specs: { ancho: "35.5", fondo: "54.0" }, tipo: "Bidé de suelo" },
    { model: "D-Code Suspendido", specs: { ancho: "35.5", fondo: "54.0" }, tipo: "Bidé suspendido" },
    { model: "Starck 2", specs: {}, tipo: "Bidé de suelo" },
    { model: "Starck 3 Pie", specs: { ancho: "36.0", fondo: "65.5" }, tipo: "Bidé de suelo" },
    { model: "Starck 3 Suspendido", specs: { ancho: "36.0", fondo: "54.0" }, tipo: "Bidé suspendido" },
    { model: "ME by Starck Pie", specs: { ancho: "37.0", fondo: "60.0", colorDisponible: ["blanco", "blanco satinado"] }, tipo: "Bidé de suelo" },
    { model: "ME by Starck Suspendido", specs: { ancho: "37.0", fondo: "54.0", colorDisponible: ["blanco", "blanco satinado"] }, tipo: "Bidé suspendido" },
    { model: "Vero Air Suspendido", specs: { ancho: "37.0", fondo: "57.0", formaTaza: "cuadrada" }, tipo: "Bidé suspendido" },
];

function slugify(str) {
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[().]/g, '');
}

// Asegurar que existe la marca Duravit
if (!productos.marcas.duravit) {
    productos.marcas.duravit = {
        nombre: "Duravit",
        slug: "duravit",
        modelos: []
    };
}

let maxId = 0;
productos.marcas.duravit.modelos.forEach(m => {
    const match = m.id.match(/-(\d+)$/);
    if (match) {
        const num = parseInt(match[1]);
        if (num > maxId) maxId = num;
    }
});

let added = 0;
bidetsDuravit.forEach((bidet, index) => {
    const id = `duravit-${slugify(bidet.model)}-bidet-${maxId + index + 1}`;
    const modeloSlug = slugify(bidet.model);

    const nuevoProducto = {
        id: id,
        marca: "Duravit",
        marcaSlug: "duravit",
        modelo: `${bidet.model} Bidet`,
        modeloSlug: `${modeloSlug}_bidet`,
        tipoPrincipal: bidet.tipo,
        categoria: "bidets",
        periodo: "1999-2015",
        situacion: "Descatalogado",
        caracteristicas: `Bidé ${bidet.model} de Duravit, diseño alemán premium`,
        url: `/catalogo/duravit/bidets/${modeloSlug}`,
        specs: {
            ancho: bidet.specs.ancho || null,
            fondo: bidet.specs.fondo || null,
            formaTaza: bidet.specs.formaTaza || "ovalada",
            numOrificiosGriferia: 1,
            colorDisponible: bidet.specs.colorDisponible || ["blanco"]
        }
    };

    productos.marcas.duravit.modelos.push(nuevoProducto);
    console.log(`✅ Añadido: ${bidet.model} Bidet`);
    added++;
});

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');

console.log(`\n========================================`);
console.log(`✅ Bidets Duravit añadidos: ${added}`);
console.log(`📊 Total productos Duravit: ${productos.marcas.duravit.modelos.length}`);
