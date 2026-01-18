/**
 * Script para fusionar especificaciones técnicas con el JSON de productos
 * 
 * USO:
 * 1. Coloca el archivo especificaciones_json_lookup.json en scripts/
 * 2. Ejecuta: node scripts/merge-specs-to-productos.js
 * 
 * El script buscará coincidencias por marca + modelo y actualizará los specs
 */

const fs = require('fs');
const path = require('path');

// Rutas de archivos
const productosPath = path.join(__dirname, '../app/data/productos.json');
const specsPath = path.join(__dirname, 'especificaciones_json_lookup.json');
const outputPath = path.join(__dirname, '../app/data/productos-con-specs-reales.json');

// Verificar que existen los archivos
if (!fs.existsSync(productosPath)) {
    console.error('❌ No se encontró productos.json');
    process.exit(1);
}

if (!fs.existsSync(specsPath)) {
    console.log('⚠️  No se encontró especificaciones_json_lookup.json');
    console.log('   Coloca el archivo en: ' + specsPath);
    console.log('\n   Estructura esperada del JSON de specs:');
    console.log(`   {
     "modelos": [
       {
         "marca": "ROCA",
         "modelo": "Victoria",
         "specs": {
           "alturaTotal": "78",
           "alturaAsiento": "40",
           ...
         }
       }
     ]
   }`);
    process.exit(1);
}

// Cargar archivos
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));
const specsData = JSON.parse(fs.readFileSync(specsPath, 'utf-8'));

// Función para normalizar nombres para comparación
function normalizar(str) {
    if (!str) return '';
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quitar acentos
        .replace(/[^a-z0-9]/g, '') // Solo alfanuméricos
        .trim();
}

// Crear mapa de specs por marca+modelo normalizado
const specsMap = new Map();
const modelos = specsData.modelos || specsData.productos || specsData;

if (Array.isArray(modelos)) {
    modelos.forEach(item => {
        const key = normalizar(item.marca) + '-' + normalizar(item.modelo);
        specsMap.set(key, item.specs || item);
    });
} else if (typeof modelos === 'object') {
    // Si es un objeto con marcas como keys
    Object.entries(modelos).forEach(([marca, modelosArray]) => {
        if (Array.isArray(modelosArray)) {
            modelosArray.forEach(item => {
                const key = normalizar(marca) + '-' + normalizar(item.modelo || item.name);
                specsMap.set(key, item.specs || item);
            });
        }
    });
}

console.log(`📊 Cargadas ${specsMap.size} especificaciones del archivo de specs`);

// Procesar productos y fusionar specs
let actualizados = 0;
let noEncontrados = [];

for (const [marcaKey, marcaData] of Object.entries(productos.marcas)) {
    if (marcaData.modelos && Array.isArray(marcaData.modelos)) {
        marcaData.modelos = marcaData.modelos.map(producto => {
            // Buscar specs para este producto
            const key = normalizar(producto.marca) + '-' + normalizar(producto.modelo);
            const specsEncontrado = specsMap.get(key);

            if (specsEncontrado) {
                // Fusionar specs (mantener estructura existente, actualizar valores)
                if (producto.specs) {
                    Object.keys(producto.specs).forEach(campo => {
                        if (specsEncontrado[campo] !== undefined && specsEncontrado[campo] !== null) {
                            producto.specs[campo] = specsEncontrado[campo];
                        }
                    });
                    // Añadir campos nuevos que no existían
                    Object.keys(specsEncontrado).forEach(campo => {
                        if (producto.specs[campo] === undefined) {
                            producto.specs[campo] = specsEncontrado[campo];
                        }
                    });
                } else {
                    producto.specs = specsEncontrado;
                }
                actualizados++;
                console.log(`  ✅ ${producto.marca} ${producto.modelo}`);
            } else {
                noEncontrados.push(`${producto.marca} ${producto.modelo}`);
            }

            return producto;
        });
    }
}

// Guardar resultado
fs.writeFileSync(outputPath, JSON.stringify(productos, null, 2), 'utf-8');

console.log('\n========================================');
console.log(`✅ Productos actualizados: ${actualizados}`);
console.log(`⚠️  Sin specs encontradas: ${noEncontrados.length}`);
console.log(`📄 Guardado en: ${outputPath}`);

if (noEncontrados.length > 0 && noEncontrados.length <= 20) {
    console.log('\nModelos sin specs:');
    noEncontrados.forEach(m => console.log(`  - ${m}`));
}

console.log('\n📌 Para activar los nuevos datos:');
console.log('   1. Revisa el archivo productos-con-specs-reales.json');
console.log('   2. Si es correcto, ejecuta:');
console.log('      mv app/data/productos-con-specs-reales.json app/data/productos.json');
