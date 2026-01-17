export interface Product {
    id: string;
    name: string;
    brand: 'Roca' | 'Gala' | 'Bellavista' | 'Jacob Delafon' | 'Sangrá' | 'Otro';
    category: 'inodoro' | 'bidet' | 'lavabo' | 'mampara' | 'accesorios';
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
        image: '/images/categories/inodoros.png',
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
        image: '/images/categories/inodoros.png',
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
        image: '/images/categories/inodoros.png',
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
        image: '/images/categories/inodoros.png',
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
        image: '/images/categories/lavabos.png',
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
        image: '/images/categories/bidets.png',
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
        image: '/images/tapa_dama.png',
        description: 'Tapa original para inodoro Dama Senso. Caída amortiguada.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'roca-8',
        name: 'Mecanismo Descarga D1D',
        brand: 'Roca',
        category: 'accesorios',
        subcategory: 'cisterna',
        price: 25,
        image: '/images/mecanismo_d1d.png',
        description: 'Mecanismo de doble pulsador roscado para cisternas Roca.',
        inStock: true,
        rarity: 1
    },
    {
        id: 'roca-9',
        name: 'Inodoro Góndola',
        brand: 'Roca',
        category: 'inodoro',
        price: 290,
        image: '/images/categories/inodoros.png',
        description: 'Diseño exclusivo Góndola, pieza de colección descatalogada.',
        inStock: false,
        rarity: 5
    },
    {
        id: 'roca-10',
        name: 'Mampara Angular Victoria',
        brand: 'Roca',
        category: 'mampara',
        price: 320,
        image: '/images/categories/mamparas.png',
        description: 'Mampara angular compatible con platos Roca.',
        inStock: true,
        rarity: 2
    },

    // --- GALA ---
    {
        id: 'gala-1',
        name: 'Inodoro Gala Nexus',
        brand: 'Gala',
        category: 'inodoro',
        price: 195,
        image: '/images/categories/inodoros.png',
        description: 'Inodoro Gala Nexus, diseño moderno descatalogado.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'gala-2',
        name: 'Lavabo Gala Elia',
        brand: 'Gala',
        category: 'lavabo',
        price: 85,
        image: '/images/lavabo_elia.png',
        description: 'Lavabo mural Gala Elia 55cm. Color blanco.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'gala-3',
        name: 'Inodoro Gala Jara',
        brand: 'Gala',
        category: 'inodoro',
        price: 175,
        image: '/images/categories/inodoros.png',
        description: 'Modelo Jara, sencillo y adaptable.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'gala-4',
        name: 'Bidet Gala Marina',
        brand: 'Gala',
        category: 'bidet',
        price: 80,
        image: '/images/categories/bidets.png',
        description: 'Bidet de la serie Marina.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'gala-5',
        name: 'Inodoro Gala Blue',
        brand: 'Gala',
        category: 'inodoro',
        price: 210,
        image: '/images/categories/inodoros.png',
        description: 'Serie Blue, líneas suaves y modernas.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'gala-6',
        name: 'Inodoro Gala Bacara',
        brand: 'Gala',
        category: 'inodoro',
        price: 240,
        image: '/images/categories/inodoros.png',
        description: 'Inodoro de gama alta Bacara, descatalogado.',
        inStock: false,
        rarity: 5
    },
    {
        id: 'gala-7',
        name: 'Tapa Asiento Gala 2000',
        brand: 'Gala',
        category: 'accesorios',
        subcategory: 'tapa',
        price: 35,
        image: '/images/categories/accesorios.png',
        description: 'Asiento original para inodoros Gala 2000.',
        inStock: true,
        rarity: 1
    },
    {
        id: 'gala-8',
        name: 'Inodoro Gala Noble',
        brand: 'Gala',
        category: 'inodoro',
        price: 280,
        image: '/images/categories/inodoros.png',
        description: 'Estilo clásico y señorial. Serie Noble.',
        inStock: true,
        rarity: 5
    },
    {
        id: 'gala-9',
        name: 'Lavabo Gala Street Square',
        brand: 'Gala',
        category: 'lavabo',
        price: 110,
        image: '/images/categories/lavabos.png',
        description: 'Lavabo con semipedestal Street Square.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'gala-10',
        name: 'Inodoro Gala Loa',
        brand: 'Gala',
        category: 'inodoro',
        price: 190,
        image: '/images/categories/inodoros.png',
        description: 'Modelo Loa, compacto y funcional.',
        inStock: true,
        rarity: 2
    },

    // --- BELLAVISTA ---
    {
        id: 'bella-1',
        name: 'Inodoro Bellavista Arcadia',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 185,
        image: '/images/categories/inodoros.png',
        description: 'El clásico Arcadia de Bellavista. Durabilidad garantizada.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'bella-2',
        name: 'Bidet Bellavista Arcadia',
        brand: 'Bellavista',
        category: 'bidet',
        price: 90,
        image: '/images/bidet_arcadia.png',
        description: 'Bidet de porcelana sanitaria Bellavista Arcadia.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'bella-3',
        name: 'Inodoro Bellavista Bohemia',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 260,
        image: '/images/categories/inodoros.png',
        description: 'Estilo vintage Bohemia. Ideal baños rústicos.',
        inStock: false,
        rarity: 5
    },
    {
        id: 'bella-4',
        name: 'Inodoro Bellavista Stylo',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 180,
        image: '/images/categories/inodoros.png',
        description: 'Bellavista Stylo, diseño moderno y limpio.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'bella-5',
        name: 'Inodoro Bellavista Sevilla',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 170,
        image: '/images/categories/inodoros.png',
        description: 'Modelo Sevilla, económico y resistente.',
        inStock: true,
        rarity: 1
    },
    {
        id: 'bella-6',
        name: 'Inodoro Bellavista Duna',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 195,
        image: '/images/categories/inodoros.png',
        description: 'Serie Duna, formas inspiradas en la naturaleza.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'bella-7',
        name: 'Lavabo Bellavista Nexo',
        brand: 'Bellavista',
        category: 'lavabo',
        price: 95,
        image: '/images/categories/lavabos.png',
        description: 'Lavabo Nexo, adaptable a cualquier mueble.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'bella-8',
        name: 'Inodoro Bellavista Amadeus',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 220,
        image: '/images/categories/inodoros.png',
        description: 'Elegancia clásica. Modelo Amadeus.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'bella-9',
        name: 'Tapa Bellavista Record',
        brand: 'Bellavista',
        category: 'accesorios',
        subcategory: 'tapa',
        price: 40,
        image: '/images/categories/accesorios.png',
        description: 'Asiento de repuesto para inodoro Record.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'bella-10',
        name: 'Inodoro Bellavista Itálica',
        brand: 'Bellavista',
        category: 'inodoro',
        price: 210,
        image: '/images/categories/inodoros.png',
        description: 'También conocido como Astro. Inodoro robusto.',
        inStock: true,
        rarity: 3
    },

    // --- JACOB DELAFON ---
    {
        id: 'jacob-1',
        name: 'Inodoro Jacob Delafon Antares',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 240,
        image: '/images/categories/inodoros.png',
        description: 'Inodoro Antares. Diseño francés atemporal.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'jacob-2',
        name: 'Inodoro Jacob Delafon Altaïr',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 230,
        image: '/images/categories/inodoros.png',
        description: 'Modelo Altaïr, líneas geométricas.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'jacob-3',
        name: 'Lavabo Jacob Delafon Odeon',
        brand: 'Jacob Delafon',
        category: 'lavabo',
        price: 120,
        image: '/images/categories/lavabos.png',
        description: 'Lavabo Odeon. Calidad superior.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'jacob-4',
        name: 'Inodoro Jacob Delafon Trocadero',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 260,
        image: '/images/categories/inodoros.png',
        description: 'Serie Trocadero. Lujo descatalogado.',
        inStock: false,
        rarity: 5
    },
    {
        id: 'jacob-5',
        name: 'Inodoro Jacob Delafon Panache',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 200,
        image: '/images/categories/inodoros.png',
        description: 'Inodoro Panache, estilo versátil.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'jacob-6',
        name: 'Bidet Jacob Delafon Presquile',
        brand: 'Jacob Delafon',
        category: 'bidet',
        price: 110,
        image: '/images/categories/bidets.png',
        description: 'Bidet Presqu\'ile. Diseño ergonómico.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'jacob-7',
        name: 'Inodoro Jacob Delafon Escale',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 350,
        image: '/images/categories/inodoros.png',
        description: 'Inodoro Escale. Cuadrado y moderno.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'jacob-8',
        name: 'Tapa Jacob Delafon Ola',
        brand: 'Jacob Delafon',
        category: 'accesorios',
        subcategory: 'tapa',
        price: 55,
        image: '/images/categories/accesorios.png',
        description: 'Tapa original para modelo Ola.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'jacob-9',
        name: 'Inodoro Jacob Delafon Replay',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 215,
        image: '/images/categories/inodoros.png',
        description: 'Modelo Replay. Compacto.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'jacob-10',
        name: 'Inodoro Jacob Delafon Stillness',
        brand: 'Jacob Delafon',
        category: 'inodoro',
        price: 380,
        image: '/images/categories/inodoros.png',
        description: 'Diseño zen Stillness. Pieza única.',
        inStock: false,
        rarity: 5
    },

    // --- SANGRÁ ---
    {
        id: 'sangra-1',
        name: 'Inodoro Sangrá Venecia',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 180,
        image: '/images/categories/inodoros.png',
        description: 'Modelo icónico Venecia de Sangrá.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'sangra-2',
        name: 'Inodoro Sangrá Europa',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 190,
        image: '/images/categories/inodoros.png',
        description: 'El clásico modelo Europa. Muy resistente.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'sangra-3',
        name: 'Inodoro Sangrá Domo',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 200,
        image: '/images/categories/inodoros.png',
        description: 'Diseño Domo, curvas suaves.',
        inStock: true,
        rarity: 3
    },
    {
        id: 'sangra-4',
        name: 'Lavabo Sangrá Bahía',
        brand: 'Sangrá',
        category: 'lavabo',
        price: 70,
        image: '/images/categories/lavabos.png',
        description: 'Lavabo Bahía. Práctico y duradero.',
        inStock: true,
        rarity: 1
    },
    {
        id: 'sangra-5',
        name: 'Inodoro Sangrá Proa',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 210,
        image: '/images/categories/inodoros.png',
        description: 'Inodoro Proa. Estilo náutico sutil.',
        inStock: true,
        rarity: 4
    },
    {
        id: 'sangra-6',
        name: 'Bidet Sangrá Alcora',
        brand: 'Sangrá',
        category: 'bidet',
        price: 85,
        image: '/images/categories/bidets.png',
        description: 'Bidet Alcora, perfecto estado.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'sangra-7',
        name: 'Inodoro Sangrá Boreal',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 220,
        image: '/images/categories/inodoros.png',
        description: 'Modelo Boreal. Difícil de encontrar.',
        inStock: false,
        rarity: 5
    },
    {
        id: 'sangra-8',
        name: 'Tapa Sangrá Granada',
        brand: 'Sangrá',
        category: 'accesorios',
        subcategory: 'tapa',
        price: 40,
        image: '/images/categories/accesorios.png',
        description: 'Tapa compatible con inodoro Granada.',
        inStock: true,
        rarity: 2
    },
    {
        id: 'sangra-9',
        name: 'Inodoro Sangrá Epoque',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 250,
        image: '/images/categories/inodoros.png',
        description: 'Estilo clásico Epoque. Para baños vintage.',
        inStock: true,
        rarity: 5
    },
    {
        id: 'sangra-10',
        name: 'Inodoro Sangrá Alfa',
        brand: 'Sangrá',
        category: 'inodoro',
        price: 175,
        image: '/images/categories/inodoros.png',
        description: 'Modelo Alfa. Económico y funcional.',
        inStock: true,
        rarity: 1
    }
];
