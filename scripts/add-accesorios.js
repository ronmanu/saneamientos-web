/**
 * Script para añadir accesorios a productos.json
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

const accesoriosData = [
    // ROCA Accesorios
    { marca: "roca", model: "Veranda Portarrollos", tipo: "Portarrollos", periodo: "1995-2010", specs: { ancho: "18", proyeccion: "8", acabado: "cromo" } },
    { marca: "roca", model: "Veranda Toallero", tipo: "Toallero", periodo: "1995-2010", specs: { ancho: "45", proyeccion: "8", acabado: "cromo" } },
    { marca: "roca", model: "Veranda Jabonera", tipo: "Jabonera", periodo: "1995-2010", specs: { ancho: "12", proyeccion: "10", acabado: "cromo" } },
    { marca: "roca", model: "Victoria Portarrollos", tipo: "Portarrollos", periodo: "1990-2010", specs: { acabado: "cromo" } },
    { marca: "roca", model: "Victoria Toallero", tipo: "Toallero", periodo: "1990-2010", specs: { acabado: "cromo" } },
    { marca: "roca", model: "Victoria Jabonera", tipo: "Jabonera", periodo: "1990-2010", specs: { acabado: "cromo" } },
    { marca: "roca", model: "Meridian Portarrollos", tipo: "Portarrollos", periodo: "1995-2008", specs: { acabado: "cromo" } },
    { marca: "roca", model: "Meridian Toallero", tipo: "Toallero", periodo: "1995-2008", specs: { acabado: "cromo" } },
    { marca: "roca", model: "Dama Retro Portarrollos", tipo: "Portarrollos", periodo: "1990-2008", specs: { acabado: "cromo" } },
    { marca: "roca", model: "Dama Retro Toallero", tipo: "Toallero", periodo: "1990-2008", specs: { acabado: "cromo" } },

    // GALA Accesorios
    { marca: "gala", model: "Marina Portarrollos", tipo: "Portarrollos", periodo: "1975-2007", specs: { acabado: "cromo" } },
    { marca: "gala", model: "Marina Toallero", tipo: "Toallero", periodo: "1975-2007", specs: { acabado: "cromo" } },
    { marca: "gala", model: "Marina Jabonera", tipo: "Jabonera", periodo: "1975-2007", specs: { acabado: "cromo" } },
    { marca: "gala", model: "Loa Portarrollos", tipo: "Portarrollos", periodo: "1980-2010", specs: { acabado: "cromo" } },
    { marca: "gala", model: "Loa Toallero", tipo: "Toallero", periodo: "1980-2010", specs: { acabado: "cromo" } },

    // BELLAVISTA Accesorios
    { marca: "bellavista", model: "Duna Portarrollos", tipo: "Portarrollos", periodo: "1970-2010", specs: { acabado: "cromo" } },
    { marca: "bellavista", model: "Duna Toallero", tipo: "Toallero", periodo: "1970-2010", specs: { acabado: "cromo" } },
    { marca: "bellavista", model: "Stylo Portarrollos", tipo: "Portarrollos", periodo: "1985-2010", specs: { acabado: "cromo" } },
    { marca: "bellavista", model: "Stylo Toallero", tipo: "Toallero", periodo: "1985-2010", specs: { acabado: "cromo" } },

    // Muebles
    { marca: "bellavista", model: "Aloe 2 Mueble Lavabo", tipo: "Mueble lavabo", periodo: "2000-2015", specs: { ancho: "80", fondo: "45", alto: "55", tipoLavabo: "sobre-encimera" } },
    { marca: "roca", model: "Victoria Mueble Lavabo", tipo: "Mueble lavabo", periodo: "1990-2010", specs: { ancho: "60", fondo: "40", alto: "50" } },
    { marca: "gala", model: "Street Mueble Lavabo", tipo: "Mueble lavabo", periodo: "2000-2012", specs: { ancho: "70", fondo: "45", alto: "55" } },

    // Mamparas genéricas
    { marca: "roca", model: "Mampara Frontal Años 90", tipo: "Mampara frontal", periodo: "1990-2005", specs: { anchoMin: "120", anchoMax: "180", altura: "185", tipoApertura: "corredera", perfil: "blanco" } },
    { marca: "roca", model: "Mampara Angular Años 90", tipo: "Mampara angular", periodo: "1990-2005", specs: { anchoMin: "70", anchoMax: "90", altura: "185", tipoApertura: "corredera", perfil: "blanco" } },
];

const marcaConfig = {
    roca: { nombre: "ROCA", slug: "roca" },
    gala: { nombre: "GALA", slug: "gala" },
    bellavista: { nombre: "BELLAVISTA", slug: "bellavista" },
};

function slugify(str) {
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[().\/]/g, '');
}

let totalAdded = 0;

for (const acc of accesoriosData) {
    const config = marcaConfig[acc.marca];
    if (!productos.marcas[acc.marca]) {
        productos.marcas[acc.marca] = { nombre: config.nombre, slug: config.slug, modelos: [] };
    }

    const marca = productos.marcas[acc.marca];

    let maxId = 0;
    marca.modelos?.forEach(m => {
        const match = m.id.match(/-(\d+)$/);
        if (match) {
            const num = parseInt(match[1]);
            if (num > maxId) maxId = num;
        }
    });

    const modeloSlug = slugify(acc.model);
    const id = `${config.slug}-${modeloSlug}-acc-${maxId + 1}`;

    const exists = marca.modelos?.some(m =>
        m.modelo.toLowerCase() === acc.model.toLowerCase() &&
        m.categoria === 'accesorios'
    );

    if (exists) {
        console.log(`⏭️  ${config.nombre} ${acc.model} ya existe`);
        continue;
    }

    const nuevoProducto = {
        id: id,
        marca: config.nombre,
        marcaSlug: config.slug,
        modelo: acc.model,
        modeloSlug: modeloSlug,
        tipoPrincipal: acc.tipo,
        categoria: "accesorios",
        periodo: acc.periodo,
        situacion: "Descatalogado",
        caracteristicas: `${acc.tipo} ${acc.model} de ${config.nombre}`,
        url: `/catalogo/${config.slug}/accesorios/${modeloSlug}`,
        specs: acc.specs
    };

    if (!marca.modelos) marca.modelos = [];
    marca.modelos.push(nuevoProducto);
    console.log(`✅ ${config.nombre} - ${acc.model}`);
    totalAdded++;
}

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');

console.log(`\n========================================`);
console.log(`✅ Total accesorios añadidos: ${totalAdded}`);

let total = 0;
Object.values(productos.marcas).forEach(m => m.modelos?.forEach(p => {
    if (p.categoria === 'accesorios') total++;
}));
console.log(`📊 Total accesorios en catálogo: ${total}`);
