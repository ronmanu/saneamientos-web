export interface Review {
    id: string;
    name: string;
    rating: number; // 1-5
    text: string;
}

export const reviews: Review[] = [
    {
        id: 'review-1',
        name: 'Javier Martínez',
        rating: 5,
        text: 'Increíble, encontré la tapa de mi inodoro Roca de hace 20 años. Llegó perfecta y rápido.'
    },
    {
        id: 'review-2',
        name: 'María L.',
        rating: 5,
        text: 'Muy buena atención telefónica. Me ayudaron a identificar la pieza exacta que necesitaba.'
    },
    {
        id: 'review-3',
        name: 'Antonio García',
        rating: 5,
        text: 'Llevaba meses buscando un bidet Gala descatalogado. Lo tenían en stock y llegó en 48h.'
    }
];
