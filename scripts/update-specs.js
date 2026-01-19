/**
 * Script para actualizar specs - Duravit ME by Starck
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

const specsData = [
    {
        brand: "duravit", modelMatch: "me by starck", categoria: "lavabos", periodo: "2010-2015",
        specs: { ancho: "60.0", fondo: "40.0", formaTaza: "rectangular", colorDisponible: ["blanco alpino", "blanco mate"] }
    },
];

const nuevosProductos = [
    {
        brand: "duravit", modelo: "ME by Starck Lavabo 63x40", categoria: "lavabos", periodo: "2010-2015", tipo: "Lavabo para mueble",
        specs: { ancho: "63.0", fondo: "40.0", formaTaza: "rectangular", colorDisponible: ["blanco alpino"] }
    },
];

function normalizar(str) { return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, ''); }
function slugify(str) { return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_').replace(/[().\/]/g, ''); }

let updated = 0, added = 0;

for (const update of specsData) {
    const marca = productos.marcas[update.brand];
    if (!marca?.modelos) continue;
    const producto = marca.modelos.find(m => normalizar(m.modelo).includes(normalizar(update.modelMatch)) && m.categoria === update.categoria);
    if (producto) {
        producto.specs = { ...producto.specs, ...update.specs };
        if (update.periodo) producto.periodo = update.periodo;
        console.log(`✅ Actualizado: ${producto.modelo}`);
        updated++;
    }
}

for (const nuevo of nuevosProductos) {
    const marca = productos.marcas[nuevo.brand];
    if (!marca) continue;
    if (marca.modelos?.some(m => normalizar(m.modelo) === normalizar(nuevo.modelo))) { console.log(`⏭️ Ya existe: ${nuevo.modelo}`); continue; }
    let maxId = 0;
    marca.modelos?.forEach(m => { const match = m.id.match(/-(\d+)$/); if (match && parseInt(match[1]) > maxId) maxId = parseInt(match[1]); });
    const modeloSlug = slugify(nuevo.modelo);
    marca.modelos.push({
        id: `${nuevo.brand}-${modeloSlug}-${maxId + 1}`, marca: marca.nombre, marcaSlug: nuevo.brand, modelo: nuevo.modelo, modeloSlug,
        tipoPrincipal: nuevo.tipo, categoria: nuevo.categoria, periodo: nuevo.periodo, situacion: "Descatalogado",
        caracteristicas: `${nuevo.tipo} ${nuevo.modelo} de ${marca.nombre}`, url: `/catalogo/${nuevo.brand}/${nuevo.categoria}/${modeloSlug}`, specs: nuevo.specs
    });
    console.log(`➕ Añadido: ${nuevo.modelo}`); added++;
}

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');
console.log(`\n✅ Actualizados: ${updated} | ➕ Añadidos: ${added}`);
