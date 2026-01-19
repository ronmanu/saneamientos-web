/**
 * Script para añadir bidets a productos.json
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

// Bidets de Roca
const bidetsRoca = [
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
];

function slugify(str) {
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[()]/g, '');
}

// Obtener el máximo ID actual para Roca
let maxId = 0;
if (productos.marcas.roca && productos.marcas.roca.modelos) {
    productos.marcas.roca.modelos.forEach(m => {
        const match = m.id.match(/roca-.*-(\d+)/);
        if (match) {
            const num = parseInt(match[1]);
            if (num > maxId) maxId = num;
        }
    });
}

console.log(`ID máximo actual para Roca: ${maxId}`);

// Añadir bidets
let added = 0;
bidetsRoca.forEach((bidet, index) => {
    const id = `roca-${slugify(bidet.model)}-bidet-${maxId + index + 1}`;
    const modeloSlug = slugify(bidet.model);

    // Verificar si ya existe
    const exists = productos.marcas.roca.modelos.some(m =>
        m.modelo.toLowerCase().includes(bidet.model.toLowerCase()) &&
        m.categoria === 'bidets'
    );

    if (exists) {
        console.log(`⏭️  ${bidet.model} bidet ya existe, saltando`);
        return;
    }

    const nuevoProducto = {
        id: id,
        marca: "ROCA",
        marcaSlug: "roca",
        modelo: `${bidet.model} Bidet`,
        modeloSlug: `${modeloSlug}_bidet`,
        tipoPrincipal: "Bidé de suelo",
        categoria: "bidets",
        periodo: bidet.periodo,
        situacion: "Descatalogado",
        caracteristicas: `Bidé ${bidet.model} de ROCA, a juego con la serie de inodoro del mismo nombre`,
        url: `/catalogo/roca/bidets/${modeloSlug}`,
        specs: {
            ancho: null,
            fondo: null,
            altura: null,
            formaTaza: "ovalada",
            numOrificiosGriferia: 1,
            colorDisponible: ["blanco", "pergamón"]
        }
    };

    productos.marcas.roca.modelos.push(nuevoProducto);
    console.log(`✅ Añadido: ${bidet.model} Bidet`);
    added++;
});

// Guardar
fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');

console.log(`\n========================================`);
console.log(`✅ Bidets añadidos: ${added}`);
console.log(`📊 Total productos Roca: ${productos.marcas.roca.modelos.length}`);
