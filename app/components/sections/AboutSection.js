import React from 'react';
import Image from 'next/image';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Acerca del Dr. Vanegas</h2>
          <div className={styles.underline}></div>
        </div>
        
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            <Image 
              src="/doctor-office.jpg" 
              alt="Dr. Smith in his office" 
              width={500} 
              height={400}
              className={styles.doctorOfficeImage}
            />
          </div>
          
          <div className={styles.aboutText}>
            <h3>Atención Urológica Especializada</h3>
            <p>
            El Dr. Óscar Vanegas es un urólogo certificado con más de 45 años de experiencia en el diagnóstico y tratamiento de enfermedades urológicas. Graduado de la Universidad Javeriana y especializado en Urología en la Universidad del Rosario, ha trabajado en instituciones de prestigio ofreciendo un tratamiento especializado y humano a quienes lo consultan.  
            </p>
            
            <div className={styles.credentials}>
              <div className={styles.credential}>
                <span className={styles.credentialNumber}>#1</span>
                <span className={styles.credentialText}>Especialista en calculos renales</span>
              </div>
              <div className={styles.credential}>
                <span className={styles.credentialNumber}>45+</span>
                <span className={styles.credentialText}>Años de experiencia</span>
              </div>
              <div className={styles.credential}>
                <span className={styles.credentialNumber}>20.000+</span>
                <span className={styles.credentialText}>Procedimientos Realizados</span>
              </div>
            </div>
            
            <div className={styles.affiliations}>
              <p><strong>Trayectoria:</strong></p>
              <ul>
                <li>Profesor de Urología - Universidad del Rosario - (1988 - 1990)</li>
                <li>Hospital Federico Lleras Acosta - (1991 - 2024)</li>
                <li>Urólogo Fundador Clínica Medicádiz (Ibagué - Colombia)</li>
                <li>Urólogo Fundador Clínica Urocadiz (Ibagué - Colombia)</li>
                <li>Clínica Tolima - (2024 - Presente) </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;