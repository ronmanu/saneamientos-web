export interface Product {
    id: string;
    name: string;
    brand: 'Roca' | 'Gala' | 'Bellavista' | 'Jacob Delafon' | 'Sangrá' | 'Valadares' | 'Sanitana' | 'Duravit' | 'Otro';
    category: 'inodoro' | 'bidet' | 'lavabo' | 'mampara' | 'accesorios' | 'plato-ducha';
    subcategory?: string;
    price: number;
    image: string;
    description: string;
    inStock: boolean;
    rarity: 1 | 2 | 3 | 4 | 5; // 1: Común, 5: Extremadamente difícil de encontrar
}

export const products: Product[] = [
    // --- ROCA ---
    {
        id: 'roca-1',
        name: 'Inodoro Victoria Salida Suelo',
        brand: 'Roca',
        category: 'inodoro',
        price: 180,
        image: '/productos/roca_victoria.png',
        description: 'Clásico inodoro Victoria de Roca, salida vertical. Nuevo original descatalogado.',
        inStock: true,
        rarity: 1
    },
    {
        id: 'roca-2',
        name: 'Inodoro Dama Retro',
        brand: 'Roca',
        category: 'inodoro',
        price: 210,
        image: '/productos/roca_dama_retro.png',
        description: 'Inodoro completo Dama Retro. Diseño emblemático y robusto.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'roca-3',
        name: 'Inodoro Meridian Antiguo',
        brand: 'Roca',
        category: 'inodoro',
        price: 230,
        image: '/productos/roca_meridian.png',
        description: 'Versión descatalogada del Roca Meridian. Líneas redondeadas.',
        inStock: false,
        rarity: 4
    },
    {
        id: 'roca-4',
        name: 'Inodoro Lorentina',
        brand: 'Roca',
        category: 'inodoro',
        price: 250,
        image: '/productos/roca_lorentina.png',
        description: 'Modelo clásico Lorentina, muy buscado para reposición.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'roca-5',
        name: 'Lavabo Victoria',
        brand: 'Roca',
        category: 'lavabo',
        price: 65,
        image: '/productos/lavabo_roca.png',
        description: 'Lavabo mural Victoria. Sencillo y funcional.',
        inStock: true,
        rarity: 1
    },
    {
        id: 'roca-6',
        name: 'Bidet Victoria',
        brand: 'Roca',
        category: 'bidet',
        price: 75,
        image: '/productos/bide_clasico.png',
        description: 'Bidet a juego con la serie Victoria.',
        inStock: true,
        rarity: 1
    },
    {
        id: 'roca-7',
        name: 'Tapa Asiento Dama Senso',
        brand: 'Roca',
        category: 'accesorios',
        subcategory: 'tapa',
        price: 45,
        image: '/productos/tapa_wc_blanca.png',
        description: 'Tapa original para inodoro Dama Senso. Caída amortiguada.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'roca-8',
        name: 'Inodoro Góndola',
        brand: 'Roca',
        category: 'inodoro',
        price: 290,
        image: '/productos/roca_gondola.png',
        description: 'Diseño exclusivo Góndola, pieza de colección descatalogada.',
        inStock: false,
        rarity: 5
    },
    {
        id: 'roca-9',
        name: 'Inodoro Giralda',
        brand: 'Roca',
        category: 'inodoro',
        price: 220,
        image: '/productos/roca_giralda.png',
        description: 'Modelo Giralda, icono del baño español.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'roca-10',
        name: 'Inodoro Verónica',
        brand: 'Roca',
        category: 'inodoro',
        price: 200,
        image: '/productos/roca_veronica.png',
        description: 'Modelo Verónica, diseño clásico de los 80-90.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'roca-11',
        name: 'Inodoro Lucerna',
        brand: 'Roca',
        category: 'inodoro',
        price: 195,
        image: '/productos/roca_lucerna.png',
        description: 'Modelo Lucerna con líneas suaves y elegantes.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'roca-12',
        name: 'Inodoro Atlanta',
        brand: 'Roca',
        category: 'inodoro',
        price: 185,
        image: '/productos/roca_atlanta.png',
        description: 'Modelo Atlanta, robusto y fiable.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'roca-13',
        name: 'Inodoro Frontalis',
        brand: 'Roca',
        category: 'inodoro',
        price: 280,
        image: '/productos/roca_frontalis.png',
        description: 'Diseño moderno Frontalis con líneas cuadradas.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'roca-14',
        name: 'Inodoro Georgia',
        brand: 'Roca',
        category: 'inodoro',
        price: 210,
        image: '/productos/roca_georgia.png',
        description: 'Modelo Georgia de los años 70-80.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'roca-15',
        name: 'Inodoro Veranda',
        brand: 'Roca',
        category: 'inodoro',
        price: 240,
        image: '/productos/roca_veranda.png',
        description: 'Serie Veranda, elegancia contemporánea.',
        inStock: true,
        rarity: 3
    },

    // --- GALA ---
    {
        id: 'gala-1',
        name: 'Inodoro Gala Marina',
        brand: 'Gala',
        category: 'inodoro',
        price: 195,
        image: '/productos/gala_marina.png',
        description: 'Inodoro Gala Marina, diseño clásico español.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'gala-2',
        name: 'Inodoro Gala Loa',
        brand: 'Gala',
        category: 'inodoro',
        price: 190,
        image: '/productos/gala_loa.png',
        description: 'Modelo Loa, compacto y funcional.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'gala-3',
        name: 'Inodoro Gala Elia',
        brand: 'Gala',
        category: 'inodoro',
        price: 185,
        image: '/productos/gala_elia.png',
        description: 'Inodoro Elia moderno y funcional.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'gala-4',
        name: 'Inodoro Gala Klea',
        brand: 'Gala',
        category: 'inodoro',
        price: 175,
        image: '/productos/gala_klea.png',
        description: 'Modelo Klea, sencillo y práctico.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'gala-5',
        name: 'Inodoro Gala Street',
        brand: 'Gala',
        category: 'inodoro',
        price: 210,
        image: '/productos/gala_street.png',
        description: 'Serie Street, diseño urbano moderno.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'gala-6',
        name: 'Inodoro Gala 2000',
        brand: 'Gala',
        category: 'inodoro',
        price: 180,
        image: '/productos/gala_gala2000.png',
        description: 'Clásico Gala 2000, muy popular en España.',
        inStock: true,
        rarity: 1
    },
    {
        id: 'gala-7',
        name: 'Inodoro Gala Aurea',
        brand: 'Gala',
        category: 'inodoro',
        price: 220,
        image: '/productos/gala_aurea.png',
        description: 'Modelo Aurea, elegancia atemporal.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'gala-8',
        name: 'Inodoro Gala Nostalgia',
        brand: 'Gala',
        category: 'inodoro',
        price: 250,
        image: '/productos/gala_nostalgia.png',
        description: 'Estilo retro con tapa de madera.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'gala-9',
        name: 'Inodoro Gala Bacara',
        brand: 'Gala',
        category: 'inodoro',
        price: 240,
        image: '/productos/gala_bacara.png',
        description: 'Inodoro de gama alta Bacara.',
        inStock: false,
        rarity: 5
    },
    {
        id: 'gala-10',
        name: 'Inodoro Gala Diana',
        brand: 'Gala',
        category: 'inodoro',
        price: 230,
        image: '/productos/gala_diana.png',
        description: 'Modelo Diana con tapa de madera.',
        inStock: true,
        rarity: 4
    },

    // --- BELLAVISTA ---
    {
        id: 'bella-1',
        name: 'Inodoro Bellavista Arcadia',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 185,
        image: '/productos/bellavista_arcadia.png',
        description: 'El clásico Arcadia de Bellavista suspendido.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'bella-2',
        name: 'Inodoro Bellavista Duna',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 195,
        image: '/productos/bellavista_duna.png',
        description: 'Serie Duna, formas inspiradas en la naturaleza.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'bella-3',
        name: 'Inodoro Bellavista Stylo',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 180,
        image: '/productos/bellavista_stylo.png',
        description: 'Bellavista Stylo, diseño moderno y limpio.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'bella-4',
        name: 'Inodoro Bellavista Itálica',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 210,
        image: '/productos/bellavista_italica.png',
        description: 'También conocido como Astro. Inodoro robusto.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'bella-5',
        name: 'Inodoro Bellavista Nexo',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 190,
        image: '/productos/bellavista_nexo.png',
        description: 'Modelo Nexo, compacto y funcional.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'bella-6',
        name: 'Inodoro Bellavista Magna',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 200,
        image: '/productos/bellavista_magna.png',
        description: 'Serie Magna, diseño tradicional robusto.',
        inStock: true,
        rarity: 3
    },

    // --- JACOB DELAFON ---
    {
        id: 'jacob-1',
        name: 'Inodoro Jacob Delafon Odeon',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 240,
        image: '/productos/jacob_delafon_odeon.png',
        description: 'Inodoro Odeon. Diseño francés atemporal.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'jacob-2',
        name: 'Inodoro Jacob Delafon Altair',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 230,
        image: '/productos/jacob_delafon_altair.png',
        description: 'Modelo Altair, líneas clásicas.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'jacob-3',
        name: 'Inodoro Jacob Delafon Antares',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 235,
        image: '/productos/jacob_delafon_antares.png',
        description: 'Serie Antares, elegancia refinada.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'jacob-4',
        name: 'Inodoro Jacob Delafon Portrait',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 350,
        image: '/productos/jacob_delafon_portrait.png',
        description: 'Estilo victoriano con cisterna alta.',
        inStock: true,
        rarity: 5
    },
    {
        id: 'jacob-5',
        name: 'Inodoro Jacob Delafon Escale',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 380,
        image: '/productos/jacob_delafon_escale.png',
        description: 'Inodoro Escale. Diseño angular moderno.',
        inStock: true,
        rarity: 4
    },

    // --- SANGRÁ ---
    {
        id: 'sangra-1',
        name: 'Inodoro Sangrá Alcora',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 180,
        image: '/productos/sangra_alcora.png',
        description: 'Modelo icónico Alcora de Sangrá.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'sangra-2',
        name: 'Inodoro Sangrá Bahía',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 185,
        image: '/productos/sangra_bahia.png',
        description: 'Serie Bahía, diseño náutico.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'sangra-3',
        name: 'Inodoro Sangrá Domo',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 200,
        image: '/productos/sangra_domo.png',
        description: 'Diseño Domo, curvas suaves.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'sangra-4',
        name: 'Inodoro Sangrá Europa',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 190,
        image: '/productos/sangra_europa.png',
        description: 'El clásico modelo Europa.',
        inStock: true,
        rarity: 2
    },

    // --- VALADARES ---
    {
        id: 'valadares-1',
        name: 'Inodoro Valadares Nautilus',
        brand: 'Valadares',
        category: 'inodoro',
        price: 195,
        image: '/productos/valadares_nautilus.png',
        description: 'Modelo Nautilus portugués.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'valadares-2',
        name: 'Inodoro Valadares Assimetrica',
        brand: 'Valadares',
        category: 'inodoro',
        price: 210,
        image: '/productos/valadares_assimetrica.png',
        description: 'Diseño asimétrico único.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'valadares-3',
        name: 'Inodoro Valadares Tagus',
        brand: 'Valadares',
        category: 'inodoro',
        price: 200,
        image: '/productos/valadares_tagus.png',
        description: 'Serie Tagus, elegancia portuguesa.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'valadares-4',
        name: 'Inodoro Valadares Oporto',
        brand: 'Valadares',
        category: 'inodoro',
        price: 205,
        image: '/productos/valadares_oporto.png',
        description: 'Modelo Oporto clásico.',
        inStock: true,
        rarity: 3
    },

    // --- SANITANA ---
    {
        id: 'sanitana-1',
        name: 'Inodoro Sanitana Grecia',
        brand: 'Sanitana',
        category: 'inodoro',
        price: 185,
        image: '/productos/sanitana_grecia.png',
        description: 'Modelo Grecia portugués.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'sanitana-2',
        name: 'Inodoro Sanitana Regina',
        brand: 'Sanitana',
        category: 'inodoro',
        price: 220,
        image: '/productos/sanitana_regina.png',
        description: 'Serie Regina con detalles ornamentales.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'sanitana-3',
        name: 'Inodoro Sanitana Munique',
        brand: 'Sanitana',
        category: 'inodoro',
        price: 195,
        image: '/productos/sanitana_munique.png',
        description: 'Modelo Munique de inspiración alemana.',
        inStock: true,
        rarity: 3
    },

    // --- DURAVIT ---
    {
        id: 'duravit-1',
        name: 'Inodoro Duravit Starck',
        brand: 'Duravit',
        category: 'inodoro',
        price: 350,
        image: '/productos/duravit_starck.png',
        description: 'Diseño de Philippe Starck.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'duravit-2',
        name: 'Inodoro Duravit Happy D',
        brand: 'Duravit',
        category: 'inodoro',
        price: 380,
        image: '/productos/duravit_happy_d.png',
        description: 'Serie Happy D, curvas elegantes.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'duravit-3',
        name: 'Inodoro Duravit D-Code',
        brand: 'Duravit',
        category: 'inodoro',
        price: 320,
        image: '/productos/duravit_d_code.png',
        description: 'Modelo D-Code funcional.',
        inStock: true,
        rarity: 3
    },

    // --- COLORES DESCATALOGADOS ---
    {
        id: 'color-1',
        name: 'Inodoro Color Pergamino',
        brand: 'Roca',
        category: 'inodoro',
        price: 320,
        image: '/productos/inodoro_pergamino.png',
        description: 'Inodoro en color pergamino (blanco roto), muy buscado para reparaciones.',
        inStock: true,
        rarity: 5
    },
    {
        id: 'color-2',
        name: 'Inodoro Color Visón',
        brand: 'Roca',
        category: 'inodoro',
        price: 350,
        image: '/productos/inodoro_vison.png',
        description: 'Inodoro en color visón (gris-marrón), difícil de encontrar.',
        inStock: true,
        rarity: 5
    },
    {
        id: 'color-3',
        name: 'Inodoro Color Azul Caribe',
        brand: 'Roca',
        category: 'inodoro',
        price: 380,
        image: '/productos/inodoro_azul_caribe.png',
        description: 'Inodoro en azul caribe, color de los años 70.',
        inStock: false,
        rarity: 5
    },
    {
        id: 'color-4',
        name: 'Inodoro Color Rosa Ilusión',
        brand: 'Roca',
        category: 'inodoro',
        price: 360,
        image: '/productos/inodoro_rosa.png',
        description: 'Inodoro en rosa ilusión, típico de los 80.',
        inStock: true,
        rarity: 5
    },
    {
        id: 'color-5',
        name: 'Inodoro Color Verde Agua',
        brand: 'Roca',
        category: 'inodoro',
        price: 340,
        image: '/productos/inodoro_verde_agua.png',
        description: 'Inodoro en verde agua, clásico de los 60-70.',
        inStock: true,
        rarity: 5
    },
    {
        id: 'color-6',
        name: 'Inodoro Color Champagne',
        brand: 'Gala',
        category: 'inodoro',
        price: 370,
        image: '/productos/inodoro_champagne.png',
        description: 'Inodoro en champagne (dorado crema) vintage.',
        inStock: true,
        rarity: 5
    },
    {
        id: 'color-7',
        name: 'Lavabo Color Pergamino',
        brand: 'Roca',
        category: 'lavabo',
        price: 180,
        image: '/productos/lavabo_pergamino.png',
        description: 'Lavabo con pedestal en color pergamino.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'color-8',
        name: 'Lavabo Color Visón',
        brand: 'Roca',
        category: 'lavabo',
        price: 200,
        image: '/productos/lavabo_vison.png',
        description: 'Lavabo con pedestal en color visón.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'color-9',
        name: 'Bidé Color Pergamino',
        brand: 'Roca',
        category: 'bidet',
        price: 160,
        image: '/productos/bide_pergamino.png',
        description: 'Bidé en color pergamino para combinar.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'color-10',
        name: 'Bidé Color Visón',
        brand: 'Roca',
        category: 'bidet',
        price: 180,
        image: '/productos/bide_vison.png',
        description: 'Bidé en color visón para combinar.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'color-11',
        name: 'Tapa WC Color Pergamino',
        brand: 'Roca',
        category: 'accesorios',
        subcategory: 'tapa',
        price: 65,
        image: '/productos/tapa_wc_pergamino.png',
        description: 'Tapa de WC en color pergamino.',
        inStock: true,
        rarity: 3
    }
];
