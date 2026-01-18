/**
 * Script para fusionar especificaciones desde el CSV al JSON de productos
 * Ejecutar: node scripts/merge-from-csv.js
 */

const fs = require('fs');
const path = require('path');

// Leer archivos
const productosPath = path.join(__dirname, '../app/data/productos.json');
const csvPath = path.join(__dirname, '../especificaciones_csv.csv');
const outputPath = path.join(__dirname, '../app/data/productos.json'); // Actualizar directamente

const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parsear CSV
const lines = csvContent.split('\n').filter(l => l.trim());
const headers = lines[0].split(',');
const csvData = [];

for (let i = 1; i < lines.length; i++) {
    const values = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const row = {};
    headers.forEach((h, idx) => {
        let val = values[idx] || '';
        val = val.replace(/^"|"$/g, '').trim();
        row[h.trim()] = val;
    });
    csvData.push(row);
}

console.log(`📊 Filas CSV parseadas: ${csvData.length}\n`);

// Función para normalizar nombres
function normalizar(str) {
    if (!str) return '';
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '')
        .replace('jacobdelafon', 'jacobdelafon')
        .trim();
}

// Crear mapa de specs desde CSV
const specsMap = new Map();

csvData.forEach(row => {
    const marca = row['Marca'] || '';
    const modelo = row['Modelo'] || '';
    const key = normalizar(marca) + '-' + normalizar(modelo);

    specsMap.set(key, {
        distanciaEntreTornillos: row['Distancia_Orificios_cm'] || null,
        ancho: row['Ancho_cm'] ? row['Ancho_cm'].replace('~', '') : null,
        fondo: row['Largo_cm'] ? row['Largo_cm'].replace('~', '') : null,
        formaTaza: row['Forma'] ? row['Forma'].toLowerCase() : null,
        codigoReferencia: row['Código_Referencia'] !== '–' ? row['Código_Referencia'] : null,
        grupoCompatibilidad: row['Grupo_Compatibilidad'] || null,
        alertaCompatibilidad: row['Alerta_Crítica'] && row['Alerta_Crítica'].includes('⚠️') ? row['Alerta_Crítica'] : null,
    });
    console.log(`📦 CSV: ${marca} ${modelo} → dist: ${row['Distancia_Orificios_cm']}cm`);
});

console.log(`\n✅ Total specs en CSV: ${specsMap.size}\n`);

// Función para fusionar specs
function fusionarSpecs(specsExistente, specsNuevo) {
    const resultado = { ...specsExistente };

    // Solo actualizar campos que estén null o vacíos
    Object.keys(specsNuevo).forEach(key => {
        if (specsNuevo[key] && (resultado[key] === null || resultado[key] === undefined)) {
            resultado[key] = specsNuevo[key];
        }
    });

    return resultado;
}

// Procesar productos
let actualizados = 0;
let yaCompletos = 0;
let noEncontrados = [];

for (const [marcaKey, marcaData] of Object.entries(productos.marcas)) {
    if (marcaData.modelos && Array.isArray(marcaData.modelos)) {
        marcaData.modelos = marcaData.modelos.map(producto => {
            // Intentar varios formatos de key
            const marca = normalizar(producto.marca);
            const modelo = normalizar(producto.modelo);

            // Keys a probar
            const keysToTry = [
                marca + '-' + modelo,
                marca + '-' + modelo.replace('pre2007', 'pre-2007'),
                marca + '-' + modelo.replace('post2007', 'post-2007'),
            ];

            // Si es Marina, probar versiones especiales
            if (modelo.includes('marina')) {
                keysToTry.push('gala-marinapre2007');
                keysToTry.push('gala-marinapost2007');
            }

            let specsEncontrado = null;
            for (const key of keysToTry) {
                if (specsMap.has(key)) {
                    specsEncontrado = specsMap.get(key);
                    break;
                }
            }

            if (specsEncontrado) {
                const yaCompleto = producto.specs &&
                    producto.specs.distanciaEntreTornillos &&
                    producto.specs.ancho;

                if (yaCompleto) {
                    yaCompletos++;
                    console.log(`  ✓ Ya completo: ${producto.marca} ${producto.modelo}`);
                } else {
                    producto.specs = fusionarSpecs(producto.specs || {}, specsEncontrado);
                    actualizados++;
                    console.log(`  ✅ Actualizado: ${producto.marca} ${producto.modelo}`);
                }
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
console.log(`✓  Ya estaban completos: ${yaCompletos}`);
console.log(`⚠️  Sin specs en CSV: ${noEncontrados.length}`);
console.log(`📄 Guardado en: productos.json`);

if (noEncontrados.length > 0 && noEncontrados.length <= 50) {
    console.log('\nModelos sin specs en CSV (necesitan búsqueda manual):');
    noEncontrados.forEach(m => console.log(`  - ${m}`));
}
