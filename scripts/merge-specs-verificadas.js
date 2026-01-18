/**
 * Script para integrar especificaciones técnicas fiables
 * Datos proporcionados por el usuario con medidas verificadas
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

// Datos de especificaciones verificados
const specsData = [
    // ROCA
    { marca: "ROCA", modelo: "Giralda", specs: { ancho: "36", fondo: "43.5", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "ROCA", modelo: "Verónica", specs: { ancho: "36.5", fondo: "44", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "ROCA", modelo: "Lorentina", specs: { ancho: "37", fondo: "46.5", distanciaEntreTornillos: "14", formaTaza: "ovalada", grupoCompatibilidad: "14.0 cm", colorDisponible: ["blanco"] } },
    { marca: "ROCA", modelo: "Lucerna", specs: { ancho: "35.2", fondo: "43", distanciaEntreTornillos: "13.4-17.4", formaTaza: "ovalada", grupoCompatibilidad: "multirango 13.5-17.5 cm", colorDisponible: ["blanco"] } },
    { marca: "ROCA", modelo: "Victoria", specs: { ancho: "36", fondo: "44.6", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "ROCA", modelo: "Dama Retro", specs: { ancho: "32.7", fondo: "45", distanciaEntreTornillos: "16", formaTaza: "redonda", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "ROCA", modelo: "Meridian", specs: { ancho: "36.2", fondo: "42.4", distanciaEntreTornillos: "23", formaTaza: "ovalada", grupoCompatibilidad: "23.0 cm (Meridian compacto)", colorDisponible: ["blanco"] } },
    { marca: "ROCA", modelo: "Frontalis", specs: { ancho: "36.5", fondo: "44", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "ROCA", modelo: "Georgia", specs: { ancho: "38", fondo: "46.5", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "ROCA", modelo: "Veranda", specs: { ancho: "39", fondo: "46", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },

    // BELLAVISTA
    { marca: "BELLAVISTA", modelo: "Arcadia", specs: { ancho: "35.5", fondo: "41", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },
    { marca: "BELLAVISTA", modelo: "Itálica", specs: { ancho: "37", fondo: "44", distanciaEntreTornillos: "20.5", formaTaza: "ovalada", grupoCompatibilidad: "20.5 cm", colorDisponible: ["blanco"] } },
    { marca: "BELLAVISTA", modelo: "Magna", specs: { ancho: "37", fondo: "44", distanciaEntreTornillos: "16", formaTaza: "cuadrada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },

    // GALA
    { marca: "GALA", modelo: "Elia", specs: { ancho: "35.5", fondo: "42.5", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "GALA", modelo: "Klea", specs: { ancho: "37", fondo: "40.4", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "GALA", modelo: "Street", specs: { ancho: "36", fondo: "43", distanciaEntreTornillos: "15.5", formaTaza: "cuadrada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },
    { marca: "GALA", modelo: "Gala 2000", specs: { ancho: "34", fondo: "45", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },
    { marca: "GALA", modelo: "Aurea", specs: { ancho: "39", fondo: "41", distanciaEntreTornillos: "15.5", formaTaza: "cuadrada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },
    { marca: "GALA", modelo: "Loa", specs: { ancho: "37", fondo: "42.5", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "GALA", modelo: "Nostalgia", specs: { ancho: "34.5", fondo: "44", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "GALA", modelo: "Bacara", specs: { ancho: "36", fondo: "42", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "GALA", modelo: "Diana", specs: { ancho: "34", fondo: "43", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },

    // JACOB DELAFON
    { marca: "JACOB DELAFON", modelo: "Odeon", specs: { ancho: "36", fondo: "43", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },
    { marca: "JACOB DELAFON", modelo: "Antares", specs: { ancho: "35.5", fondo: "44.6", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "JACOB DELAFON", modelo: "Astros", specs: { ancho: "39", fondo: "45", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "JACOB DELAFON", modelo: "Freelance", specs: { ancho: "37", fondo: "42.6", distanciaEntreTornillos: "16.3", formaTaza: "cuadrada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "JACOB DELAFON", modelo: "Portrait", specs: { ancho: "36", fondo: "48", distanciaEntreTornillos: "14", formaTaza: "cuadrada", grupoCompatibilidad: "14.0 cm", colorDisponible: ["blanco"] } },
    { marca: "JACOB DELAFON", modelo: "Escale", specs: { ancho: "37.6", fondo: "46.2", distanciaEntreTornillos: "16", formaTaza: "cuadrada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "JACOB DELAFON", modelo: "Ove", specs: { ancho: "36.5", fondo: "42", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
    { marca: "JACOB DELAFON", modelo: "Struktura", specs: { ancho: "34", fondo: "40.8", distanciaEntreTornillos: "15.5", formaTaza: "cuadrada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },

    // SANGRÁ
    { marca: "SANGRÁ", modelo: "Alcora", specs: { ancho: "38", fondo: "44", distanciaEntreTornillos: "14", formaTaza: "ovalada", grupoCompatibilidad: "14.0 cm", colorDisponible: ["blanco"] } },

    // VALADARES
    { marca: "VALADARES", modelo: "Nautilus", specs: { ancho: "36.5", fondo: "42.5", distanciaEntreTornillos: "18", formaTaza: "ovalada", grupoCompatibilidad: "18.0 cm", colorDisponible: ["blanco"] } },

    // SANITANA
    { marca: "SANITANA", modelo: "Nexo", specs: { ancho: "35.5", fondo: "43", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },
];

// Función para normalizar nombres
function normalizar(str) {
    if (!str) return '';
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '')
        .trim();
}

// Procesar productos
let actualizados = 0;
let noEncontrados = [];

for (const specData of specsData) {
    const marcaNorm = normalizar(specData.marca);
    const modeloNorm = normalizar(specData.modelo);
    let encontrado = false;

    for (const [marcaKey, marcaData] of Object.entries(productos.marcas)) {
        if (marcaData.modelos) {
            for (const producto of marcaData.modelos) {
                const prodMarca = normalizar(producto.marca);
                const prodModelo = normalizar(producto.modelo);

                // Verificar coincidencia
                if (prodMarca.includes(marcaNorm) || marcaNorm.includes(prodMarca)) {
                    if (prodModelo.includes(modeloNorm) || modeloNorm.includes(prodModelo)) {
                        // Fusionar specs
                        producto.specs = { ...producto.specs, ...specData.specs };
                        console.log(`✅ ${specData.marca} ${specData.modelo} → ${producto.modelo}`);
                        actualizados++;
                        encontrado = true;
                        break;
                    }
                }
            }
        }
        if (encontrado) break;
    }

    if (!encontrado) {
        noEncontrados.push(`${specData.marca} ${specData.modelo}`);
    }
}

// Guardar resultado
fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');

console.log('\n========================================');
console.log(`✅ Productos actualizados: ${actualizados}`);
console.log(`⚠️  No encontrados: ${noEncontrados.length}`);

if (noEncontrados.length > 0) {
    console.log('\nNo encontrados (verificar nombres en JSON):');
    noEncontrados.forEach(m => console.log(`  - ${m}`));
}
