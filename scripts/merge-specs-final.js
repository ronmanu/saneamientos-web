/**
 * Script para integrar especificaciones técnicas finales
 * Datos completos proporcionados por el usuario
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

// Datos finales verificados
const specsData = [
    { brand: "Roca", model: "Giralda", specs: { widthCm: 36.0, depthCm: 43.0, boltDistanceCm: 16.0 } },
    { brand: "Roca", model: "Verónica", specs: { widthCm: 36.5, depthCm: 44.0, boltDistanceCm: 16.0 } },
    { brand: "Roca", model: "Lorentina", specs: { widthCm: 37.0, depthCm: 46.5, boltDistanceCm: 14.0 } },
    { brand: "Roca", model: "Lucerna", specs: { widthCm: 35.2, depthCm: null, boltDistanceCm: null } },
    { brand: "Roca", model: "Victoria", specs: { widthCm: 36.0, depthCm: 44.6, boltDistanceCm: 16.0 } },
    { brand: "Roca", model: "Dama Retro", specs: { widthCm: 32.7, depthCm: 45.0, boltDistanceCm: 16.0 } },
    { brand: "Roca", model: "Meridian", specs: { widthCm: 33.0, depthCm: 42.15, boltDistanceCm: 16.0 } },
    { brand: "Roca", model: "Frontalis", specs: { widthCm: 36.5, depthCm: 44.5, boltDistanceCm: 16.0 } },
    { brand: "Roca", model: "Georgia", specs: { widthCm: 38.0, depthCm: 46.5, boltDistanceCm: 16.0 } },
    { brand: "Roca", model: "Veranda", specs: { widthCm: 39.0, depthCm: 45.0, boltDistanceCm: 16.0 } },

    { brand: "Bellavista", model: "Arcadia", specs: { widthCm: 38.5, depthCm: 44.0, boltDistanceCm: 16.0 } },
    { brand: "Bellavista", model: "Itálica", specs: { widthCm: 37.0, depthCm: 44.0, boltDistanceCm: 20.5 } },
    { brand: "Bellavista", model: "Magna", specs: { widthCm: 37.0, depthCm: 44.0, boltDistanceCm: 16.0 } },
    { brand: "Bellavista", model: "Lara", specs: { widthCm: 37.0, depthCm: 43.0, boltDistanceCm: 16.0 } },
    { brand: "Bellavista", model: "Record", specs: { widthCm: 35.5, depthCm: 43.5, boltDistanceCm: 15.5 } },
    { brand: "Bellavista", model: "Capri", specs: { widthCm: 35.2, depthCm: null, boltDistanceCm: null } },
    { brand: "Bellavista", model: "Nerja", specs: { widthCm: 36.0, depthCm: 42.5, boltDistanceCm: 16.0 } },
    { brand: "Bellavista", model: "Olympia", specs: { widthCm: 39.5, depthCm: 43.5, boltDistanceCm: 11.5 } },

    { brand: "Gala", model: "2000", specs: { widthCm: 34.0, depthCm: 45.0, boltDistanceCm: 15.5 } },
    { brand: "Gala", model: "Baby", specs: { widthCm: 26.5, depthCm: 33.5, boltDistanceCm: 14.0 } },
    { brand: "Gala", model: "Diana", specs: { widthCm: 34.0, depthCm: 43.0, boltDistanceCm: 15.5 } },
    { brand: "Gala", model: "Elia", specs: { widthCm: 35.0, depthCm: 42.5, boltDistanceCm: 16.0 } },
    { brand: "Gala", model: "Aurea", specs: { widthCm: 39.0, depthCm: 41.0, boltDistanceCm: 15.5 } },
    { brand: "Gala", model: "Loa", specs: { widthCm: 37.0, depthCm: 42.5, boltDistanceCm: 16.0 } },
    { brand: "Gala", model: "Mid", specs: { widthCm: 36.5, depthCm: 43.5, boltDistanceCm: 16.0 } },
    { brand: "Gala", model: "Bacara", specs: { widthCm: 36.0, depthCm: 42.0, boltDistanceCm: 16.0 } },
    { brand: "Gala", model: "Nostalgia", specs: { widthCm: 34.5, depthCm: 44.0, boltDistanceCm: 16.0 } },
    { brand: "Gala", model: "Regia", specs: { widthCm: 38.0, depthCm: 46.0, boltDistanceCm: 15.5 } },
    { brand: "Gala", model: "Marina", specs: { widthCm: 36.0, depthCm: 44.0, boltDistanceCm: 16.0 } },
    { brand: "Gala", model: "Metropol", specs: { widthCm: 36.5, depthCm: 44.0, boltDistanceCm: 16.0 } },

    { brand: "Sanitana", model: "Nexo", specs: { widthCm: 36.0, depthCm: 43.0, boltDistanceCm: 16.0 } },
    { brand: "Sanitana", model: "Regina", specs: { widthCm: 36.5, depthCm: 44.5, boltDistanceCm: 16.0 } },
    { brand: "Sanitana", model: "Munique", specs: { widthCm: 36.5, depthCm: 43.5, boltDistanceCm: 16.0 } },
    { brand: "Sanitana", model: "Kapa", specs: { widthCm: 36.0, depthCm: 42.5, boltDistanceCm: 16.0 } },
    { brand: "Sanitana", model: "Imperial", specs: { widthCm: 33.5, depthCm: 43.0, boltDistanceCm: 15.5 } },
    { brand: "Sanitana", model: "Lisboa", specs: { widthCm: 39.5, depthCm: 45.5, boltDistanceCm: 16.0 } },
    { brand: "Sanitana", model: "Grecia", specs: { widthCm: 36.0, depthCm: 44.0, boltDistanceCm: 16.0 } },
    { brand: "Sanitana", model: "Colonia", specs: { widthCm: 36.0, depthCm: 44.0, boltDistanceCm: 16.0 } },

    { brand: "Valadares", model: "Opus", specs: { widthCm: 35.0, depthCm: 41.0, boltDistanceCm: 16.0 } },
    { brand: "Valadares", model: "Oporto", specs: { widthCm: 35.0, depthCm: 43.5, boltDistanceCm: 16.0 } },
    { brand: "Valadares", model: "Oceanus", specs: { widthCm: 36.5, depthCm: 42.0, boltDistanceCm: null } },
    { brand: "Valadares", model: "Durius", specs: { widthCm: 36.0, depthCm: 40.0, boltDistanceCm: 12.5 } },
    { brand: "Valadares", model: "Tagus", specs: { widthCm: 36.0, depthCm: 43.0, boltDistanceCm: 16.0 } },
    { brand: "Valadares", model: "Nautilus", specs: { widthCm: 36.0, depthCm: 43.0, boltDistanceCm: 16.0 } },
    { brand: "Valadares", model: "Thema", specs: { widthCm: 34.5, depthCm: 42.0, boltDistanceCm: 15.5 } },
    { brand: "Valadares", model: "Neoclásica", specs: { widthCm: 38.0, depthCm: 43.0, boltDistanceCm: 16.0 } },

    { brand: "Sangrá", model: "Granada", specs: { widthCm: 35.0, depthCm: 43.0, boltDistanceCm: 16.5 } },
    { brand: "Sangrá", model: "Isis", specs: { widthCm: 36.4, depthCm: null, boltDistanceCm: null } },
    { brand: "Sangrá", model: "Proa", specs: { widthCm: 37.0, depthCm: 42.0, boltDistanceCm: 16.0 } },
    { brand: "Sangrá", model: "Domo", specs: { widthCm: 36.5, depthCm: 42.0, boltDistanceCm: 16.0 } },
    { brand: "Sangrá", model: "Alcora", specs: { widthCm: 36.6, depthCm: null, boltDistanceCm: null } },
    { brand: "Sangrá", model: "Boreal", specs: { widthCm: 36.0, depthCm: 43.5, boltDistanceCm: 15.5 } },
    { brand: "Sangrá", model: "Siena", specs: { widthCm: 37.0, depthCm: 41.5, boltDistanceCm: 16.0 } },
    { brand: "Sangrá", model: "Taiga", specs: { widthCm: 35.5, depthCm: 48.0, boltDistanceCm: 15.5 } },

    { brand: "Jacob Delafon", model: "Altair", specs: { widthCm: 35.1, depthCm: 43.5, boltDistanceCm: 16.0 } },
    { brand: "Jacob Delafon", model: "Antares", specs: { widthCm: 35.5, depthCm: 44.6, boltDistanceCm: 16.0 } },
    { brand: "Jacob Delafon", model: "Odeon", specs: { widthCm: 36.5, depthCm: 43.0, boltDistanceCm: null } },
    { brand: "Jacob Delafon", model: "Presqu'ile", specs: { widthCm: 38.0, depthCm: 43.0, boltDistanceCm: 20.0 } },
    { brand: "Jacob Delafon", model: "Replay", specs: { widthCm: 36.5, depthCm: 43.5, boltDistanceCm: 20.0 } },
    { brand: "Jacob Delafon", model: "New Ola", specs: { widthCm: 36.2, depthCm: 43.7, boltDistanceCm: 15.5 } },
    { brand: "Jacob Delafon", model: "Struktura", specs: { widthCm: 34.0, depthCm: 40.8, boltDistanceCm: 15.5 } },
    { brand: "Jacob Delafon", model: "Brive", specs: { widthCm: 35.5, depthCm: 43.0, boltDistanceCm: 15.5 } },
    { brand: "Jacob Delafon", model: "Vox", specs: { widthCm: 37.0, depthCm: 44.0, boltDistanceCm: null } },
    { brand: "Jacob Delafon", model: "Ove", specs: { widthCm: 36.5, depthCm: 42.0, boltDistanceCm: 16.0 } },

    { brand: "Duravit", model: "Happy D.2", specs: { widthCm: 35.5, depthCm: 41.0, boltDistanceCm: null } },
    { brand: "Duravit", model: "ME by Starck", specs: { widthCm: 37.4, depthCm: 45.8, boltDistanceCm: null } },
    { brand: "Duravit", model: "Starck 3", specs: { widthCm: 36.5, depthCm: 42.0, boltDistanceCm: 16.0 } },
];

function normalizar(str) {
    if (!str) return '';
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '')
        .trim();
}

let actualizados = 0;
let noEncontrados = [];

for (const specData of specsData) {
    const brandNorm = normalizar(specData.brand);
    const modelNorm = normalizar(specData.model);
    let encontrado = false;

    for (const [marcaKey, marcaData] of Object.entries(productos.marcas)) {
        if (marcaData.modelos) {
            for (const producto of marcaData.modelos) {
                const prodMarca = normalizar(producto.marca);
                const prodModelo = normalizar(producto.modelo);

                if ((prodMarca.includes(brandNorm) || brandNorm.includes(prodMarca)) &&
                    (prodModelo.includes(modelNorm) || modelNorm.includes(prodModelo))) {

                    // Convertir formato
                    if (specData.specs.widthCm) producto.specs.ancho = String(specData.specs.widthCm);
                    if (specData.specs.depthCm) producto.specs.fondo = String(specData.specs.depthCm);
                    if (specData.specs.boltDistanceCm) producto.specs.distanciaEntreTornillos = String(specData.specs.boltDistanceCm);

                    console.log(`✅ ${specData.brand} ${specData.model} → ${producto.modelo}`);
                    actualizados++;
                    encontrado = true;
                    break;
                }
            }
        }
        if (encontrado) break;
    }

    if (!encontrado) {
        noEncontrados.push(`${specData.brand} ${specData.model}`);
    }
}

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');

console.log('\n========================================');
console.log(`✅ Productos actualizados: ${actualizados}`);
console.log(`⚠️  No encontrados: ${noEncontrados.length}`);

if (noEncontrados.length > 0) {
    console.log('\nNo encontrados:');
    noEncontrados.forEach(m => console.log(`  - ${m}`));
}
