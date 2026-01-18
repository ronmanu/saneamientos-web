/**
 * Script para fusionar especificaciones del JSON generado con el JSON de productos
 * 
 * Ejecutar: node scripts/merge-especificaciones.js
 */

const fs = require('fs');
const path = require('path');

// Leer archivos
const productosPath = path.join(__dirname, '../app/data/productos.json');
const specsPath = path.join(__dirname, 'especificaciones_json_lookup.json');
const outputPath = path.join(__dirname, '../app/data/productos-actualizado.json');

const productos = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));
const specsData = JSON.parse(fs.readFileSync(specsPath, 'utf-8'));

// Función para normalizar nombres
function normalizar(str) {
    if (!str) return '';
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '')
        .trim();
}

// Crear mapa de specs
const specsMap = new Map();

// De modelos_principales
if (specsData.modelos_principales) {
    specsData.modelos_principales.forEach(item => {
        const key = normalizar(item.marca) + '-' + normalizar(item.modelo);
        specsMap.set(key, {
            ...item.especificaciones,
            disponibilidad: item.disponibilidad,
            volumenParque: item.volumen_parque,
            plazoRecambio: item.plazo_recambio_dias,
            costeEstimado: item.coste_estimado_eur,
            distribuidores: item.distribuidores,
            compatibilidadGrupo: item.compatibilidad_grupo,
            alertaCritica: item.ALERTA_CRITICA,
            nota: item.nota
        });
        console.log(`📦 Cargado: ${item.marca} ${item.modelo}`);
    });
}

// De guia_compatibilidad_critica
['grupo_15_5_cm', 'grupo_16_0_cm'].forEach(grupo => {
    const grupoData = specsData.guia_compatibilidad_critica?.[grupo];
    if (grupoData && grupoData.modelos) {
        Object.entries(grupoData.modelos).forEach(([nombreModelo, specs]) => {
            // Extraer marca del nombre (formato "Marca Modelo")
            const partes = nombreModelo.split(' ');
            const marca = partes[0];
            const modelo = partes.slice(1).join(' ');
            const key = normalizar(marca) + '-' + normalizar(modelo);

            // Si no existe ya, añadir
            if (!specsMap.has(key)) {
                specsMap.set(key, {
                    ancho_tapa_cm: specs.ancho,
                    largo_tapa_cm: specs.largo,
                    distancia_orificios_cm: grupoData.distancia_mm / 10,
                    codigo_referencia: specs.codigo,
                    periodo: specs.periodo,
                    compatibilidadGrupo: grupo === 'grupo_15_5_cm' ? '15.5 cm' : '16.0 cm',
                    alertaCritica: specs.ALERTA
                });
                console.log(`📦 Cargado desde grupo: ${marca} ${modelo}`);
            }
        });
    }
});

console.log(`\n✅ Total specs cargados: ${specsMap.size}\n`);

// Mapear campos del spec al formato de nuestro JSON
function mapearSpecs(specsNuevo, specsExistente, categoria) {
    const resultado = { ...specsExistente };

    // Mapeo de campos
    if (specsNuevo.ancho_tapa_cm || specsNuevo.ancho_cm) {
        resultado.ancho = String(specsNuevo.ancho_tapa_cm || specsNuevo.ancho_cm);
    }
    if (specsNuevo.largo_tapa_cm || specsNuevo.largo_cm) {
        resultado.fondo = String(specsNuevo.largo_tapa_cm || specsNuevo.largo_cm);
    }
    if (specsNuevo.distancia_orificios_cm) {
        resultado.distanciaEntreTornillos = String(specsNuevo.distancia_orificios_cm);
    }
    if (specsNuevo.forma) {
        resultado.formaTaza = specsNuevo.forma.toLowerCase();
    }
    if (specsNuevo.material_tapa) {
        resultado.material = specsNuevo.material_tapa;
    }
    if (specsNuevo.codigo_referencia) {
        resultado.codigoReferencia = specsNuevo.codigo_referencia;
    }
    if (specsNuevo.mecanismo) {
        resultado.tipoMecanismo = specsNuevo.mecanismo;
    }
    if (specsNuevo.compatibilidadGrupo) {
        resultado.grupoCompatibilidad = specsNuevo.compatibilidadGrupo;
    }
    if (specsNuevo.alertaCritica) {
        resultado.alertaCompatibilidad = `⚠️ ${specsNuevo.alertaCritica}`;
    }
    if (specsNuevo.distribuidores) {
        resultado.distribuidoresRecomendados = specsNuevo.distribuidores;
    }
    if (specsNuevo.disponibilidad) {
        resultado.disponibilidad = specsNuevo.disponibilidad;
    }
    if (specsNuevo.plazoRecambio) {
        resultado.plazoRecambio = specsNuevo.plazoRecambio;
    }
    if (specsNuevo.costeEstimado) {
        resultado.costeEstimado = specsNuevo.costeEstimado;
    }
    if (specsNuevo.nota) {
        resultado.notaTecnica = specsNuevo.nota;
    }

    return resultado;
}

// Procesar productos
let actualizados = 0;
let noEncontrados = [];

for (const [marcaKey, marcaData] of Object.entries(productos.marcas)) {
    if (marcaData.modelos && Array.isArray(marcaData.modelos)) {
        marcaData.modelos = marcaData.modelos.map(producto => {
            const key = normalizar(producto.marca) + '-' + normalizar(producto.modelo);
            const specsEncontrado = specsMap.get(key);

            if (specsEncontrado) {
                producto.specs = mapearSpecs(specsEncontrado, producto.specs || {}, producto.categoria);
                actualizados++;
                console.log(`  ✅ Actualizado: ${producto.marca} ${producto.modelo}`);
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
console.log(`📄 Guardado en: productos-actualizado.json`);

if (noEncontrados.length > 0 && noEncontrados.length <= 30) {
    console.log('\nModelos sin specs (necesitan datos manuales):');
    noEncontrados.forEach(m => console.log(`  - ${m}`));
}

// También guardar la guía de compatibilidad y distribuidores
const guiaPath = path.join(__dirname, '../app/data/guia-compatibilidad.json');
const guia = {
    grupoCompatibilidad: specsData.guia_compatibilidad_critica,
    distribuidores: specsData.distribuidores_contacto,
    guiaIdentificacion: specsData.guia_rapida_identificacion,
    colores: specsData.colores_disponibles,
    faq: specsData.faq
};
fs.writeFileSync(guiaPath, JSON.stringify(guia, null, 2), 'utf-8');
console.log(`\n📋 Guía de compatibilidad guardada en: guia-compatibilidad.json`);

console.log('\n📌 Para activar los cambios:');
console.log('   1. Revisa app/data/productos-actualizado.json');
console.log('   2. Si es correcto: copia a productos.json');
