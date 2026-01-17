/**
 * =============================================================================
 * CONTACT PAGE
 * =============================================================================
 * 
 * Displays company contact information, location map, and customer reviews.
 */

import Image from 'next/image';
import styles from './page.module.css';
import { reviews } from '../data/reviews';

export default function ContactoPage() {
    return (
        <main className={styles.pageContainer}>
            {/* Company Logo */}
            <div className={styles.logoContainer}>
                <Image
                    src="/logo-nobg.png"
                    alt="Saneamientos Descatalogados"
                    width={300}
                    height={90}
                    className={styles.logoImage}
                    priority
                />
            </div>

            {/* Contact Details */}
            <div className={styles.contactDetails}>
                <div className={styles.item}>
                    <strong>Dirección</strong>
                    C/ Virgen de Lluc, 88z<br />
                    Madrid 28027
                </div>
                <div className={styles.item}>
                    <strong>Teléfono</strong>
                    <a href="tel:+34653942261">+34 653 94 22 61</a>
                </div>
                <div className={styles.item}>
                    <strong>Email</strong>
                    <a href="mailto:gamoservicios@gmail.com">gamoservicios@gmail.com</a>
                </div>
            </div>

            <div className={styles.bottomSection}>
                {/* Google Maps Embed */}
                <div className={`${styles.mapContainer} glass-panel`}>
                    <iframe
                        className={styles.mapFrame}
                        src="https://maps.google.com/maps?q=C/+Virgen+de+Lluc,+88z,+Madrid&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación Saneamientos Descatalogados"
                    ></iframe>
                </div>

                {/* Customer Reviews */}
                <div className={styles.reviewsContainer}>
                    <div className={styles.googleBadge}>
                        {/* External image - using img for external URLs */}
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                            alt="Google"
                            width="80"
                            height="26"
                            className={styles.googleLogo}
                        />
                        <span>Reseñas de Clientes</span>
                    </div>

                    {reviews.map(review => (
                        <div key={review.id} className={styles.reviewCard}>
                            <div className={styles.reviewerHeader}>
                                <div className={styles.reviewerAvatar}>{review.name.charAt(0)}</div>
                                <div className={styles.reviewerInfo}>
                                    <span className={styles.reviewerName}>{review.name}</span>
                                    <span className={styles.stars}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                                </div>
                            </div>
                            <p className={styles.reviewText}>"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
