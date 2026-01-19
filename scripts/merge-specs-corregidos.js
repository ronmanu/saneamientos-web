/**
 * Script para integrar especificaciones técnicas corregidas
 * Datos finales verificados por el usuario
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

// Datos corregidos y verificados
const specsData = [
    // ROCA
    { brand: "Roca", model: "Giralda", specs: { ancho: "36.0", fondo: "43.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Roca", model: "Verónica", specs: { ancho: "36.5", fondo: "44.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Roca", model: "Lorentina", specs: { ancho: "37.0", fondo: "46.5", distanciaEntreTornillos: "14.0", formaTaza: "ovalada", grupoCompatibilidad: null, colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Roca", model: "Victoria", specs: { ancho: "36.0", fondo: "44.6", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Roca", model: "Dama Retro", specs: { ancho: "32.7", fondo: "45.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Roca", model: "Meridian", specs: { ancho: "33.0", fondo: "42.15", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Roca", model: "Frontalis", specs: { ancho: "36.5", fondo: "44.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Roca", model: "Georgia", specs: { ancho: "38.0", fondo: "46.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Roca", model: "Veranda", specs: { ancho: "39.0", fondo: "45.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },

    // BELLAVISTA
    { brand: "Bellavista", model: "Arcadia", specs: { ancho: "38.5", fondo: "44.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Bellavista", model: "Itálica", specs: { ancho: "37.0", fondo: "44.0", distanciaEntreTornillos: "20.5", formaTaza: "ovalada", grupoCompatibilidad: null, colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Bellavista", model: "Magna", specs: { ancho: "37.0", fondo: "44.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Bellavista", model: "Lara", specs: { ancho: "37.0", fondo: "43.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Bellavista", model: "Record", specs: { ancho: "35.5", fondo: "43.5", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Bellavista", model: "Capri", specs: { ancho: "35.2", fondo: null, distanciaEntreTornillos: null, formaTaza: "ovalada", grupoCompatibilidad: null, colorDisponible: ["blanco", "pergamón"] } },

    // GALA
    { brand: "Gala", model: "Elia", specs: { ancho: "35.0", fondo: "42.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Gala", model: "Gala 2000", specs: { ancho: "34.0", fondo: "45.0", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Gala", model: "Aurea", specs: { ancho: "39.0", fondo: "41.0", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Gala", model: "Loa", specs: { ancho: "37.0", fondo: "42.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Gala", model: "Nostalgia", specs: { ancho: "34.5", fondo: "44.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Gala", model: "Bacara", specs: { ancho: "36.0", fondo: "42.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Gala", model: "Diana", specs: { ancho: "34.0", fondo: "43.0", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco", "pergamón"] } },

    // JACOB DELAFON
    { brand: "Jacob Delafon", model: "Odeon", specs: { ancho: "36.5", fondo: "43.0", distanciaEntreTornillos: null, formaTaza: "ovalada", grupoCompatibilidad: null, colorDisponible: ["blanco"] } },
    { brand: "Jacob Delafon", model: "Antares", specs: { ancho: "35.5", fondo: "44.6", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { brand: "Jacob Delafon", model: "Ove", specs: { ancho: "36.5", fondo: "42.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { brand: "Jacob Delafon", model: "Struktura", specs: { ancho: "34.0", fondo: "40.8", distanciaEntreTornillos: "15.5", formaTaza: "cuadrada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },

    // SANGRÁ
    { brand: "Sangrá", model: "Alcora", specs: { ancho: "38.0", fondo: "44.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Sangrá", model: "Domo", specs: { ancho: "36.6", fondo: "42.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Sangrá", model: "Boreal", specs: { ancho: "36.0", fondo: "43.5", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Sangrá", model: "Granada", specs: { ancho: "35.0", fondo: "43.0", distanciaEntreTornillos: "16.5", formaTaza: "ovalada", grupoCompatibilidad: null, colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Sangrá", model: "Isis", specs: { ancho: "36.4", fondo: null, distanciaEntreTornillos: null, formaTaza: "ovalada", grupoCompatibilidad: null, colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Sangrá", model: "Proa", specs: { ancho: "37.0", fondo: "42.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Sangrá", model: "Siena", specs: { ancho: "37.0", fondo: "41.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { brand: "Sangrá", model: "Taiga", specs: { ancho: "35.5", fondo: "48.0", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco", "pergamón"] } },

    // VALADARES
    { brand: "Valadares", model: "Oporto", specs: { ancho: "35.0", fondo: "43.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { brand: "Valadares", model: "Opus", specs: { ancho: "35.0", fondo: "41.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { brand: "Valadares", model: "Oceanus", specs: { ancho: "36.5", fondo: "42.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { brand: "Valadares", model: "Durius", specs: { ancho: "36.0", fondo: "40.0", distanciaEntreTornillos: "12.5", formaTaza: "ovalada", grupoCompatibilidad: null, colorDisponible: ["blanco"] } },
    { brand: "Valadares", model: "Thema", specs: { ancho: "34.5", fondo: "42.0", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },

    // SANITANA
    { brand: "Sanitana", model: "Regina", specs: { ancho: "36.5", fondo: "44.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { brand: "Sanitana", model: "Munique", specs: { ancho: "36.5", fondo: "43.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { brand: "Sanitana", model: "Kapa", specs: { ancho: "36.0", fondo: "42.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { brand: "Sanitana", model: "Imperial", specs: { ancho: "33.5", fondo: "43.0", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },
    { brand: "Sanitana", model: "Nexo", specs: { ancho: "36.0", fondo: "43.0", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { brand: "Sanitana", model: "Lisboa", specs: { ancho: "39.5", fondo: "45.5", distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },

    // DURAVIT
    { brand: "Duravit", model: "Starck", specs: { ancho: null, fondo: null, distanciaEntreTornillos: "16.0", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
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

                    // Actualizar specs
                    producto.specs = { ...producto.specs, ...specData.specs };
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
