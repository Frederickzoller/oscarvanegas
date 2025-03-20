import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>Atención Urológica Especializada Para El Cuidado De Su Salud</h1>
            <p>
            Nuestro enfoque en urología combina experiencia, personalización y tecnología de última generación para lograr los mejores resultados y el bienestar del paciente. 
            </p>
            <div className={styles.ctaButtons}>
              <Link href="#booking" className="button button-primary">
                Agendar Consulta
              </Link>
              <Link href="#services" className="button button-secondary">
                Nuestros servicios
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image 
              src="/doctor.jpg" 
              alt="Dr. Vanegas - Urologo" 
              width={500} 
              height={600} 
              priority
              className={styles.doctorImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;