const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf8'));

// Colores a ignorar (blanco estándar)
const ignoreColors = ['blanco', 'white'];
const variantesPendientes = {};

Object.values(productos.marcas).forEach(marca => {
    if (!marca.modelos) return;
    marca.modelos.forEach(m => {
        // Detectar color del nombre o slug
        const nameLower = m.modelo.toLowerCase();
        let color = 'blanco'; // Default

        // Extraer color
        const colors = ['visón', 'vison', 'rosa', 'azul', 'verde', 'gris', 'habana', 'pergamón', 'pergamon', 'mate', 'negro', 'rojo', 'manhatan', 'champán', 'champan'];

        for (const c of colors) {
            if (nameLower.includes(c)) {
                color = c;
                break;
            }
        }

        if (ignoreColors.includes(color)) return;

        // Verificar si existe la imagen
        const slug = m.modeloSlug; // Suponemos que ya está en el JSON o lo calculamos
        // Para simplificar, asumo ruta estandar
        const imagePath = `public/productos/${m.marcaSlug}_${m.modeloSlug}.png`;

        if (!fs.existsSync(path.join(__dirname, '..', imagePath))) {
            const key = `${marca.nombre} ${m.modelo.split(' ')[0]}`; // Ej: Roca Victoria
            if (!variantesPendientes[key]) variantesPendientes[key] = new Set();
            variantesPendientes[key].add(color);
        }
    });
});

console.log('--- VARIANTES DE COLOR FALTANTES (Prioridad de Generación) ---');
Object.entries(variantesPendientes).forEach(([modelo, colores]) => {
    if (colores.size > 0) {
        console.log(`${modelo}: ${Array.from(colores).join(', ')}`);
    }
});
