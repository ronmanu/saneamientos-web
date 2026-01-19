# PROMPT PARA OBTENER CATÁLOGO DE PRODUCTOS SANITARIOS DESCATALOGADOS

## Contexto
Necesito crear un catálogo completo de productos sanitarios descatalogados de las principales marcas españolas y europeas. El catálogo ya tiene **76 inodoros** pero necesita productos de **otras categorías**.

## Categorías a Completar

### 1. BIDETS (Prioridad ALTA)
Necesito modelos de bidets descatalogados de:
- **ROCA**: Victoria, Góndola, Dama, Atlanta, Meridian, Georgia, Giralda, Verónica, etc.
- **GALA**: Marina, Loa, Bacara, Diana, Elia, Nostalgia, Street, etc.
- **BELLAVISTA**: Duna, Nexo, Stylo, Arcadia, Itálica, etc.
- **JACOB DELAFON**: Altair, Odeon, Antares, Ove, etc.
- **SANGRÁ**: Europa, Alcora, Bahía, Isis, Proa, Taiga, etc.
- **VALADARES**: Assimétrica, Nautilus, Tagus, Oporto, Opus, etc.
- **SANITANA**: Grecia, Munique, Regina, Nexo, Kapa, etc.

### 2. LAVABOS (Prioridad ALTA)
Tipos:
- Lavabos de pedestal
- Lavabos semipedestal
- Lavabos sobre encimera
- Lavabos encastre

Marcas: Las mismas que bidets

### 3. CISTERNAS (Prioridad MEDIA)
- Cisternas empotradas
- Cisternas vistas
- Cisternas altas

### 4. TAPAS WC (Prioridad MEDIA)
- Tapas originales de cada modelo de inodoro
- Especificaciones de compatibilidad

### 5. MAMPARAS (Prioridad BAJA)
- Mamparas correderas
- Mamparas abatibles
- Mamparas fijas

### 6. ACCESORIOS (Prioridad BAJA)
- Grifería
- Toalleros
- Portarrollos
- Jaboneras

---

## Formato de Salida REQUERIDO

Devuélveme los datos en formato JSON con esta estructura EXACTA:

```json
[
  {
    "marca": "ROCA",
    "modelo": "Victoria",
    "categoria": "bidets",
    "periodo": "1990-2010",
    "tipoPrincipal": "Bidé de suelo",
    "caracteristicas": "Bidé clásico a juego con el inodoro Victoria",
    "situacion": "Descatalogado",
    "specs": {
      "ancho": "35.2",
      "fondo": "56.0",
      "altura": "38.0",
      "numOrificiosGriferia": 1,
      "colorDisponible": ["blanco", "pergamón"]
    }
  },
  {
    "marca": "GALA",
    "modelo": "Marina",
    "categoria": "lavabos",
    "periodo": "1975-2007",
    "tipoPrincipal": "Lavabo pedestal",
    "caracteristicas": "Lavabo con pedestal de la serie Marina",
    "situacion": "Descatalogado",
    "specs": {
      "ancho": "60.0",
      "fondo": "48.0",
      "altura": "85.0",
      "numOrificiosGriferia": 1,
      "tipoMontaje": "pedestal",
      "colorDisponible": ["blanco", "pergamón"]
    }
  }
]
```

---

## Campos SPECS por Categoría

### Bidets:
- ancho (cm)
- fondo (cm)
- altura (cm)
- numOrificiosGriferia
- colorDisponible

### Lavabos:
- ancho (cm)
- fondo (cm)
- altura (cm) - solo si es pedestal
- tipoMontaje: "pedestal" | "semipedestal" | "encastre" | "sobre-encimera" | "mural"
- numOrificiosGriferia
- conRebosadero: boolean
- colorDisponible

### Cisternas:
- ancho (cm)
- fondo (cm)
- altura (cm)
- capacidad (litros)
- tipoMecanismo: "doble-descarga" | "simple" | "cable"
- tipoInstalacion: "empotrada" | "vista" | "alta"

### Tapas WC:
- largoTotal (cm)
- anchoMaximo (cm)
- distanciaEntreEjes (cm) - ¡CRÍTICO para compatibilidad!
- forma: "ovalada" | "cuadrada" | "D"
- material: "duroplast" | "madera" | "MDF"
- caidaAmortiguada: boolean
- bisagrasRegulables: boolean
- modelosCompatibles: ["Victoria", "Dama"] - lista de inodoros compatibles

---

## Fuentes Sugeridas

1. **Catálogos históricos de fabricantes** (PDFs)
2. **Tiendas especializadas en descatalogados**:
   - tapadelwater.com
   - wctapas.com
   - yokando.com
   - disper.com
3. **Distribuidores profesionales**
4. **Bases de datos de recambios**

---

## Notas Importantes

1. **Solo productos DESCATALOGADOS** (no en producción actual)
2. **Periodo de fabricación** debe ser antes de 2015 aproximadamente
3. **Colores descatalogados** son MUY valiosos: pergamón, visón, azul, rosa, verde
4. **Las especificaciones técnicas** son cruciales para compatibilidad

---

## Cantidad Objetivo

- **Bidets**: 30-50 modelos
- **Lavabos**: 40-60 modelos
- **Cisternas**: 15-25 modelos
- **Tapas WC**: 20-30 modelos
- **Mamparas**: 10-15 modelos
- **Accesorios**: 15-20 productos

---

Por favor, genera el JSON con los productos de las categorías que faltan, empezando por **Bidets** y **Lavabos**.
