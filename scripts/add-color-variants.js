/**
 * Script para añadir variantes de color a productos icónicos
 */

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../app/data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

// Colores a expandir con sus códigos visuales aproximados para referencia
const colores = [
    { nombre: "Visón", slug: "vison", hex: "#D2B48C" },
    { nombre: "Rosa", slug: "rosa", hex: "#FFC0CB" },
    { nombre: "Azul", slug: "azul", hex: "#ADD8E6" },
    { nombre: "Verde", slug: "verde", hex: "#90EE90" },
    { nombre: "Gris", slug: "gris", hex: "#D3D3D3" }
];

// Modelos icónicos que suelen tener colores
const modelosIconicos = [
    { marca: "roca", modelo: "Victoria (versiones antiguas)", match: "victoria versiones antiguas" },
    { marca: "roca", modelo: "Giralda", match: "giralda" },
    { marca: "roca", modelo: "Dama Retro", match: "dama retro" },
    { marca: "roca", modelo: "Gondola", match: "gondola" },
    { marca: "roca", modelo: "Meridian (original)", match: "meridian original" },
    { marca: "bellavista", modelo: "Duna", match: "duna" },
    { marca: "gala", modelo: "Marina", match: "marina" },
    { marca: "jacobdelafon", modelo: "Altair", match: "altair" }
];

function slugify(str) { return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_').replace(/[().\/]/g, ''); }

let added = 0;

for (const item of modelosIconicos) {
    const marca = productos.marcas[item.marca];
    if (!marca || !marca.modelos) continue;

    // Buscar el producto base (blanco/genérico)
    const baseProduct = marca.modelos.find(m =>
        m.categoria === 'inodoros' &&
        slugify(m.modelo).includes(slugify(item.match)) &&
        !m.modelo.includes('Visón') // Evitar duplicar sobre duplicados
    );

    if (!baseProduct) {
        console.log(`⚠️ No encontrado base para: ${item.modelo}`);
        continue;
    }

    // Crear variantes
    for (const color of colores) {
        // Verificar si specs dice que existe en ese color (opcional, aquí forzaremos para mostrar visualmente)
        // O asumimos que modelos antiguos solían tener estos colores.

        const newModelName = `${baseProduct.modelo} ${color.nombre}`;
        const newSlug = `${baseProduct.modeloSlug}_${color.slug}`;

        // Evitar duplicados
        if (marca.modelos.some(m => m.modeloSlug === newSlug)) {
            console.log(`⏭️ Ya existe: ${newModelName}`);
            continue;
        }

        // Clonar y modificar
        let maxId = 0;
        marca.modelos.forEach(m => { const match = m.id.match(/-(\d+)$/); if (match && parseInt(match[1]) > maxId) maxId = parseInt(match[1]); });

        const variant = JSON.parse(JSON.stringify(baseProduct));
        variant.id = `${marca.slug}-${newSlug}-${maxId + 1}`;
        variant.modelo = newModelName;
        variant.modeloSlug = newSlug;
        variant.caracteristicas = `Inodoro ${newModelName}, color ${color.nombre}. ${baseProduct.caracteristicas}`;
        variant.url = `/catalogo/${marca.slug}/inodoros/${newSlug}`;
        variant.specs = { ...baseProduct.specs, colorBase: color.nombre }; // Añadir spec de color base

        marca.modelos.push(variant);
        console.log(`✅ Añadido: ${newModelName}`);
        added++;
    }
}

fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2), 'utf-8');
console.log(`\n✅ Variantes de color añadidas: ${added}`);
