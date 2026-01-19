/**
 * Script para añadir platos de ducha a productos.json
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

const platosData = {
    roca: [
        { model: "Giralda", periodo: "1960-1990" },
        { model: "Verónica", periodo: "1970-1995" },
        { model: "Lorentina", periodo: "1965-1985" },
        { model: "Lucerna", periodo: "1970-1990" },
        { model: "Victoria", periodo: "1990-2010" },
        { model: "Dama Retro", periodo: "1990-2008" },
        { model: "Meridian", periodo: "1995-2008" },
        { model: "Frontalis", periodo: "2000-2010" },
        { model: "Georgia", periodo: "1985-2005" },
        { model: "Veranda", periodo: "1995-2008" },
    ],
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
    jacobdelafon: [
        { model: "Odeon Clasico", periodo: "1950-2010" },
        { model: "Odeon Up", periodo: "2000-2010" },
        { model: "Antares", periodo: "1975-2005" },
        { model: "Astros", periodo: "1980-2000" },
        { model: "Freelance", periodo: "1990-2005" },
        { model: "Portrait", periodo: "1985-2005" },
        { model: "Escale", periodo: "2000-2010" },
        { model: "Ove", periodo: "1995-2010" },
        { model: "Struktura", periodo: "2000-2010" },
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
    duravit: [
        { model: "Darling New", periodo: "1999-2015" },
        { model: "Happy D Original", periodo: "1999-2010" },
        { model: "Happy D.2", periodo: "2005-2015" },
        { model: "D-Code", periodo: "2000-2015" },
        { model: "Starck 2", periodo: "1995-2010" },
        { model: "Starck 3", periodo: "2000-2015" },
        { model: "ME by Starck", periodo: "2010-2018" },
        { model: "Vero Air", periodo: "2008-2018" },
    ],
};

const marcaConfig = {
    roca: { nombre: "ROCA", colores: ["blanco"], slug: "roca" },
    bellavista: { nombre: "BELLAVISTA", colores: ["blanco", "pergamón"], slug: "bellavista" },
    gala: { nombre: "GALA", colores: ["blanco", "pergamón"], slug: "gala" },
    jacobdelafon: { nombre: "Jacob Delafon", colores: ["blanco"], slug: "jacob-delafon" },
    sangra: { nombre: "Sangrá", colores: ["blanco", "pergamón"], slug: "sangra" },
    valadares: { nombre: "Valadares", colores: ["blanco"], slug: "valadares" },
    sanitana: { nombre: "Sanitana", colores: ["blanco"], slug: "sanitana" },
    duravit: { nombre: "Duravit", colores: ["blanco"], slug: "duravit" },
};

function slugify(str) {
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[().\/]/g, '');
}

let totalAdded = 0;

for (const [marcaKey, platos] of Object.entries(platosData)) {
    const config = marcaConfig[marcaKey];

    if (!productos.marcas[marcaKey]) {
        productos.marcas[marcaKey] = {
            nombre: config.nombre,
            slug: config.slug,
            modelos: []
        };
    }

    const marca = productos.marcas[marcaKey];

    let maxId = 0;
    marca.modelos?.forEach(m => {
        const match = m.id.match(/-(\d+)$/);
        if (match) {
            const num = parseInt(match[1]);
            if (num > maxId) maxId = num;
        }
    });

    platos.forEach((plato, index) => {
        const modeloSlug = slugify(plato.model);
        const id = `${config.slug}-${modeloSlug}-plato-${maxId + index + 1}`;

        const exists = marca.modelos?.some(m =>
            m.modelo.toLowerCase().includes(plato.model.toLowerCase()) &&
            m.categoria === 'plato-ducha'
        );

        if (exists) {
            console.log(`⏭️  ${config.nombre} ${plato.model} plato ya existe`);
            return;
        }

        const nuevoProducto = {
            id: id,
            marca: config.nombre,
            marcaSlug: config.slug,
            modelo: `${plato.model} Plato Ducha`,
            modeloSlug: `${modeloSlug}_plato`,
            tipoPrincipal: "Plato de ducha extraplano",
            categoria: "plato-ducha",
            periodo: plato.periodo,
            situacion: "Descatalogado",
            caracteristicas: `Plato de ducha ${plato.model} de ${config.nombre}, acabado antideslizante`,
            url: `/catalogo/${config.slug}/plato-ducha/${modeloSlug}`,
            specs: {
                material: "porcelana vitrificada",
                antideslizante: true,
                colorDisponible: config.colores
            }
        };

        if (!marca.modelos) marca.modelos = [];
        marca.modelos.push(nuevoProducto);
        console.log(`✅ ${config.nombre} - ${plato.model} Plato Ducha`);
        totalAdded++;
    });
}

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');

console.log(`\n========================================`);
console.log(`✅ Total platos añadidos: ${totalAdded}`);

let totalPlatos = 0;
Object.values(productos.marcas).forEach(m => m.modelos?.forEach(p => {
    if (p.categoria === 'plato-ducha') totalPlatos++;
}));
console.log(`📊 Total platos en catálogo: ${totalPlatos}`);
