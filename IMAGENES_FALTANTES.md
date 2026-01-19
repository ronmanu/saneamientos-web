# 📷 Imágenes Faltantes del Catálogo

Este archivo lista las imágenes que faltan o usan placeholders.
Actualizado: 2026-01-19

## Resumen

| Categoría | Total | Sin Imagen |
|-----------|-------|------------|
| Inodoros | 76 | 44 |
| Bidets | 73 | ~70 |
| Lavabos | ~78 | ~75 |
| Platos Ducha | 68 | 68 |
| Mamparas | 68 | 68 |
| Accesorios | 24 | 24 |
| Tapas WC | 4 | 4 |

## Instrucciones

Las imágenes deben:

1. Ser PNG con fondo blanco/transparente
2. Tamaño recomendado: 800x600 px
3. Nombre: `{marcaSlug}_{modeloSlug}.png`
4. Ubicación: `public/productos/`

## Inodoros Faltantes (Prioridad Alta)

### ROCA

- [ ] `roca_victoria-versiones-antiguas.png` - Victoria (versiones antiguas)
- [ ] `roca_dama_retro.png` - Dama Retro
- [ ] `roca_meridian.png` - Meridian
- [ ] `roca_frontalis.png` - Frontalis
- [ ] `roca_georgia.png` - Georgia

### GALA

- [ ] `gala_elia.png` - Elia
- [ ] `gala_klea.png` - Klea
- [ ] `gala_street.png` - Street
- [ ] `gala_gala_2000.png` - Gala 2000
- [ ] `gala_diana.png` - Diana

### BELLAVISTA

- [ ] `bellavista_arcadia.png` - Arcadia ✅ (existe)
- [ ] `bellavista_lara.png` - Lara
- [ ] `bellavista_record.png` - Record
- [ ] `bellavista_capri.png` - Capri

### JACOB DELAFON

- [ ] `jacobdelafon_odeon.png` - Odeon
- [ ] `jacobdelafon_antares.png` - Antares
- [ ] `jacobdelafon_astros.png` - Astros
- [ ] `jacobdelafon_freelance.png` - Freelance
- [ ] `jacobdelafon_portrait.png` - Portrait

### SANGRÁ

- [ ] `sangra_alcora.png` - Alcora
- [ ] `sangra_bahia.png` - Bahía
- [ ] `sangra_domo.png` - Domo
- [ ] `sangra_granada.png` - Granada

### VALADARES

- [ ] `valadares_nautilus.png` - Nautilus
- [ ] `valadares_tagus.png` - Tagus
- [ ] `valadares_oporto.png` - Oporto

### SANITANA

- [ ] `sanitana_regina.png` - Regina
- [ ] `sanitana_munique.png` - Munique
- [ ] `sanitana_colonia.png` - Colonia

### DURAVIT

- [ ] `duravit_darling_new.png` - Darling New
- [ ] `duravit_happy_d.2.png` - Happy D.2
- [ ] `duravit_me_by_starck.png` - ME by Starck
- [ ] `duravit_vero_air.png` - Vero Air

## Bidets Faltantes

La mayoría de bidets no tienen imagen. Usar imágenes genéricas por marca.

## Lavabos Faltantes

La mayoría de lavabos no tienen imagen. Usar imágenes genéricas por marca.

## Platos de Ducha

Ningún plato de ducha tiene imagen específica. Crear imágenes genéricas.

## Mamparas

Ninguna mampara tiene imagen específica. Crear imágenes genéricas.

## Accesorios

Ningún accesorio tiene imagen específica. Crear imágenes genéricas por tipo:

- Portarrollos
- Toalleros
- Jaboneras
- Muebles de baño

---

*Para generar la lista actualizada, ejecutar:*

```bash
node -e "const fs=require('fs'); const d=require('./app/data/productos.json'); Object.values(d.marcas).forEach(m=>m.modelos?.forEach(p=>{if(!fs.existsSync('public/productos/'+p.marcaSlug+'_'+p.modeloSlug+'.png'))console.log(p.categoria,p.marcaSlug+'_'+p.modeloSlug+'.png')}))"
```
