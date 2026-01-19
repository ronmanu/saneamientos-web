const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf8'));

const urls = new Set();
const duplicados = [];
const paramsSet = new Set();
const paramsDuplicados = [];

// Helper slugify simple si no existe en el objeto
function slugify(text) {
    if (!text) return '';
    return text.toString().toLowerCase()
        .normalize('NFD') // Quitar acentos
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

Object.values(productos.marcas).forEach(marca => {
    if (!marca.modelos) return;
    marca.modelos.forEach(m => {
        // En productos.json deberíamos tener marcaSlug y modeloSlug.
        // Si no, los generamos igual que en la app
        const marcaSlug = m.marcaSlug || slugify(m.marca);
        const modeloSlug = m.modeloSlug || slugify(m.modelo);
        const categoria = m.categoria || 'otros'; // La categoría se usa tal cual en la URL

        const url = `/catalogo/${marcaSlug}/${categoria}/${modeloSlug}`;

        if (urls.has(url)) {
            duplicados.push(`URL Duplicada: ${url} (ID: ${m.id})`);
        } else {
            urls.add(url);
        }

        // Check generateStaticParams output
        const paramKey = `${marcaSlug}|${categoria}|${modeloSlug}`;
        if (paramsSet.has(paramKey)) {
            paramsDuplicados.push(paramKey);
        } else {
            paramsSet.add(paramKey);
        }
    });
});

if (duplicados.length > 0) {
    console.log('❌ SE ENCONTRARON RUTAS DUPLICADAS:');
    duplicados.forEach(d => console.log(d));
} else {
    console.log('✅ No hay rutas de productos duplicadas.');
}
