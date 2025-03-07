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
            <h1>Expert Urological Care For Your Health Needs</h1>
            <p>
              Dr. Smith provides personalized urological treatment with compassion and the latest evidence-based techniques. With over 15 years of experience, your health is in trusted hands.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="#booking" className="button button-primary">
                Book a Consultation
              </Link>
              <Link href="#services" className="button button-secondary">
                Our Services
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image 
              src="/doctor.jpg" 
              alt="Dr. Smith - Urologist" 
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