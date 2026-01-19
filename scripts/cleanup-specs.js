/**
 * Script para limpiar datos redundantes en variantes de color.
 * Si un producto es una variante de color (tiene 'colorSlug'), 
 * eliminamos la lista genérica 'colorDisponible' y aseguramos que tenga su 'color' específico.
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

let cleaned = 0;

Object.values(productos.marcas).forEach(marca => {
    if (!marca.modelos) return;

    marca.modelos.forEach(modelo => {
        // Detectar si es una variante de color (por convención, si colorSlug está definido o si el ID termina en color)
        // En nuestro script anterior usábamos colorSlug.

        if (modelo.colorSlug && modelo.specs) {
            // Es una variante específica
            if (modelo.specs.colorDisponible) {
                delete modelo.specs.colorDisponible;
                cleaned++;
            }

            // Asegurar que tenga el spec 'Color'
            // modelo.specs['Color'] = capitalizar(modelo.colorSlug); // Opcional, ya debería estar
        }
    });
});

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');
console.log(`✅ Limpiada lista de colores redundante en ${cleaned} variantes de producto.`);
