/**
 * =============================================================================
 * MAPEO DE IMÁGENES DE PRODUCTOS
 * =============================================================================
 * 
 * Este archivo mapea los modelos a sus imágenes correspondientes.
 * Las imágenes están en /public/productos/
 * 
 * Total imágenes de productos: 62 (sin logos)
 * - Modelos específicos: ~40 imágenes
 * - Colores descatalogados: 6 inodoros + lavabos + bidés
 * - Genéricas: cisterna, tapa WC, lavabo, bidé
 */

// Imágenes de modelos específicos
export const imagenesModelos: Record<string, string> = {
    // ROCA (12 modelos con imagen propia)
    'roca-victoria': '/productos/roca_victoria.png',
    'roca-victoria-versiones-antiguas': '/productos/roca_victoria.png',
    'roca-dama-retro-antigua-dama': '/productos/roca_dama_retro.png',
    'roca-giralda': '/productos/roca_giralda.png',
    'roca-gondola': '/productos/roca_gondola.png',
    'roca-lorentina': '/productos/roca_lorentina.png',
    'roca-veronica': '/productos/roca_veronica.png',
    'roca-lucerna': '/productos/roca_lucerna.png',
    'roca-atlanta': '/productos/roca_atlanta.png',
    'roca-meridian-original': '/productos/roca_meridian.png',
    'roca-frontalis': '/productos/roca_frontalis.png',
    'roca-georgia': '/productos/roca_georgia.png',
    'roca-veranda': '/productos/roca_veranda.png',

    // GALA (10 modelos con imagen propia)
    'gala-marina': '/productos/gala_marina.png',
    'gala-loa': '/productos/gala_loa.png',
    'gala-elia': '/productos/gala_elia.png',
    'gala-klea': '/productos/gala_klea.png',
    'gala-street': '/productos/gala_street.png',
    'gala-gala-2000': '/productos/gala_gala2000.png',
    'gala-aurea': '/productos/gala_aurea.png',
    'gala-nostalgia': '/productos/gala_nostalgia.png',
    'gala-bacara': '/productos/gala_bacara.png',
    'gala-diana': '/productos/gala_diana.png',

    // BELLAVISTA (6 modelos con imagen propia)
    'bellavista-duna': '/productos/bellavista_duna.png',
    'bellavista-nexo': '/productos/bellavista_nexo.png',
    'bellavista-stylo': '/productos/bellavista_stylo.png',
    'bellavista-arcadia-arcadia-suspendido': '/productos/bellavista_arcadia.png',
    'bellavista-italica': '/productos/bellavista_italica.png',
    'bellavista-magna': '/productos/bellavista_magna.png',
    'bellavista-lara-record-capri': '/productos/bellavista_duna.png',

    // JACOB DELAFON (5 modelos con imagen propia)
    'jacob-delafon-odeon-clasico': '/productos/jacob_delafon_odeon.png',
    'jacob-delafon-odeon-up': '/productos/jacob_delafon_odeon.png',
    'jacob-delafon-altair': '/productos/jacob_delafon_altair.png',
    'jacob-delafon-antares': '/productos/jacob_delafon_antares.png',
    'jacob-delafon-astros': '/productos/jacob_delafon_altair.png',
    'jacob-delafon-freelance': '/productos/jacob_delafon_odeon.png',
    'jacob-delafon-portrait': '/productos/jacob_delafon_portrait.png',
    'jacob-delafon-escale': '/productos/jacob_delafon_escale.png',
    'jacob-delafon-ove': '/productos/jacob_delafon_odeon.png',
    'jacob-delafon-struktura': '/productos/jacob_delafon_escale.png',

    // SANGRÁ (4 modelos con imagen propia)
    'sangra-alcora': '/productos/sangra_alcora.png',
    'sangra-bahia': '/productos/sangra_bahia.png',
    'sangra-domo': '/productos/sangra_domo.png',
    'sangra-boreal': '/productos/sangra_bahia.png',
    'sangra-europa': '/productos/sangra_europa.png',
    'sangra-granada': '/productos/sangra_alcora.png',
    'sangra-isis': '/productos/sangra_bahia.png',
    'sangra-proa': '/productos/sangra_domo.png',
    'sangra-siena': '/productos/sangra_alcora.png',
    'sangra-taiga': '/productos/sangra_europa.png',

    // VALADARES (4 modelos con imagen propia)
    'valadares-nautilus': '/productos/valadares_nautilus.png',
    'valadares-assimetrica': '/productos/valadares_assimetrica.png',
    'valadares-tagus': '/productos/valadares_tagus.png',
    'valadares-oporto': '/productos/valadares_oporto.png',
    'valadares-opus': '/productos/valadares_assimetrica.png',
    'valadares-oceanus': '/productos/valadares_nautilus.png',
    'valadares-durius': '/productos/valadares_tagus.png',
    'valadares-egg': '/productos/valadares_nautilus.png',
    'valadares-thema': '/productos/valadares_oporto.png',

    // SANITANA (3 modelos con imagen propia)
    'sanitana-grecia': '/productos/sanitana_grecia.png',
    'sanitana-regina': '/productos/sanitana_regina.png',
    'sanitana-munique-munich': '/productos/sanitana_munique.png',
    'sanitana-colonia': '/productos/sanitana_grecia.png',
    'sanitana-kapa': '/productos/sanitana_munique.png',
    'sanitana-imperial': '/productos/sanitana_regina.png',
    'sanitana-coral': '/productos/sanitana_grecia.png',
    'sanitana-nexo': '/productos/sanitana_munique.png',
    'sanitana-mobil': '/productos/sanitana_grecia.png',
    'sanitana-lisboa': '/productos/sanitana_regina.png',

    // DURAVIT (3 modelos con imagen propia)
    'duravit-darling-new': '/productos/duravit_starck.png',
    'duravit-happy-d-original': '/productos/duravit_happy_d.png',
    'duravit-happy-d-2': '/productos/duravit_happy_d.png',
    'duravit-durastyle': '/productos/duravit_d_code.png',
    'duravit-d-code': '/productos/duravit_d_code.png',
    'duravit-starck-2-3': '/productos/duravit_starck.png',
    'duravit-me-by-starck': '/productos/duravit_starck.png',
    'duravit-vero-air': '/productos/duravit_happy_d.png',
};

