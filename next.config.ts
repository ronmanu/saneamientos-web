import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * =============================================================================
   * REDIRECCIONES 301 - MIGRACIÓN SEO COMPLETA
   * =============================================================================
   * 
   * Mapeo de URLs antiguas de aparatossanitariosdescatalogados.com
   * a la nueva estructura para preservar todo el "link juice" y posicionamiento.
   */
  async redirects() {
    return [
      // =====================================================================
      // PÁGINAS PRINCIPALES
      // =====================================================================
      {
        source: '/empresa-sanitarios-descatalogados',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/empresa-sanitarios-descatalogados/',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/almacen',
        destination: '/catalogo',
        permanent: true,
      },
      {
        source: '/almacen/',
        destination: '/catalogo',
        permanent: true,
      },
      {
        source: '/politica-de-privacidad-y-aviso-legal',
        destination: '/privacidad',
        permanent: true,
      },
      {
        source: '/politica-de-privacidad-y-aviso-legal/',
        destination: '/privacidad',
        permanent: true,
      },

      // =====================================================================
      // CATÁLOGO GENERAL DE PRODUCTOS
      // =====================================================================
      {
        source: '/catalogo-sanitarios',
        destination: '/catalogo',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/',
        destination: '/catalogo',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/inodoros-descatalogados',
        destination: '/catalogo?categoria=inodoros',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/inodoros-descatalogados/',
        destination: '/catalogo?categoria=inodoros',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/bidets-descatalogados',
        destination: '/catalogo?categoria=bidets',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/bidets-descatalogados/',
        destination: '/catalogo?categoria=bidets',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/lavabos-descatalogados',
        destination: '/catalogo?categoria=lavabos',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/lavabos-descatalogados/',
        destination: '/catalogo?categoria=lavabos',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/cisternas-descatalogadas',
        destination: '/catalogo?categoria=cisternas',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/cisternas-descatalogadas/',
        destination: '/catalogo?categoria=cisternas',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/tapas-wc-descatalogadas',
        destination: '/catalogo?categoria=tapas',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/tapas-wc-descatalogadas/',
        destination: '/catalogo?categoria=tapas',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/mamparas-descatalogadas',
        destination: '/catalogo?categoria=mamparas',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/mamparas-descatalogadas/',
        destination: '/catalogo?categoria=mamparas',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/accesorios-descatalogados',
        destination: '/catalogo?categoria=accesorios',
        permanent: true,
      },
      {
        source: '/catalogo-sanitarios/accesorios-descatalogados/',
        destination: '/catalogo?categoria=accesorios',
        permanent: true,
      },

      // =====================================================================
      // ROCA - MARCA
      // =====================================================================
      {
        source: '/marcas/sanitarios-roca',
        destination: '/catalogo?marca=roca',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/',
        destination: '/catalogo?marca=roca',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/bidets',
        destination: '/catalogo?marca=roca&categoria=bidets',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/bidets/',
        destination: '/catalogo?marca=roca&categoria=bidets',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/inodoros',
        destination: '/catalogo?marca=roca&categoria=inodoros',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/inodoros/',
        destination: '/catalogo?marca=roca&categoria=inodoros',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/lavabos',
        destination: '/catalogo?marca=roca&categoria=lavabos',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/lavabos/',
        destination: '/catalogo?marca=roca&categoria=lavabos',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/cisternas',
        destination: '/catalogo?marca=roca&categoria=cisternas',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/cisternas/',
        destination: '/catalogo?marca=roca&categoria=cisternas',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/tapas',
        destination: '/catalogo?marca=roca&categoria=tapas',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-roca/tapas/',
        destination: '/catalogo?marca=roca&categoria=tapas',
        permanent: true,
      },

      // =====================================================================
      // GALA - MARCA
      // =====================================================================
      {
        source: '/marcas/sanitarios-gala',
        destination: '/catalogo?marca=gala',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-gala/',
        destination: '/catalogo?marca=gala',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-gala/bidets',
        destination: '/catalogo?marca=gala&categoria=bidets',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-gala/bidets/',
        destination: '/catalogo?marca=gala&categoria=bidets',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-gala/inodoros',
        destination: '/catalogo?marca=gala&categoria=inodoros',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-gala/inodoros/',
        destination: '/catalogo?marca=gala&categoria=inodoros',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-gala/lavabos',
        destination: '/catalogo?marca=gala&categoria=lavabos',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-gala/lavabos/',
        destination: '/catalogo?marca=gala&categoria=lavabos',
        permanent: true,
      },

      // =====================================================================
      // BELLAVISTA - MARCA
      // =====================================================================
      {
        source: '/marcas/sanitarios-bellavista',
        destination: '/catalogo?marca=bellavista',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-bellavista/',
        destination: '/catalogo?marca=bellavista',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-bellavista/bidets',
        destination: '/catalogo?marca=bellavista&categoria=bidets',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-bellavista/bidets/',
        destination: '/catalogo?marca=bellavista&categoria=bidets',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-bellavista/inodoros',
        destination: '/catalogo?marca=bellavista&categoria=inodoros',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-bellavista/inodoros/',
        destination: '/catalogo?marca=bellavista&categoria=inodoros',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-bellavista/lavabos',
        destination: '/catalogo?marca=bellavista&categoria=lavabos',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-bellavista/lavabos/',
        destination: '/catalogo?marca=bellavista&categoria=lavabos',
        permanent: true,
      },

      // =====================================================================
      // JACOB DELAFON - MARCA
      // =====================================================================
      {
        source: '/marcas/sanitarios-jacob-de-la-fon',
        destination: '/catalogo?marca=jacob-delafon',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-jacob-de-la-fon/',
        destination: '/catalogo?marca=jacob-delafon',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-jacob-de-la-fon/inodoros-sanitarios',
        destination: '/catalogo?marca=jacob-delafon&categoria=inodoros',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-jacob-de-la-fon/inodoros-sanitarios/',
        destination: '/catalogo?marca=jacob-delafon&categoria=inodoros',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-jacob-de-la-fon/bidets',
        destination: '/catalogo?marca=jacob-delafon&categoria=bidets',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-jacob-de-la-fon/bidets/',
        destination: '/catalogo?marca=jacob-delafon&categoria=bidets',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-jacob-de-la-fon/lavabos',
        destination: '/catalogo?marca=jacob-delafon&categoria=lavabos',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-jacob-de-la-fon/lavabos/',
        destination: '/catalogo?marca=jacob-delafon&categoria=lavabos',
        permanent: true,
      },

      // =====================================================================
      // SANGRÁ - MARCA
      // =====================================================================
      {
        source: '/marcas/sanitarios-sangra',
        destination: '/catalogo?marca=sangra',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-sangra/',
        destination: '/catalogo?marca=sangra',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-sangra/lavabos',
        destination: '/catalogo?marca=sangra&categoria=lavabos',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-sangra/lavabos/',
        destination: '/catalogo?marca=sangra&categoria=lavabos',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-sangra/inodoros',
        destination: '/catalogo?marca=sangra&categoria=inodoros',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-sangra/inodoros/',
        destination: '/catalogo?marca=sangra&categoria=inodoros',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-sangra/bidets',
        destination: '/catalogo?marca=sangra&categoria=bidets',
        permanent: true,
      },
      {
        source: '/marcas/sanitarios-sangra/bidets/',
        destination: '/catalogo?marca=sangra&categoria=bidets',
        permanent: true,
      },

      // =====================================================================
      // REDIRECCIÓN GENERAL DE /marcas/
      // =====================================================================
      {
        source: '/marcas',
        destination: '/marcas',
        permanent: true,
      },
      {
        source: '/marcas/',
        destination: '/marcas',
        permanent: true,
      },

      // =====================================================================
      // REDIRECCIONES DE CONTACTO / FORMULARIOS ANTIGUOS
      // =====================================================================
      {
        source: '/contacto.html',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/contacto.php',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contacto',
        permanent: true,
      },

      // =====================================================================
      // WILDCARDS - CAPTURAR CUALQUIER RUTA ANTIGUA NO MAPEADA
      // =====================================================================
      // Redirige cualquier subpágina de catalogo-sanitarios no especificada
      {
        source: '/catalogo-sanitarios/:path*',
        destination: '/catalogo',
        permanent: true,
      },
      // Redirige cualquier subpágina de marcas no especificada
      {
        source: '/marcas/:marca/:path*',
        destination: '/catalogo',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
