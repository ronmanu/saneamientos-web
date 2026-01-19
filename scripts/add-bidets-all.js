/**
 * Script para añadir bidets de múltiples marcas a productos.json
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

const bidetsData = {
    bellavista: [
        { model: "Arcadia", periodo: "1990-2010" },
        { model: "Itálica", periodo: "1985-2005" },
        { model: "Magna", periodo: "1980-2005" },
        { model: "Lara", periodo: "1985-2005" },
        { model: "Record", periodo: "1980-2000" },
        { model: "Capri", periodo: "1975-1995" },
    ],
    gala: [
        { model: "Elia", periodo: "1990-2010" },
        { model: "Klea", periodo: "1995-2010" },
        { model: "Street", periodo: "2000-2012" },
        { model: "Gala 2000", periodo: "1985-2005" },
        { model: "Aurea", periodo: "1990-2008" },
        { model: "Loa", periodo: "1980-2010" },
        { model: "Nostalgia", periodo: "1985-2005" },
        { model: "Bacara", periodo: "1995-2008" },
        { model: "Diana", periodo: "1985-2005" },
    ],
    jacob_delafon: [
        { model: "Odeon Clasico", periodo: "1950-2010" },
        { model: "Odeon Up", periodo: "2000-2010" },
        { model: "Antares", periodo: "1975-2005" },
        { model: "Astros", periodo: "1980-2000" },
        { model: "Freelance", periodo: "1990-2005" },
        { model: "Portrait", periodo: "1985-2005" },
        { model: "Escale", periodo: "2000-2010", formaTaza: "cuadrada" },
        { model: "Ove", periodo: "1995-2010" },
        { model: "Struktura", periodo: "2000-2010", formaTaza: "cuadrada" },
    ],
    sangra: [
        { model: "Alcora", periodo: "1980-2007" },
        { model: "Bahia", periodo: "1975-2007" },
        { model: "Domo", periodo: "1985-2007" },
        { model: "Boreal", periodo: "1980-2007" },
        { model: "Granada", periodo: "1975-2007" },
        { model: "Isis", periodo: "1975-2007" },
        { model: "Proa", periodo: "1985-2007" },
        { model: "Siena", periodo: "1990-2007" },
        { model: "Taiga", periodo: "1985-2007" },
    ],
    valadares: [
        { model: "Nautilus", periodo: "1995-2015" },
        { model: "Tagus", periodo: "2000-2015" },
        { model: "Oporto", periodo: "1980-2010" },
        { model: "Opus", periodo: "1990-2010" },
        { model: "Oceanus", periodo: "1995-2010" },
        { model: "Durius", periodo: "1985-2005" },
        { model: "Egg", periodo: "2000-2012" },
        { model: "Thema", periodo: "1990-2010" },
    ],
    sanitana: [
        { model: "Regina", periodo: "1980-2005" },
        { model: "Munique", periodo: "1990-2010" },
        { model: "Colonia", periodo: "1975-2005" },
        { model: "Kapa", periodo: "1995-2010" },
        { model: "Imperial", periodo: "1985-2005" },
        { model: "Coral", periodo: "1980-2000" },
        { model: "Nexo", periodo: "1995-2010" },
        { model: "Mobil PMR", periodo: "2000-2015" },
        { model: "Lisboa", periodo: "1990-2010" },
    ],
};

const marcaConfig = {
    bellavista: { nombre: "BELLAVISTA", colores: ["blanco", "pergamón"] },
    gala: { nombre: "GALA", colores: ["blanco", "pergamón"] },
    jacob_delafon: { nombre: "Jacob Delafon", colores: ["blanco"] },
    sangra: { nombre: "Sangrá", colores: ["blanco", "pergamón"] },
    valadares: { nombre: "Valadares", colores: ["blanco"] },
    sanitana: { nombre: "Sanitana", colores: ["blanco"] },
};

function slugify(str) {
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[().\/]/g, '');
}

let totalAdded = 0;

for (const [marcaKey, bidets] of Object.entries(bidetsData)) {
    const config = marcaConfig[marcaKey];
    const marcaSlug = marcaKey.replace('_', '-');

    // Asegurar que existe la marca
    if (!productos.marcas[marcaKey.replace('_', '')]) {
        productos.marcas[marcaKey.replace('_', '')] = {
            nombre: config.nombre,
            slug: marcaSlug,
            modelos: []
        };
    }

    const marca = productos.marcas[marcaKey.replace('_', '')] ||
        productos.marcas[marcaKey] ||
        productos.marcas[marcaSlug];

    if (!marca) {
        console.log(`⚠️ Marca no encontrada: ${marcaKey}`);
        continue;
    }

    let maxId = 0;
    marca.modelos?.forEach(m => {
        const match = m.id.match(/-(\d+)$/);
        if (match) {
            const num = parseInt(match[1]);
            if (num > maxId) maxId = num;
        }
    });

    bidets.forEach((bidet, index) => {
        const modeloSlug = slugify(bidet.model);
        const id = `${marcaSlug}-${modeloSlug}-bidet-${maxId + index + 1}`;

        // Verificar si ya existe
        const exists = marca.modelos?.some(m =>
            m.modelo.toLowerCase().includes(bidet.model.toLowerCase()) &&
            m.categoria === 'bidets'
        );

        if (exists) {
            console.log(`⏭️  ${config.nombre} ${bidet.model} bidet ya existe`);
            return;
        }

        const nuevoProducto = {
            id: id,
            marca: config.nombre,
            marcaSlug: marcaSlug,
            modelo: `${bidet.model} Bidet`,
            modeloSlug: `${modeloSlug}_bidet`,
            tipoPrincipal: "Bidé de suelo",
            categoria: "bidets",
            periodo: bidet.periodo,
            situacion: "Descatalogado",
            caracteristicas: `Bidé ${bidet.model} de ${config.nombre}, a juego con la serie de inodoro`,
            url: `/catalogo/${marcaSlug}/bidets/${modeloSlug}`,
            specs: {
                formaTaza: bidet.formaTaza || "ovalada",
                numOrificiosGriferia: 1,
                colorDisponible: config.colores
            }
        };

        if (!marca.modelos) marca.modelos = [];
        marca.modelos.push(nuevoProducto);
        console.log(`✅ ${config.nombre} - ${bidet.model} Bidet`);
        totalAdded++;
    });
}

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');

console.log(`\n========================================`);
console.log(`✅ Total bidets añadidos: ${totalAdded}`);

// Contar totales
let totalBidets = 0;
Object.values(productos.marcas).forEach(m => m.modelos?.forEach(p => {
    if (p.categoria === 'bidets') totalBidets++;
}));
console.log(`📊 Total bidets en catálogo: ${totalBidets}`);
