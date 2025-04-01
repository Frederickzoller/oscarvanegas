"use client";

import React, { useState, useEffect } from 'react';
import styles from './ServicesSection.module.css';

const services = [
  {
    id: 1,
    title: "Urologia General",
    description: "Consultas especializadas y estudios diagnósticos avanzados para la detección y manejo de enfermedades urológicas.",
    icon: "🔬",
    procedures: [
      "Consulta externa y subespecializada (andrología, funcional y piso pélvico)",
      "Cistoscopia (endoscopía de uretra y vejiga)",
      "Biopsias de vejiga y próstata",
      "Ecografía transrectal de próstata",
      "Ureteroscopia diagnóstica",
      "Uretrotomía interna endoscópica"
    ]
  },
  {
    id: 2,
    title: "Terapias Intravesicales",
    description: "Terapias especializadas para el manejo de enfermedades vesicales y disfunción eréctil mediante instilaciones y fármacos.",
    icon: "💊",
    procedures: [
      "Instilaciones urinarias para cáncer de vejiga y cistitis intersticial",
      "Recambio de sonda uretral y de cistostomía",
      "Inyección de toxina botulínica",
      "Terapia intracavernosa para impotencia"
    ]
  },
  {
    id: 3,
    title: "Tratamiento Cálculos Urinarios",
    description: "Procedimientos mínimamente invasivos y láser para la eliminación de cálculos en riñón, uréter y vejiga.",
    icon: "👨‍⚕️",
    procedures: [
      "Nefrolitotomia flexible con láser",
      "Ureterolitotomía transuretral (láser y rígida)",
      "Nefrolitotomía percutánea",
      "Colocación y retiro de catéter doble J"
    ]
  },
  {
    id: 4,
    title: "Cirugía Urológica General",
    description: "Intervenciones quirúrgicas especializadas para enfermedades de próstata, vejiga, testículos y riñón.",
    icon: "⚕️",
    procedures: [
      "Resección transuretral de próstata",
      "Prostatectomía abierta y radical",
      "Cistectomía parcial o radical",
      "Orquiectomía y hidrocelectomía",
      "Varicocelectomía",
      "Vasectomía",
      "Plastia de frenillo peneal"
    ]
  },
  {
    id: 5,
    title: "Cirugías Reconstructivas y Funcionales",
    description: "Tratamientos para cánceres urológicos y lesiones tumorales.",
    icon: "🔄",
    procedures: [
      "Cistouretropexia con cabestrillo",
      "Colporragia anterior y posterior",
      "Epididimectomía y espermatocelectomía",
      "Pielografía retrógrada y anterógrada",
      "Reducción de torsión testicular"
    ]
  },
  {
    id: 6,
    title: "Cirugía Oncológica y Tumores Urológicos",
    description: "Tratamientos quirúrgicos para cánceres urológicos y lesiones tumorales.",
    icon: "🩺",
    procedures: [
      "Cirugía para cáncer de próstata, vejiga, riñón y testículos",
      "Resección transuretral de tumores vesicales",
      "Resección y fulguración de tumor vesical"
    ]
  }
];

// Componente para tarjeta de servicio con carrusel
const ServiceCard = ({ service }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const toggleSlide = () => {
    setActiveSlide(activeSlide === 0 ? 1 : 0);
  };

  const handleScroll = () => {
    const servicesSection = document.getElementById('services');
    const rect = servicesSection.getBoundingClientRect();
    // Check if the user has scrolled away from the ServicesSection
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      setActiveSlide(0); // Reset to the first slide
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.serviceCard}>
      <div className={styles.carouselContainer}>
        {/* Primera diapositiva */}
        <div className={`${styles.slide} ${activeSlide === 0 ? styles.active : ''}`}>
          <div className={styles.serviceIcon}>{service.icon}</div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
        
        {/* Segunda diapositiva */}
        <div className={`${styles.slide} ${activeSlide === 1 ? styles.active : ''}`}>
          <div className={styles.proceduresContainer}>
            <h3>Procedimientos</h3>
            <ul className={styles.proceduresList}>
              {service.procedures.map((procedure, index) => (
                <li key={index}>{procedure}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Botón único para alternar */}
      <div className={styles.carouselNav}>
        <button 
          className={styles.toggleBtn}
          onClick={toggleSlide}
        >
          {activeSlide === 0 ? 'Más información' : 'Volver'}
        </button>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Nuestros Servicios</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
          Brindamos servicios urológicos completos con las técnicas más innovadoras y respaldadas por la ciencia.
          </p>
        </div>
        
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;