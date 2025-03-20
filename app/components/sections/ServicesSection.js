import React from 'react';
import styles from './ServicesSection.module.css';

const services = [
  {
    id: 1,
    title: "Urología General",
    description: "Ofrecemos atención especializada a través de consulta externa, consulta general especializada en urológia y manejo de enfermedades prostáticas, garantizando un enfoque personalizado y de calidad.",
    icon: "🔍"
  },
  {
    id: 2,
    title: "Salud Masculina",
    description: "Brindamos atención especializada para la salud urológica del hombre, con enfoque en el diagnóstico y tratamiento de la disfunción eréctil, así como en la prevención y cuidado integral de la próstata.",
    icon: "♂️"
  },
  {
    id: 3,
    title: "Diagnosticos",
    description: "Realizamos estudios especializados para la detección y evaluación de enfermedades urológicas, incluyendo procedimientos endoscópicos, ecográficos y biopsias para un diagnóstico preciso de la vejiga, la próstata y la uretra.",
    icon: "💎"
  },
  {
    id: 4,
    title: "Tratamientos de Cáncer",
    description: "Evaluación y tratamiento especializado de cánceres urológicos, como el de próstata, vejiga, riñón y testículos.",
    icon: "🔬"
  },
  {
    id: 5,
    title: "Tratamiento con Medicamentos Intravesicales",
    description: "Ofrecemos terapias especializadas como instilaciones urinarias para cáncer de vejiga y cistitis intersticial, recambio de sondas y aplicación de toxina botulínica para trastornos vesicales.",
    icon: "🤖"
  },
  {
    id: 6,
    title: "Incontinencia Urinaria",
    description: "Evaluación y tratamiento integral de las afecciones de incontinencia urinaria, tanto en hombres como en mujeres, garantizando un enfoque personalizado y de alta calidad.",
    icon: "💧"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Nuestros Servicios</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
          El Dr. Vanegas brinda servicios urológicos completos con las técnicas más innovadoras y respaldadas por la ciencia.
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