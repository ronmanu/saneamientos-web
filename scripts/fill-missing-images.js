/**
 * Script para rellenar imágenes faltantes con placeholders seguros por categoría
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const publicPath = path.join(__dirname, '../public/productos');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

// Mapa de templates (Placeholders seguros existentes)
const templates = {
    'lavabos': 'lavabo_roca.png',
    'bidets': 'bide_clasico.png',
    'inodoros': 'roca_victoria.png', // Usar uno genérico realista
    'cisternas': 'gala_elia.png', // Usar una de las nuevas como base genérica
    'tapas-wc': 'tapa_wc_blanca.png',
    'plato-ducha': 'categoria_inodoros.png', // Fallback temporal
    'default': 'categoria_inodoros.png'
};

let copied = 0;

Object.values(productos.marcas).forEach(marca => {
    if (!marca.modelos) return;

    marca.modelos.forEach(modelo => {
        const expectedName = `${modelo.marcaSlug}_${modelo.modeloSlug}.png`;
        const destPath = path.join(publicPath, expectedName);

        if (!fs.existsSync(destPath)) {
            const cat = modelo.categoria || 'default';
            const templateName = templates[cat] || templates['default'];
            const templatePath = path.join(publicPath, templateName);

            if (fs.existsSync(templatePath)) {
                fs.copyFileSync(templatePath, destPath);
                console.log(`[Relleno] ${expectedName} <- ${templateName}`);
                copied++;
            } else {
                console.warn(`[Warning] No existe template para ${cat}: ${templateName}`);
            }
        }
    });
});

console.log(`\n✅ Total imágenes rellenadas: ${copied}`);
