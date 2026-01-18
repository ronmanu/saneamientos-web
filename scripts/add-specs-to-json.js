/**
 * Script para añadir campos de especificaciones técnicas al JSON de productos
 * Ejecutar con: node scripts/add-specs-to-json.js
 */

const fs = require('fs');
const path = require('path');

// Leer el JSON actual
const jsonPath = path.join(__dirname, '../app/data/productos.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// Estructura de especificaciones por categoría
const specsTemplates = {
    inodoros: {
        alturaTotal: null,           // cm - Altura desde suelo hasta parte superior cisterna
        alturaAsiento: null,         // cm - Altura desde suelo hasta borde taza
        ancho: null,                 // cm - Ancho máximo
        fondo: null,                 // cm - Profundidad desde pared hasta frente
        salida: null,                // "horizontal" | "vertical" | "dual"
        distanciaDesague: null,      // cm - Centro del desagüe a la pared
        entradaAgua: null,           // "lateral izquierda" | "lateral derecha" | "inferior"
        capacidadCisterna: null,     // litros - ej: "6L" o "3-6L"
        formaTaza: null,             // "ovalada" | "redonda" | "cuadrada"
        fijacion: null,              // "2 tornillos" | "4 tornillos"
        distanciaEntreTornillos: null, // cm - Para tapas compatibles
        colorDisponible: null        // Array de colores disponibles
    },
    lavabos: {
        ancho: null,                 // cm - Ancho del lavabo
        fondo: null,                 // cm - Profundidad
        altura: null,                // cm - Altura total con pedestal
        tipoMontaje: null,           // "mural" | "pedestal" | "semipedestal" | "encastre" | "sobre encimera"
        numOrificiosGriferia: null,  // 1 | 3
        separacionOrificios: null,   // cm - Solo si tiene 3 orificios
        conRebosadero: null,         // boolean
        diametroDesague: null,       // mm - 32 | 40
        colorDisponible: null
    },
    bidets: {
        altura: null,                // cm
        ancho: null,                 // cm
        fondo: null,                 // cm
        numOrificiosGriferia: null,  // 1 | 2
        salida: null,                // "horizontal" | "vertical"
        distanciaDesague: null,      // cm
        colorDisponible: null
    },
    tapas: {
        largoTotal: null,            // cm - Largo exterior
        anchoMaximo: null,           // cm - Ancho máximo
        distanciaEntreEjes: null,    // cm - CRÍTICO para compatibilidad
        forma: null,                 // "ovalada" | "cuadrada" | "en D" | "redonda"
        material: null,              // "duroplast" | "MDF lacado" | "polipropileno" | "madera maciza"
        caidaAmortiguada: null,      // boolean - Soft close
        bisagrasRegulables: null,    // boolean
        colorDisponible: null
    },
    cisternas: {
        capacidad: null,             // litros
        tipoMecanismo: null,         // "D1P" | "D2P" | "tirón" | "pulsador simple" | "doble pulsador"
        entradaAgua: null,           // "lateral" | "inferior"
        alto: null,                  // cm
        ancho: null,                 // cm
        fondo: null,                 // cm
        colorDisponible: null
    },
    otros: {
        dimensiones: null,           // Texto libre para medidas
        colorDisponible: null
    }
};

// Función para obtener template según categoría
function getSpecsTemplate(categoria) {
    const cat = categoria.toLowerCase();
    if (cat.includes('inodoro') || cat === 'inodoros') return { ...specsTemplates.inodoros };
    if (cat.includes('lavabo') || cat === 'lavabos') return { ...specsTemplates.lavabos };
    if (cat.includes('bid') || cat === 'bidets') return { ...specsTemplates.bidets };
    if (cat.includes('tapa') || cat === 'tapas') return { ...specsTemplates.tapas };
    if (cat.includes('cisterna') || cat === 'cisternas') return { ...specsTemplates.cisternas };
    return { ...specsTemplates.otros };
}

// Procesar cada marca y modelo
let totalModelos = 0;
for (const [marcaKey, marcaData] of Object.entries(data.marcas)) {
    if (marcaData.modelos && Array.isArray(marcaData.modelos)) {
        marcaData.modelos = marcaData.modelos.map(modelo => {
            totalModelos++;
            // Añadir specs si no existen
            if (!modelo.specs) {
                modelo.specs = getSpecsTemplate(modelo.categoria || modelo.tipoPrincipal || 'otros');
            }
            return modelo;
        });
    }
}

// Guardar el JSON actualizado
const outputPath = path.join(__dirname, '../app/data/productos-con-specs.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');

console.log(`✅ Procesados ${totalModelos} modelos`);
console.log(`📄 Guardado en: ${outputPath}`);
console.log('\nEstructura de specs añadida:');
console.log('- inodoros: alturaTotal, alturaAsiento, ancho, fondo, salida, distanciaDesague, entradaAgua, capacidadCisterna, formaTaza, fijacion, distanciaEntreTornillos, colorDisponible');
console.log('- lavabos: ancho, fondo, altura, tipoMontaje, numOrificiosGriferia, separacionOrificios, conRebosadero, diametroDesague, colorDisponible');
console.log('- bidets: altura, ancho, fondo, numOrificiosGriferia, salida, distanciaDesague, colorDisponible');
console.log('- tapas: largoTotal, anchoMaximo, distanciaEntreEjes, forma, material, caidaAmortiguada, bisagrasRegulables, colorDisponible');
console.log('- cisternas: capacidad, tipoMecanismo, entradaAgua, alto, ancho, fondo, colorDisponible');
