/**
 * Script para integrar especificaciones adicionales (2da iteración)
 * Sangrá, Valadares, Sanitana y Duravit
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

// Datos adicionales verificados
const specsData = [
    // SANGRÁ (adicionales)
    { marca: "SANGRÁ", modelo: "Bahía", specs: { ancho: "36.5", fondo: "42", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { marca: "SANGRÁ", modelo: "Domo", specs: { ancho: "36.6", fondo: "42", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },

    // VALADARES (adicionales)
    { marca: "VALADARES", modelo: "Tagus", specs: { ancho: "37", fondo: "42.5", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco"] } },
    { marca: "VALADARES", modelo: "Oporto", specs: { ancho: "37.5", fondo: "43.5", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco"] } },

    // SANITANA (adicionales)
    { marca: "SANITANA", modelo: "Regina", specs: { ancho: "35.5", fondo: "44.5", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { marca: "SANITANA", modelo: "Munique", specs: { ancho: "34.5", fondo: "43", distanciaEntreTornillos: "16", formaTaza: "ovalada", grupoCompatibilidad: "16.0 cm", colorDisponible: ["blanco", "pergamón"] } },
    { marca: "SANITANA", modelo: "Colonia", specs: { ancho: "36.5", fondo: "42.5", distanciaEntreTornillos: "15.5", formaTaza: "ovalada", grupoCompatibilidad: "15.5 cm", colorDisponible: ["blanco", "pergamón"] } },

    // DURAVIT
    { marca: "DURAVIT", modelo: "Happy D", specs: { ancho: "36", fondo: "43", distanciaEntreTornillos: "21", formaTaza: "ovalada", grupoCompatibilidad: "21.0 cm", colorDisponible: ["blanco"] } },
    { marca: "DURAVIT", modelo: "D-Code", specs: { ancho: "35.5", fondo: "42.5", distanciaEntreTornillos: "16.5", formaTaza: "cuadrada", grupoCompatibilidad: "16.5 cm", colorDisponible: ["blanco"] } },
    { marca: "DURAVIT", modelo: "Starck 1", specs: { ancho: "41.5", fondo: "42", distanciaEntreTornillos: "13.5", formaTaza: "redonda", grupoCompatibilidad: "13.5 cm", colorDisponible: ["blanco"] } },
    { marca: "DURAVIT", modelo: "Starck 2", specs: { ancho: "36", fondo: "43", distanciaEntreTornillos: "27", formaTaza: "ovalada", grupoCompatibilidad: "27.0 cm", colorDisponible: ["blanco"] } },
    { marca: "DURAVIT", modelo: "Starck 3", specs: { ancho: "36", fondo: "43", distanciaEntreTornillos: "27", formaTaza: "ovalada", grupoCompatibilidad: "27.0 cm", colorDisponible: ["blanco"] } },
    { marca: "DURAVIT", modelo: "Darling New", specs: { ancho: "36.6", fondo: "49", distanciaEntreTornillos: "14", formaTaza: "ovalada", grupoCompatibilidad: "14.0 cm", colorDisponible: ["blanco"] } },
    { marca: "DURAVIT", modelo: "Vero Air", specs: { ancho: "37.8", fondo: "46.9", distanciaEntreTornillos: null, formaTaza: "cuadrada", grupoCompatibilidad: null, colorDisponible: ["blanco"] } },
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

                if (prodMarca.includes(marcaNorm) || marcaNorm.includes(prodMarca)) {
                    if (prodModelo.includes(modeloNorm) || modeloNorm.includes(prodModelo)) {
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

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');

console.log('\n========================================');
console.log(`✅ Productos actualizados: ${actualizados}`);
console.log(`⚠️  No encontrados: ${noEncontrados.length}`);

if (noEncontrados.length > 0) {
    console.log('\nNo encontrados:');
    noEncontrados.forEach(m => console.log(`  - ${m}`));
}
