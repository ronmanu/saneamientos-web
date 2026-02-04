import Hero from '@/sections/Hero';
import FeaturedCollection from '@/sections/FeaturedCollection';
import History from '@/sections/History';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Sanitarios Descatalogados | Piezas Originales',
  description: 'Especialistas en recambios de sanitarios antiguos. Tapa Roca, Inodoro Victoria, Gala y más.',
};

export default function Home() {
  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <FeaturedCollection />
        <section id="nosotros">
          <History />
        </section>
        <section id="contacto">
          <Contact />
        </section>
        <Footer />
      </main>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Toast notifications */}
      <Toaster position="bottom-right" />
    </div>
  );
}
