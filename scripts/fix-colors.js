/**
 * Script para corregir y ampliar la lista de colores disponibles
 * en modelos icónicos de Roca que tenían amplia gama.
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

const gamaColoresRoca = [
    "Blanco",
    "Pergamón",
    "Visón",
    "Rosa Ilusión",
    "Azul Formentor",
    "Verde Sauce",
    "Gris Polar"
];

// Modelos que sabemos que tenían esta gama completa (aprox)
const modelosRocaFullColor = [
    "victoria",
    "giralda",
    "dama-retro",
    "gondola",
    "meridian",
    "lucerna",
    "lorentina",
    "veronica",
    "veranda",
    "georgia"
];

let updated = 0;

if (productos.marcas && productos.marcas.roca && productos.marcas.roca.modelos) {
    productos.marcas.roca.modelos.forEach(m => {
        // Normalizar nombre para checkeo
        const modeloNorm = m.modeloSlug.toLowerCase();

        // Si el modelo está en la lista de "Full Color"
        // O si ya tenía colores pero solo "blanco, pergamon"
        if (modelosRocaFullColor.some(target => modeloNorm.includes(target))) {

            if (!m.specs) m.specs = {};

            // Si ya tiene colores pero son pocos, o si no tiene
            // RESPETAR si ya tiene algo específico que parece correcto, pero "blanco pergamón" es el default a corregir.
            const currentColors = m.specs.colorDisponible || [];

            // Si tiene menos de 4 colores, asumimos que faltan los raros
            if (currentColors.length < 4) {
                m.specs.colorDisponible = gamaColoresRoca;
                updated++;
                console.log(`Updated colors for: ROCA ${m.modelo}`);
            }
        }
    });
}

// Guardar
fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
console.log(`\n Total productos actualizados con gama completa de colores: ${updated}`);
