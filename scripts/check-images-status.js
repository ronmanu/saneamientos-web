/**
 * Script para auditar el estado de las imágenes (Reales vs Placeholders)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const publicPath = path.join(__dirname, '../public/productos');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

// Hashes conocidos de placeholders (para detectar copias)
const placeholderHashes = new Set();
const knownPlaceholders = [
    'lavabo_roca.png',
    'bide_clasico.png',
    'categoria_inodoros.png',
    'roca_victoria.png',
    'cisterna_alta.png',
    'gala_elia.png',
    'tapa_wc_blanca.png'
];

function getFileHash(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

// Pre-calcular hashes de los templates base
knownPlaceholders.forEach(name => {
    const p = path.join(publicPath, name);
    if (fs.existsSync(p)) {
        placeholderHashes.add(getFileHash(p));
    }
});

let total = 0;
let real = 0;
let placeholder = 0;
let missing = 0;

const reportLines = [];
reportLines.push('# 📊 Estado de Imágenes del Catálogo');
reportLines.push(`Fecha: ${new Date().toLocaleString()}\n`);
reportLines.push('| Marca | Categoría | Modelo | Estado | Archivo |');
reportLines.push('|---|---|---|---|---|');

const missingList = [];

Object.values(productos.marcas).forEach(marca => {
    if (!marca.modelos) return;

    marca.modelos.sort((a, b) => a.categoria.localeCompare(b.categoria)).forEach(modelo => {
        total++;
        const imgName = `${modelo.marcaSlug}_${modelo.modeloSlug}.png`;
        const imgPath = path.join(publicPath, imgName);
        const hash = getFileHash(imgPath);

        let status = '❌ FALTANTE';
        let icon = '🔴';

        if (hash) {
            if (placeholderHashes.has(hash)) {
                status = '⚠️ PLACEHOLDER';
                icon = '🟡';
                placeholder++;
                missingList.push(`- [ ] **${modelo.categoria}**: ${modelo.marca} ${modelo.modelo}`);
            } else {
                status = '✅ REAL';
                icon = '🟢';
                real++;
            }
        } else {
            missing++;
            missingList.push(`- [ ] **${modelo.categoria}** (SIN ARCHIVO): ${modelo.marca} ${modelo.modelo}`);
        }

        // Solo reportar si no es real para no saturar el MD, o reportar todo?
        // Mejor reportar todo pero filtrar visualmente.
        reportLines.push(`| ${marca.nombre} | ${modelo.categoria} | ${modelo.modelo} | ${icon} ${status} | \`${imgName}\` |`);
    });
});

const summary = `
## Resumen Global
- **Total Productos:** ${total}
- **✅ Imágenes Reales:** ${real}
- **🟡 Placeholders (A generar):** ${placeholder}
- **🔴 Faltantes (Error):** ${missing}

## 📝 Lista de Tareas (Prioridad Generación)
${missingList.join('\n')}
`;

const finalContent = summary + '\n\n' + reportLines.join('\n');

fs.writeFileSync(path.join(__dirname, '../ESTADO_IMAGENES.md'), finalContent);
console.log('Reporte generado en ESTADO_IMAGENES.md');
console.log(`Reales: ${real}, Placeholders: ${placeholder}, Faltantes: ${missing}`);
