import React from 'react';
import styles from './ServicesSection.module.css';

const services = [
  {
    id: 1,
    title: "General Urology",
    description: "Comprehensive care for a wide range of urological conditions including UTIs, prostate issues, and bladder disorders.",
    icon: "🔍"
  },
  {
    id: 2,
    title: "Men's Health",
    description: "Specialized services for male urological conditions including erectile dysfunction, testosterone management, and prostate health.",
    icon: "♂️"
  },
  {
    id: 3,
    title: "Kidney Stone Treatment",
    description: "Advanced treatment options for kidney stones including extracorporeal shock wave lithotripsy (ESWL) and minimally invasive procedures.",
    icon: "💎"
  },
  {
    id: 4,
    title: "Urologic Oncology",
    description: "Expert diagnosis and treatment of urological cancers including prostate, bladder, kidney, and testicular cancer.",
    icon: "🔬"
  },
  {
    id: 5,
    title: "Minimally Invasive Surgery",
    description: "State-of-the-art minimally invasive and robotic surgical procedures that minimize recovery time and improve outcomes.",
    icon: "🤖"
  },
  {
    id: 6,
    title: "Urinary Incontinence",
    description: "Comprehensive evaluation and treatment options for both male and female urinary incontinence conditions.",
    icon: "💧"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Our Services</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
            Dr. Smith offers a comprehensive range of urological services using the latest evidence-based techniques and technology.
          </p>
        </div>
        
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;