// Imágenes genéricas por categoría
export const imagenesCategoria: Record<string, string> = {
    'inodoros': '/productos/roca_victoria.png',
    'lavabos': '/productos/lavabo_roca.png',
    'bidets': '/productos/bide_clasico.png',
    'cisternas': '/productos/cisterna_alta.png',
    'tapas': '/productos/tapa_wc_blanca.png',
    'mamparas': '/productos/roca_victoria.png',
    'platos-ducha': '/productos/roca_victoria.png',
    'otros': '/productos/roca_victoria.png',
};

// Imágenes de inodoros por color (6 colores)
export const imagenesColor: Record<string, string> = {
    'pergamino': '/productos/inodoro_pergamino.png',
    'vison': '/productos/inodoro_vison.png',
    'azul-caribe': '/productos/inodoro_azul_caribe.png',
    'rosa': '/productos/inodoro_rosa.png',
    'blanco': '/productos/roca_victoria.png',
    'verde': '/productos/inodoro_verde_agua.png',
    'champagne': '/productos/inodoro_champagne.png',
};

// Imágenes de lavabos por color
export const imagenesLavabosColor: Record<string, string> = {
    'pergamino': '/productos/lavabo_pergamino.png',
    'vison': '/productos/lavabo_vison.png',
    'blanco': '/productos/lavabo_roca.png',
};

// Imágenes de bidés por color
export const imagenesBidesColor: Record<string, string> = {
    'pergamino': '/productos/bide_pergamino.png',
    'vison': '/productos/bide_vison.png',
    'blanco': '/productos/bide_clasico.png',
};

// Imágenes de tapas WC por color
export const imagenesTapasColor: Record<string, string> = {
    'pergamino': '/productos/tapa_wc_pergamino.png',
    'blanco': '/productos/tapa_wc_blanca.png',
};

/**
 * Obtiene la imagen para un producto
 */
export function getImagenProducto(marcaSlug: string, modeloSlug: string, categoria: string): string {
    const key = `${marcaSlug}-${modeloSlug}`;

    // Primero buscar imagen específica del modelo
    if (imagenesModelos[key]) {
        return imagenesModelos[key];
    }

    // Si no hay imagen específica, usar imagen de categoría
    if (imagenesCategoria[categoria]) {
        return imagenesCategoria[categoria];
    }

    // Fallback final
    return '/productos/roca_victoria.png';
}

/**
 * Obtiene la imagen para un color (inodoro)
 */
export function getImagenColor(colorSlug: string): string {
    return imagenesColor[colorSlug] || '/productos/roca_victoria.png';
}

/**
 * Obtiene la imagen para un lavabo por color
 */
export function getImagenLavabo(colorSlug: string): string {
    return imagenesLavabosColor[colorSlug] || '/productos/lavabo_roca.png';
}

/**
 * Obtiene la imagen para un bidé por color
 */
export function getImagenBide(colorSlug: string): string {
    return imagenesBidesColor[colorSlug] || '/productos/bide_clasico.png';
}

/**
 * Obtiene la imagen para una tapa WC por color
 */
export function getImagenTapa(colorSlug: string): string {
    return imagenesTapasColor[colorSlug] || '/productos/tapa_wc_blanca.png';
}
