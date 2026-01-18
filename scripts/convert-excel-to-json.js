/**
 * Script para leer el Excel de productos y convertirlo a JSON
 * Ejecutar con: node scripts/convert-excel-to-json.js
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Ruta del Excel
const excelPath = path.join(__dirname, '..', 'Sanitarios Descatalogados 1940-2010.xlsx');
const outputPath = path.join(__dirname, '..', 'app', 'data', 'productos.json');

// Leer el archivo Excel
console.log('📖 Leyendo Excel:', excelPath);
const workbook = XLSX.readFile(excelPath);

// Objeto para almacenar todos los productos
const productos = {
    marcas: {},
    totalProductos: 0,
    fechaActualizacion: new Date().toISOString(),
};

// Mapeo de nombres de hojas a slugs
const slugMap = {
    'ROCA': 'roca',
    'BELLAVISTA': 'bellavista',
    'GALA': 'gala',
    'JACOB DELAFON': 'jacob-delafon',
    'SANGRÁ': 'sangra',
    'SANGRA': 'sangra',
    'VALADARES': 'valadares',
    'SANITANA': 'sanitana',
    'DURAVIT': 'duravit',
    'GRIFERS': 'grifers',
};

// Función para generar slug de modelo
function generarSlug(texto) {
    if (!texto) return '';
    return texto
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
        .replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres especiales
        .replace(/^-+|-+$/g, ''); // Quitar guiones al inicio/final
}

// Función para mapear categoría
function mapearCategoria(tipoPrincipal) {
    if (!tipoPrincipal) return 'otros';
    const tipo = tipoPrincipal.toLowerCase();
    if (tipo.includes('inodoro') || tipo.includes('wc') || tipo.includes('taza')) return 'inodoros';
    if (tipo.includes('lavabo')) return 'lavabos';
    if (tipo.includes('bidé') || tipo.includes('bide') || tipo.includes('bidet')) return 'bidets';
    if (tipo.includes('cisterna')) return 'cisternas';
    if (tipo.includes('tapa')) return 'tapas';
    if (tipo.includes('mampara')) return 'mamparas';
    if (tipo.includes('plato') && tipo.includes('ducha')) return 'platos-ducha';
    return 'otros';
}

// Procesar cada hoja
console.log('\n📊 Hojas encontradas:', workbook.SheetNames);
console.log('');

workbook.SheetNames.forEach(sheetName => {
    const marcaSlug = slugMap[sheetName.toUpperCase()] || generarSlug(sheetName);

    console.log(`\n🔍 Procesando hoja: ${sheetName} -> ${marcaSlug}`);

    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    if (data.length === 0) {
        console.log(`   ⚠️  Hoja vacía, saltando...`);
        return;
    }

    // Mostrar columnas encontradas
    const columnas = Object.keys(data[0] || {});
    console.log(`   📋 Columnas: ${columnas.join(', ')}`);
    console.log(`   📦 Filas de datos: ${data.length}`);

    // Inicializar marca
    if (!productos.marcas[marcaSlug]) {
        productos.marcas[marcaSlug] = {
            nombre: sheetName,
            slug: marcaSlug,
            modelos: [],
        };
    }

    // Procesar cada fila
    data.forEach((row, index) => {
        // Buscar la columna de modelo/serie (puede tener diferentes nombres)
        const modelo = row['Serie/Modelo'] || row['Modelo'] || row['Serie'] || row['Nombre'] || '';
        const tipoPrincipal = row['Tipo Principal'] || row['Tipo'] || row['Categoría'] || '';

        if (!modelo || modelo.trim() === '') {
            return; // Saltar filas sin modelo
        }

        const producto = {
            id: `${marcaSlug}-${generarSlug(modelo)}-${index}`,
            marca: sheetName,
            marcaSlug: marcaSlug,
            modelo: modelo,
            modeloSlug: generarSlug(modelo),
            tipoPrincipal: tipoPrincipal,
            categoria: mapearCategoria(tipoPrincipal),
            codigo: row['Código/Referencia'] || row['Código'] || row['Referencia'] || '',
            periodo: row['Período Aprox.'] || row['Período'] || row['Años'] || '',
            situacion: row['Situación'] || row['Estado'] || 'Descatalogado',
            caracteristicas: row['Características'] || row['Descripción'] || '',
            compatibilidades: row['Compatibilidades'] || '',
            recambios: row['Recambios Disponibles'] || row['Recambios'] || '',
            imagenFuente: row['Imagen/Fuente'] || row['Imagen'] || row['Fuente'] || '',
            notas: row['Notas Adicionales'] || row['Notas'] || '',
            // URL de la nueva estructura
            url: `/catalogo/${marcaSlug}/${mapearCategoria(tipoPrincipal)}/${generarSlug(modelo)}`,
        };

        productos.marcas[marcaSlug].modelos.push(producto);
        productos.totalProductos++;
    });

    console.log(`   ✅ Modelos procesados: ${productos.marcas[marcaSlug].modelos.length}`);
});

// Crear directorio si no existe
const dataDir = path.dirname(outputPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Guardar JSON
fs.writeFileSync(outputPath, JSON.stringify(productos, null, 2), 'utf8');

console.log('\n' + '='.repeat(60));
console.log('✅ CONVERSIÓN COMPLETADA');
console.log('='.repeat(60));
console.log(`📁 Archivo guardado: ${outputPath}`);
console.log(`📊 Total marcas: ${Object.keys(productos.marcas).length}`);
console.log(`📦 Total productos: ${productos.totalProductos}`);
console.log('');

// Mostrar resumen por marca
console.log('📋 RESUMEN POR MARCA:');
Object.entries(productos.marcas).forEach(([slug, marca]) => {
    console.log(`   ${marca.nombre}: ${marca.modelos.length} modelos`);
});

// Verificar imágenes mencionadas
console.log('\n🖼️  ANÁLISIS DE IMÁGENES:');
let imagenesConFuente = 0;
let imagenesSinFuente = 0;

Object.values(productos.marcas).forEach(marca => {
    marca.modelos.forEach(modelo => {
        if (modelo.imagenFuente && modelo.imagenFuente.trim() !== '') {
            imagenesConFuente++;
        } else {
            imagenesSinFuente++;
        }
    });
});

console.log(`   ✅ Modelos con fuente de imagen: ${imagenesConFuente}`);
console.log(`   ⚠️  Modelos SIN fuente de imagen: ${imagenesSinFuente}`);

if (imagenesSinFuente > 0) {
    console.log('\n⚠️  MODELOS QUE NECESITAN IMÁGENES:');
    Object.values(productos.marcas).forEach(marca => {
        const sinImagen = marca.modelos.filter(m => !m.imagenFuente || m.imagenFuente.trim() === '');
        if (sinImagen.length > 0) {
            console.log(`   ${marca.nombre}:`);
            sinImagen.forEach(m => {
                console.log(`      - ${m.modelo} (${m.tipoPrincipal || 'Sin tipo'})`);
            });
        }
    });
}

console.log('\n📝 Próximo paso: Revisar el archivo JSON generado y crear imágenes faltantes.');
