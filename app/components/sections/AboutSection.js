import React from 'react';
import Image from 'next/image';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Acerca de UMI Urologia</h2>
          <div className={styles.underline}></div>
        </div>
        
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            <Image 
              src="/Office.jpeg" 
              alt="Dr. Smith in his office" 
              width={500} 
              height={400}
              className={styles.doctorOfficeImage}
              priority
            />
          </div>
          
          <div className={styles.aboutText}>
            <h3 className={styles.subheading}>Urologia Minimamente Invasiva</h3>
            <p className={styles.paragraph}>
              En nuestra asociación, contamos con un equipo de especialistas altamente calificados y con una sólida trayectoria en el campo de la urología. Nuestro equipo está conformado por el Dr. Óscar Vanegas, egresado de la Universidad Javeriana y especialista en urología de la Universidad del Rosario, fundador y urólogo de la Clínica Medicadiz, con más de 45 años de experiencia, y el Dr. César Palacios, egresado de la Universidad de Buenos Aires, Argentina, donde se especializó como médico endourólogo, con una destacada trayectoria en procedimientos urológicos avanzados. Nuestro compromiso es brindar atención médica de excelencia, con un alto estándar profesional y un enfoque centrado en la seguridad y el bienestar de cada paciente.  
            </p>
          </div>
        </div>

        {/* Centered credentials section */}
        <div className={styles.credentialsCentered}>
          <div className={styles.credential}>
            <span className={styles.credentialNumber}>#1</span>
            <span className={styles.credentialText}>Urologia Minimamente Invasiva</span>
          </div>
          <div className={styles.credential}>
            <span className={styles.credentialNumber}>70+</span>
            <span className={styles.credentialText}>Años de experiencia compartida</span>
          </div>
          <div className={styles.credential}>
            <span className={styles.credentialNumber}>40.000+</span>
            <span className={styles.credentialText}>Procedimientos Realizados</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;