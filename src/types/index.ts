export interface Product {
  id: string;
  name: string;
  type: 'lavabo' | 'bidet' | 'inodoro' | 'cisterna' | 'asiento' | 'tapa' | 'mampara' | 'plato-ducha' | 'accesorio';
  decade: '60s' | '70s' | '80s' | '90s' | '2000s' | '2010s';
  brand: string;
  description: string;
  image: string;
  status: 'disponible' | 'reservado' | 'vendido';
  specs?: {
    width?: number;
    length?: number;
    holeDistance?: number;
    shape?: string;
    material?: string;
    code?: string;
    fixation?: string | null;
    compatibilityGroup?: string;
  };
}

export interface FilterState {
  type: string | null;
  decade: string | null;
  brand: string | null;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  busqueda: string;
  mensaje: string;
}
